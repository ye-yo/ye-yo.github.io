---
title: Canvas & Keyframes
categories: TIL
tags: TIL
date: 2022-02-24 12:42:07 +0900
excerpt: Canvas와 Keyframes 개념 정리
---

# Canvas

- canvas는 엘리먼트를 DOM으로 조작하는 방식으로 작성되기 때문에 엘리먼트 선택시 id를 작성해주는 것이 좋음.

- canvas의 width, height를 inline으로 설정시 어떤 값이든 px로 인식
  `ex) width="50vw" => 50px`
- DOM으로 설정해주면 가능
  `ex) canvas.width = 50vw;`

#### Context

> 캔버스에 그래픽 작업을 할 수 있게해주는 여러 속성과 메소드들이 들어있는 객체

```js
const ctx = canvas.getContext("2d");
```

### 사각형 그리기

#### 색칠된 사각형

색칠 : `fillstyle` > `ctx.fillStyle = 'blue'`  
사각형그리기 : `fillRect` > `ctx.fillRect = (10,10,100,50)`

#### 선으로만 그리기

선 설정

```js
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
```

선 사각형 그리기 : `strokeRect` > `ctx.strokeRect(10,10,100,50)`  
사각형으로 지우기(가운데 영역 지울 때 등) : `clearRect`

```js
ctx.clearRect(20, 20, 80, 30);
```

### 캔버스로 클릭이벤트 만들기

캔버스에서의 마우스 좌표 : 화면에서의 마우스 위치 - 화면에서의 캔버스 위치

#### 마우스 위치

`event.clientX` `event.clientY`

#### 화면상 캔버스의 위치

`ctx.canvas.offsetLeft`  
`ctx.canvas.offsetTop`  
혹은 `event.offsetX` `event.offsetY`

#### 클릭한 위치에 사각형 그리기

```js
canvas.onclick = function (event) {
  const x = event.clientX - ctx.canvas.offsetLeft;
  const y = event.clientY - ctx.canvas.offsetTop;

  ctx.fillRect(x - 15, y - 15, 30, 30);
};
```

30,30 크기의 사각형 그리고 클릭한 위치의 정중앙에 위치할 수 있도록 width/2, height/2를 x,y에서 각각 빼준다.

# Keyframes

- `animation` : 띄어쓰기로 쭉 나열시 아래의 속성들을 한 번에 지정할 수 있음
  - `animation-name` : 애니메이션의 중간 상태를 지정하는 이름. @keyframes 블록에 작성
  - `animation-duration` : 한 싸이클의 애니메이션이 재생될 시간
  - `animation-delay` : 애니메이션 시작 지연 시간
  - `animation-direction` : 애니메이션 재생 방향
  - `animation-iteration-count` : 애니메이션의 반복 횟수
  - `animation-play-state` : 애니메이션을 재생 상태(멈춤,재생)
  - `animation-timing-function` : 상태 전환을 어떤 시간간격으로 진행할지
  - `animation-fill-mode` : 애니메이션이 재생 전 후의 상태 지정

\*animation-fill-mode

- `none` : 기본 값. 재생중이 아닌 경우 요소의 스타일을 유지
- `forwards` : 재생중이 아닌 경우 마지막 키프레임 스타일을 유지
- `backwards` : 재생중이 아닌 경우 첫 번째 키프레임 스타일을 유지
- `both` : 재생 전에는 첫 번째 키프레임 스타일! 재생 후에는 마지막 키프레임 스타일을 유지
