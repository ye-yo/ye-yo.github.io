---
title: data fetching & filtering 구현 방식
categories: TIL
tags: [TIL]
excerpt: 데이터 feching과 filtering을 구현하는 다양한 방식
---

> 코드스테이츠 X 원티드 프리온보딩 FE 코스 study 자료를 바탕으로 정리하였습니다.

## data fetching 및 filtering을 구현하는 방식

1. 컴포넌트 내에서 필터링 : 전체 목록 데이터를 불러오고, 목록을 검색어로 filter하는 방법
2. 컴포넌트 외부에서 필터링 : 컴포넌트 외부로 API 요청을 할 때, 필터링한 결과를 받아오는 방법

### 1. 컴포넌트 내에서 필터링

- 처음 한 번, 외부 API로부터 데이터 목록을 받아오고 filter 함수를 사용해 필터링합니다.
  장점 : http 요청의 빈도를 줄일 수 있다.  
  단점 : 브라우저 메모리 상에 많은 데이터를 갖게되므로 클라이언트 부담이 늘어난다.  

### 2. 컴포넌트 외부에서 필터링

- 검색어가 바뀔 때마다, 외부 API를 호출합니다.
  장점 : 클라이언트가 필터링 구현을 고려하지 않아도 된다.  
  단점 : 빈번한 http 요청이 발생하며, 필터링을 처리하는 서버 부담이 늘어난다.  

### HTTP 요청 빈도 최적화 방법

- [throttle & debounce](https://dev.to/edefritz/throttle-a-series-of-fetch-requests-in-javascript-ka9)
  _(기업 과제 수행시 debounce를 구현해서 해결했었다)_  

- [HTTP Caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
  _(기업 과제 수행시에는 localStorage로 해결했는데 HTTP 캐싱 방식에 대해서도 알아봐야겠다)_  

\* 또한 필터링 시 toLowerCase로 변환해서 비교해야 한다는 점! 놓치지 말기  
