---
title: 기업 과제 5 | 간병인 신청 정보 등록 서비스
categories: "원티드 프리온보딩"
tags: [원티드 프리온보딩, 회고록]
---

# 프로젝트 소개

> 💡 **주제** : 간병인 신청 정보 등록 서비스<br/>
> 🗓 **기간** : 03.08 ~ 03.09<br/>
> 🔨**기술 스택** : React, styled-components<br/>
> 💻 **담당** : 공통 컴포넌트 및 주소 입력 페이지 구현<br/>
> 👤 **참여 인원** : 6

**프로젝트 상세 설명**

> 간병인을 찾기 위해 돌봄 유형, 스케줄, 주소, 연락처 등의 정보를 입력하여 간병인 신청 정보를 등록하는 서비스

#### 주요 기능 목록

- 시작 화면
- 돌봄 유형 선택
- 스케줄 입력 및 캘린더 통한 기간 선택
- 주소 검색 및 상세 주소 입력
- 신청 정보 확인 및 전화번호 인증
- 신청 완료 화면

# 기능 구현

다섯 번째 기업 과제에서는 공통 컴포넌트인 Step, Footer 컴포넌트 구현 및 주소 입력 페이지 구현을 담당했다. 이번 과제에서는 상태 관리를 위해 별도 라이브러리 설치 없이 `Context API`를 사용하게 되었고 스타일 작성에도 가장 익숙한 `styled-components`를 사용하였다.

### Step 컴포넌트

step 컴포넌트는 현재 step에 따라 내용이 다르게 렌더링 될 수 있도록 Context API로 `StepContext`를 생성하여 현재 step `number` 업데이트할 수 있게 했다. 또한 전체 스텝 페이지가 모두 동일한 레이아웃은 아니기 때문에 footer 숨김여부, title 숨김여부를 `hideFooter`, `hideTitle` 로 전달할 수 있게 하여 페이지 별로 레이아웃을 다르게 구성할 수 있게 했다.

```jsx
export const StepContext = createContext({
  currentStep: {
    totalStep: 0,
    number: -1,
    hideFooter: false,
    hideTitle: false,
    hideHeader: false,
  },
  setCurrentStep: () => {},
});
```

이번 프로젝트에서는 router를 사용하지 않기로 해서 router 없이도 페이지 전환이 가능하도록 구현이 필요했다. 이에 step이란 컴포넌트 배열을 만들어서 step 페이지를 순서대로 저장해두고, 렌더링 시에는 `currentStep` state의 `number` 값에 따라 해당하는 컴포넌트가 렌더링 될 수 있게 했다.

```jsx
{
  currentStep.number < 0 ? (
    <FirstPage />
  ) : (
    <Step>{step[currentStep.number]}</Step>
  );
}
```

### Footer 컴포넌트

footer 컴포넌트는 이전, 다음 스텝으로의 페이지 전환과 버튼 활성화/비활성화 기능을 구현해야 했다. 이를 위해서 footer 컴포넌트 내부에서 button click 이벤트를 구현하였고 버튼을 활성화 시킬지 여부는 각각의 페이지에서 처리할 수 있도록 하기 위해서 `FooterContext`를 생성했다.

```jsx
export const FooterContext = createContext({
  activeNext: false,
  setActiveNext: () => {},
});
```

### SearchBox 컴포넌트 및 주소 입력 페이지

`<SearchBox/>` 컴포넌트는 주소 입력 페이지 및 검색 페이지에서 활용되어 컴포넌트로 분리하여 구현했다. 다만, 주소 입력 페이지에서는 입력을 막고 클릭시 modal창이 오픈되도록 해야 했기때문에 `readonly` props 및 `handleBoxClick()` 메소드를 전달받아 처리하도록 만들었다. 주소 입력 페이지는 주소 및 상세 주소가 모두 작성되었는지 확인하여 footer의 `activeNext` 값을 `true/false`로 처리했다. 또한 주소 값이 있을 경우에는 재검색 버튼이 나타나도록 만들었다.

### 신청 내역 데이터 표시

추가적으로 코드들을 병합하며 미구현된 부분을 구현하였다. 각 스텝 별로 사용자가 작성한 내용을 마지막 페이지에서 정리하여 표시를 해주어야 하기 때문에 `ApplymentBriefContext`를 추가하여 각 스텝마다 해당 context를 업데이트하도록 만들었다.
마지막 페이지에서는 이 context의 데이터를 가져와 다양한 파싱 함수를 거쳐 렌더링 하도록 만들었다.
(각 스텝에서 파싱해서 저장하지 않은 이유는 Issue에서 설명할 뒤로가기 시 데이터 유지 문제를 해결하기 위해서이다.)

