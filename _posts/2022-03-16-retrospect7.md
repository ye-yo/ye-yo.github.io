---
title: 기업 과제 7 | 데이터를 그래프로 표현 및 비교하는 서비스
categories: "원티드 프리온보딩"
tags: [원티드 프리온보딩, 회고록]
---

# 프로젝트 소개

> 💡 **주제** : 데이터를 그래프로 표현 및 비교하는 서비스<br>
> 🗓 **기간** : 03.14 ~ 03.16<br>
> 🔨**기술 스택** : Vue.js, SCSS, Chart.js<br>
> 💻 **담당** : 도넛 차트 구현<br>
> 👤 **참여 인원** : 5<br/>

**프로젝트 상세 설명**

> 사용자가 입력한 성향 진단 결과값을 기업 성향 진단 결과와 비교하여 그래프로 보여주는 서비스

#### 주요 기능 목록

- 추천 검색어 기반 검색창
- 펜타곤 차트
- 탭 클릭을 통한 차트 데이터 변경
- 바 차트
- 도넛차트(추가 구현)

# ⚙️ 기능 구현

일곱 번째 과제는 사용자가 입력한 성향 진단 결과값을 기업 성향 진단 결과와 비교하여 그래프로 보여주는 서비스를 만드는 것이었고, 내가 맡은 기능은 도넛 차트 구현이었다. 기능을 나누기 위해 토의하던 과정에서 분배할 기능이 모호하여 차트를 하나 더 추가하기로 했고, 내가 가장 마지막에 차트 구현에 참여하게 되어 나는 기존 요구사항의 차트 이외에 새로운 차트를 구현해보기로 했다.

### 차트 형태 및 주제 구상

다른 차트들의 경우 어떤 기업이 선택되는지에 따라 차트가 변경되어야 했고, 이에 따라서 새로 추가되는 차트 역시 기업 선택에 따라 동적으로 변화하는 것이 좋을 것 같다고 생각했다. 그래서 **선택한 기업과 유저 데이터의 매칭률**을 보여주는 도넛 차트 구현을 하기로 결정했다. 사실 구현 과정에서 기업 별 매칭 순위나 다른 주제도 생각해보았으나 도넛차트로 표현하기에 가장 좋은 주제라고 생각되어 결정하게 되었다. 도넛 차트를 선택한 이유는 다른 차트들과 중복되지도 않고 형태도 다른 차트들과 가장 차이가 나기 때문에 선택하게 되었다.

### chart 라이브러리 설치

이번 프로젝트는 다른 프로젝트와 달리 `Vue.js` 사용이 필수적이어서 `Vue.js`로 구현하게 되었고, 이전에 `Vue.js`를 사용해 개인적으로 to-do list를 구현해본 경험이 있어서 이번에 다시금 살펴보게 되었다. 차트를 구현하기 위해서 `chart.js` 라이브러리를 설치하려고 보니 `Vue.js`에서 사용하기 위해서는 추가적으로 `vue-chartjs`라는 라이브러리 설치가 필요했다. 하지만 사용해보니 `vue-chartjs`가 최신 버전의 `vue3`를 지원하지 않는다는 것을 알게되었고, 이를 해결하기 위해서는 **chart.js를 2.9.4 버전으로 낮추거나 vue-chart-3를 설치**해야 한다고 해서`vue-chart-3` 라이브러리를 사용하게 되었다.

