---
title: REST API vs GraphQL
categories: TIL
tags: [TIL]
excerpt: REST API와 GraphQL 비교
---

# Server API

**Server API(Application Programming Interface)**

> 서버에 적절한 요청을 하였을 때, 그에 맞는 응답을 되돌려주는 창구(interface)를 웹을 통해 노출한 것

#### 프론트 개발자가 Server API를 알아야 하는 이유

\*API 디자인은 보통 백엔드 개발자의 영역으로 알려져있다. 하지만 프론트엔드 개발자 또한 Mock API 디자인을 하거나 백엔드 개발자와의 원활한 협업을 해야하기 때문에 API 디자인 규칙 및 방법론을 알아야한다.

Server API를 만드는 방법론으로는 대표적으로 REST API, Graph API가 있다.

# 1. REST API

> 웹에서 사용되는 데이터나 자원을 HTTP URI로 표현하고, HTTP 프로토콜을 통해 요청과 응답을 정의하는 방식을 말한다.

Representational State Transfer의 약자로, 로이 필딩의 박사학위 논문에서 웹(http)의 장점을 최대한 활용할 수 있는 아키텍처로 처음 소개되었다.

## 1) REST 성숙도 모델

REST API를 작성할 때는 지켜야할 규칙이 있다. 레오나르드 리차드슨이라는 사람이 기존 논문에 제시된 REST 방법론을 보다 실용적으로 적용하기 위해 만든 REST 4단계 모델은 다음과 같다.  
![](https://images.velog.io/images/yeyo0x0/post/c00989b0-73eb-4834-8b6a-2784afce5142/image.png)  
로이 필딩은 이 모델의 모든 단계를 충족해야 REST API라고 부를 수 있다고 주장했으며 실제로는 3단계까지 지키기가 어렵기 때문에 2단계까지만 적요해도 좋은 API 디자인이라고 본다고 한다.(이런 경우 HTTP API라고도 부른다)

### REST 성숙도 모델 - 0단계

> HTTP 프로토콜을 사용하기만 하면 충족되는 단계
> ex)

### REST 성숙도 모델 - 1단계

> 개별 리소스와의 통신을 주고받아야 한다.

예시

**수정 전**

- 의사가 예약 가능한 시간 확인 : /appointment
- 특정 시간에 의사의 환자 예약 : /appointment

⚠️ 서로 요청하는 리소스가 다름에도 동일한 엔드포인트(`/appointment`)를 사용하고 있음

**수정 후**

- 의사가 예약 가능한 시간 확인 : /doctors/:name
- 특정 시간에 의사의 환자 예약 : /slots/:id

### ❗️REST API 작성시 유의할 점

- 엔드포인트 작성시 리소스에 집중해 **명사** 형태의 단어로 작성하는 것이 바람직하다.
  (동사, HTTP메서드, 혹은 어떤 행위에 대한 단어 사용은 지양 ex) 잔여좌석 확인 : `/inquiry` ❌ )
- 응답으로 리소스를 전달할 때, 리소스와 함께 리소스 사용에 대한 **성공/실패 여부**를 반환해야 한다.

응답 예시

```json
{
  "appointmentFailure": {
    "slot: { "id": 123, "doctor": "허준", ...},
    "patient": "홍길동",
    "reason": "해당 시간은 이미 예약되어 있습니다."
  }
}
```

### REST 성숙도 모델 - 2단계

> CRUD에 맞게 적절한 HTTP 메서드를 사용해야 하며, POST 메서드 사용 시 POST 요청에 대한 응답이 어떻게 반환되는지가 중요하다.

예시)

- 의사가 예약 가능한 시간 확인 : GET
- 특정 시간에 의사의 환자 예약 : POST

또한 POST 요청의 응답은 **응답코드**를 명확하게 반환해주어야 하고, 클라이언트가 **Location 헤더**에 작성된 URI를 통해 관련 리소스를 확인할 수 있어야 한다.  
** POST 요청 & 응답 예시**

