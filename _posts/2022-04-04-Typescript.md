---
title: Typescript란?
categories: Typescript
tags: [TIL, Typescript]
expert: Typescript의 등장 배경 및 장점
---

## Typescript 등장 배경

Javascript는 Java 계열의 문법을 차용하면서도 type이나 class 같이 복잡성을 야기하는 부분들을 제거함으로써 간결한 문법을 가지는 [prototype 객체 기반 함수형 동적 타입 스크립트 언어](https://developer.mozilla.org/ko/docs/Web/JavaScript/About_JavaScript)이다. 자바스크립트는 타입이 없기 때문에 문법이 단순하고 유연한 체계를 가진다는 장점이 있지만 이러한 점은 대규모 협업에는 적합하지 않았고, 빌드 전에 미리 오류를 검증하는 정적 타입 언어의 장점이 결합된 Typescript가 등장하게 되었다.

> Javascript는 ES4(ECMAScript4) 에서 Typescript와 유사하게 정적 타이핑, 인터페이스, 제네릭 등의 개념을 도입했었으나 기존 javascript의 체계를 정적 타입 기반 언어 체계로 바꾸는 것은 너무 많은 변화와 하위 호환성 유지의 어려움 때문에 폐기되었다고 한다.

### Javascript의 문제점 예시

#### 1) 형변환 문제

```js
if ("" == 0) {
  // 참
}
```

`==` 연산에서 **""는 falsy한 값**(ex: false, '', null, undefined, 0, NaN 등)이므로 false로 취급되며, **false는 number 형과 비교 시 0으로 형변환**되기 때문에 `"" == 0` 조건문의 결과는 true이다.

```js
if (1 < x < 3) {
  // 항상 참이다.
}
```

위의 조건문은 `(1 < x) < 3` 으로 연산되는데, 예를 들어 `1 < x` 결과가 true일 경우 `true < 3` 을 체크해야 하고, 이 때 **boolean 형의 값을 number 값과 비교할 경우 true는 1, false는 0으로 변환되어 계산**된다. 그렇기 때문에 x가 어떤 값이더라도 boolean 형은 1또는 0의 숫자로 변환되어 위의 조건문은 항상 참인 결과를 반환할 수 밖에 없는 것이다.

#### 2) 존재하지 않는 프로퍼티의 접근 허용

```js
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth; //오류가 나지 않고 NaN반환
```

## Typescript란

> Typescript란 Javascript 기반의 정적 타입 언어로서, JS 구문이 허용되는 Javascript의 상위 집합(superset) 언어이며 프로그램을 실행시키기 전에 타입을 검사하는 정적 타입 검사자이다.

\* **정적 검사** : 프로그램을 실행시키지 않고 코드의 오류를 검출하는 검사 \* **정적 타입 검사** : 프로그램을 실행시키기 전에 값의 종류를 기반으로 프로그램의 오류를 검출.

## Typescript 장점

### 1) 자바스크립트 소스와의 호환

타입스크립트는 자바스크립트의 상위 집합 언어이기 때문에 자바스크립트 소스와 호환되며 기존 자바스크립트 코드를 타입스크립트 코드로 변환하기 위한 노력이 적게 든다.

### 2) 버그 예방

타입스크립트는 정적 타입 시스템이기 때문에 프로그램이 실행되기 이전에 상당수의 오류를 잡아내어 버그를 예방할 수 있다.

### 3) 코드 가독성 및 이해도 향상

명시적인 타입 지정을 통해서 코드의 의도를 좀 더 명확하게 작성할 수 있기 때문에 코드의 가독성 및 이해도가 향상된다.

### 4) IDE의 지원

정적 타입 분석이 가능하기 때문에 다양한 타입 정보를 활용하여 IDE는 자동 완성 기능 등의 유용한 기능들을 지원한다. 특히 Visual Studio Code와 Typescript는 모두 Microsoft에서 만들었기 때문에 VS Code에서 Typescript 개발이 더욱 용이하다.

> 📖 참고
>
> - [wishket/테오의 프론트엔드 - TypeScript는 어떻게 공부해야 하나요?](https://yozm.wishket.com/magazine/detail/1376/)
> - [Typescript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
> - [mdn web docs - JavaScript에 대하여](https://developer.mozilla.org/ko/docs/Web/JavaScript/About_JavaScript)
> - [ts-for-jsdev](https://ahnheejong.gitbook.io/ts-for-jsdev/01-introducing-typescript/intro)
> - [JavaScript VS TypeScript](https://jaeseokim.dev/Javascript/javascript_vs_typescript/)
> - [Typescript의 사용목적 및 장점](https://velog.io/@imjkim49/Typescript%EC%9D%98-%EC%82%AC%EC%9A%A9%EB%AA%A9%EC%A0%81-%EB%B0%8F-%EC%9E%A5%EC%A0%90)