```jsx
const schedule = useMemo(() => {
    const schedule = applymentBrief?.schedule;
    if (!schedule) return {};
    const formattedSchedule = {
      startDate: formatDateKorean(schedule.startDate),
      endDate: formatDateKorean(schedule.endDate),
      visitTime: schedule.visitTime,
      hour: schedule.hour,
    };
    return formattedSchedule;
  }, [applymentBrief?.schedule]);

   ...
  return (
    <PageContainer>
      ...
      <Body3>돌봄 일정</Body3>
      <DetailContainer>
        <Body4>
          {schedule.startDate} ~ {schedule.endDate}
        </Body4>
        <Body4>{schedule.visitTime}부터</Body4>
        <Body4>{schedule.hour}</Body4>
	  </DetailContainer>
     ...
    </PageContainer>
  );
```

# 🎃 Issue

### 뒤로가기 시 데이터 유지 문제

테스트하다보니 이전 페이지로 이동할 시 페이지에 입력했던 데이터들이 초기화되어 페이지에서 오류가 나는 것을 확인하였다. 페이지에 뒤로가기 버튼이 있기 때문에 이를 처리하는 것은 필요하다고 생각되었고, 다른 팀원들도 미처 발견하지 못한 부분인 것 같아 내가 해결해보게 되었다.

우선 이전 step으로 돌아갔을 때에도 이전에 작성한 데이터들이 남아있어야 하기 때문에 데이터 입력 시 업데이트 해두었던`ApplymentBriefContext` 데이터를 활용하였다. `ApplymentBriefContext`에 해당 Step의 데이터가 있을경우 저장된 데이터를 가지고 오고, 현재 페이지에 존재하는 state 들의 default 값으로 각각 적용하도록 만들었다.

```jsx
  const { applymentBrief } = useContext(ApplymentBriefContext);
  ...
  const schedule = useMemo(() => {
    const schedule = applymentBrief?.schedule;
    if (!schedule) return {};
    const formattedSchedule = {
      startDate: formatDateKorean(schedule.startDate),
      endDate: formatDateKorean(schedule.endDate),
      visitTime: schedule.visitTime,
      hour: schedule.hour,
    };
    return formattedSchedule;
  }, [applymentBrief?.schedule]);
```

초기값으로 설정해주는 과정에서는 기존 팀원들이 작성한 코드를 일부 수정해야 하는 점이 있었다. 스케줄 설정 step의 경우에는 `DateContext`를 사용하고 있는데다가 설정 과정의 깊이가 있어 추가적인 함수 구현이 필요하였고, 돌봄 일자를 선택하는 부분의 초기값을 설정해주기 위해 `setStartEndDate()`함수를 만들었다.

# 📝 Learned

### Context API

확실히 상태 관리 라이브러리 보다 사용하기에 편리했다. context 생성은 `createContext`, 사용 시에는 `useContext`만 사용하면 되었고, 또한 context 생성을 별도 파일로 분리하지 않고 하나의 파일 내에서 작성할 수 있는 점이 보기 편했다.

그리고 context 갯수가 많아졌을 경우 이를 하나로 묶어서 표현할 수 있다는 것을 알게되었다.

```jsx
const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

const App = () => {
  return (
    <AppProvider contexts={[StepContext, FooterContext, AddressContext]}>
      {currentStep.number < 0 ? (
        <FirstPage />
      ) : (
        <Step>{step[currentStep.number]}</Step>
      )}
    </AppProvider>
  );
};
```

### 다양한 코드 작성 방식

이벤트 타겟 비구조화 할당 작성 방식

```js
onChange={({ target: { value } }) => setValue(value)}
```

css 작성 시 disabled 선택자

```html
&[disabled] { opacity: 0.5; pointer-events: none; }
```

event.key가 backspace가 아닌지 판단

```js
if (!["Backspace"].includes(event.key)) {
}
```

# ❗️ Lacked

### 공통 state의 대해 논의 부족 문제

공통으로 다루는 state에 대한 논의를 부족한 상태로 개발에 들어가서 개발하면서 회의가 거듭되어서 아쉬운 점이 있었다. 이를 통해서 개발도 중요하지만 설계 과정도 매우 중요하다는 것을 다시 느끼게 되었다.

### SearchBox 구현 방식 문제

`<SearchBox/>` 구현 시, 내가 생각하는 구현 방식과 팀원 간의 의견이 상이한 부분이 있었다. GitHub PR 기능을 통해서 다양한 의견을 들어볼 수 있었고, 이에 적합한 방식으로 수정을 할 수 있었다. 또한 실제 사이트가 존재한다면 최대한 참고하여 기능을 구현하는 것도 좋은 방법이라는 것을 느꼈다.
