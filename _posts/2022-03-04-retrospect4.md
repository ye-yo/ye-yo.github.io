---
title: 기업 과제 4 | Github 저장소 이슈 목록 확인 서비스
categories: "원티드 프리온보딩"
tags: [원티드 프리온보딩, 회고록]
---

# 프로젝트 소개

> 💡 **주제** : Github 저장소 등록 및 등록된 저장소의 이슈 목록 확인 서비스<br/>
> 🗓 **기간** : 03.03 ~ 03.04<br/>
> 🔨**기술 스택** : React Native, React-Native-CLI, SWR<br/>
> 💻 **담당** : 저장소 정보 등록 기능<br/>
> 👤 **참여 인원** : 6

**프로젝트 상세 설명**

> Github 저장소를 등록하고, 등록된 저장소의 이슈들을 확인할 수 있는 서비스이다.

#### 주요 기능 목록

- React Native swr 로 앱 개발
- 저장소 검색 및 출력
- Async Storage 활용한 저장소 등록/삭제
- issue 모아보기 및 github 상세 페이지 이동
- 페이지네이션

# 기능 구현

네 번째 기업과제에서는 storage를 사용하여 저장소 정보를 등록하는 기능을 맡았다. 이번 프로젝트는 앱으로 구현하기로 회의가 되어 React Native로 개발하는 것으로 결정되었고, 이에 따라 storage는 `AsyncStorage`를 사용하게 되었다. 이번에 처음 React Native로 개발하는 것이지만 다행히 이전에 앱 개발환경을 어느 정도 구축해놓았어서 비교적 빨리 구축할 수 있었다.

