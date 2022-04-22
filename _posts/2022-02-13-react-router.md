---
title: React Router
categories: React
tags: [React, React Router]
---
> React Router를 사용해보기 전, 간단하게 사용방법을 익히고 시작하고자 작성하게되었으며, React v18과 react-router v6를 기준으로 작성하였다.
내용은 기본적으로 공식문서를 참고하였고 추가적인 이해를 위해 다양한 글을 참고하여 정리하였다.<br>
**참고자료 **
[React Router 공식문서](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
[velopert님 벨로그 포스트 - React Router v6 튜토리얼](https://velog.io/@velopert/react-router-v6-tutorial)
[곰돌찌님 tistory 포스트 - [React-Router] v6로 적용하기](https://devalice.tistory.com/112)

## 0. React Router란
React를 위한 클라이언트 및 서버 측 라우팅 라이브러리로, 컴포넌트 기반으로 라우팅 시스템을 설정할 수 있다. React는 SPA(싱글 페이지 애플리케이션)이기 때문에 리액트 라우터와 같은 라우팅 시스템을 통해 한 페이지에서 경로에 따라 여러 개의 페이지를 보여줄 수 있게 된다.


## 1. 설치
```shell
npm install react-router-dom@6
```

## 2. 사용해보기 - 기본 기능
### 1) 프로젝트에 라우터 적용 - BrowserRouter로 감싸기
src/index.js 파일에서 react-router-dom의 내장 컴포넌트인 `BrowserRouter`로 `<App/.>`을 감싼다.
`BrowserRouter` 컴포넌트는 HTML5의 History API를 사용해 페이지를 새로 불러오지 않고도 주소를 변경하고, 현재 경로에 관련된 정보를 리액트 컴포넌트에서 사용할 수 있게 해준다.
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
```

### 2) 페이지 컴포넌트 생성
src/pages 디렉토리에 각 페이지에서 사용할 컴포넌트를 생성한다.
(페이지 컴포넌트는 src/routes 혹은 src에 바로 생성하기도 한다.)

src/pages/Home.js
```js
function Home {
  return (
    <div>
      <h1>홈</h1>
    </div>
  );
};

export default Home;
```
### 3) 경로와 컴포넌트 연결
경로에 따라 특정 컴포넌트를 띄우기 위해 `Route` 컴포넌트를 통해 라우트설정을 해주어야 하며, `Route` 컴포넌트는 `Routes` 컴포넌트 내부에서 사용해야 한다.

```js
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
```

### 4) 링크 추가
웹페이지에서 nav를 만들 때 `a`태그 이용해 경로를 변경하는 것처럼 react-router는 `Link` 컴포넌트와 `to` props를 이용해 이를 구현할 수 있다.
(React에서 `a`태그를 사용하면 페이지 이동 시 페이지를 새로 불러오기 때문에 `a`태그를 사용하지 않는다.)
예를 들어 메뉴를 만든다면 아래와 같이 작성
```js
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div>
      <nav
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}
```
Link는 페이지를 다시 로드하지 않고 URL을 변경한다.

### 5) URL 파라미터와 쿼리스트링
**URL 파라미터** : 
- 예시) `/profile/yeyo`
- 경로 뒤에 문자를 바로 작성. 
- ID나 이름을 사용해 특정 데이터를 조회할 때 사용

**쿼리 스트링**: 
- 예시) `/list?page=1&keyword=react`
- `?` 뒤에 `key=value` 형태로, 또 `&`으로 구분하여 작성. 
- 데이터 조회에 필요한 옵션 전달 시에 사용 - 키워드 검색, 페이지네이션, 정렬 방식 등

#### 5-1) URL 파라미터 사용
`Route` 컴포넌트 `path`를 아래와 같이 작성 파라미터를 전달할 수 있게 설정.
```js
 <Route path="/profiles/:id" element={<Profile />} />
```
/profiles 경로 뒤에 어떤 값이 오면 Profile 컴포넌트가 렌더링된다.

#### 5-2) 쿼리스트링 - useLocation
쿼리스트링은 별도의 작업은 필요없고, 대신 쿼리스트링을 읽어오기 위해서는 `useLocation`이라는 Hook을 사용해야 한다.
`/location?page=1&keyword=검색어`
```js
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();

  return (
    <div>
      <h1>소개</h1>
      <p>쿼리스트링: {location.search}</p> 
    </div>
  );
};

export default About;
```
`useLocation`을 통해서는 아래와 같은 값들을 얻을 수 있다.
- pathname: 현재 주소의 경로(쿼리스트링 제외)
- search : 맨 앞의 `?`를 포함한 쿼리스트링 값 ex) `?page=1&keyword=검색어`
- hash : `#`문자 뒤의 값
- state : 페이지 이동 시 임의로 넣을 수 있는 상태 값
- key : location 객체의 고유 값. 초기값은 default이고 페이지가 변경될 때마다 고유 값이 생성됨.

react-router v6부터는 [useSearchParams](#5-쿼리-스트링-파싱---usesearchparams)라는 Hook을 통해 쿼리스트링 파싱 기능도 지원한다.


### 6) 중첩 라우팅 
중첩 라우팅은 Route 컴포넌트에 의해 렌더링되는 컴포넌트를 두 개 이상 동시에 렌더링 한느 것이다. 예를 들면 게시글과 함께 게시글의 댓글, 혹은 게시글 목록을 함께 보여주는 경우가 될 수 있다.

중첩 라우팅을 위해서는 Route 컴포넌트에 의해 렌더링된 컴포넌트 내에서 Route 컴포넌트를 구현해주면 된다. (컴포넌트의 children과 비슷한 개념으로 중첩이 가능)
```js
    <Routes>
      <Route path="/main" element={<Main />}>
        <Route path="about" element={<About />} />
        <Route path="articles" element={<Articles />} />
      </Route>
    </Routes>
```
위와 같이 작성하면  about과 articles 경로는 `/main/about`, `/main/articles` 로 라우팅된다.

또한 중첩된 컴포넌트를 렌더링하기 위해서는 `Outlet`컴포넌트를 사용해야 한다.
```js
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <header>헤더</header>
      <Outlet />
    </div>
  );
};

export default Articles;
```
위와 같이 작성하면 `/main/about`, `/main/articles`에 해당하는 컴포넌트들이 `Outlet` 위치에 렌더링된다.
이것은 공통 레이아웃이 필요할 경우에도 유용하게 사용할 수 있다.

### 7) 인덱스 라우트 - index props
인덱스 라우트는 기본 경로라고 생각할 수 있고 `path="/"`와 동일한 의미를 가지며, 상위 라우트 경로와 일치하는 경로의 경우 path 대신 `index` props만 간단하게 전달하면 된다.
```js
<Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>
</Routes>
```
그러면 `"/"`경로에서는 `Home` 컴포넌트가 렌더링된다.

## 3. 사용해보기 - 부가 기능
### 1) NotFound 페이지 설정
어떠한 경로와도 일치하지 않을 때(페이지를 찾을 수 없을 때) 컴포넌트를 렌더링하도록 하고싶다면 `path` props의 값을 `"*"`으로 설정하면 된다. `<Route path="*"element={<NoMatch/>}`와 같이 작성하면 어떠한 경로와도 일치하지 않을 경우 `NoMatch` 컴포넌트가 렌더링된다.
```js
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="*"element={<NoMatch/>}
    />
  </Route>
</Routes>
```
### 2) history.back()처럼 페이지 이동 - useNavigate
`Link` 컴포넌트를 사용하지 않고 다른 페이지로 이동하고 싶으면 `useNavigate` 훅을 사용하면 된다. history.back 과 유사하게 동작하며 추가, 삭제와 같은 작업 후 이전 페이지로 이동하고 싶을 때에도 유용하게 사용할 수 있다.
```js
import { Outlet, useNavigate } from 'react-router-dom';

fucntion Home = () => {
  const navigate = useNavigate();
  ...
}
```
- 이전 페이지로 이동
```js
navigate(-1);
```
- 앞 페이지로 이동
```js
navigate(1);
```
- 특정 경로로 이동
```js
navigate('/about');
```

또한 location.replace()와 같이 history를 남기지 않고 다른 페이지로 이동하려면 `replace` 옵션을 `true`로 설정하면 된다.

```js
 navigate('/about', { replace: true });
```
### 3) 페이지 리다이렉트 - Navigate
페이지를 리다이렉트 하고 싶을 때는 `Navigate` 컴포넌트를 사용한다.
```js
import { Navigate } from 'react-router-dom';

const MyPage = () => {
  const isLoggedIn = handleLogin();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>마이 페이지</div>;
};

export default MyPage;
```
로그인 상태를 체크하는 `handleLogin()` 함수가 있다고 가정하고 로그인 상태가 아닐 경우에 이동할 페이지 컴포넌트를 `Navigate`를 이용해 지정한다.
여기서 `replace` props는 history를 남기지 않고 이동하고 싶을 경우 사용한다.

### 4) 활성 링크 - NavLink
nav 메뉴에서 메뉴를 클릭했을 때 현재 경로에 해당하는 메뉴가 활성화되었다는 스타일을 부여하고 싶다면 `Link`대신 `NavLink`를 사용하면 된다.
`NavLink`는 style이나 className 작성시 `isActive`라는 boolean 값을 참조할수 있고 `isActive` 값에 따라 스타일이나 className을 부여하면 된다.
```js
const activeStyle = {
  color: 'blue',
};
...

return (
  ...
<NavLink 
	to="/articles"
	style={({ isActive }) => (isActive ? activeStyle : undefined)}
>
  메뉴3
</NavLink>
...
);
```

이렇게 되면 isActive 값에 따라 style을 부여하는 코드가 각 NavLink마다 반복되므로
NavLink를 감싼 또 다른 컴포넌트를 만들어 작성하는 것이 좋다.
```js
const Menu = () => {
  return (
    <ul>  
      <MeunuItem page={about} />
      <MeunuItem page={contact} />
    </ul>
);
};

const MenuItem = ({page}) =>{
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };
  return (
    <li>
      <NavLink
        to={`/${page}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        메뉴 {page}
      </NavLink>
    </li>
  );
};
```

### 5) 쿼리 스트링 파싱 - useSearchParams
쿼리 스트링을 가져와 파싱하고 싶은 경우`useSeachParams`를 사용하면 된다. 
`useSearchParams`는 현재 URL에서 쿼리 문자열을 읽고 수정하는데 사용된다. 배열을 반환하며 첫번째 원소는 쿼리파라미터를 처리하는 메서드들이 담긴 객체이며, 두번째 원소는 쿼리파라미터를 업데이트하는 함수이다.
`const [searchParams] = useSearchParams();` 와 같이 선언할 수도 있다.
```js
import { useSearchParams } from 'react-router-dom';

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');
  ...
};
```

이 때 쿼리 스트링을 조회하면 문자열 타입으로 반환하기 때문에 값을 비교할 때에는 아래와 같이 값을 조정한 후에 비교해야 한다.

- boolean => `'true'` 같이 `'`따옴표로 감싸서 비교
- 숫자 => `parseInt` 사용해 숫자타입으로 변환해서 비교
```js
detail === 'true' ? false : true 
```
```js
mode === null ? 1 : parseInt(mode) + 1;
```

#### * useParams
`useParmas`가 명칭이 비슷해서 헷갈렸는데, `useParams`는 현재 URL에서 동적 파라미터의 key/value 개체를 반환하는 Hook이다. (자식 경로의 경우, 부모 경로의 모든 파라미터를 상속한다.)
```js
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // userId라는 파라미터 값 참조
  let { userId } = useParams();
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
```



