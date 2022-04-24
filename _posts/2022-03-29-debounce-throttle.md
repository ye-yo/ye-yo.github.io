---
title: Debounce & Throttle
categories: TIL
tags: [TIL]
---

# Debounce와 Throttle

## 1. Debounce

💡➖➖💡➖➖💡➖➖💡  
➖➖➖➖➖➖➖➖➖💡

📖 **사전적 의미** : 기계적 스위치 센서나 터치 센서 등을 다룰 때, 순간적으로 스위치의 접점에서 ON/OFF가 여러 번 반복되는 현상(debouncing)을 없애는 것<br>
💻 **프로그래밍적 의미** : 이벤트를 그룹화하여 특정 시간이 지난 후, 하나의 이벤트만 발생하도록 하는 기술<br>
✔️ **사용 예시)** 키보드 입력 이벤트에 주로 사용<br>
💬 **구현 방법** : 이벤트가 실행되었을 때 일정 시간을 기다렸다가 이벤트를 수행하도록 만들고, 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청을 취소하는 방식으로 구현한다.

```js
function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
```

## 2. Throttle

💡➖➖💡➖➖💡➖➖💡  
➖➖➖➖💡➖➖➖➖💡

📖 **사전적 의미** : 목을 조르는 행위. 출력을 조절한다는 의미도 있어 밸브를 조절하는 과정에서도 이 단어가 사용된다.<br>
💻 **프로그래밍적 의미** : 일정 시간동안 일어난 이벤트를 모아 1번만 실행하는 기술<br>
✔️ **사용 예시)** scroll, mousemove 이벤트에 주로 사용<br>
💬 **구현 방법** : 타이머가 없을 경우 타이머를 설정하고, 타이머가 있을 경우 아무런 동작도 하지 않도록 하여 일정 시간 이후에 이벤트가 1번 실행되도록 구현한다.

```js
function throttle(callback, delay) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(this, arguments);
      }, delay);
    }
  };
}
```

## 3. 차이점

둘의 차이는 **Throttle의 경우 일정 시간마다 이벤트가 실행되는 것을 보장한다는 것이고, Debounce는 그렇지 않다는 것**이다. 풀어서 설명해보면, Debounce는 일정 시간 내에 다시 이벤트가 실행될 경우 타이머가 초기화 되어 다시 일정 시간만큼 기다리지만, Throttle은 이벤트가 다시 실행되는 것과는 상관 없이 일정 시간마다 이벤트를 발생시킨다. 그렇기 때문에 Throttle을 검색어 입력에 사용할 경우 `'벨로그'`라는 단어를 검색 시 타이머의 시간이 짧을 경우 `베, 벨ㄹ,벨로그` 이런 식으로 '벨로그'라는 검색어 입력에 대해 여러 번 이벤트가 실행되게 된다. 그래서 중간 중간 결과에 대한 이벤트도 발생시키길 원할 때에는 Throttle을 사용하는 것도 좋을 것 같다.

> 두 기술이 헷갈린다면 아래 포스팅을 참고하면 좋다. 둘의 차이를 시각적으로 확인할 수 있다.
> [디바운스(Debounce)와 스로틀(Throttle ) 그리고 차이점](https://webclub.tistory.com/607)

## 4. 코드 부가 설명

### Closure

debounce나 throttle는 클로저(Closure) 함수로, 내부의 익명함수는 자신을 포함하고 있는 외부함수의 변수에 접근이 가능하다.

** 클로저 예제코드**

```js
function outer() {
  var x = 1;
  var inner = function () {
    console.log(x);
  };
  return inner;
}

var test = outer();
test(); // 1
```

코드를 보면, 외부함수 `outer`는 호출되어 내부함수인 `inner`를 `test`변수에 return하고 call stack에서 제거되게 된다. call stack에서 제거되었기 때문에 `inner`함수에서 참조하고 있는 `outer` 내부 변수 `x`의 값이 정상적으로 출력되지 않을 것이라 생각할 수 있지만, 출력 결과 `x` 값이 정상적으로 나오는 것을 확인할 수 있다. 이것은 클로저 함수의 특성 때문으로 **외부 함수가 종료된 이후에도 내부 함수인`inner`함수가 선언되었을 때의 환경을 기억하여 자신의 렉시컬 스코프 내의 변수/함수 등을 참조할 수 있었던 것이다.**

> 함수의 스코프는 함수를 호출할 때가 아닌 선언할 때를 기준으로 결정되는데, 이를 **렉시컬 스코핑(lexical scoping)** 이라고 한다.

이를 debounce 코드에 적용해서 설명해보면,

```js
function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
```

debounce 내부의 익명함수는 debounce 내에서 선언되었으므로 익명함수의 상위 스코프는 debounce 함수가 된다. 그렇기 때문에 익명함수는 자신이 속한 렉시컬 스코프 내의 변수/함수 등을 참조할 수 있게되고, 함수가 선언 되었을 당시를 기억하기 때문에 외부 함수가 종료된 이후에도 내부의 익명함수는 `timer` 변수에 접근 할 수 있게 된다.

### 콜백함수

debounce 내의 함수는 콜백함수 형태로 내부에서 this 바인딩을 위한 apply가 사용되고 있다. 콜백 함수에 대한 이해는 [콜백함수 포스팅](https://velog.io/@yeyo0x0/%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98)에 정리해두었다.

### \* lodash

debounce와 throttle을 직접 구현할 수도 있지만 **lodash**를 사용하여 메소드를 사용하는 방법도 있다.
[lodash](https://lodash.com/)는 성능이 보장된 다양한 메소드들을 제공하는 라이브러리이다.

> 참고  
> [Debounce, Throttling](https://zereight.tistory.com/828)   
> [디바운스(Debounce)와 스로틀(Throttle ) 그리고 차이점](https://webclub.tistory.com/607)  
> [클로저](https://poiemaweb.com/js-closure)
