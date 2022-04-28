---
title: Thumbnail Maker 만들기 | velog 썸네일 생성기
categories: Toy
tags: [React, thumbnail maker, 썸네일 메이커, 토이프로젝트]
mode: immersive
header:
  theme: light
article_header:
  type: cover
  image:
    position: bottom
    src: https://images.velog.io/images/yeyo0x0/post/3251e97a-6016-4103-8f41-da37e4d33899/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-06%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%201.11.46.png
excerpt: 썸네일을 생성하는 도구를 만들어 보았다!
---

<style>
  img{
  	width:100%;
  }
</style>

## 1. 소개

> **Thumbnail Maker**  
> 빠르고 간편하게 썸네일 이미지를 만들 수 있는 사이트  
> [Thumbnail Maker 바로가기](https://ye-yo.github.io/thumbnail-maker/)  
> [Github](https://github.com/ye-yo/thumbnail-maker/blob/main/README.md)

## 2. 개발 동기

시작은 velog를 사용하면서 **썸네일 이미지의 필요성을 느끼면서부터**이다.  
원래 글을 작성할 때 썸네일을 신경쓰는 편이 아니었는데, 이번에 velog를 사용하면서 보니 카드형식의 포스트 목록에서는 썸네일 이미지가 있을 때 확실히 주제가 명확하게 보이고, 보기에도 좋다고 느꼈다. 그래서 썸네일 이미지를 등록해보기 시작했고, 아무렇게나 이미지를 올릴 경우 이미지 일부가 잘릴 수 있기 때문에 규격에 맞추어 이미지를 편집해 업로드해야 했다. 하지만 매번 썸네일을 만들려다보니 이조차도 여간 번거로운 일이 아니었다...😫 그러다 썸네일을 간편하게 만들 수 있는 사이트가 없을까 검색해보게 되었고 다양한 사이트가 이미 많았지만 `나의 필요에 맞는 썸네일 메이킹 툴`을 위해서 직접 만들어보기로 했다.

## 3. 디자인 및 기능 구상

### 3-1) 디자인 ✍️

처음에 대략적으로 화면 구성을 디자인해서 이를 바탕으로 개발에 들어갔다. 지금은 개발하면서 이것 저것 바뀌고 추가되기도 했고, 색상이나 배치를 고민해보면서 현재와 같은 디자인으로 완성되었다.

<figure>
  <img alt="초기 디자인 및 현재 디자인" src="https://images.velog.io/images/yeyo0x0/post/f5b84547-d9f0-4d00-aa78-8820ff658fb8/%E1%84%80%E1%85%B3%E1%84%85%E1%85%AE%E1%86%B8%204.png"/>
	<figcaption style="font-size:14px; textAlign: center;">초기디자인(왼쪽) 및 현재 디자인(오른쪽)</figcaption>
</figure>

### 3-2) 기능 🔧

가장 핵심적인 기능인 텍스트 입력, 이미지 생성 기능을 포함하면서도 직접 썸네일을 만들었을 때 필요했던 기능들과, 테스트해가면서 불편한 부분을 해소할 수 있는 기능들을 추가하여 최종적으로 아래와 같은 기능을 개발하게 되었다.

**1. Ratio** : 비율 조정 및 플랫폼 별 권장 비율(규격) 제공  
**2. Layout**: 다양한 종류의 레이아웃 템플릿을 통해 보다 빠르게 썸네일 제작 가능  
**3. Background** : 색상/그라데이션/이미지 배경 선택 및 랜덤 색상/그라데이션 적용 가능  
**4. Assets** :

- 텍스트/이미지 추가 및 사이즈/위치 조절 기능
- font style/size 선택
- 폰트 굵기, 밑줄, 그림자효과, 정렬, 색상, 배경색상 조절 가능

**5. Export** : 완성된 화면을 이미지로 export하여 다운로드 받을 수 있는 기능

## 4. 구현 🧑‍💻

![썸네일 메이커](https://images.velog.io/images/yeyo0x0/post/3251e97a-6016-4103-8f41-da37e4d33899/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-06%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%201.11.46.png)

![툴 이미지](https://images.velog.io/images/yeyo0x0/post/d313ca4f-6a9c-40f0-80f3-fee3464835b5/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-06%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%201.06.39.png)

### 4.1 Ratio - 비율 및 사이즈 조정 기능

![비율 조정 기능](https://images.velog.io/images/yeyo0x0/post/868f4aaa-4481-4f2a-b500-7aee28ede5d8/%E1%84%87%E1%85%B5%E1%84%8B%E1%85%B2%E1%86%AF.gif)

비율은 1:1, 4:3, velog, youtube 썸네일 비율(16:9)를 제공하고 있고, 클릭 시 해당하는 항목의 정해진 width, height에 맞게 현재 canvas 사이즈 state를 업데이트하도록 구현했다.

### 4.2 Layout - 레이아웃 템플릿 적용

![](https://images.velog.io/images/yeyo0x0/post/52ff155d-55f9-48ce-a1ac-53988d26f3d3/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%BA.gif)
총 10가지의 템플릿을 제공하고 선택한 템플릿 스타일에 맞게 canvas의 asset 목록이 변경되어 재렌더링 된다.

### 4.3 Background - 배경 변경 기능

썸네일 배경은 색상, 이미지 2가지 타입으로 변경할 수 있다.  
색상탭에서는 색상 및 그라데이션 배경을 적용할 수 있고, 기본적인 `colorList`를 제공하며 다양한 색상 선택을 위해서 [React-color](https://github.com/casesandberg/react-color) 라이브러리를 사용해 `SketchPicker`를 추가했다.

![그라데이션 편집](https://images.velog.io/images/yeyo0x0/post/9389fdb4-068e-4c76-8c0b-9ed2985718e5/%E1%84%80%E1%85%B3%E1%84%85%E1%85%A1%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%20%E1%84%91%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%B5%E1%86%B8.gif)
picker와 colorList는 서로 연동되도록 만들었다. colorList에서 색상을 선택하면 해당하는 색상으로 picker의 `rgba` 값이 변경되고, 반대로 picker의 rgba값을 변경하면 현재 선택된 색상이 picker에서 선택된 색상으로 변경되기 때문에 나만의 색상표를 만들어 여러가지 색상을 테스트해볼 수도 있다.

그라데이션은 간단하게 2가지 색상으로 그라데이션을 구성할 수 있게 만들었고, 색상 변경은 물론 `linear`, `radial`로의 형태 변경과 linear의 경우는 방향도 45도씩 변경할 수 있게 만들었다.

![랜덤색상/그라데이션](https://images.velog.io/images/yeyo0x0/post/33ac1553-13d2-4d4d-b9aa-a5bdf6e19db2/%E1%84%80%E1%85%B3%E1%84%85%E1%85%A1%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%A5%E1%86%B7.gif)
랜덤으로 색상과 그라데이션을 적용할 수 있는 버튼도 구현하였다.  
색상값은 테스트해보면서 80~240 사이의 숫자를 return하는 함수(`getRandNumber()`) 를 하나 만들었고 색상과 그라데이션 생성 함수를 각각 만들어 해당 함수에서 getRandNumber함수를 호출하도록 했다.

### 4.4 Assets - 텍스트, 이미지 추가 및 편집

![텍스트스타일수정](https://images.velog.io/images/yeyo0x0/post/5624d4bf-ac43-49a9-86a6-4067d76d51eb/%E1%84%91%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC.gif)
Assets 섹션에서는 텍스트와 이미지 같은 Asset을 추가하고 스타일을 수정할 수 있다.  
먼저 Text 탭에서 수정가능한 스타일 목록은 다음과 같다.

> 폰트, 글씨크기, 굵기, 밑줄, 글씨색상, 배경색상, 정렬, 그림자

폰트는 [눈누](https://noonnu.cc/index)라는 사이트에서 무료 폰트를 찾아볼 수 있었고, 그 중에서도 웹페이지에서 사용 및 웹사이트에 폰트를 탑재하는 것에 라이선스가 허용된 폰트들로만 목록을 구성하였다.

굵기, 밑줄, 그림자, 글씨 및 배경색상 버튼은 **체크박스**로 관리하여 체크 상태에 따라 현재 선택된 Asset의 `style state`가 변경될 수 있게 했고, 글씨색상과 배경색은 `checked` 상태일 때 React-color 라이브러리의 picker가 나타나고 `unchecked` 상태일 때 picker가 숨겨지도록 만들었다. 또한 도형이나 라인의 테두리 색상 및 배경색을 변경하고 싶을 때에도 이를 사용하면 된다.

템플릿 레이아웃 외에도 텍스트를 추가할 수 있도록 하기 위해 `title`, `sub title`, `text` 3가지의 에셋 추가 버튼을 만들어 두었다.

![Asset 이미지](https://images.velog.io/images/yeyo0x0/post/bd822945-8cf9-4585-a36f-6a5b14223846/Asset%20%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.gif)
이미지탭에서는 이미지를 업로드해 canvas에 추가할 수 있다. 썸네일 생성 시 아이콘이나 내용과 관련된 이미지를 추가하고 싶을 때가 있는데 이미지 에셋을 추가해 자유롭게 배치할 수 있다.

에셋의 배치 및 크기 조정은 [React-rnd](https://github.com/bokuweb/react-rnd) 라이브러리를 활용했다.

### 4.5 Export - 썸네일 이미지 생성

화면을 이미지로 내보내는 것은 이전에 사용해본 적이 있는 [html2canvas](https://github.com/niklasvh/html2canvas) 라이브러리를 사용했다.  
처음 사용 시에는 내가 작성한 css 코드로 인해 canvas에 추가된 asset들이 전혀 출력되지 않는 문제가 있었어서 라이브러리 적용에 문제가 있는 건가 싶어 비슷한 라이브러리인 [dom-to-image](https://github.com/tsayen/dom-to-image)를 사용해 보기도 했다.  
\_dom-to-image는 기본 코드로는 width, height가 canvas size 그대로 출력되어 화질이 저하되는 문제가 있는데 scale up을 해서 출력하는 과정을 추가하면 해결이 가능했다. html2canvas는 기본적으로 scale up해서 출력하는 것으로 보인다.  
아무튼 썸네일 메이커 완성 후 html2canvas가 왜 제대로 작동하지 않는 것인지 알아보려고 이것저것 시도해보다가 reset code로 작성했던 `img{ width:100%; height: 100%}` 코드가 문제라는 것을 찾아내어 다시 html2canvas로 변경해 export 기능을 완성하였다.

## 5. Issue 🤔

### 5.1 textarea 사용 문제

처음에 text asset을 `<textarea>` 태그로 구현했었다. 하지만 font-size에 맞게 자동으로 height가 조절되지 않아 Asset을 선택했을 때의 border가 딱맞게 표시되지 않았고, 이 때문에 text를 수정할 때마다 scrollHeight를 계산해서 height를 수정하는 함수를 만들어서 해결했었다. 하지만 div와는 다른 점이 조금씩 문제가 되어서 결국 div를 textarea처럼 구현하는 방법을 검색하게 되었고, [contenteditable](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/contenteditable) 이라는 html 속성이 있다는 것을 알게되었다! 너무나 간단한 해결방법을 지금까지 몰랐던 것에 반성했고 복잡한 함수 사용없이 간단하게 구현할 수 있었다.

### 5.2 React-rnd style 적용 문제

우선 수정되기 전의 레이아웃 템플릿과 텍스트 에셋의 경우 기본적으로 아래와 같은 데이터 구조를 가지고 있다.

```json
 {
        "name": "layout1",
        "layout": [
            {
                "type": "text",
                "name": "제목을 입력하세요",
                "style": {
                    "fontSize": "48px",
                    "fontWeight": "bold",
                    "color": "rgba(255,255,255,1)",
                    "top": "50%",
                    "left": "50%",
                  	"transform": "translate(-50%, -50%)",
                    "textShadow": "2px 2px 2px rgba(0,0,0,.5)"
                }
            }
        ]
    },
```

style 속성을 object 형태로 가지고 있기 때문에 레이아웃 템플릿을 선택하면 해당 템플릿에 해당하는 style object를 새로운 asset의 style 속성으로 적용시켜 주면 된다.  
하지만 react-rnd 라이브러리의 경우 `top`, `left` 값은 0으로 고정되어있고 `transform`으로 위치를 조정하며, `position` props를 주어 위치를 조정할 수 있지만 `%` 단위는 지원하고 있지 않았다. 때문에 에셋이 중앙, 혹은 % 단위의 위치를 가지도록 하기위해서는 이를 계산하는 함수가 필요했다.

먼저 style object에서 transform 속성은 없애고 top, left는 x, y로 대체했다. 데이터만 봤을 때에도 위치를 파악할 수 있었으면 해서 %단위는 그대로 사용하였다.

```json
{
  ...
  "style": {
    "fontSize": "48px",
    "fontWeight": "bold",
    "color": "rgba(255,255,255,1)",
    "x": "50%",
    "y": "50%",
    "textShadow": "2px 2px 2px rgba(0,0,0,.5)"
  }
},
```

style object를 변경한 다음에는 asset이 추가되어 첫 렌더링이 일어날 때 asset의 x,y 값을 재조정하는 코드를 작성했다. x,y 값을 %에서 백분율로 변경하고, transform 속성의 <span style="textDecoration: underline;">translate 값을 설정할 때와 비슷하게</span> `현재 canvasWidth * 백분율 - assetWidth / 2`와 같이 새로운 위치를 계산해서 변경해주었다.  
또한 캔버스 비율이 달라짐에 따라 에셋의 위치가 자동 조정될 수 있도록 `이전 캔버스 사이즈: 이전 위치 = 현재 캔버스 사이즈 : 현재 위치` 비례식을 세워 위치를 재조정하는 코드를 작성했고, 에셋의 정중앙을 기준으로 위치를 다시 잡아야하기 때문에 이전 x,y 값에 width, height 절반을 더해 중앙 위치를 기준으로 새 위치를 계산하고 계산된 값에 다시 width, height 절반을 빼 올바른 x,y 값을 가지도록 만들었다.

```js
const newX =
    ((currentStyle.x + currentStyle.width / 2) * canvasSize.width) /
    prevCanvasSize.width,
  newY =
    ((currentStyle.y + currentStyle.height / 2) * canvasSize.height) /
    prevCanvasSize.height;
```

## 6. 후기 🥲

React를 공부하고자 Thumbnail Maker를 React로 개발하게 되었지만 완벽하게 이해하지 못한 상태에서 개발하다 보니 코드가 점점 복잡해졌었다. 하지만 만들면서 `useState, useEffect`를 다양하게 활용해볼 수 있어 점차 원리를 이해할 수 있는 계기가 되었고 개발이 진행됨에 따라 끊임없이 코드를 리팩토링할 수 있었다. 또한 다양한 React 컴포넌트 스타일링 방식을 사용해보고 싶어서 이번 프로젝트에서 `Sass`를 처음으로 사용해보았고, Nesting(중첩), Ampersand(상위 선택자 참조), Mixin, Extend 등의 편리한 기능들을 경험해 볼 수 있었다.

처음에는 간단하게 만들고자 시작했지만 <span style="backgroundColor:rgb(136 207 181 / 17%)">나조차 쓰고 싶지 않은 서비스를 다른 사람들이 과연 사용할까?</span> 하는 마음에 끊임없이 테스트해가면서 기능을 추가했던 것 같고, 좀 더 간편하게 썸네일을 만들고자 하는 마음에 마지막에는 다양한 템플릿 제공 기능을 추가하기도 했다(지금도 사용할 때 가장 마음에 드는 기능이다🤍). 계속해서 수정을 거듭했지만 아직도 디자인이나 기능 면에서 아쉬운 점이 많다. 지금도 사용하다보니 자동 중앙정렬 기능을 추가하고 싶다...는 생각도 들긴하지만 우선은 현재 버전으로 마무리하려고 한다!

[Thumbnail Maker](https://ye-yo.github.io/thumbnail-maker/)
