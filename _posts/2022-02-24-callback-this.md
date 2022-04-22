---
title: Canvas & Keyframes
categories: Javascript
tags: Javascript
date: 2022-02-24 14:42:07 +0900
---

# 💡 Callback 함수

> 파라미터로 함수를 전달받아, 함수의 내부에서 실행하는 함수
> 함수 안에서 특정한 시점에 콜백함수가 호출될때 호출 시점에 제어권도 같이 넘어간다.

## 1. this

> 자기참조 변수로, 자신의 속한 객체나 자신이 생성할 인스턴스의 프로퍼티, 메서드를 참조 가능하다.

- this는 js엔진에 의해 암묵적으로 생성되며 함수 호출 시 결정된다.
- 전역에서도 쓸 수 있지만 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서 의미가 있음.

## 2. 상황에 따라 달라지는 this

### 1) 전역 스코프에서 this

> 전역 스코프에서 this는 전역 객체를 가리킴. 브라우저 환경에서는 `window`, Node.js 환경에서는 `global`

### 2) 객체의 메서드 내에서 this

`* 참고 - 함수와 메서드의 차이는 함수는 독립적인 기능을 수행하는 반면, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다는 점이다.`

> 메서드 내에서 this는 메서드의 호출 주체인 객체를 가리킨다.

### 3) 함수 내에서 this

> 함수는 this가 지정되지 않아 전역객체를 가리킨다.

### 4) 화살표 함수 내에서 this

> 화살표 함수는 함수 선언시 this에 바인딩할 객체가 **정적으로 결정**되며 변경할 수 없다. 즉, 함수 선언 시, this가 상위 요소를 가리키게 된다.

### 5) 객체의 메서드를 콜백 함수로 사용할 경우 this

원래 객체의 메서드 내에서 this는 호출 주체인 객체를 가리키지만, **객체의 메서드**를 콜백함수로 사용 시 **this가 전역 객체를 가리킨다.** 이것은 객체의 메서드가 함수로서 호출되는 경우 객체와의 연결성이 사라지기 때문에 함수 내에서 this 값이 가리키는 것과 같이 전역 객체를 가리키게 된다.

```js
const user = {
  name: null,
  setName: function (name) {
    this.name = name;
  },
};

function setUserName(name, callback) {
  callback(name);
}

setUserName("홍길동", user.setName);

console.log(user.name); // null
console.log(window.name); // '홍길동'
```

위의 예제 코드에서 `setUserName`을 통해 새로운 유저명과 `user` 객체의 `setName` 메소드를 전달하여 유저명을 변경해주었다. 하지만 `user.name`을 출력 시에는 `user.name`의 초기값인 `null`이 출력되고, `window.name`을 출력하니 원하는 결과를 확인할 수 있다. 어떻게 된 것일까?

❗️ 콜백함수는 객체의 메소드이고 객체의 메소드내에서 **this.name**을 변경하지만
메서드는 함수로서 호출되면서(콜백함수는 무조건 함수로 생각) 객체와의 연결성이 사라졌고, 그래서 this가 window를 바라보게 되어 `window.name`에 값을 할당한 것이다.

### 💡 문제 해결 방법

이 같은 문제를 해결하기 위해서는 **콜백함수 호출시 this를 바인딩** 해주어야 한다.

## 3. this 바인딩

> **바인딩(binding)**: 값이 확정되어 더 이상 변경할 수 없는 구속(bind) 상태가 되는 것.

- this를 바인딩 한다는 것은 this와 this가 가리킬 객체를 바인딩하는 것이다.
- 변수선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것이다.

### 1) this 바인딩 방법

this를 명시적으로 바인딩하는 방법에는 `call`, `apply`, `bind`가 있다.

### Call()

> 첫번째 매개변수 - 바인딩할 this 값.
> 두번째 매개변수 - 인자를 콤마(`,`)로 구분하여 전달
> 사용 시 메서드의 호출 주체인 함수가 즉시 실행된다.

**예제 코드**

```js
const user1{
  name: '김철수'
};

const user2{
  name: '홍길동'
  introduce: function (age) {
    console.log('내 이름은 ' + this.name + ' 나이는 ' + age + '살');
  }
}

user2.introduce(13); //내 이름은 홍길동 나이는 13살
user2.introduce.call(user1, 20); // 내 이름은 김철수 나이는 20살
```

위처럼 작성할 경우 `user2`의 메소드를 호출하고 있지만 `call`을 이용해 `user1`을 this에 바인딩해주었기 때문에 메소드 호출 시 `user1`의 이름이 출력된다.

위의 문제의 2-4의 예제코드에 적용하면 아래와 같이 작성할 수 있다.

```js
setUserName("홍길동", user.setName.call(user));
```

이렇게 작성하면 기존에는 `setName` 내부의 this가 window를 가리켰는데 `call`을 통해 this를 `user`에 바인딩해주면 `setName` 내부의 this는 `user`를 가리키게 된다.

### apply()

> 첫번째 매개변수 - 바인딩할 this 값.
> 두번째 매개변수 - 인자를 배열 형태로 전달
> `call()`과 마찬가지로 사용 시 메서드의 호출 주체인 함수가 즉시 실행된다.

```js
user2.introduce.apply(user1, 20);
```

함수의 매개 변수가 여러 개인 경우 아래와 같이 작성한다.

```js
user2.introduce.call(user1, [20, "학생"]);
```

### bind()

> 첫번째 매개변수 : 바인딩할 this 값
> 두 번째 매개변수 : 인자를 콤마(`,`)로 구분하여 전달
> `call`, `apply`와 달리 함수를 호출하지 않고 this만 바인딩한다.

```js
const introduce = user.introduce.bind(user1, 20);
introduce();
```

### \* 참고 용어

### 매개변수 vs 인자

> #### 매개변수
>
> 함수 정의 시 나열되는 변수

```js
function 함수이름(매개변수1, 매개변수2, ...) {
   // 코드
}
```

> #### 인자
>
> 함수 호출 시 전달되는 값

```js
함수이름(인자1, 인자2, ...);
```

### arguments

> 함수에 전달되는 매개변수들을 가리키며 Array 형태의 객체이다.

```js
function func1(a, b, c) {
  console.log(arguments[0]);
}
```

> 참고
> [코어 자바스크립트 | 3. this](https://intrepidgeeks.com/tutorial/core-javascript-3-this)
