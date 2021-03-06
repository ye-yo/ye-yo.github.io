---
title: 기업 과제 6 | 리뷰 등록/확인 서비스
categories: "원티드 프리온보딩"
tags: [원티드 프리온보딩, 회고록]
---

# 프로젝트 소개

> 💡 **주제** : 리뷰 등록/확인 서비스<br/>
> 🗓 **기간** : 03.10 ~ 03.14<br/>
> 🔨**기술 스택** : React, Redux, styled-components<br/>
> 💻 **담당** : Redux 구조 세팅 및 그리드 뷰, 정렬 기능 구현<br/>
> 👤 **참여 인원** : 5

**프로젝트 상세 설명**

> 새로운 리뷰를 등록하고 BALAAN 상품의 리뷰 및 등록한 리뷰를 확인할 수 있는 서비스

#### 주요 기능 목록

- 리뷰 등록 및 별점 매기기 기능
- 데이터 크롤링
- 무한 스크롤
- 리뷰 목록(그리드뷰/리스트뷰)
- 리뷰 정렬
- 리뷰 상세 페이지
- 좋아요, 찜, 공유 기능

# ⚙️ 기능 구현

6번째 기업 과제는 리뷰 등록 및 확인 서비스를 구현하는 것이 주제였고, 나는 그리드뷰 형식의 리뷰 확인 및 정렬 기능을 담당했다.

### Redux 구조 세팅

redux를 지난 프로젝트에서 사용해봤었는데, 당시에는 구현하는 부분에서 사용할 경험이 적어 redux에 대한 이해가 많이 부족하다고 느꼈다. 마침 이번에 redux가 필수 기술 스택으로 지정되어 redux 구조 세팅을 직접 해보고 싶다고 자원하였다. 지난 프로젝트에서 팀원분이 구현해놓으신 구조들을 참고하며 구현해나갔으며 폴더 구조는 크게 아래와 같이 구성하였다.

```
-- redux
  ---📂 actions : 액션 생성 함수 폴더
  ---📂 reducers : 리듀서 폴더
  store.js
```

**actions** 폴더는 액션 생성 함수들을 관리하는 폴더로 `types.js, comment.js, review.js` 파일들을 가지고 있고 `comment.js, review.js`는 각각 댓글, 리뷰와 관련된 액션 생성 함수들을 작성해두고 `types.js`에서 `action type`을 관리했다.

**reducers** 폴더는 `index.js comment.js, review.js` 파일들을 가지고 있고, `comment.js, review.js`에는 각각 comment, review의 리듀서를 정의해두었다. `index.js`는 여러 개의 reducer를 병합하여 rootReducer로 내보내는 역할을 한다.

**store.js**에서는 store을 생성하며 action을 객체가 아닌 promise 혹은 함수 형태로 받을 수도 있기 때문에 이를 위해 redux-promise, redux-thunk 미들웨어를 연결해주었다.

확실히 직접 구조를 작성해보니 이해가 수월했고 처음에는 세부적으로 분리하여 작성하는 방식이 어렵고 복잡해보이기도 했는데, 직접 개발하면서 redux를 사용해보니 처음에 구조를 잘 작성해놓으면 추후에 사용하는 입장에서는 매우 간편하게 state를 업데이트하고 가져올 수 있다는 것을 직접 느꼈다! 또한 복잡한 구조로 인해 진입 장벽이 높아 기존에는 선호하지 않았었는데 한 번 더 사용해보고 싶을만큼 redux에 대해 좋은 경험을 한 것 같다.

### 그리드 뷰 및 정렬 기능

grid view는 `<GridView/>` 컴포넌트를 구현하여 완성했고, 처음에는 자주 사용하던 `flex`를 이용하여 구현했으나 `grid`로 구현해봐도 좋을 것 같다는 제안을 받아 `grid`를 이용해서도 구현해보았다.

정렬 기능은 컴포넌트를 많이 분리해서 개발하였는데, 각 컴포넌트의 용도는 다음과 같다.

- `<SortBar/>` : 정렬 기능 영역 컨테이너
- `<Selector/>` : 옵션 선택 버튼
- `<RadioOption/>`: custom radio 버튼
- `<SortModal/>` : 옵션 선택 버튼을 클릭했을 때 나타나는 옵션 목록 모달창
  컴포넌트는 `styled-components`를 활용하여 수월하게 만들 수 있었고, 컴포넌트가 많이 분리되었기 때문에 `sortOption` state를 review store에 추가하여 현재 선택된 옵션을 쉽게 제어할 수 있도록 했다.

# 🎃 Issue

### 렌더링 최적화

custom radio button을 구현해서 테스트해보니 불필요한 렌더링이 발생하는 것을 발견했다.  
예를 들어 1,2,3,4 와 같은 라디오 버튼이 있을 때, 현재 선택된 버튼은 1이고, 이 상태에서 4를 선택할 경우 1 => off, 4 => on 으로 1과 4 라디오 버튼만 재렌더링이 이루어져야 한다.  
하지만 모든 버튼이 재렌더링이 이루어지고 있는 것을 log를 남겨 확인했고 불필요한 렌더링을 해결하기 위해 `React.memo`와 `useCallback`을 사용하기로 했다.

