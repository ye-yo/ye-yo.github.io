---
title: Jekyll theme 커스텀하기
categories: 블로그
tags: [블로그, Github, Jekyll]
excerpt: Jekyll 테마 마음대로 커스텀하기~
---

> 기본적인 Jekyll 테마도 괜찮지만 색상이나 레이아웃 등을 자유롭게 수정하고자 커스텀을 진행했다.

# 0. 불필요한 파일 제거

프로젝트 코드를 zip으로 다운받아 사용했기 때문에 불필요한 코드들이 있어서 최대한 제거해주었고, `test/` 폴더 내에 존재하는 파일들을 참고하면서 제거했다.

- screenshots/
- docs/
- .github/
- test/
- assets/ 내에 로고, 파비콘 이미지들
- docker/
- README-zh.md
- HOW_TO_RELEASE.md
- CHANGELOG.md
- about.md 내용 지움
- package.json

# 1. 블로그 정보 입력 - \_config.yml

기본적인 블로그 정보는 `_config.yml`에 작성할 수 있다.

```yml
## => Site Settings
##############################
text_skin: default # "default" (default), "dark", "forest", "ocean", "chocolate", "orange"
highlight_theme: default # "default" (default), "tomorrow", "tomorrow-night", "tomorrow-night-eighties", "tomorrow-night-blue", "tomorrow-night-bright"
url: 블로그 url
baseurl: # does not include hostname
title: 블로그 이름
subtitle: 소제목
description: > # this means to ignore newlines until "Language & timezone"
  블로그 설명

## => Language and Timezone
##############################
lang: ko # the language of your site, default as "en"
timezone: Asia/Seoul # see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for the available values

## => Author and Social
##############################
author:
  type: # "person" (default), "organization"
  name: 본인 이름
  url:
  avatar: 프로필 이미지
  bio: 자기 소개 문구. 줄바꿈은 <br>
  email: 이메일 주소 (mailto:안붙여도됨)
  facebook: https://www.facebook.com/user_name
  twitter: https://twitter.com/user_name
  weibo: # "user_id"   the last part of your profile url, e.g. https://www.weibo.com/user_id/profile?...
  googleplus: # "user_id"   the last part of your profile url, e.g. https://plus.google.com/u/0/user_id
  telegram: # "user_name" the last part of your profile url, e.g. https://t.me/user_name
  medium: # "user_name" the last part of your profile url, e.g. https://medium.com/user_name
  zhihu: # "user_name" the last part of your profile url, e.g. https://www.zhihu.com/people/user_name
  douban: # "user_name" the last part of your profile url, e.g. https://www.douban.com/people/user_name
  linkedin: # "user_name" the last part of your profile url, e.g. https://www.linkedin.com/in/user_name
  github: https://github.com/user_name
  npm: # "user_name" the last part of your profile url, e.g. https://www.npmjs.com/~user_name

## => GitHub Repository (if the site is hosted by GitHub)
##############################
repository: user_name/repo_name
repository_tree: main (또는 master)

## => Paths
##############################
paths:
  root: # title link url, "/" (default)
  home: # home layout url, "/" (default)
  archive: # "/archive.html" (default)
  rss: # "/feed.xml" (default)

## => Post
##############################
## excerpt
excerpt_separator: <!--more-->

## license
license: CC-BY-NC-4.0 # "CC-BY-4.0", "CC-BY-SA-4.0", "CC-BY-NC-4.0", "CC-BY-ND-4.0"

## TOC
toc:
  selectors: # "h1,h2,h3" (default)

## => Markdown Enhancements
##############################
## Mathjax
mathjax: # false (default), true
mathjax_autoNumber: # false (default), true

## Mermaid
mermaid: # false (default), true

## Chart
chart: # false (default), true

## => Paginate
##############################
paginate: 8 # 한 페이지에 게시물 개수
paginate_path: /page:num # don't change this unless for special need

## => Sources
##############################
sources: # bootcdn (default), unpkg

## => Sharing
##############################
sharing:
  provider: false # false (default), "addtoany", "addthis", "custom"

  ## AddThis
  addthis:
    id: # AddThis pubid, e.g. ra-5xxxxxxxxxxx

## => Comments
##############################
comments:
  provider: false # false (default), "disqus", "gitalk", "valine", "custom"

  ## Disqus
  disqus:
    shortname: # the Disqus shortname for the site

  ## Gitalk
  # please refer to https://github.com/gitalk/gitalk for more info.
  gitalk:
    clientID: # GitHub Application Client ID
    clientSecret: # GitHub Application Client Secret
    repository: # GitHub repo
    owner: # GitHub repo owner
    admin:# GitHub repo owner and collaborators, only these guys can initialize GitHub issues, IT IS A LIST.
      # - your GitHub Id

  ## Valine
  # please refer to https://valine.js.org/en/ for more info.
  valine:
    app_id: # LeanCloud App id
    app_key: # LeanCloud App key
    placeholder: # Prompt information
    visitor: # false (default)
    meta: # "[nick, mail, link]" (default) nickname, E-mail, Personal-site

## => Pageview
##############################
pageview:
  provider: false # false (default), "leancloud", "custom"

  ## Leancloud
  leancloud:
    app_id: # LeanCloud App id
    app_key: # LeanCloud App key
    app_class: # LeanCloud App class

## => Search
##############################
search:
  provider: default # "default" (default), false, "google", "custom"

  ## Google Custom Search Engine
  google:
    custom_search_engine_id: # Google Custom Search Engine ID

## => Analytics
##############################
analytics:
  provider: false # false (default), "google", "custom"

  ## Google Analytics
  google:
    tracking_id: # Google Analytics id for the site
    anonymize_ip: false # Anonymize IP tracking for Analytics

## => Build
##############################
markdown: kramdown
highlighter: rouge
permalink: date

exclude:
  - CHANGELOG.md
  - HOW_TO_RELEASE.md
  - Gemfile
  - Gemfile.lock
  - LICENSE
  - README-*.md
  - README.md
  - gulpfile.js
  - jekyll-text-theme.gemspec
  - package-lock.json
  - package.json
  - /docs
  - /node_modules
  - /screenshots
  - /test
  - /vendor

defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: article
      sharing: true
      license: true
      aside:
        toc: true
      show_edit_on_github: true
      show_subscribe: true
      pageview: true

## => Plugins
##############################
plugins:
  - jekyll-feed
  - jekyll-paginate
  - jekyll-sitemap
  - jemoji
```

