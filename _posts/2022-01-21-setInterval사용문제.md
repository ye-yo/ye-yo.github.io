---
title: React Hooks에서 setInterval() 사용 문제
categories: React
tags: React
---

자동 슬라이드 기능을 구현하면서 `setInterval()`을 써야했는데 원하는대로 동작하지 않았다. 그래서 문제 상황과 원인 그리고 해결방법을 공부하게 되었고, 공부한 내용을 토대로 정리해보려고 한다.

우선 포스팅에서 다루고 있는 문제를 해결하는 `useInterval` 커스텀 훅을 구현한 개발자는 Dan Abramov이며 [원문](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)을 번역한 [jakeseo_me님의 리액트 훅스 컴포넌트에서 setInterval 사용 시의 문제점](https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EC%8B%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90) 포스팅을 먼저 발견하여 읽게되었고 이해하는데에 많은 도움을 받았다.

# 1. 문제 상황 및 원인 분석

## Case 1

```js
function Test() {
  setInterval(() => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  }, 1000);
}
```

javascript에서는 위와 같이 사용했을지 몰라도 React에서는 state가 변하면 App이 re-rendering 되기 때문에 `setInterval()`함수는 무한히 실행되고야 만다.

## Case 2

case 1을 경험했다면 처음 렌더링 시에만 실행되도록 `useEffect()` 훅 아래와 같이 쓰면 될 것이라 생각할 수 있다.

```js
useEffect(() => {
  setInterval(() => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

하지만 `useEffect()` 훅의 두번째 인자로 빈 배열을 전달하면 처음 한 번만 실행되기 때문에 `useEffect()` 내부에서는 업데이트 된 currentIndex 값을 알 수 없고, 때문에 console에는 초기값인 0만 찍히게 된다.

## Case 3

case 2의 문제로 인해 state가 변할 때마다 실행되도록 아래와 같이 작성할 수도 있다.

```js
useEffect(() => {
  setInterval(() => {
    console.log(currentIndex);
    setCurrentIndex((currentIndex) => currentIndex + 1);
  }, 1000);
  return () => clearInterval(id);
}, [currentIndex]);
```

하지만 `useEffect()` 두 번째 인자로 전달하는 의존성 배열 내의 값을 `useEffect()` 함수 내에서 수정하고 있기 때문에 무한루프에 빠지게 된다.

<span style="font-size:40px">🤔</span> 그렇다면 어떻게 작성해야 이를 해결할 수 있을까?
바로 `useRef`를 사용하여 **custom interval 훅**을 만들면 해결할 수 있다.

# 2. Solution - useInterval Hooks

🔑 솔루션의 핵심은 **interval을 전혀 변경하지 않고, 변경이 가능하면서 최근 interval callback을 가리키는 savedCallback 변수를 도입하는 것**이다
먼저 솔루션 코드는 다음과 같다.

```js
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Test() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((count) => count + 1);
  }, 1000);
}
```

위의 코드를 보면 `setInterval` 대신 `useInterval`이라는 custom interval Hooks를 만들어서 사용하고 있다.

## 3. useInterval Hooks 설명

`useInterval`함수를 파헤쳐보자.

```js
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```

### 1) useRef의 활용

`useInterval` 훅을 보면 callback 함수와 delay를 전달받아서 useEffect 내부에서 callback 함수를 savedCallback.current에 저장하고 있다.

```js
const savedCallback = useRef();
```

이 때, useInterval에서 `useRef` 훅을 사용한 이유는 리렌더링을 방지하기 위해서이다.
`useRef`는 함수형 프로그래밍에서 사용하는 `ref`로 초기화된 ref 객체인 `{current: null}`을 반환하며 반환된 객체는 컴포넌트의 전 생애주기 동안 유지되어 `useRef`로 관리하는 값은 값이 변경되어도 컴포넌트가 리렌더링 되지 않는다.

🤔 만약 `useState`를 사용했다면 어떨까?

```js
const [count, setCount] = useState(0);