`React.memo`는 현재 컴포넌트의 렌더링 결과를 메모이징(Memoizing)하기 때문에 이를 `<RadioOption/>` 컴포넌트에 적용하고, `<RadioOption/>` 컴포넌트를 클릭했을 때 현재 선택된 option state를 변경하는 함수를 `useCallback`으로 감싸서 `<RadioOption/>`의 props로 전달했다. 이렇게 되면 `useCallback`으로 감싼 함수는 재선언되지 않기 때문에(dependency 배열로 빈 배열 전달) `<RadioOption/>`의 props는 checked 값이 변하지 않는 이상 변경될 일이 없고 때문에 `<RadioOption/>`의 재렌더링도 `checked` props가 변경되었을 때만 일어나게 된다.

이번 에러 핸들링을 통해서 `React.memo`의 사용법, `useCallback`의 적절한 사용 위치 등을 경험해 볼 수 있었고, 실제로 log를 통해 불필요한 재렌더링을 막은 변화를 관찰할 수 있었기 때문에 보다 쉽게 이해할 수 있었다.

### 무한 스크롤 오류

모든 기능을 취합한 후, 무한 스크롤 부분에서 발생한 문제를 해결하기 위해 추가로 고민하게 되었다. 기존에 무한 스크롤 시 중복 값이 들어가는 문제가 있었고, 무한스크롤을 담당하신 팀원분께서 함께 고민을 요청해주셔서 무한 스크롤 코드를 수정하는 것으로 일부분 해결이 되었던 문제였다. 하지만 중복 key 문제가 계속해서 발생하였고 다른 팀원분께서 중복 값을 제거하는 코드를 추가로 작성하셔서 해결을 해두셨지만 근본적인 문제 해결방법을 해결하고 싶은 생각에 문제를 개인적으로 분석해보게 되었다.

#### 무한 스크롤 시에 target이 정상적으로 변경되지 않는 문제

중복 값 문제를 분석하다보니 무한 스크롤 시에 observer target이 정상적으로 변경되지 않는 문제가 있는 것을 확인하였다.이 문제로 인해 기존 타겟은 계속해서 화면을 벗어난 상태라 데이터를 추가하는 `getMoreItems()`가 순간적으로 많이 호출되었고 `pageNo` 값이 업데이트되기도 이전에 재실행되어 중복 데이터가 발생한 것이었다.  
![](https://images.velog.io/images/yeyo0x0/post/7ea35276-3730-45ce-85d5-26f64c7a74fd/image.png)

#### 문제 해결

위의 문제를 해결하기 위해 조치한 내용은 다음과 같다.

- 무한 스크롤 내부 코드의 `useEffect`의 `dependency` 배열로 `dataLength` 추가
  : 데이터가 추가되었을 때 새롭게 타겟을 재설정할 수 있도록 observer을 새로 설정하는 코드가 포함된 `useEffect` 훅의 `dependency`로 `dataLength`를 추가해주었다.
- 대용량 이미지 로딩 문제
  용량이 큰 이미지를 로딩 중일 때 제 영역을 차지하지 않아 실제로 목표 target이 렌더링된 후에는 화면 밖에 있음에도 이미지가 로딩 중일 때에는 화면 안에 있는 것으로 인식되는 문제로 인해 무한 스크롤 문제에 영향을 주었고 이를 해결하기 위해 image `max-width`, `max-height` 대신 고정적인 `width`,`height` 부여하여 이미지 로딩 속도를 단축하였다.

또한 위처럼 해결을 했으나 실제 크롤링을 통해 받아오는 데이터에서 중복된 데이터가 있어 팀원이 작성해두셨던 중복 제거 코드를 병행해서 사용하였다.

# 📝 Learned

### Redux

자바스크립트 상태관리 라이브러리

#### 관련 용어

- **store** : 상태가 관리되는 오직 하나의 공간
- **action** : 앱에서 운반할 데이터 ( 이 type의 액션에서는 이 payload를 전달한다)
- **reducer** : action은 reducer를 거쳐 store에 전달되고 reducer는 action을 확인하고 store의 상태를 업데이트한다.
- **dispatch**: 디스패치는 스토어의 내장함수 중 하나로 액션을 발생 시키는 함수
- **redux-thunk** : 객체 대신 함수를 생성하는 액션 생성함수를 작성 할 수 있게 해준다.
- **thunk**: 특정 작업을 나중에 하도록 미루기 위해 함수형태로 감싼것

Redux 구조를 직접 구현해보니 확실히 구현시에는 action, reducer, store 등을 분리하여 구현해주어야 하고 각각 구현해야 하는 코드가 많아 조금 어렵게 느껴지기도 했었는데, 한 번 구현해 놓은 것을 사용해보니 사용 면에서는 간편하다고 느꼈다. state 업데이트를 위해 사용하는 입장에서 처리해주었던 부분들을 action에 따라 reducer에서 내부적으로 처리하기 때문에 코드 관리에도 쉽고, 사용할 때에도 코드가 많이 단축될 수 있어서 편리했다.

# ❗️ Lacked

- Redux에 대해 좀 더 심화된 내용을 공부할 필요가 있을 것 같다. 구조에 있어서도 좀 더 효율적으로 작성할 수 있는 방법을 알아보고, 현재 코드를 어떻게 리팩토링 할 수 있을지도 고민해보자!

> 📖 참고

- [2-1. redux-thunk](https://redux-advanced.vlpt.us/2/01.html)
