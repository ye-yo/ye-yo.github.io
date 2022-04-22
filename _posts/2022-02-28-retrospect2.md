---
title: 기업 과제 2 | 상품 검색 및 상품 뷰어
categories: "원티드 프리온보딩"
tags: [원티드 프리온보딩, 회고록]
---

# 프로젝트 소개

![](https://images.velog.io/images/yeyo0x0/post/a34fee80-3071-45ad-893b-dd7cc1b0da4a/image.png)

> 💡 **주제** : 상품 검색 및 상품 뷰어<br>
> 🗓 **기간** : 02.24 ~ 02.25<br>
> 🔨**기술 스택** : React, react-router-dom, tailwind<br>
> 💻 **담당** : 메인 검색 기능 구현 및 검색 결과 필터링<br>
> 👤 **참여 인원** : 7

**프로젝트 상세 설명**

> 이미지url/제품코드/키워드로 상품 검색이 가능하며
> 상품 목록에서 정보 확인 및 카테고리를 태그 형식으로 확인할 수 있습니다. 또한 각각의 상품을 클릭 시 그와 관련된 추천 상품 목록을 제공.

#### 주요 기능 목록

- 검색 기능 & 검색 결과 캐싱
- 검색 결과 목록 페이지
- 제품 상세와 태그 및 추천 제품 목록 페이지
- 로딩중
- 에러 처리

# 기능 구현

두 번째 과제에서 맡은 역할은 메인 검색 기능 구현 및 검색 결과 필터링 구현이다.

### 검색어 타입 판별

검색 기능의 경우 `url/제품코드/키워드`에 따라 다른 다른 페이지로 이동해야 해서 이를 처리해주어야 했다. 그래서 검색어 입력시 검색어의 타입을 판단하여 `url/제품코드/키워드`로 구분하였으며 각각에 따라 필터링을 다르게 적용하여 관련 검색결과가 적용되도록 했다. 검색어 타입을 판단하는 것은 `getWordType` 함수를 만들어 처리했으며 아래와 같이 구현하였다.

```js
const checkUrl = /^http[s]?\:\/\//i;
const getWordType = (value) => {
  if (isNaN(value)) {
    if (checkUrl.test(value)) return "image_url";
    else return "name";
  }
  return "product_code";
};
```

제품 코드의 경우 숫자로 이루어져 있어서 `isNaN` 메소드로 구별하고, url의 경우는 정규식을 활용하였다.

### 검색 결과 필터링 및 페이지 이동

또한 검색결과 필터링 및 페이지 이동 처리는 다른 페이지에서도 사용할 수 있도록 커스텀 훅으로 분리하여 개발했다. `useSearch`란 훅의 search 함수를 호출하여 검색어를 전달할 수 있으며, 전달된 검색어는 검색어의 타입(`url/code/키워드`)을 판단하여 각각에 맞게 필터링을 진행 후 데이터를 업데이트하고 페이지를 이동한다.

```js
if (type === "name") {
  setSearchResult(targetSearchResult);
  storedSearhDatas(word, targetSearchResult, []);
  navigate(`/keyword/${word}`);
}
```

이미지 url 및 제품코드를 검색 시에는 다음과 같은 과정을 따른다.

1. 제품 상세 데이터를 `fetch`하여 일치하는 제품 데이터 찾기
2. `searchResult` 값을 현재 제품 데이터로 업데이트
3. 제품 데이터와 연관있는 추천 데이터 필터링 및 `recommendList` 업데이트
4. 현제 제품 데이터 및 검색 키워드, `recommendList` 정보를 `localstorage`에 저장
5. product 페이지로 이동

## Issue

### 새로고침 시 데이터 유지 문제

검색을 통해 이동한 페이지에서 새로고침했을 경우 state가 초기화되어 페이지가 오류나는 문제가 있었다. 이를 해결하기 위해 검색 키워드 및 검색 결과를 캐싱하는 `useSearchRecords`란 `커스텀 훅`을 만들었다. 커스텀 훅을 사용하여 state의 초기값 설정 시 `localstorage`에 현재 url 파라미터에 해당하는 데이터의 정보가 있을 경우 `searchResult` 및 `recommendList` 값이 해당 값으로 초기화 되어 새로고침 시에도 데이터가 유지되도록 하였다.

```js
import { useState, useEffect } from "react";

export default function useSearchRecords(key, initialValue = []) {
  const pathName = window.location.pathname;
  let id = null;
  if (pathName) {
    id = pathName.split("/");
    id = id.length > 2 ? id[2] : 0;
  }

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem("search");
    try {
      const parsedValue = JSON.parse(storedValue);
      if (parsedValue) {
        if (parsedValue.keyword == id) return parsedValue[key] || initialValue;
      }
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }, [value]);

  return [value, setValue];
}
```

### 이미지 URL을 라우팅 파라미터로 사용시 문제

기존에 구현되어 있던 라우팅 방식이 파라미터를 사용하는 방식이어서 이 방식을 그대로 사용하여 검색 결과에 따라 라우팅 파라미터를 동적으로 변경해주었는데, 이 때 이미지 URL의 경우 url형식이라 정상적으로 라우팅되지 않는 문제가 있었다. 이를 해결하기 위해서 처음에는 `encodeURIComponent`로 url을 인코딩하여 전달해주었었다.

```js
word = encodeURIComponent(word);
```

하지만 이 방식이 맞는지에 대한 의구심이 계속해서 들었고, 이에 구글 검색창이 어떤 방식으로 라우팅을 처리하는지 살펴보았더니 `query string` 방식으로 전달하는 것을 보게 되었고, 그제서야 `query string`으로 전달하면 되겠다는 생각에 라우팅 방식을 변경하였다.

```js
path = `/product?q=${word}`;
```

## 📝 Learned

### tailwind 사용

이번에 처음 tailwind를 사용하게 되어 처음에 어려움이 있었으나 docs를 확인해가며 조금씩 개발해나갔다.
처음에는 `min-h-0` 과 같은 클래스네임 속 숫자 부분에 내가 원하는 값을 넣으면 바뀔 것이라 생각했는데 docs를 보니 지원하는 값이 정해져있었고 이 외에는 직접 `min-h-[90vh]`와 같이 작성해야 한다는 것을 알게되었다.

### creat-react-app 이 아닌 환경에서의 환경변수 설정

url을 환경변수로 관리하기 위해서 .env 파일을 생성해주었으나 process가 undefined로 뜨는 문제가 발생했다. 평소에는 큰 설정없이 사용했었기 때문에 원인을 쉽게 찾을 수 없었는데, 알고보니 create-react-app을 통해 생성한 것이 아닌 웹팩을 직접 설정했을 경우 환경변수 설정 방법이 달랐다. 그 중에서도 `dotenv`를 설치하여 `webpack.config.js`에 `DefinePlugin`을 활용하여 `process.env`라는 전역변수를 정의해주는 것으로 해결하였다.

\*DefinePlugin = 전역 상수를 만들 수 있는 플러그인

### 배포 후 새로고침 시 404 문제

배포 후에 새로고침 혹은 주소창 통해 진입시 404 오류나는 문제가 있었다. 이를 위해서 webpack과 배포시에 사용한 netlify 설정을 변경해주었다.
먼저 webpack은 `webpack.config.js` 파일에서 `publicPath`를 설정해주었다.

```js
//webpack.config.js
...
module.exports = {
  output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
    },
  ...
}
```

netlify의 경우에는 netlify.toml 파일을 생성하여 아래와 같이 `redirect` 설정을 추가해주면 된다.

```js
[[redirects]];
from = "/*";
to = "/";
status = 200;
```

## ❗️Lacked

- localStorage에서 빈 값을 저장하고 있거나 더 이상 필요하지 않는 값이 저장되고 있는 것을 처리할 수 있도록 구현해보면 좋을 것 같다는 피드백을 받았다.
- tailwind의 유용한 기능들을 좀 더 다양하게 사용해보았으면 좋았을 것 같다.
- custom hook을 만들면 좋은 경우와 그렇지 않은 경우, 그리고 그렇게 구현했을 때의 이점을 생각해봐야 할 것 같다.
