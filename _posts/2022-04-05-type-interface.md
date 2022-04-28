---
title: Type vs Interface 어떤 걸 사용해야 할까?
categories: Typescript
tags: [Typescript]
excerpt: Type과 Interface는 어떻게 다르고 무엇을 사용해야 할까?
---

> Typescript를 공부하다보면 타입 정의 시에 `type`과 `interface` 중 어떤 것을 써야하는지 고민이 될 것이다. 개발하면서 한 번 찾아보았었던 문제인데, 보다 자세한 근거를 찾아 다시 정리해보려고 한다.

우선 공식 문서를 살펴보면 `Type Aliases` 와 `Interfaces`에 대한 설명 및 비교가 자세히 나타나있다.

## type

> 공식 명칭은 **Type alias**이며 타입에 대한 별칭을 지어주기 위해 사용한다.

```js
type Point = {
  x: number,
  y: number,
};

type ID = number | string;

type UserInputSanitizedString = string;
```

## interface

> `type`과 동일하게 타입에 대한 이름을 지정하기 위해 사용하는 또 다른 방법이다.
> type과 다르게 객체에만 사용이 가능하다.

```js
interface Point {
  x: number;
  y: number;
}
```

## type vs interface

타입과 인터페이스는 매우 유사하기 때문에 둘 중 하나를 선택하여 사용해도 되지만 둘은 차이점이 존재한다. 주요한 차이점은 바로 확장성이다.

### 1) 확장 방식 비교

#### interface 확장

인터페이스는 `extends`를 사용하여 확장할 수 있다.

```js
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

#### type 확장

type은 인터섹션(`&`)을 통해 확장한 것과 동일하게 만들 수 있다.
(상속 받아 확장하는 것이 아닌 기존 타입에 추가된 타입을 결합하여 새로운 타입을 정의한 것)

```js
type Animal = {
  name: string,
};

type Bear = Animal & {
  honey: Boolean,
};

const bear = getBear();
bear.name;
bear.honey;
```

### 2) 새 필드 추가 비교

#### interface에 새 필드 추가

interface는 새 필드를 추가하는 것도 가능하다. 동일한 이름의 인터페이스를 선언하여 추가할 타입을 작성하면 확장된다.

```js
interface Window {
  title: string;
}

interface Window {
  id: string;
}
/* 
interface Window{
  title: string;
  id: string;
}
*/
```

#### type에 새 필드 추가

타입은 생성한 이후에는 변경할 수 없다.

```js
type Window = {
  title: string,
};

type Window = {
  ts: TypeScriptAPI,
};

// Error: Duplicate identifier 'Window'.
```

## 결론

`type`과 `interface` 중 어떤 것을 사용해도 문제가 없으나 **확장성** 면에서 `interface`를 쓰는 것이 좋고, 공식문서에서도 어떤 것을 사용할지 모르겠다면 일단 `interface`를 사용하고 필요한 경우에만 `type`을 사용하라고 제안한다. 나 역시 되도록이면 `interface`를 사용하고 있고 객체가 아닌 데이터에 타입을 지정하고 싶은 경우나 다양한 타입을 하나의 별칭으로 지정하고 싶은 경우에는 예외적으로 `type`을 사용하고 있다.

📖 참고 자료  
[typescript docs 핸드북](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)  
[타입스크립트 type과 interface의 공통점과 차이점](https://yceffort.kr/2021/03/typescript-interface-vs-type)