| 요청 내용                    | 요청                                                                                        | 응답                                                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 특정 시간에 의사의 환자 예약 | <span> POST /slots/123 HTTP/1.1<br>[헤더 생략]<br>{<br>&nbsp;&nbsp;"patient": "홍길동"<br>} | HTTP/1.1 <span style="color:#ee4444">201 Created</span><br><span style="color:#2299ee">Location: slots/123/appointment</span><br>[헤더 생략]<br>{<br>&nbsp;&nbsp;"appointment": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;}<br>} |

위의 경우 응답이 **새롭게 생성**된 리소스를 보내주기 때문에 응답코드는 `201 Created`로 명확하게 작성해야 하고, Location 헤더에 예약과 관련된 리소스임을 확인할 수 있도록 URI가 작성되어 있다.  
('+ 또한 `201 Created`의 경우 정상적으로 생성된 리소스에 대한 내용을 body에 포함해야 한다.)

### REST 성숙도 모델 - 3단계

> HATEOAS(Hypertext As The Engine Of Application State)라는 약어로 표현되는 **하이퍼미디어 컨트롤**을 적용하며, 요청은 2단계와 동일하지만 응답에는 리소스의 URI를 포함한 링크 요소를 삽입하여 작성한다.

**응답 예시 - 특정 시간에 예약 요청에 대한 응답**

```json
{
  "appointment":{
  	"slots": { ... },
  	"patient": "홍길동"
  },
  "links: {
  	"self: {
  		"href": "http://localhost:8080/slots/123",
  		"method": "GET"
  	},
  	"cancel": {
  		"href": "http://localhost:8080/slots/123/cancel",
  		"method": "DELETE"
  	}
  }
}
```

위의 응답 예시는 예약 후, 그 예약을 다시 확인할 수 있도록 응답 내에 링크를 넣어 새로운 기능에 접근할 수 있도록 한 것이다.  
개발자들은 이러한 링크를 활용하여 효율적으로 리소스와 기능에 접근하도록 구현할 수 있다.

### 참고할만한 API 디자인

- [5가지의 기본적인 REST API 디자인 가이드](https://blog.restcase.com/5-basic-rest-api-design-guidelines/)
- [호주 정부 API 작성 가이드](https://api.gov.au/standards/national_api_standards/)
- [구글 API 작성 가이드](https://cloud.google.com/apis/design?hl=ko)
- [MS의 REST API 가이드라인](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md)

### REST API 사용 예제

💡 언어 별로 다른 응답을 제공해야 할 경우

> Accept-Language 헤더에 따라 다른 응답을 제공한다.
> (기존 엔드포인트를 그대로 활용 가능)

# 2. GraphQL

> Graph + Query Language 의 줄임말로, Query Language 중에서도 Server API를 통해 정보를 주고받기 위해 사용하는 언어를 말한다.

**Query Language** 는 정보를 얻기 위해 보내는 질의문(Query)을 만들기 위해 사용되는 Computer 언어의 일종.

🤔 왜 Graph 인가?  
그래프는 **여러 개의 점들이 서로 복잡하게 연결되어 있는 관계를 표현한 자료구조**이다. 하나의 점(`Node 또는 정점(vertex)`)을 이어주는 하나의 선(`간선(edge)`)을 통해 특정 순서에 따라 그래프를 재귀적으로 탐색할 수도 있고, 데이터 간의 관계를 확인할 수 있다.  
GraphQL은 그래프의 이러한 특징을 이용하여 클라이언트에 요청에 따라 유연하게 트리 구조의 JSON 데이터를 응답으로 전송할 수 있다.

## 1) GraphQL 용어

REST API의 GET과 유사하게 GraphQL에서는 **Query**를 이용해 데이터를 요청할 수 있고, Create, Delete와 같이 저장된 데이터를 수정하는 경우 **Mutation**을 이용해 이를 수행할 수 있다. 추가로 GraphQL에서는 구독(**Subscription**) 개념을 제공하여 이를 이용해 실시간 업데이트를 구현할 수 있다.

> Subscription은 전통적인 Client(요청)-Server(응답) 모델을 따르는 Query 또는 Mutation과 달리, **발행/구독(pub/sub) 모델**을 따른다. 클라이언트가 어떤 이벤트를 구독하면, 클라이언트는 서버와 WebSocket을 기반으로 지속적인 연결을 형성하고 유지하며, 그 후 특정 이벤트가 발생하면, 서버는 대응하는 데이터를 클라이언트에 푸시해준다.

- **Query**: 저장된 데이터 가져오기 (REST의 GET과 비슷합니다.)
- **Mutation**: 저장된 데이터 수정하기
  - **Create**: 새로운 데이터 생성
  - **Update**: 기존의 데이터 수정
  - **Delete**: 기존의 데이터 삭제
- **Subscription**: 특정 이벤트가 발생 시 서버가 대응하는 데이터를 실시간으로 클라이언트에게 전송

## 2) GraphQL 등장 배경 : REST API의 한계

GraphQL이 등장하게된 배경은 REST API 한계와 연관이 있다. REST API의 한계는 다음과 같다.

- **Overfetch** : 불필요한 데이터까지 제공
  `ex) 유저의 이름을 가져오기 위해서 /users/:id 엔드포인트로 요청을 보낼 경우 이름 뿐만아니라 불필요한 유저 데이터까지 응답에 포함되어 있음.`
- **Underfetch**: 필요한 데이터를 충분히 제공하지 못함.
  `ex) 하나의 화면을 구성하기 위해서 유저 이름, 유저 포스팅 목록, 유저 팔로워 목록 데이터가 필요한데, 이를 각각 다른 엔드포인트에 요청하여 가져와야 함.`
- **클라이언트 구조 변경시 문제**: 클라이언트 구조 변경 시 엔드 포인트 변경 또는 데이터 수정이 필요

## 3) GraphQL의 장점

### 하나의 endpoint 요청

`/graphql` 이라는 하나의 엔드포인트로 요청을 받고 그 요청에 따라 query, mutation을 `resolver` 함수로 전달해서 요청에 응답한다. 모든 클라이언트 요청은 `POST` 메소드를 사용한다

### under & overfetching ❌

여러 개의 엔드포인트 요청을 할 필요없이 하나의 엔드포인트에서 **쿼리**를 이용해 원하는 데이터를 정확하게 API에 요청하고 응답으로 받을 수 있다.

### 강력한 GUI 제공 : Playground

graphql 서버를 실행하면 [Playground](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/)라는 GUI를 이용해 `resolver`와 `schema`를 한 눈에 보고 테스트해 볼 수 있다.

### 클라이언트 구조 변경에도 지장 ❌

클라이언트 구조가 바뀌어도 필요한 데이터를 결정하는 주체가 클라이언트이기 때문에 서버에 지장이 없다. 필요한 데이터에 대해 쿼리로 작성하기만 하면 된다.

## 4) GraphQL 단점

- REST API에 친숙한 개발자의 경우 GraphQL 러닝커브가 높다.
- 캐싱이 REST보다 훨씬 복잡하다.
  : HTTP에선 각 메소드에 따라 캐싱이 구현되어 있으나 GraphQL에선 `POST` 메소드만을 이용하기 때문에 각 메소드에 따른 캐싱을 지원받지 못함. => 이를 보안하기 위해 Apollo 엔진에 캐싱과 영속 쿼리 등이 등장하게 됨.
- 고정된 요청과 응답만 필요할 경우 Query로 인해 RESTful API보다 요청의 크기가 더 커진다.

> 📖 참고 자료
>
> - 코드스테이츠 UR Class 학습 자료
