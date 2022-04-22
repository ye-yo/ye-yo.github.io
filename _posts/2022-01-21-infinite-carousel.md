---
title: 무한 슬라이드 만들기 (infinite carousel)
categories: React
tags:
  [
    "React",
    "Carousel",
    "infinite carousel",
    "infinite slide",
    "wanted",
    "무한슬라이드",
    "기능구현",
  ]
---

<style>
  img{
  	width:100%;
  }
</style>

![](https://velog.velcdn.com/images%2Fyeyo0x0%2Fpost%2F4d1d2b25-2333-4b8e-a949-fbb800a4516d%2Fezgif-2-c26f8cda40.gif)

어느 날, 원티드 앱을 살펴보다 [원티드 프리온보딩 프론트엔드 코스] (https://www.wanted.co.kr/events/pre_onboarding_course_6) 모집 글을 보게 되었다. 코스에 참여하고 싶었지만 1주차 기간에 참여할 수 없을 것 같아 아쉽게도 신청은 하지않았고, 대신 신청 시에 함께 제출해야 하는 선발 과제가 흥미로워 나름대로 수행해보기로 했다.

[선발 과제](https://www.notion.so/X-9e8ff10dd1614112a81797219b7e6742)는 원티드 페이지 상단 영역을 React로 클론하는 것이었다. React를 공부하고 있는 중이어서 공부한 내용을 토대로 직접 구현해 볼 수 있는 좋은 기회라고 생각했다.

![원티드 상단 영역](https://images.velog.io/images/yeyo0x0/post/0b0f35a2-a55e-4799-b14a-6abe4933e606/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-21%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.06.22.png)구현해야 하는 것은 GNB,Slider(Carousel),반응형이었고 이 중 <b style="font-weight:bold; color:#ea4848">Slider는 라이브러리 없이 구현하는 것이 조건</b>이었다.
이전 프로젝트들에서는 `Slick` 라이브러리를 사용해 Slider를 여러 번 만들어보았지만 직접 만들어보는 것은 처음이었다. 하지만 라이브러리를 사용하면서도 직접 구현해보고 싶은 마음이 있었고 원리를 이해할 수 있는 좋은 기회인 것 같아 직접 구현해보기로 했다.

슬라이드의 기본 구조는 다음과 같다.

```js
function Slider() {
    const slides = ['#33a', '#8c9', '#f3e074'];

    return (
        <div className="slider-area">
            <div className="slider">
                <div className="slider-list">
                    <div className="slider-track">
                        {
                            slides.map((color, index) =>
                                <div key={index} className="slider-item" >
                                    <a>
                                        <div style={% raw %} background: color {% endraw %}>
                                            {index}
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div >
        </div >
    );
}
export default Slider;
```

# 1. 슬라이드 이동

<b style="color:#999999">🔑 KeyPoint : translateX & currentIndex</b>

가장 기본이되는 슬라이드 이동 함수를 만들어 보자.
현재 슬라이드를 중앙으로 이동시키기 위해서는 현재 슬라이드의 index를 저장할 state가 필요하며 css의 `transform: translateX()` 속성을 현재 슬라이드의 index에 따라 수정해주면 된다.

먼저 현재 슬라이드의 index를 저장할 `currentIndex` state를 생성한다.

```js
const [currentIndex, setCurrentIndex] = useState(0);
```

`currentIndex` 값에 따라 트랙의 x축을 위동하기 위해 `slider-track` element의 style 속성을 수정한다.

```js
<div className="slider-track"
 style={% raw %}transform: `translateX(${(-100 / slides.length) * (0.5 + currentIndex)}%)`{% endraw %}>
```

`translateX` 값은 원하는 슬라이드 레이아웃에 따라 계산방식이 달라질 수 있는데,
현재 슬라이드를 중앙정렬하고 싶다면 `slider-track`의 `left` style은 `50%`로 설정하고 위와 같이 작성하면 현재 슬라이드가 중앙에 위치하도록 할 수 있다.

## # translateX 값 계산

```js
translateX(${(-100 / slides.length) * (0.5 + currentIndex)}%)
```

여기서 translateX 값을 어떤 방식으로 계산했는지 설명해보자면, 우선 위의 계산 식은 아래 계산식과 동일하다.

```js
translateX(${-1 * ((100 / slides.length * 0.5) + (100 / slides.length * currentIndex))%)
```

이것은 `-1 * (슬라이드 한 개의 너비의 반) + (슬라이드 한 개의 너비 * 현재 슬라이드 index)`%만큼 이동해라 라는 의미이며 각 항목에 대한 설명은 아래와 같다.

- `-1 *` : 트랙의 기본 위치에서 왼쪽으로 이동시키기 위해서는 음수 값을 가져야 하기 때문.
- `100 / slides.length * 0.5(슬라이드 한 개의 너비의 반)`
  : 슬라이드 트랙은 슬라이드 개수 만큼의 width를 가지기 때문에 하나의 슬라이드는 결국 `트랙의 너비 / 슬라이드 개수`만큼의 width를 가진다. 예를 들면 4개의 슬라이드를 가진 트랙이 하나의 슬라이드 만큼 위치를 이동하려면 `100/4`% 즉 25% 만큼 이동해야 한다.
- `100 / slides.length * currentIndex(슬라이드 한 개의 너비 * 현재 슬라이드 index)`
  : 다음 슬라이드가 기준점(중앙)에 오도록 트랙을 이동하려면 슬라이드 한 개의 너비만큼 이동하면 되고, 예를 들어 `3번째 슬라이드(index는 2)`가 기준점에 위치하도록 하고 싶다면 첫번째, 두번째 슬라이드 만큼 트랙을 이동시켜야 3번째 슬라이드가 기준점에 올 수 있기 때문에 `currentIndex`값을 곱한다.

이렇게 하면 `currentIndex`값에 따라 슬라이드가 해당하는 만큼을 이동하게 된다.

# 2. 버튼 클릭 시 슬라이드 이동

1에서 슬라이드 이동을 위한 코드를 이미 작성해두었기 때문에 버튼 클릭 시에 슬라이드가 이동하도록 하려면 `currentIndex` 값만 변경해주면 된다.

```js
function handleSwipe(direction) {
  setCurrentIndex(currentIndex => currentIndex + direction)
}
return (
        <div className="slider-area">
            <div className="slider">
                <SlideButton direction="prev" onClick={() => handleSwipe(-1)} />
                <SlideButton direction="next" onClick={() => handleSwipe(1)} />
                <div className="slider-list" style={% raw %} padding: sliderPaddingStyle {% endraw %}>
                    ...
                </div>
            </div >
        </div >
    );
```

**SlideButton.js**

```js
import { ReactComponent as ArrowIcon } from "../../assets/icons/ic_arrow.svg";

export default function SlideButton({ direction, onClick }) {
  return (
    <button onClick={onClick} className={`btn-slide-control btn-${direction}`}>
      <ArrowIcon width="16" height="16" fill="#333" />
    </button>
  );
}
```

# 3. 자동 슬라이드

<b style="color:#999999">🔑 KeyPoint : custom setInterval()</b>

자동 슬라이드의 경우는 특정 시간마다 currentIndex 값을 변경해주어야 하는데 javascript에서는 `setInterval()` 함수를 써서 해결했으나 react에서는 원하는대로 동작하지 않는다. 이에 대한 사례와 원인 분석 및 솔루션에 대한 자세한 내용은 [React Hooks에서 setInterval() 사용 문제](https://velog.io/@yeyo0x0/React-React-Hooks%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EB%AC%B8%EC%A0%9C) 에 별도로 정리해두었다.

솔루션 코드는 아래와 같다.

```js
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";

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

function Slider() {
  ...
  useInterval(() => {
        setCurrentIndex(currentIndex => currentIndex + 1);
    }, 2000)
  ...
}
```

# 4. 무한 슬라이드

<b style="color:#999999">🔑 KeyPoint : cloned Slide & translateX on/off</b>

무한 슬라이드를 구현해보려고 했으나 방법이 떠오르지 않아 결국 여러 포스팅을 참고하여 원리를 알게되었다. 처음 로직을 봤을 때 단번에 이해하기 어려웠지만 구현하면서 점차 이해할 수 있었고, 혹시 나와 같은 어려움이 있으신 분들이 쉽게 이해하셨으면 하는 마음에 알게된 내용을 토대로 보다 이해하기 쉽게 설명해보려고 한다.

## # 이슈

먼저 무한 슬라이드로 보이도록 하기 위해서는 다음과 같아야 한다.

1. 첫번째 슬라이드의 이전 슬라이드는 마지막 슬라이드이다.
2. 마지막 슬라이드의 다음 슬라이드는 첫번째 슬라이드이다.

이를 구현하는 것은 조건문으로 해결할 수 있다.

```js
function handleSlide(index) {
  if (index < 0) {
    index = itemSize - 1;
  } else if (index > itemSize) {
    index = 0;
  }
  setCurrentIndex(index);
}

function handleSwipe(direction) {
  handleSlide(currentIndex + direction);
}
```

위와 같이 작성하면 첫번째 슬라이드에서 이전슬라이드로 이동시, 마지막 슬라이드에서 다음 슬라이드로 이동시 각각 마지막, 첫번째 슬라이드로 이동한다. 하지만 문제는 슬라이드 이동 효과였다! 끝과 끝으로 이동해야 하기 때문에 한 슬라이드씩 넘어가는 것처럼 보이지 않았다.
![](https://images.velog.io/images/yeyo0x0/post/2448e856-07ed-43b0-b439-8360afbee47e/ezgif-7-43a54d400c.gif)

## # 해결방법

<span style="font-size:40px">🤔</span> 그렇다면 끝과 끝 슬라이드로 이동 시 어떻게하면 한 슬라이드가 넘어간 것처럼 보이게 할 수 있을까?

이것은 약간의 속임수로 해결할 수 있다.
바로 양 끝에 복제 슬라이드를 두고 다음 슬라이드로 넘어가는 척하면서 실제 슬라이드 위치로 빠르게 이동하는 것이다. 단계를 구분하자면 다음과 같다.

1. 끝과 끝에 복제 슬라이드를 만들어 둔다.
2. 슬라이드 끝에서 다음 슬라이드로 이동시
   다음 슬라이드인 복제 슬라이드로 슬라이드 **효과와 함께 일단 이동**한다.
3. 슬라이드 효과가 종료된 즉시 실제로 이동해야 하는 슬라이드로 **효과 없이 이동**하여 순식간에 **현재 슬라이드를 대체**한다.

이해를 돕기 위해 슬라이드가 처리되는 화면을 촬영하여 첨부했다.

![](https://images.velog.io/images/yeyo0x0/post/4917b39b-0839-4eb5-a13c-03f69dadbd8f/ezgif-7-a5a5d1569b.gif)

슬라이드 중앙에 표시된 숫자들은 **`인덱스(슬라이드 인덱스)`**를 뜻하며 인덱스는 말 그대로 원본 데이터 배열에서의 인덱스이며, 슬라이드 인덱스는 슬라이드에 렌더링되고 있는 배열에서의 인덱스를 말한다.

gif의 마지막 부분을 보면 숫자가 **0(5)**에서 **0(2)**로 변하는 모습을 볼 수 있는데, 이는 무한 슬라이드에서 가장 핵심적인 부분을 알 수 있는 부분으로 5번째 슬라이드로 애니메이션 효과와 함께 이동 후 즉시 2번째 슬라이드로 이동한 것을 확인할 수 있다. 이 같은 처리는 **마치 마지막 슬라이드에서 첫번째 슬라이드로 자연스럽게 넘어가는 것과 같은 효과**를 준다.

## # 구현

### 1) 복제 슬라이드 추가

위에서 설명한 로직대로 무한 슬라이드를 만들어보자.
먼저 슬라이드 배열을 가공해주어야 한다.
기본적으로는 양 옆에 1개의 데이터를 더 추가해주면 되지만 나의 경우는 원티드 슬라이더 레이아웃과 동일하게 만들고자 했고, 원티드는 양 옆에 이전/다음 슬라이드의 일부가 보이기 때문에 슬라이드 배열 앞뒤로 2개의 슬라이드를 각각 추가해주어야 슬라이드가 전환될 때의 빈 공간이 보이지 않는다.
<span style="font-size:16px; color: #888;">(같은 방식으로 슬라이드 양끝에 2개의 슬라이드가 미리 보여야 한다면 배열 앞뒤로 3개의 슬라이드를 추가해주면 된다.)</span>

```js
const items = ["#33a", "#8c9", "#f3e074"];
let slides = setSlides();
const 양끝에_추가될_데이터수 = 2;

function setSlides() {
  let addedFront = [];
  let addedLast = [];
  var index = 0;
  while (index < 양끝에_추가될_데이터수) {
    addedLast.push(items[index % items.length]);
    addedFront.unshift(items[items.length - 1 - (index % items.length)]);
    index++;
  }
  return [...addedFront, ...items, ...addedLast];
}
```

array에서 앞 뒤로 2개의 데이터을 더 가져와 원본 배열과 합쳐 반환해주었으며 추가할 데이터 수보다 원본 배열의 데이터 수가 적을 경우를 대비해 위와 같이 작성해주었다.

### 2) index 재조정

```js
<div className="slider-track"
    style={% raw %}
       transform: `translateX(${(-100 / slides.length) * (0.5 + currentIndex)}%)`
    {% endraw %}>
    {
      slides.map((slide, slideIndex) => {
        const itemIndex = getItemIndex(slideIndex);
        return (
          <div key={slideIndex}
	    className={`slider-item ${currentIndex === slideIndex ? 'current-slide' : ''}`}
            style={% raw %} width: newItemWidth || 'auto' {% endraw %} >
            <a href="/">
              <div style={% raw %} background: items[itemIndex] {% endraw %}>
              	{itemIndex}({slideIndex})
              </div>
            </a>
          </div>
        )
      })
   }
</div>
```

양끝에 데이터를 추가하게되면 실제 item의 index와 slides에서의 index가 일치하지 않게되므로 rendering 시에 index 값을 재조정해주어야 한다.

```js
function getItemIndex(index) {
  index -= 양끝에_추가될_데이터수;
  if (index < 0) {
    index += itemSize;
  } else if (index >= itemSize) {
    index -= itemSize;
  }
  return index;
}
```

우선 데이터 배열 앞에 데이터가 추가되었으므로 index에서 추가된 데이터 수만큼 값을 빼주고 index가 item 배열의 index 범위를 벗어났을 경우 item 배열의 size만큼 더하거나 빼준다.

### 3) 슬라이드 대체 및 transition On/Off

index를 재조정 해주었다면 이제 복제된 슬라이드로의 이동 시 원본 슬라이드로 대체하는 처리를 해주어야 한다.

```js
const transitionTime = 500;
const transitionStyle = `transform ${transitionTime}ms ease 0s`;

function replaceSlide(index) {
  setTimeout(() => {
    setTransition('');
    setCurrentIndex(index);
  }, transitionTime)
}

function handleSwipe(direction) {
  let index = currentIndex + direction;
  setCurrentIndex(index);
  if (index < 양끝에_추가될_데이터수) {
    index += itemSize;
    replaceSlide(index)
  }
  else if (index >= itemSize + 양끝에_추가될_데이터수) {
    index -= - itemSize;
    replaceSlide(index)
  }
  setTransition(transitionStyle);
}

 return (
        ...
           <div className="slider-track"
               style={% raw %}
               transform: `translateX(${(-100 / slides.length) * (0.5 + currentIndex)}%)`,
            	transition: slideTransition
            {% endraw %}>
        ...
    );
```

`handleSwipe()` 함수에서는 이제 `currentIndex` 를 업데이트한 후 복제 슬라이드에 해당하는 index일 경우 매칭되는 슬라이드 index를 계산하여 `replaceSlide()`를 호출한다. `relaceSlide()` 함수는 transition animation 시간만큼 delay 후에 transition 속성을 잠시 없애고 `currentIndex` 를 원본 슬라이드 index로 업데이트한다. 없앤 transition 속성은 handleSwipe 함수 마지막 코드에 의해 다시 애니메이션이 적용된다.

# 완성된 슬라이드 화면

![](https://images.velog.io/images/yeyo0x0/post/4d1d2b25-2333-4b8e-a949-fbb800a4516d/ezgif-2-c26f8cda40.gif)

전체 코드는 [github](https://github.com/ye-yo/carousel)에 올려두었고 포스팅한 기능 외에 상황에 따라 자동 슬라이드를 멈추는 기능이나 마우스 및 터치로 슬라이드를 전환하는 기능 등도 확인할 수 있다.

## 느낀점

가장 먼저 항상 라이브러리를 사용해왔던 슬라이더를 직접 구현해보게 되어서 뿌듯하고 재미있었다. 자동 슬라이드를 구현하면서 React에서는`setInterval()`을 의도한대로 동작하게 하려면 다른 방법이 필요하다는 것을 알게되었고 이해한 내용을 토대로 별도 포스팅(+ 추가 [React Hooks에서 setInterval() 사용 문제](https://velog.io/@yeyo0x0/React-React-Hooks%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EB%AC%B8%EC%A0%9C))을 작성할 계획이다. 포스팅을 준비하면서는 어떻게하면 다른 사람이 봤을 때 이해하기 쉽게 코드를 바꿀 수 있을까를 계속해서 고민했었다. 그 덕분에 포스팅을 작성하면서도 계속해서 코드 리팩토링을 거쳐 보다 간결한 코드를 작성할 수 있었고 내가 작성한 계산식이나 코드에 대한 나의 이해도도 향상될 수 있어서 좋은 경험이었다.😊