# 2. favicon 변경

로고 이미지를 준비한 뒤 공식 문서에서 소개한 [favicon 생성 사이트](https://realfavicongenerator.net/)에서 favicon을 생성하여 변경해준다!
https://tianqi.name/jekyll-TeXt-theme/docs/en/logo-and-favicon#favicon

# 3. custom skin

블로그 색상을 마음대로 커스텀하기 위해서 custom skin을 만들어 준다.

`_sass/skins/_custom.scss` 파일을 만들어서 작성한 뒤,
`_config.yml` 파일에서 `text_skin` 값을 `custom`으로 변경한다.

custom skin 일부

```scss
$main-color-1: #bf90eb;
$text-color-1: #313948;

$main-color-2: #84aff3;
$text-color-2: #fff;

$main-color-3: #fefefe;
$text-color-3: rgb(94, 80, 201);
```

# 4. CSS 수정

수정하고 싶은 css는 `_sass/custom.scss` 파일에 작성해주었다.
`_sass/skins/_custom.scss`에는 font-size나 color에 대한 스타일만 설정해주고 그 외의 요소들은 `_sass/custom.scss`에 작성해주었다.

변경한 css 일부

```scss
.article__info {
  margin-top: 4px;
}

.button--secondary {
  font-weight: 500;
  @include clickable($text-color, $main-color-4);
}

.modal {
  background-color: #2b2c30ed;
}

.search-result__item.active a {
  border-radius: 6rem;
}

.navigation__item--active a {
  font-weight: bold;
}

.navigation__item--active::after {
  border-bottom-width: 2px;
}

.root[data-is-touch="false"] a:hover,
.root[data-is-touch="false"] a > .item__header:hover,
.root[data-is-touch="false"] a.item__header:hover,
.root[data-is-touch="false"] .item__header > a:hover {
  text-decoration: none;
}
```
