---
title: Styled-Components - 기초
categories: React
tags: [React, Styled Components]
---

## 0. Styled-Components란?

React 컴포넌트 시스템의 스타일링을 위해 CSS를 향상시켜 개발된 CSS-in-JS 방식의 라이브러리
\+ CSS-in-JS는 [관련 포스팅 참고](https://velog.io/@yeyo0x0/CSS-Sass-BEM-CSS-Modules-CSS-in-JSStyled-Components)

### + **장점**

1. Automatic critical CSS : 페이지의 컴포넌트를 추적해 **필요한 스타일만 삽입**
2. No class name bugs: **고유한 클래스 이름 생성**
3. Easier deletion of CSS: 삭제된 컴포넌트의 모든 **스타일은 함께 삭제**
4. Simple dynamic styling: **props** 또는 **global theme**를 기반으로 스타일을 간단하고 직관적으로 관리
5. Painless maintenance: 컴포넌트에 영향을 주는 스타일을 찾기 위해 다른 파일을 검색할 필요가 없어 **손쉽게 유지 관리**가 가능
6. Automatic vendor prefixing: **자동으로 벤더 프리픽스 추가**

## 1. 설치

```bash
npm install --save styled-components
```

## 2. 사용

`styled` 메소드를 사용해 지정된 스타일을 가진 컴포넌트를 만들 수 있다.
\*styled 메소드 : 기본 export메소드

```js
const 컴포넌트명 = styled.DOM element명`
	css 코드
`
```

**예시)**

```js
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;
```

\* 렌더 메서드 내에서 스타일 컴포넌트를 정의할 경우 렌더링 시마다 다시 생성되어 렌더링 속도가 크게 느려지므로 반드시 외부에서 스타일 컴포넌트를 정의해야 한다.

## 3. 기능

