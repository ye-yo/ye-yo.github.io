---
title: Github 블로그 만들기
categories: 블로그
tags: [블로그, Github, Jekyll]
excerpt: Github Pages와 Jekyll로 블로그 만들기
---

# 1. Github Pages

Github Pages를 이용하면 정적 웹사이트를 간편하게 만들 수 있다.

![github repository](/img/blog1.png)

1. Repository 생성하기
   repository명은 반드시 **username.github.io.**

   README 파일은 사이트 접속 시
   `https://username.github.io`로 접속하면 README 페이지를 확인할 수 있다.

2. 저장소 clone
   repo 주소를 복사한 후, 터미널을 열어
   git clone repo주소 입력

3. clone한 폴더로 이동해 index.html 파일 생성

4. commit & push

```
git add .
git commit -m "Initial commit"
git push
```

https://유저명.github.io로 접속해보기

![깃헙 페이지 결과](/img/blog2.png)

# 2. Jekyll 설치 준비(Ruby 설치)

Jekyll : 정적 웹페이지 생성기.

장점

- Github pages 통해 무료로 웹페이지 공개가 가능
- 마크다운 사용하여 간편하게 글 작성 가능
- 다양한 테마와 플러그인 제공 및 커스터마이징 가능

Jekyll은 Ruby 언어로 만들어져 있기 때문에 Ruby를 설치해주어야 한다.
mac의 경우 Ruby가 설치되어 있으나 오래된 버전이라 Jekyll을 지원하지 않을 수 있어 새로 설치가 필요하다고 한다.

