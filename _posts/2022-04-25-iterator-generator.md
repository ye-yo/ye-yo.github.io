---
title: Javascript Iterator 정리
categories: Javscript
tags: [TIL, Javascript]
excerpt: Iterable? Iterator? 개념 정리와 Generator 함수 구현 방법까지
---

# Iterable

자바스크립트에서 배열은 반복 가능한 객체이며 이러한 반복 가능한 객체를 iterable object라고 한다. 반복 가능한 객체는 ES2015(ES6)에서 도입이 되었고 iterable 요소들을 순회할 수 있는 문법인 `for of` 구문도 함께 도입되었다. **iterable**을 충족하기 위해서는 조건이 있는데 바로 객체에 `Symbol.iterator` 속성이 구현되어 있어야 한다는 것이다.  

# Symbol.iterator

> Symbol에 대한 자세한 내용은 이 포스트에서 확인![Symbol 개념 정리 포스트](https://ye-yo.github.io/javscript/2022/04/24/symbol.html)

Symbol.iterator는 object를 반환하며 arguments가 없는 함수로 iterator protocol을 따른다.  

> ❓ iterator()가 아니라 [Symbol.iterator] 메소드를 사용하는 이유  
> : 기존에 작성된 코드에서 어떤 객체가 이미 `.iterator()`라는 메소드를 갖고 있으면 문제가 생기기 때문에 iterator라는 평범한 문자열 이름대신 Symbol을 사용한 고유 메소드를 정의해준 것이라고 한다.

> ❓ 유사 배열(array-like)와 iterable은 같다?  
> 유사배열은 인덱스와 length 프로퍼티가 있어 배열처럼 보이는 객체를 의미하고 iterable은 Symbol.iterator가 구현된 객체로 서로 다르다.
> 그러나 유사배열이면서 iterable인 객체도 존재하는데 문자열이 대표적인 예이다.

## iterator protocol

iterator protocol은 value들의 sequence를 만드는 표준 방법을 정의하며 이 표준을 따르는 객체를 `iterator`라고 한다.  
iterator protocol은 다음과 같다.  

- 객체는 `next()` property를 가진다.
- `next()` 메소드는 아래의 2개의 속성들을 가진 object를 반환하는 arguments가 없는 함수이다.
  - `value` : iterator로부터 반환되는 값. done이 true일 경우 생략될 수 있다.
  - `done`(boolean) : iterator가 마지막 반복 작업을 마쳤을 경우 `true`이고, iterator의 작업이 남아있을 경우 `false`이며, iterator에 return 값이 있다면 value 값으로 지정된다.

`next()` 메소드는 iterable의 각 요소를 순회하기 위한 포인터 역할을 하고, 호출 시마다 value와 done 속성을 가진 iterator result 객체(`{value, done}`)를 반환한다.  

다음은 iterable 객체 중 하나인 문자열 객체의 예시이다.  

```js
var someString = "hi";
var iterator = someString[Symbol.iterator]();
iterator + ""; // "[object String Iterator]"

iterator.next(); // { value: "h", done: false }
iterator.next(); // { value: "i", done: false }
iterator.next(); // { value: undefined, done: true }
```

# iterable 구현

iterable 객체는 iterable protocol에 부합하도록 구현하기만 하면 어떤 객체든 iterable이 될 수 있다. iterable는 일반 함수로 직접 구현하거나 `Generator`함수를 사용하여 구현할 수 있다.  

## 일반 함수로 구현하기

일반 함수로 iterable을 구현하기 위해서는 `[Symbol.iterator]()` 메소드를 구현해주어야 한다.  
위의 [iterable protocol](#iterator-protocol)에 나와있는 것과 같이 `Symbol.iterator`는 object를 반환하며 arguments가 없는 함수로 iterator protocol을 따라야하기 때문에 next() 메소드를 구현하고 object를 반환하는 등 iterator protocol에 맞게 구현해야 한다.  

```js
var iterableObject = {
  [Symbol.iterator]() {
    let index = 0;
    return {
      next() {
        index++;
        if (index === 1) {
          return { value: "Iterable : " + index, done: false };
        } else if (index === 2) {
          return { value: "Iterable : " + index, done: false };
        } else if (index === 3) {
          return { value: "Iterable : " + index, done: false };
        }
        return { value: "", done: true };
      },
    };
  },
};
for (var val of iterableObject) {
  console.log(val);
}
```

## Generator 함수 사용하기

ES2015에 도입된 `Generator` 함수를 사용하면 generator를 더 간단하게 구현할 수 있다. `Generator` 함수는 iterable 객체를 생성(반환)하는 함수이다. `function*`(function 키워드 끝에 별표) 표현식으로 함수를 정의한다.  
[function\*](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)  

```js
function* iterableObject(index) {
  yield "Iterable : " + index++;
  yield "Iterable : " + index++;
  yield "Iterable : " + index++;
}

for (const val of iterableObject(1)) {
  console.log(val);
}
```

### Generator 함수의 다양한 구현 방법

Generator 함수는 다음과 같이 다양한 방법으로 구현할 수 있다.  

```js
// generator 함수 선언
function* gen1() {
  // ...
}

// 표현식으로 사용
const gen2 = function* () {
  // ...
};

// 메소드 문법으로 사용
const obj = {
  *gen3() {
    // ...
  },
};
```

## yield

`Generator` 함수 안에서는 [yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) 라는 특별한 키워드를 사용할 수 있다.  
return과 유사한 역할을 하며, iterable의 기능을 사용할 때 yield 키워드 뒤에 있는 값들을 순서대로 넘겨준다.  

```js
function* countAppleSales() {
  let saleList = [3, 7, 5];
  for (let i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}

let appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }
```

> 📖 참고  
> [mdn web docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols)  
> [How to use the Generator function\* in JavaScript (continued…)](https://javascript.plainenglish.io/how-to-use-the-generator-function-in-javascript-continued-aada07d220c7)  
> [Iterable](https://helloworldjavascript.net/pages/260-iteration.html)  
> [iterable 객체](https://ko.javascript.info/iterable)