[1) props를 전달할 수 있을까?](#1-props-전달)
[2) 스타일을 상속할 수 있을까?](#2-스타일-확장상속)
[3) 일반적인 DOM element로 구성된 컴포넌트도 만들 수 있을까?](#3-컴포넌트-스타일링)
[4) attr을 지정하고 변경할 수 있을까?](#4-속성attr-지정-및-동적-변경)
[5) scss처럼 선택자 중첩이 가능할까?](#5-선택자-중첩)
[6) 애니메이션 따로 정의해 적용할 수 있을까?](#6-애니메이션)
[7) 테마에 따라 스타일을 줄 수 있을까??](#7-테마)

### 1) props 전달

컴포넌트에 props를 전달해 스타일 코드에서 이 값을 사용할 수 있다.

```js
const Button = styled.button`
	color : ${props => props.primary ? 'blue':'white'}
	// 다음과 같이 작성도 가능
	color : ${({ primary }) => primary ? 'blue':'white'}
`;
...
function ToggleButton() {
  return (
      <Button primary>Primary Button</Button>
  );
}
```

**\* props를 참조하는 다양한 방법**

1. props 값에 따라 여러 개의 style을 주어야 할 때 : `css`메소드 사용

\*css : 보간을 사용해 템플릿 리터럴에서 CSS를 생성하는 helper 함수.

```js
import styled, { css } from "styled-components";

const Button = styled.button`
  background: transparent;
  color: palevioletred;
  padding: 0.25em 1em;

  ${(props) =>
    props.primary &&
    css`
      background: black;
      color: white;
    `}
`;
```

위의 예제코드는 더블 앰퍼샌드`&&`를 사용해 왼쪽 값이 `truthy` 할 경우에만 css메소드를 사용해 style을 return한다.

2. props를 참조하는 style 속성이 여러개이거나 여러개의 props를 참조해야 할 경우

```js
import styled, { css } from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  ${({ width, height }) => {
    return css`
      width: ${width}px;
      height: ${width * 0.4}px;
    `;
  }}
`;
```

3. props 값에 무엇인지에 따라 각기 다른 style을 주어야 할 때
   : switch나 if문을 사용해 값에 따라 style을 return하는 함수를 생성해 사용

```js
const handleColorType = (color) => {
  switch (color) {
    case "primary":
      return "#03a9f3";
    case "danger":
      return "#f56342";
    default:
      return "#fff";
  }
};

const Button = styled.button`
  color: ${({ color }) => handleColorType(color)};
`;
```

> 참고 - [multiple-props-options-for-styled-components,Stack overflow](https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components)

4. javascript 방식으로 작성하는 것도 지원

```js
const PropsBox = styled.div((props) => ({
  background: props.background,
  height: "50px",
  width: "50px",
}));
```

### 2) 스타일 확장(상속)

다른 컴포넌트의 스타일을 상속할 수 있다. ` const 컴포넌트명 = styled(다른 컴포넌트명)``  `

```js
const Button = styled.button`
  border-radius: 10px;
  padding: 0.25em 1em;
  font-size: 1em;
  color: black;
`;

const YellowButton = styled(Button)`
  color: yellow;
`;
```

### 3) 컴포넌트 스타일링

일반적인 DOM element를 return하는 컴포넌트를 만들 수 있다.

```js
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

...
<Link>Unstyled, boring Link</Link>
```

### 4) 속성(attr) 지정 및 동적 변경

```js
const Input = styled.input.attrs({
  type: "text",
  placeholder: "아이디를 입력해 주세요.",
})`
  font-size: 14px;
  border: 1px solid gray;
`;
```

컴포넌트의 attrs를 props 값에 따라 재정의하거나 변경 할 수도 있다.

```js
const Input = styled.input.attrs(props =>({
  type: "text",
  size: props.size || "1em",
}))`

 color : red;
`
...
<Input size="2em"/>
```

### 5) 선택자 중첩

styled-components에서 사용하는 전처리기인 stylis를 통해 scss와 유사하게 선택자 중첩이 가능하다.

```js
const Container = styled.div`
	&:hover{
		color: red;
	}
	& ~ 선택자 { //형제노드 참조
    }
    & + 선택자{ //바로 다음 노드 참조

    &.clicked {
        background: orange;
    `
	&& { //* 이중 앰퍼샌드(&&) 사용 시 우선순위가 높아진다.
       color : red;
    }
`
```

또한 클래스명 없이 컴포넌트를 선택자로 사용하고 싶을 때에는 아래와 같이 작성한다.

```js
const Container = styled.div`
  & ${ToggleButton} {
    color: red;
  }
`;
```

### 6) 애니메이션

애니메이션 style을 별도로 정의하여 컴포넌트 정의 시에 적용할 수 있다.

```js
import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(<Rotate>💅🏾</Rotate>);
```

### 7) 테마

#### ThemeProvider

ThemeProvider 컴포넌트를 사용해 테마를 적용할 수 있다.

```js
import { ThemeProvider } from "styled-components"

const theme = {
    boderColor: "green",
    color: "green",
    bgColor: "green"
}

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;
...
<ThemeProvider theme={theme}>
    <Div>
        <Button>Click Me</Button>
    </Div>
</ThemeProvider>
```

위와 같이 작성하면 ThemeProvider의 하위 컴포넌트에 props로 theme를 전달할 수 있다.

또한 ThemeProvider에 wrapping되지 않는 Button 컴포넌트가 있을 수 있으니 이 때에는 `defaultProps`를 정의해주면 된다.

```js
...
Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}

...
 <div>
    <Button>Normal</Button>

    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
```

### theme props에 함수 전달

테마 props에 함수를 전달하는 것도 가능하다.

```js
const theme = {
  fg: "black,
  bg: "white"
};

// fg와 bg를 서로 반대로 할당
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});

render(
  <ThemeProvider theme={theme}>
    <div>
      <Button>Default Theme</Button>

      <ThemeProvider theme={invertTheme}>
        <Button>Inverted Theme</Button>
      </ThemeProvider>
    </div>
  </ThemeProvider>
);
```

위의 경우, 첫번째 버튼이 흰색 바탕+블랙 폰트라면 두번째는 각각 서로 반대로 할당된 블랙 바탕+흰색 폰트의 버튼이 렌더링된다.

상위의 테마의 스타일을 참조해야되지만 상위 테마와 다르게 적용해야 할 때 함수를 사용하면 유용할 것 같다.

> 참고자료 - [styled-components 공식문서](https://styled-components.com/docs/basics)

