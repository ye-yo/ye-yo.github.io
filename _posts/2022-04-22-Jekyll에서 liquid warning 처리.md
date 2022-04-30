---
title: Jekyll liquid warning 해결
categories: 블로그
tags: [블로그, Jekyll]
---

Jekyll 블로그를 수정하면서 `liquid warning` 오류가 발생했다.

# 원인

Jekyll 에서 사용되는 [liquid](#liquid)가 `{% raw %}{{`와 `}}{% endraw %}`를 escape 문자로 사용한다. 그래서 문서에 `{% raw %}{{`, `}}{% endraw %}` 가 들어 있는 경우 Jekyll 엔진이 경고 메시지를 출력하고, `{% raw %}{{ … }}{% endraw %}` 사이에 있는 내용은 무시되게 된다.

# 해결 방안

코드의 앞뒤로 다음과 같은 구문을 추가한다.

![liquid](/img/liquid1.png)

적용 전

![liquid](/img/liquid2.png)

적용 후  
![liquid](/img/liquid3.png)

### Liquid

> Ruby 기반의 HTML 템플릿 언어
