---
title: React18 변경사항에 따라 ReactDOM.render > createRoot로 변경하기 (with TypeScript) | Type Assertion
categories: Typescript
tags: [Typescript, React]
---

> React 18에서 더이상 지원하지 않는 `ReactDom.render` 대신 `createRoot`를 사용하기 위해 코드를 변경하는 과정, 그리고 TypeScript 타입 오류 해결을 위해 사용한 `Type assertion`에 대해 정리한 글입니다.

# ReactDOM.render 오류

![](https://velog.velcdn.com/cloudflare/yeyo0x0/ba8b2091-abe1-45e3-9ecf-ad5987dfd5c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-05%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.49.29.png)

새로운 리액트 프로젝트를 CRA로 만들고 실행했더니 콘솔창에 처음보는 오류가 나타났다.
React 18버전에서는 `ReactDom.render`를 더이상 지원하지 않으니 `createRoot`를 대신 사용하라는 오류였다. 그래서 오류에 나와있는 [react 문서 링크](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)를 들어가보니 상세히 나와있었다.

```js
// Before
import { render } from "react-dom";
const container = document.getElementById("app");
render(<App tab="home" />, container);

// After
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App tab="home" />);
```

위와 같은 예시코드를 보고 나의 코드도 변경하였다.

**Before**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

**After**
Typescript의 경우 @types/react-dom 설치

```shell
npm i -D @types/react-dom
```

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## ❗️ TypeScript Issue

하지만 타입스크립트로 개발중이라면 위와 같이 작성했을 때 `container`에 오류 문구가 표시된다.
![](https://velog.velcdn.com/cloudflare/yeyo0x0/8cf48372-db3d-4d44-928e-7dd516fa90a0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-05%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.58.07.png)
`container` 에`NULL` 타입의 값은 할당할 수 없다는 오류이다.

## 💡 해결 방안

위의 상황처럼 실제로 값이 있다는 것을 알고있지만 Typescript의 타입 추론 결과에서는 null 값과 같은 알 수 없는 타입에 대한 정보가 나타날 경우 [Type assertion(타입 단언)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)을 통해 타입을 지정해줄 수 있다.

# Type Assertion

> Type Assertion은 컴파일러에게 변수의 타입을 알려주는 메커니즘으로 TypeScript의 타입 추론 결과가 실제와 다르게 추론되었다 생각하는 경우 사용할 수 있다. 또한 Type Assertion은 컴파일러에 의해 제거되기 때문에 코드의 런타임 동작에 영향을 미치지 않는다. \* **assertion** : 컴퓨터 프로그래밍에서 어서션(영어: assertion)은 프로그램 안에 추가하는 참·거짓을 미리 가정하는 문으로 개발자는 해당 문이 그 문의 장소에서 언제나 참이라고 간주한다. (=표명, 가정 설정문)

## 1) as

`as`는 type assertion 구문 중 하나이며 아래와 같이 사용한다.

```js
const container = document.getElementById("root") as HTMLElement;
```

## 2) angle bracket 구문

angle bracket 구문은 꺾쇠 괄호(`<>`)로 HTML 태그의 모양과 같다.

```js
const container = <HTMLElement>document.getElementById("root");
```

하지만 주의할 점이 있는데 angle brakcket은 HTML 태그와 형태가 동일하여 **JSX** 문법과 함께 사용할 수 없기 때문에 `.jsx`나 `.tsx` 파일에서는 사용할 수 없다.

**❗️위와 같은 방법을 통해서 타입을 단언해줄 수 있지만 Type Assertion은 개발자가 타입에 대해 확신할 수 있을 때만 사용하는 것이 좋다.❗️**

## 참고로 알아둘 내용

위의 문제를 해결할 수 있는 다른 방법이 또 하나 있지만 이 방법은 권장하지 않는다.

#### Non-null assertion operator(Non-null 단언 연산자)

[Non-null 단언 연산자](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)는 변수 뒤에 느낌표(`!`)를 붙여 나타내는 접미사 연산자로, 해당 값이 null, undefined 같은 값이 아니라고 단언해주는 역할을 한다. 하지만 [eslint에서는 strict null-checking 모드의 이점을 무효화하기 때문에 사용을 허용하지 않는다](https://github.com/typescript-eslint/typescript-eslint/blob/v2.34.0/packages/eslint-plugin/docs/rules/no-non-null-assertion.md)고 한다.

```js
const container = document.getElementById("root")!;
```

# 최종 코드

위의 해결 방안을 참고하여 최종적으로는 `as` 구문을 사용하여 해결하였다.

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
  	<App />
  </React.StrictMode>
);
```

📖 참고 자료  
[react 문서 링크](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)   
[Typescript 핸드북](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)  
[Typescript-eslint 문서](https://github.com/typescript-eslint/typescript-eslint/blob/v2.34.0/packages/eslint-plugin/docs/rules/no-non-null-assertion.md)
