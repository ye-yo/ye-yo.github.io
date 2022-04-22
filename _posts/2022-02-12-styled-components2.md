---
title: Styled-Components - 심화
categories: React
tags: [React, Styled Components]
---

> 이전 포스팅에 이어서 styled-components 공식문서의 API 페이지에 있는 내용들 중 이해한 내용을 우선적으로 정리했다.

[1-1. 컴포넌트 타입을 변경할 수 있을까?](#1-컴포넌트-타입-변경--as)

[1-2. props를 렌더링되지 않게 만들 수는 없을까?](#2-임시-props)

[2-1. 전역 스타일을 적용할 수 있을까?](#1-createglobalstyle)

[2-2. javascript에서 css를 바로 작성할 순 없을까?](#2-css)

[2-3. 애니메이션용 키프레임을 생성할 수 있을까?](#3-keyframe)

## 1. 다양한 기능의 props

### 1) 컴포넌트 타입 변경 - as

`as` props 를 이용해 컴포넌트의 타입을 변경할 수 있다.
(`withComponent`와 동일. withComponent는 지원중단예정)

```js
const Button = styled.button`
    padding: 2px 5px;
    color: ${props => props.theme.color};
    border-radius: 3px;
`
<Button as="a">Click Me</Button>
```

`Button` 컴포넌트는 `button` element로 정의되었으나 `as` props로 인해 `a` 태그로 렌더링된다.

### 2) 임시 props

props가 React 노드로 전달되거나 DOM element에 렌더링되는 것을 방지하고 싶다면 props 이름 앞에 `$`를 붙이면 일시적인 props가 된다.

```js
const Comp = styled.div`
  color: ${(props) => props.$draggable || "black"};
`;

render(
  <Comp $draggable="red" draggable="true">
    Drag me!
  </Comp>
);
```

### 3) 컴포넌트를 만들지 않고 style 지정

간단한 style만 부여할거라 굳이 컴포넌트를 생성할 필요가 없을 때 css props로

```js
<div
  css={`
    background: papayawhip;
    color: ${props => props.theme.colors.text};
  `}
/>
<Button
  css="padding: 0.5em 1em;"
/>
```

## 2. Helpers

### 1) createGlobalStyle

전역 스타일을 처리하기위한 helper 함수
기본적으로 styled 컴포넌트는 로컬 css 클래스로 범위가 지정되어 다른 컴포넌트와 격리된다. createGlobalStyle의 경우에는 이 제한이 제거되고 css reset 혹은 default style을 적용하는데에 사용할 수 있다.

```js
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`
function App() {
  return (
    <>
	 <GlobalStyle/>
	 <Home>
    </>
  );
}
```

혹은 `ThemeProvider`를 사용해 상위 컴포넌트에서 컴포넌트를 감싸면 하위 컴포넌트 전체에 global style을 적용할 수 있다.

### 2) css

javascript 코드에서 css를 입력할 수 있도록 도와주는 함수

```js
const complexMixin = css`
  color: ${(props) => (props.whiteColor ? "white" : "black")};
`;
```

### 3) keyframe

애니메이션용 키프레임을 생성할 수 있도록 돕는 함수

```js
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeInButton = styled.button`
  animation: 1s ${fadeIn} ease-out;
`;
```
