---
title: 최근 업데이트 일자 표시 기능 구현
categories: React
tags: [기능구현, React]
---

# setInterval 사용 시 문제

React에서는 javascript에서 사용하는 것과 같이 `setInterval`을 사용하면 의도대로 구현되지 않는다. 자세한 내용은 별도 포스팅에 정리해두었으나 간단하게 요약하면

- 단순 함수로 구현하여 state를 변경하면 App이 re-rendering 되면서 무한히 함수가 실행된다.
- useEffect를 이용해 구현했을 경우, dependency로 값을 전달하지 않으면 업데이트 된 값을 참조할 수 없고, 전달할 경우 **무한루프**에 빠진다.

이를 해결하기 위해서는 `useRef`를 사용해서 custom Interavl 훅을 만들어야 한다.
이는 `useInterval`이라는 커스텀 훅으로 구현할 수 있고 [Dan Abramov](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) 개발자가 구현한 useInterval code를 참고할 수 있다.

# useInterval 구현

`useInterval`은 `useRef`에 콜백함수를 저장하여 `useEffect`가 무한루프되는 것을 막고, `useEffect` 훅 내부에서 `setInterval` 함수를 실행하여 `setinterval`의 콜백함수로 `useRef`에 저장된 콜백함수를 전달하는 것으로 구현하는 방식이다.

```js
import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
export default useInterval;
```

```js
import useInterval from "hooks/useInterval";
//...

useInterval(() => {
  if (lastUpdate) {
    setLastUpdateText(convertRelativeDate(lastUpdate));
  }
}, 60000); //1분마다 실행
```

`useInterval` 훅을 구현하고 `convertRelativeDate`라는 함수를 구현해 업데이트 일자를 몇 분전, 1일 전과 같은 현재 시간을 기준으로 하는 값으로 변환한다.