> 공식 문서에도 다음과 같이 나와있다.  
> While macOS comes preinstalled with Ruby, we don’t recommend using that version to install Jekyll.
> macOS에는 Ruby가 사전 설치되어 제공되지만 해당 버전을 사용하여 Jekyll을 설치하지 않는 것이 좋습니다.  
> [기존에 설치되어있는 Ruby를 사용하면 안되는 이유](https://www.moncefbelyamani.com/why-you-shouldn-t-use-the-system-ruby-to-install-gems-on-a-mac/)에도 나와있듯이 2.6.x 시리즈에 대한 업데이트 및 보안 수정 사항이 더 이상 없을 것이라고 하기때문에 설치가 필요하다.  
> ruby -v 통해서 확인결과 나의 mac도 2.6.x 버전 이었다.

## 2.1 Command Line Tools 설치

macOS 커맨드 라인에서 개발하려면 Command Line Tools을 설치해야 한다.
CLT가 설치되어있는지 확인하는 방법은 터미널을 열어 **'gcc'**라고 입력했을 때
no developers tools were found... 라고 출력되면 설치되어있지 않은 것이다.

설치가 되어있지 않다면 아래 명령어로 설치한다.

```
xcode-select --install
```

## 2.2 Home Brew 설치

Ruby Version Manager를 설치하기 위해서는 Home Brew가 필요하다.
(설치 여부는 `brew -v`로 확인)

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 2.3 Ruby Version Manager 설치

rbenv(Ruby Version Manager)는 아래의 명령어로 설치한다.

```
brew install rbenv ruby-build
```

## 2.4 Ruby 설치

[Ruby 공식 홈페이지에서 안정 버전 확인](https://www.ruby-lang.org/ko/downloads/)
22.04.21 기준 3.1.2  
설치 가능한 버전 확인은 `rbenv install -l` 명령어로 가능하다.

```bash
rbenv install 3.1.2

// 전역에서 사용할 Ruby 버전 지정
rbenv global 3.1.2
```

global 이용해서 지정안해주면 아래와 같이 system에 설치되어 있는 버전 사용하게 됨.
![](https://velog.velcdn.com/images/yeyo0x0/post/f33b6b42-443e-4fec-93f0-282ca4092345/image.png)

rbenv global 이후
![](https://velog.velcdn.com/images/yeyo0x0/post/55721a9c-b437-4604-bd7d-b01bfff11466/image.png)

설치 확인

```
rbenv versions
ruby -v
```

# 3. Jekyll 설치 및 생성

gem을 이용해 jekyll과 bundler를 설치한다.  
\*gem : Ruby에서 지원하는 패키지 시스템. 명령을 통해 자동으로 프로그램을 받아 설치해준다. gem 명령어로 설치되는 패키들이 모두 gem(RubyGems)이라고 할 수 있다.  
\*bundler: 특정 gem의 의존성에 따라 필요한 프로그램들을 자동으로 설치해주는 패키지 버전 관리 gem.

```bash
gem install jekyll bundler
```

설치 후에는 1.에서 생성했던 github.io 폴더로 이동하고 아래 명령어를 입력해서 Jekyll 프로젝트를 생성한다.

# 4. 테마 적용

폴더로 이동 후 `jekyll new .` 명령어를 사용하면 기본 테마인 미니마 테마의 지킬 블로그가 생성된다.  
(폴더가 없는 경우 `jekyll new 폴더명`)
이 외의 Jekyll 테마는 구글에 검색하거나 [다양한 지킬 테마 사이트](#다양한-지킬-테마-사이트)에서 확인할 수 있다.  
github에서 jekyll theme를 검색해서 찾는 방법도 추천한다.  
마음에 드는 테마는 파일을 다운로드(github repo의 경우 zip파일 다운)해서 압축을 푼 뒤, 파일들을 나의 github.io 클론 폴더에 복사한다.

적용한 테마의 dependencies를 설치

```shell
bundle install --path vendor/bundle
```

(실행시 --path 옵션이 deprecated 되었다고 아래와 같은 안내가 나타나지만 설치는 정상적으로 해준다.)

> The `--path` flag is deprecated because it relies on being remembered across bundler invocations, which bundler will no longer do in future versions. Instead please use `bundle config set --local path 'vendor/bundle'`, and stop using this flag

jekyll 블로그 서버 실행 > https://localhost:4000/에서 확인할 수 있다.

```
bundle exec jekyll serve
```

#### 추천 Jekyll 테마

- 사용한 테마 : https://github.com/kitian616/jekyll-TeXt-theme
- https://github.com/chesterhow/tale
- https://github.com/just-the-docs/just-the-docs
- https://github.com/alshedivat/al-folio > 샘플 사이트 https://alshedivat.github.io/al-folio/
- https://github.com/sergiokopplin/indigo
- https://github.com/TaylanTatli/Moon
- https://github.com/mmistakes/so-simple-theme
- https://github.com/jeffreytse/jekyll-theme-yat

#### 다양한 Jekyll 테마 사이트

- http://jekyllthemes.org/
- https://jekyll-themes.com/free/
- https://jekyllthemes.io/free
- http://themes.jekyllrc.org/
  이 외에도 다양한 사이트가 존재한다.

## jekyll-TeXt-theme 적용

[가이드 문서](https://tianqi.name/jekyll-TeXt-theme/docs/en/quick-start)에서 파일 복사 후 아래와 같은 단계를 거쳐 설치하라고 나온다.

1. Gemfile 에 다음 행을 추가

```
gem "jekyll-text-theme"
```

파일에 `gemspec` 행이 있다면 지우고 추가해준다. 2. `_config.yml` 파일에 다음 줄을 추가

```
theme: jekyll-text-theme
```

=> 위의 라인 추가한 후 github push 시 오류가 발생한다.
[jekyll-text-theme repo Issue](https://github.com/kitian616/jekyll-TeXt-theme/issues/381)에서도 위의 라인을 제거하라고 함.
이유가 무엇인지는 모르겠으나 제거하면 오류가 발생하지 않음

위의 과정 후에 아래 명령어 실행

```
bundle exec jekyll serve
```

![테마 적용 페이지 화면](/img/blog3.png)

# 오류 해결

### ⚠️ could not find expected ':' 에러

> could not find expected ':' while scanning a simple key at line 121 column 5

121라인을 확인했더니 아래와 같이 :와 글 사이에 공백이 없었다.

```
admin:# GitHub repo owner and collaborators, only thes
```

auto save되면서 자꾸 공백을 제거하길래 format on save 풀고 저장해주었다.

### ⚠️ webrick 오류

> cannot load such file -- webrick (LoadError)

아래 명령어로 webrick 추가 후 다시 실행해준다.

```
bundle add webrick
```