> [AsyncStorage](https://reactnative.dev/docs/asyncstorage)는 React Native의 스토리지 시스템으로 웹의 LocalStorage 대신 사용할 수 있으며 사용 방법도 LocalStorage와 크게 다를게 없어서 쉽게 사용할 수 있다.

### AsyncStorage 설치

일단 AsyncStorage 설치하려고 찾아보니 글마다 달라서 공식 문서를 확인해보게 되었는데, React Native 0.60 이전 버전은 AsyncStorage를 설치할 필요 없고 0.60 이후 버전은 별도 설치가 필요하다고 했다. 우리팀 프로젝트의 React Native version은 `0.67.3` 이었기 때문에 별도 설치가 필요했고 또한 AsyncStorage를 지원하는 여러가지 react-native 라이브러리가 있으니 선택해서 설치하라고 나와있었다. 나는 그중에서 가장 많이 사용하는 `@react-native-ascnc-storage`를 설치했다.

```bash
npm install @react-native-async-storage/async-storage
cd ios
npx pod-install
```

> 💡 [pod-install](https://www.npmjs.com/package/pod-install) : pod install 및 update 처리와 그 과정에서 필요한 여러 가지 검증 등을 간편하게 처리해주는 라이브러리

### 저장소 저장 함수 모듈화

저장소 정보를 AsyncStorage에 저장하도록 구현하기 위해 저장하는 기능을 모듈화된 함수로 구현하였다. 이 프로젝트만을 위한 코드를 작성할 수도 있었지만 AsyncStorage를 다루는 함수와 이 함수를 이용해 저장소 정보를 처리하는 함수를 각각 따로 만들어 추후에 재활용이 가능하도록 구현하게 되었다.

AsyncStorage를 다루는 모듈 `asyncStorage`에서는 key, value를 전달받아 값을 저장하는 `storeData()` , key를 전달받아 값을 return하는 `getData()`, 마찬가지로 key를 전달받아 데이터를 지우는 `removeData()` 함수로 구성되어 있다.

또한 이를 활용하여 github 저장소 정보를 처리하는 모듈 `repositoryStorage`는 `addItem(), getItem(), removeItem(), removeAll()` 함수가 있고 저장소 정보는 배열로 전달되기 때문에 배열을 처리하기 위한 코드를 작성하였다. 예를 들면 중복 처리 코드, 최대 저장 개수 제한 처리 등을 작성하여 github 저장소 저장만을 위한 코드를 작성하였다.

배열 중복 처리 위한 코드

```js
const isExist = (array, target) => array.some((item) => item.id === target.id);
```

addItem() 코드

```js
export const addItem = async (value) => {
  try {
    let storedValue = await getData(ASYNC_STORAGE_KEY);
    if (storedValue) {
      if (storedValue.length >= STORED_DATA_MAX) {
        notifyMessage("저장소는 최대 4개까지 등록할 수 있습니다.");
        return false;
      }
      if (!isExist(storedValue, value)) {
        storedValue.push(value);
      }
    } else {
      storedValue = new Array(value);
    }
    await storeData(ASYNC_STORAGE_KEY, storedValue);
  } catch (e) {
    console.log(e);
    return false;
  }
};
```

### custom hook으로 리팩토링

하지만 이렇게 일반 함수를 모듈화하여 구현한 것을 PR을 올려 리뷰를 받아보니 커스텀 훅으로 구현하는 것이 좋을 것 같다는 피드백을 받았다. 일반 함수로 구현해도 전혀 문제가 없어보였으나 왜 custom 훅으로 구현하는 것이 좋은지 대한 의문이 생겼다. 그래서 이번 기회에 custom hook을 정확하게 이해하고 넘어가자는 마음에 우선 custom hook에 대해서 조사해보았다.

조사해보니 일반 함수에서는 useState, useEffect 등의 리액트 훅을 사용할 수 없다는 것이 주요한 문제로 보였다. useState, useEffect 등을 사용하지 않는 함수일 경우 일반 함수로 만들 수도 있겠지만 확장성을 고려하면 처음부터 custom hooks으로 만들어 두는 것이 좋겠다는 생각이 들었고, 단순 연산 정도의 기능이면 일반 function으로 만들어서 utils 폴더에 두고 state를 다루는 함수라면 custom hooks로 작성하자는 결론에 이르렀다. 이에 기존 일반 함수로 구현하여 모듈화했던 것을 custom hook으로 다시 작성하게 되었으며, 구현해두고 보니 custom hook 내에서 데이터를 state로 관리하다 보니까 매번 storage에서 데이터를 가져올 필요가 없다는 장점이 보였다. 구체적으로는 storage 데이터 변경이 일어나면 state가 업데이트 되고, custom hook은 저장된 state값을 반환하기 때문에 이 점에서 일반 함수보다 효율적이라고 느낄 수 있었다.

### 알림 메시지 구현

이 외에도 알림을 위해 `notifyMessage`라는 함수를 만들기도 했으며 디바이스 플랫폼에 따라 안드로이드는 `ToastAndroid`, ios는 `Alert`가 뜨도록 만들었다. 각각 다른 알림을 사용한 이유는 테스트 해보았을 때 안드로이드에서 Alert UI가 예뻐보이지 않았고 ios Alert와 디자인의 차이도 많았기 때문이며, 찾아보니 `ToastAndroid`라는 알림이 있어 사용하게 되었다.

# 🎃 Issue

### iOS 프로젝트 build 에러

`Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65. To debug build logs further, consider building your app with Xcode.app, by opening GithubIssueTracker.xcworkspace.`

개발 중에 위와 같은 에러가 발생했다. 정확한 원인은 알 수 없으나 번들 리소스에 중복이 있어서 발생할 수 있다고 한다. 나의 경우는 아이콘 관련 라이브러리에서 오류도 함께 발생했는데 이 라이브러리 설치하면서 번들 리소스에 중복이 생긴 것으로 생각된다.  
[[React Native] - BUILD FAILED on run-ios 해결 방법](https://smooth97.medium.com/react-native-build-failed-on-run-ios-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-f37f2ebc4b65)을 참고하여 4번째 방법으로 해결하였다. 해결 방법은 다음과 같다.

1. xcode로 ios 폴더 연다
2. 프로젝트 명 클릭해서 나타난 소메뉴에서 Build Phases 클릭
3. copy pods Resources 삭제
4. cmd+shift+k 누르고 cmd+b 로 새로 빌드

# 📝 Learned

### 💡 변수명 뒤에 오는 물음표는 뭘까?

> kotlin 문법에서 사용되는 **optional chaining**. ES2020부터 추가된 문법이다.
>  `null` 또는 `undefined` 를 가질 수 있는 변수 뒤에 물음표를 붙이면 `null/undefined`일 시 undefined를 반환한다.

```js
if (foo && foo.bar ** foo.bar.baz) {
  x = foo.bar.baz();
}
```

이런 식으로 if문으로 값을 확인하여 작성해줘야 하는 번거로운 코드를

```js
x = foo?.bar?.baz();
```

위와 같이 간결하게 작성할 수 있다!

### 💡 ?? 의 명칭은?

> Nullish Coalescing Operator(NCO)
> 평소에 `truthy` 값을 확인하기 위해 자주 사용하던 `??` 연산자의 명칭을 알게되었다. coalescing는 병합이라는 의미가 있어서 nullish 병합 연산자 정도로 풀이가 가능할 것 같다.

### 💡 변수명 앞에 !! 느낌표 두개는 뭘까?

> 값을 `boolean` 값으로 나타내는 형 변환 연산자.

```js
const isOpen = !!array.length;
```

위와 같이 `boolean` 값을 가져야 하는 변수의 값이 number 값을 가지는 값에 따라 정해진다면 `!!`를 붙여서 `boolean` 값으로 만들어줄 수 있다!

# ❗️ Lacked

- custom hook에 대한 이해와 다양한 기능을 custom hook으로 만들어보는 연습이 필요할 것 같다.