useInterval(() => {
  setCount((count) => count + 1);
}, 1000);
```

`useState`를 사용하여 데이터를 관리할 경우 값이 변경될 때 리렌더링이 일어나기 때문에 `useEffect()` 내부에서 `savedCallback` 값이 변경될 때마다 리렌더링이 일어나게 되고 이 때문에 두 번째 `useEffect()` 내부에서 `savedCallback` 값을 확인하면 계속해서 초기값만을 가져오게 될 것이다.

### 2) callback 함수를 저장하는 useEffect hooks

```js
useEffect(() => {
  savedCallback.current = callback;
}, [callback]);
```

위의 코드를 보면 callback 데이터가 바뀔 때마다 `useEffect()`가 실행되어 `savedCallback`의 current 값이 새로운 callback 데이터로 업데이트 된다.

🤔 왜 `useInterval()`에 함수를 전달해서 내부에서 값을 업데이트 해주는 것일까?
이는 앞서 소개했던 문제상황의 case들을 생각해보면 이해할 수 있다.

1. `useEffect()`는 의존성 배열을 전달하지 않으면 리렌더링 될때마다 실행된다.
2. `useEffect()`의 두 번째 인자에 빈 배열을 전달할경우 첫 렌더링 시에만 실행되어 훅 내부에서는 변화된 데이터 값을 얻을 수 없다.
3. `useEffect()`는 특정 데이터가 변경될때 마다 실행되도록 할 수 있으나, `useEffect()` 내부에서 값이 업데이트 되는 데이터에 의존할 경우 무한 루프에 빠지게 된다.

이를 해결하고자 `useInterval()` 훅은 리렌더링 시마다 실행되어 업데이트 된 count 값을 가질 수 있게 만들고, count 값을 업데이트하는 함수를 `useInterval` 훅에 전달하여 내부에서 savedCallback.current에 저장하여 새로 업데이트된 count 값을 `useEffect` 훅 내부에서도 얻을 수 있도록 한 것이다.

### 3) setInterval을 호출하는 useEffect hooks

첫 번째 `useEffect`훅을 통해 callback 함수를 저장했으면 두 번째 `useEffect` 에서는 `setInterval` 함수에 해당 callback 함수를 전달해 실행되도록 만들어야 한다.

```js
useEffect(() => {
  function tick() {
    savedCallback.current();
  }
  if (delay !== null) {
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }
}, [delay]);
```

위의 `useEffect`는 delay가 변경될 때마다 실행되며 delay가 null값이 아닐 경우에 `setInterval` 함수를 호출하여 callback 함수를 실행한다.
이렇게 작성하면 1. `useEffect()`가 무한히 실행되는 것을 방지하며 delay가 변경될 때에만 타이머를 재실행하게 되며 2. 첫 번째 `useEffect()`는 콜백함수가 변경될때마다 업데이트하기 때문에 결국 두 번째 `useEffect()` 내의 `setInterval()` 함수는 재실행되지 않고도 새로 업데이트 된 콜백함수를 실행할 수 있다.

이 때 delay를 null check 하는 이유는 Interval을 일시중지 할 수 있게 하기 위해서이며 `useInterval`에 null인 delay를 전달할 경우 더 이상 `setInterval` 함수가 실행되지 않게 된다.

`return () => clearInterval(id);` 부분은 `clean-up` 함수로 class component의 경우는 `componentWillUnmount`라는 라이프사이클 메서드를 이용해 구현하며 funtion component의 경우는 `useEffect()`에 전달한 함수의 return 함수로 구현한다.
`useEffect()` 내에서 함수를 반환하면 컴포넌트가 unmount 될 때 해당 함수가 실행되어 불필요한 동작을 제거하거나 메모리 누수 문제를 방지할 수 있어 사용한다.
`
