---
title: 기업 과제 1 | 검색어 추천이 있는 검색창 만들기
categories: "원티드 프리온보딩"
tags: [원티드 프리온보딩, 회고록]
---

# 프로젝트 소개

> 💡 주제 : 검색어 추천이 있는 검색창 만들기<br>
> 🗓 기간 : 02.22 ~ 02.23<br>
> 🔨기술 스택 : React, Redux, styled-components<br>
> 💻 담당 : API 호출 최적화 - Debounce 구현<br>
> 👤 참여 인원 : 7

**상세 설명**

> 검색창에 검색어를 입력 시 API를 통해 검색어와 관련된 추천 검색어 목록을 받아오는 과제

# 기능 구현

첫 번째 과제는 한 페이지만 구현하는 것이라 7명의 팀원이서 역할을 분담하기에 다소 까다로운 부분이 있었다. 하지만 세부적으로 역할을 나누어서 담당하게 되었고, 나는 다른 팀원 한 분과 함께 API 호출을 최적화 하기 위한 방법을 모색하여 적용하는 것을 맡게 되었다. 호출 최적화 구현 방법에는 주어진 요구 사항이 2가지 있었는데 API 호출 횟수를 줄이는 것과, 호출 별로 로컬 캐싱을 구현하는 것이었다. 상의 후에 이 2가지를 각각 한 사람이 분담하여 구현하기로 했고, 나는 호출 횟수 최적화를 구현하게 되었다.

## API 호출 횟수 최적화의 중요성

프로젝트에서 API가 사용되는 부분은 검색어 입력 시, 해당하는 검색어와 관련된 추천 검색어 목록을 가져오는 부분이었다. 이 때 문제점은 키보드 입력시마다 API호출이 일어나게 된다는 것이다.

검색어를 입력할 때마다 새로운 목록이 나타나야 하는 것은 맞지만, 키보드 입력은 단시간에 지속적으로 이벤트가 발생하기 때문에 **키보드 입력 시마다 API를 호출하게 되면 서버 과부하가 발생**할 수 있다.

## API 호출 횟수 최적화 방법

호출 횟수를 최적화하는 방법은 찾아보니 **Debounce와 Throttle**이 대표적이었다.  
Debounce와 Throttle은 프로그래밍에서 요청 또는 처리의 빈도를 제한하거나 지연시키고자 할 때 자주 사용하는 방법으로 그 중에서도 Debounce는 일정 시간이 지난 후 이벤트가 한 번만 실행되기 때문에 키보드 입력에 더 적합하다. 그리하여 호출 회수 최적화를 위한 방법으로 Debounce를 사용하게 되었고, Debounce와 Throttle에 대한 자세한 내용은 따로 포스팅해두었다. **[Debounce & Throttle](https://velog.io/@yeyo0x0/Debounce)**

Debounce는 lodash 라이브러리를 사용하여 쉽게 사용할 수도 있지만 Debounce에 대한 이해에 더욱 도움이 되고자 직접 구현해보기로 하였다.

```js
export default function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
```

debounce 함수는 위와 같이 모듈화하여 구현하였으며, 구현된 debounce 함수는 useCallback으로 감싸서 input onchange 이벤트에 적용하였고, API 호출함수가 마지막 이벤트에서만 실행되도록 함으로써 API 호출 횟수를 최적화하였다.

```js
...
import debounce from '../utilities/debounce';

const SearchArea = () => {
  ...
  const debounceHandler = useCallback(
    debounce((value) => updateResult(value), 500),
    []
  );
```

# Issue

debounce를 onchange 이벤트에 추가함으로써 검색 중일때는 이벤트가 실행되지 않고 검색의 마지막 이벤트만 실행되어 `검색 중...` 표시를 띄우지 못한다는 문제가 있었다. 이를 해결하기 위해서 검색결과와는 별개로 검색중임을 확인하는 `isSearching` state를 새로 만들어 redux store에서 관리되도록 하였고, onchange 이벤트가 발생할 때 이 값을 `true`로 변경하여 `검색 중...` 문구가 나타나도록 만들었다.

```js
const RecommendArea = ({ show, activeIndex }) => {
  const result = useSelector((state) => state.search.success);
  const isSearching = useSelector((state) => state.search.searching);

  if (isSearching) {
    return (
      <RecommendAreaStyled show={show}>
        <Info>
          {result
            ? result.length > 0
              ? "추천 검색어"
              : "검색어 없음"
            : "검색 중..."}
          ...
        </Info>
      </RecommendAreaStyled>
    );
  }
  return null;
};
```