- [Chart.js](https://www.chartjs.org/docs/latest/)
- [vue-chartjs](https://vue-chartjs.org/guide/)
- [vue-chart-3](https://vue-chart-3.netlify.app/guide/#introduction)

```bash
npm -i vue-chart-3 chart.js --save
```

### 도넛 차트 구현

도넛 차트 구현을 위해 우선 도넛 차트 컴포넌트를 생성하였고, 데이터는 상위 컴포넌트로부터 전달받아 사용하기 때문에 전달 받은 데이터를 이용하여 차트를 띄울 수 있도록 만들어야 했다. Vue.js는`setup` 이라는 Composition API를 사용하여 내부에서 `computed`,`watch` 메소드등을 모두 사용할 수 있었고, 이를 활용하여 기업 데이터가 변경될 때마다 매칭률을 계산하여 차트를 재렌더링 하도록 만들었다.
매칭률은 `a / b * 100`으로 계산할 수 있으므로 각 항목(aggressive, confident 등..)별로 계산한 뒤, `항목별 나눗셈 결과합 / 항목의 개수 * 100`과 같은 계산 방식으로 매칭률을 도출했다. 또한 사용자의 점수가 기업의 점수보다 높을 경우, 나눗셈 결과값이 1이 넘어 최종 매칭률이 100%가 넘을 수 있기 때문에 1이 넘어가는 값에 대해 값을 조정하는 등의 추가적인 연산을 거쳤다.

# 🎃 Issue

## 1) 코드 리팩토링

처음에 차트를 구현하기 위해서 [vue-chart-3 공식문서](https://vue-chart-3.netlify.app/guide/#introduction)를 살펴보았었고, 문서에는 아래와 같은 예제코드가 나와있었다. 하지만 나의 경우, `setup` 함수 내에서 동적으로 변경된 데이터를 어떻게 감지하는지 모르는 상태여서 익숙하지 않은 `setup()` 함수 대신 별도 `methods`를 생성하고, `watch` 훅에 변경되는 데이터의 업데이트 여부를 검사하도록 하여 그 때마다 차트 데이터 설정이 다시 이루어지도록 만들었다. 그런데 완성 후에 `setup` 함수가 궁금해져서 찾아보다가 새로운 사실을 알게되었고 이에 리팩토링을 진행하게 되었다.

```js
<template>
  <DoughnutChart :chartData="testData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { DoughnutChart },
  setup() {
    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    return { testData };
  },
});
</script>
```

이미 코드를 완성하긴 했지만 이번에 Vue3를 사용하였기 때문에 최신 버전의 장점을 활용해보자는 마음도 있었고, `setup` 함수의 기능 자체가 무척 흥미로워서 코드를 리팩토링해보게 되었다. 아래는 리팩토링 과정 및 `setup` 함수 관련하여 알게된 내용들을 정리해두었다.

### `setup` 함수

> Vue3부터 등장한 [Composition API](#composition-api)

- 기존 data, methods 등으로 흩어져 있었던 기능들을 하나로 모아 사용이 가능하다.
- 컴포넌트에서 사용하고자 하는 변수, 함수 등을 정의하여 객체로 returen 해주면 컴포넌트에서 변수, 함수 등을 접근 가능하다.

위에 작성해둔 내용처럼 setup`함수 내에서` `data`, `methods` 들을 모두 작성할 수 있으며, 뿐만아니라 라이프사이클 관련 함수 및 `computed`, `watch` 등의 함수도 모두 사용할 수 있다는 것을 알게되었다!

직접 구현해보니 `setup` 함수 내에서 `computed watch` 등의 함수 등을 사용하는 것은 무척 간단했고, 컴포넌트에서 사용할 데이터를 `ref`, `reactive` 로 선언하여 마지막에 return 해준다는 것이 중요하게 생각되었다.

### ref vs reactive

> `ref`와 `reactive`는 모두 변경사항이 추적되는 반응 개체를 만들기 위한 방식이다.
> 각각이 저장할 수 있는 데이터는 다음과 같다.
>
> **ref** : 숫자, 문자열, boolean 등
> **reactive** : object를 저장

또한 **ref**는 데이터 변경시 아래와 같이 `.value`로 접근해야 하며 컴포넌트에서 사용 시에는 `.value`를 생략가능하다.

```js
const count = ref(0);

count.value = count++;
```

## 2) 차트 반응형

차트가 윈도우 리사이징에 따라 줄어든 후 윈도우 사이즈가 확장되어도 다시 사이즈가 조정되지 않는 문제가 있었고 다른 팀원들의 차트에도 적용되는 공통적인 문제라 원인 분석 및 해결방법을 찾아보았다.
반응형을 위한 `responsive`값은 default가 `true`이기 때문에 문제가 없었으며 리사이징 시의 종횡비 유지 옵션인 `maintainAspectRatio`를 `false` 로 변경해주어야 한다는 것을 알게되었다. 종횡비 유지 옵션을 false로 설정할 경우 차트의 사이즈가 상위 컨테이너 요소의 사이즈에 따라 자동 조정되어 원하는 결과를 얻을 수 있었다.

# 📝 Learned

### CSS scoped

> `<style lang="scss" scoped>` style 옵션에 scoped 설정해주지 않으면 전역으로 스타일이 적용되기 떄문에 scoped 옵션을 주어야 해당 컴포넌트에만 스타일이 적용된다.(이 때 하위 컴포넌트에도 스타일이 적용되지 않는다!)

### Composition API

> 대규모 프로젝트에서도 코드의 재사용성 높이고 로직에 대한 관심사를 모으기 위해 추가된 API

- 기존 `mixin`을 사용하며 발생하던 namespace 충돌을 방지 가능
- 코드 로직에 대한 관심사에 한 곳에 집중되어 가독성이 높음

# ❗️ Lacked

- 도넛 차트로 표현하기 간단한 주제를 선정한 것이 아쉽다. 물론 제한된 데이터 내에서 표현할 수 있는 주제가 많지는 않았지만 좀 더 다채롭게 시각화할 수 있도록 구현했으면 좋았을 것 같다. 기존에 도넛, 막대, 레이더 차트의 경우는 chart.js로 구현해본 적이 있어서 다음 번에는 다른 차트를 구현해보거나 좀 더 섬세한 부분까지 다루는 차트를 구현해보고 싶다. 차트 옵션들도 좀 더 다양하게 설정하고 사용해보고 싶다.

> 참고

- [setup()](https://leestrument.tistory.com/entry/setup)
- [vue composition api 살펴보기](https://blog.woolta.com/categories/10/posts/202)
