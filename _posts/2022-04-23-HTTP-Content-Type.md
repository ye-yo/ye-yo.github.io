---
title: HTTP Content-Type 정리
categories: TIL
tags: [TIL, HTTP]
excerpt: HTTP 통신에서 전송되는 데이터 타입을 나타내는 정보 Content-Type!
---

# HTTP Content-Type

Content-Type은 HTTP 통신에서 **전송되는 데이터 타입을 나타내는 정보**로 서버는 content-type을 기준으로 HTTP 메시지에 담긴 데이터를 분석하고 파싱한다. type은 `type/subType` 형식으로 표시한다.

```
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

> 또한 Content-Type은 **MIME Type**의 하나인데, MIME(Multipurpose Internet Mail Extensions) Type은 미디어 타입으로 데이터 형식을 식별하기 위해 사용되는 Type이다.
>
> ```
> 예시) audio/aac, audio/*, text/html, image/gif, vedio/mpeg
> ```

## Content-Type 주요 유형

### application/x-www-form-urlencoded

서버로 보내기 전에 모든 문자들이 인코딩됨을 명시하는 POST 요청의 기본 미디어 유형으로 `&`으로 분리되며, `=` 기호로 키와 값을 연결하는 방식으로 인코딩되는 값이다. 영어 알파벳이 아닌 문자들은 percent encoded로 인코딩된다.

HTTP 메시지 body가 `application/x-www-form-urlencoded`으로 인코딩 결과는 다음과 같다.

```
Name=John+Smith&Grade=19
```

\* 인코딩은 브라우저에서 해당 content-type일 경우 자동으로 인코딩하도록 구현되어 있다고 한다.

### text/plain

공백 문자는 `+`로 변환하지만 나머지 문자는 모두 인코딩되지 않음을 명시한다.

### application/json

json 형식의 데이터를 전송하는 경우 사용한다.

### mulipart/form-data

모든 문자를 인코딩하지 않음을 명시하는 것으로 `<form>`을 통해 파일이나 이미지를 서버로 전송할 때 주로 사용한다. multipart는 content-type이 서로 다른 데이터들을 처리하기 위해서 등장했다.

```html
<form action="/home/uploadfiles" method="post" enctype="multipart/form-data">
  파일명 : <input type="file" name="myfile" />
  <button type="submit">제출하기</button>
</form>
```

## Content-Type Q&A

### 💡 Content-Type이 정해져있지 않다면?

Content-Type이 정해져있지 않은 경우에는 단순 텍스트 데이터로 받아들이며 `<form>` 태그 enctype 속성의 default 값은 `application/x-www-form-urlencoded`이다.

### 💡 HTTP GET 메소드에서 Content-Type 지정이 필요한가?

HTTP GET 메소드는 `key=value` 형식의 query string으로 보내기 때문에 굳이 Content-Type이 필요없다. 서버에서 GET 메소드로 데이터가 전송되면 `key-value` 형식의 데이터라는 것을 유추할 수 있기 때문이다.

### 💡 Accept헤더와 content-type 헤더 차이점

둘 다 데이터 타입(MIME)을 다루는 헤더이지만 `content-type`은 **전송하는 데이터의 타입이 무엇인지에** 대한 설명이고, `Accept`는 **서버에서 되도록 데이터를 이러한 타입으로 가공해서 보내달라고 명시**할 때 사용하는 것으로 서로 대응된다.  
Accept 헤더는 미디어 타입 혹은 MIME type을 명시한다.

```
Accept: text/html
```

> 📖 참고
>
> - [[HTTP] HTTP 헤더 중 Content-Type 헤더와 Accept 헤더의 용도와 차이점](https://dololak.tistory.com/630)
> - [How are parameters sent in an HTTP POST request?](https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request)
