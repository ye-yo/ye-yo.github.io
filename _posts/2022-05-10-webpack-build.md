---
title: ๐จCRA์์ด ์นํฉ(Webpack)์ผ๋ก ๊ฐ๋ฐ ํ๊ฒฝ ๊ตฌ์ถ
categories: React
tags: [React]
excerpt: CRA์์ด ์นํฉ(Webpack)์ผ๋ก ๊ฐ๋ฐ ํ๊ฒฝ ๊ตฌ์ถํด ๋ณด๊ธฐ! ๐ช
date: 2022-05-10 19:16:19 +0900
---

> CRA(create-react-app)๋ฅผ ์ด์ฉํด์ ๋๋ฌด๋ ๊ฐ๋จํ๊ฒ ๋ฆฌ์กํธ ํ๋ก์ ํธ๋ฅผ ์์ฑํ  ์ ์์์ง๋ง,  
> CRA๊ฐ ์ด๋ค ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค๋ก ๊ตฌ์ฑ๋์ด ์๋์ง ์ดํดํ๊ณ , ๋์๊ฒ ํ์ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ๋ง์ ์ค์นํ์ฌ ์ต์ ํํ๊ธฐ ์ํด ์นํฉ์ ์ด์ฉํด ์ง์  ๋ฆฌ์กํธ ๊ฐ๋ฐ ํ๊ฒฝ์ ๊ตฌ์ถํด ๋ณด๋ ๊ฒ์ด ์ข์ ๊ฒ ๊ฐ๋ค ์๊ฐ์ด ๋ค์๋ค.  
> ํ์์ ๋ช ๋ฒ ์ง์  ๊ตฌ์ถํด ๋ณธ ์ ์ด ์์ง๋ง ๋ด์ฉ์ ๋ค์ ์ ๋ฆฌํ๊ณ  ์ฌ๋ฌ ๋ฒ ๋ฐ๋ณตํด ๋ณด๋ฉด์ ์นํฉ์ ์ด์ฉํ ๊ฐ๋ฐ ํ๊ฒฝ ๊ตฌ์ถ์ ์ต์ํด์ง๊ณ ์ ํ๋ค.

# 1. ํด๋ ์ด๊ธฐํ

## 1-1. ํ๋ก์ ํธ ํด๋ ์์ฑ ๋ฐ ์ด๊ธฐํ

```zsh
mkdir ํ๋ก์ ํธ๋ช
```

ํ๋ก์ ํธ ํด๋๋ก ์ด๋ํด `init` ๋ช๋ น์ด๋ฅผ ํตํด ํด๋๋ฅผ ์ด๊ธฐํํ๋ฉด `package.json` ํ์ผ์ด ์์ฑ๋๋ค.

```shell
npm init -y
```

> \* `-y` ์ต์ ์ฌ์ฉ ์ ํ๋ก์ ํธ์ ๋ํ ๊ธฐ๋ณธ ์์์ ์ผ์ผ์ด ์ง์ ํด ์ค ํ์ ์์ด default ๊ฐ์ผ๋ก ์ค์ ๋ package.json ํ์ผ์ด ์์ฑ๋๋ค.  
> `y`๋ `yes`๋ฅผ ์๋ฏธ

## 1-2. ํ๋ก์ ํธ ๋ด๋ถ ํด๋ ๋ฐ ํ์ผ ์์ฑ

๊ธฐ๋ณธ์ ์ธ ํ๋ก์ ํธ ๊ตฌ์กฐ์์ ํ์ํ ํด๋๋ค์ ์์ฑํ๋ค.  
์๋ฅผ ๋ค๋ฉด `/src`, `/public`, `/dist`(ํน์ `/build`) ๋ฑ์ด ์๋ค.

```bash
mkdir src public dist
```

๊ทธ๋ฆฌ๊ณ  `public/index.html` ํ์ผ๊ณผ `src/index.js`, `src/App.js` ํ์ผ์ ๊ฐ๊ฐ ์์ฑํด์ค๋ค.

src/index.html

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

src/index.js

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

src/App.js

```js
import React from "react";

function App() {
  return <div className="App">Hello World!</div>;
}

export default App;
```

\* `import React from "react";` ์ฝ๋๋ babel ์ค์  ์ `runtime : automatic` ์ต์์ผ๋ก ์๋ต ๊ฐ๋ฅํ๋ค. [๋ฐ๋ฒจ ์ค์ ](#3-2-๋ฐ๋ฒจ-์ค์ )

# 2. ๋ฆฌ์กํธ ์ค์น

๊ธฐ๋ณธ์ ์ผ๋ก ์ค์นํ  React ๊ด๋ จ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ ๋ค์๊ณผ ๊ฐ๋ค.

```bash
npm i react react-dom
```

- **react** : ๋ฆฌ์กํธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
- **react-dom**: React ์ฝ๋์ DOM์ ์ฐ๊ฒฐํ๊ธฐ ์ํ ๋ฉ์๋๋ฅผ ์ ๊ณตํ๋ค(ex: `ReactDom.render()`)

# 3. ๋ฐ๋ฒจ ์ค์น ๋ฐ ์ค์ 

์ต์  ๋ฒ์ ์ผ๋ก ์์ฑ๋ ์๋ฐ์คํฌ๋ฆฝํธ ์ฝ๋๋ฅผ ๊ตฌํ ๋ธ๋ผ์ฐ์ ์์๋ ์ฌ์ฉ๊ฐ๋ฅํ๋๋ก ํ๊ธฐ ์ํด babel์ ์ค์นํด ์ฃผ์.

## 3-1. ๋ฐ๋ฒจ ์ค์น

`Babel` : javascript ํธ๋์คํ์ผ๋ฌ

- ์ต์  ์๋ฐ์คํฌ๋ฆฝํธ ์ฝ๋๋ฅผ ๊ตฌ ๋ฒ์ ์ ๋ธ๋ผ์ฐ์ ์์๋ ์ฌ์ฉํ  ์ ์๋๋ก ๋ณํ์์ผ์ค๋ค.

```bash
npm i -D @babel/core @babel/preset-react @babel/preset-env
```

- **@babel/core** : ๋ฐ๋ฒจ์ ํต์ฌ ํจํค์ง
- **@babel/preset-env**: ES6์ด์์ ๋ฌธ๋ฒ์ผ๋ก ์์ฑ๋ ์ฝ๋๋ฅผ ES5 ๋ฌธ๋ฒ์ ์ฝ๋๋ก ๋ณํํด ์ฃผ๋ ๊ท์น๋ค์ ๋ชจ์๋์ preset์ด๋ฉฐ ๋ธ๋ผ์ฐ์  [polyfill](#polyfill) ์ ์ ๊ณตํ๋ค.
- **@babel/preset-react** : react๋ฅผ ์ํ ํ๋ฌ๊ทธ์ธ์ ๋ชจ์๋ [preset](#preset)์ด๋ฉฐ JSX ๋ฌธ๋ฒ์ ์ฌ์ฉํ  ์ ์๊ฒ ํด์ค๋ค.

## 3-2. ๋ฐ๋ฒจ ์ค์ 

๋ฐ๋ฒจ ์ ์ฉ ์ ์ฌ์ฉํ  preset ์ต์์ ์ง์ ํด ์ฃผ๊ธฐ ์ํด `config` ํ์ผ์ ์์ฑํ๋ค.  
๋ฐ๋ฒจ์ ๋ํ ์ค์ ์ `.babelrc`, `babel.config.json` ํน์ `package.json` ํ์ผ์ด๋, webpack๊ณผ ํจ๊ป ์ฌ์ฉํ  ๊ฒฝ์ฐ `webpack.config.js` ํ์ผ์์๋ ๊ฐ๋ฅํ๋ค.

- **.babelrc** : .babelrc.json์ ๋ณ์นญ. ํ๋ก์ ํธ์ ์ผ๋ถ๋ถ(ํ์ผ/๋๋ ํ ๋ฆฌ)์์๋ง ์ ์ฉ๋๋ ๊ตฌ์ฑ์ด ์์ ๊ฒฝ์ฐ์ ์ ํฉ.(ex: babel์ ์ ์ฉํ๊ณ  ์ถ์ง ์์ ํ์ฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์์ ๊ฒฝ์ฐ)
- **babel.config.json** : ๋จ์ผ babel config๋ฅผ ์ฌ์ฉํ๋ ํ๋ก์ ํธ์์ ์ฌ๋ฌ ํจํค์ง ๋๋ ํ ๋ฆฌ๊ฐ ์๋ ๊ฒฝ์ฐ ์ ์ฉ. (ex: node_modules ์ฌ์ฉ ์)

> \* `.js` ํ์ผ ํ์ฅ์ ์ฌ์ฉ ์ babel config API๊ฐ ๋ธ์ถ๋๋ฉฐ ์ด๋ ์บ์ฑ๊ณผ ๊ด๋ จํด ๋ณต์ก์ฑ์ ์ฆ๊ฐ์ํค๊ธฐ ๋๋ฌธ์ ๋๋ถ๋ถ์ ํ์ผ ํ์ฅ์๋ฅผ `.json`์ผ๋ก ํ๋ ๊ฒ์ด ์ข๋ค๊ณ  ํ๋ค.

1. babel.config.json ์ผ๋ก ์ค์ ํ๊ธฐ

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

2. webpack.config.js์์ loader ์ค์  ์ ํจ๊ป ์ค์ ํ๊ธฐ

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
    ],
  },
};
```

> \* `runtime: "automatic"`
> : JSX๋ฅผ React.createElement๋ก ๋ณํํ๋ ๊ฒ์ด ์ด์  ๋ฐฉ์์ธ๋ฐ React17 ์ดํ๋ถํฐ ์๋์ผ๋ก React๋ฅผ ๊ฐ์ ธ์ค๋ ๋ฐฉ์์ผ๋ก ๋ณ๊ฒฝ๋์ด์ React import๋ฅผ ์๋ตํ๋ ๊ฒ์ด ๊ฐ๋ฅํ๋ค.
> ํ์ง๋ง `@babel/preset-react`์์ ์ด๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์ `runtime :automatic` ์ต์์ ์ค์ ํด ์ฃผ์ด์ผ ํ๋ค.(๊ธฐ๋ณธ์ classic)

# 4. ์นํฉ ์ค์น ๋ฐ ์ค์ 

Javascript ์ฝ๋๋ฅผ ๋ชจ๋ํํ์ฌ ๊ด๋ฆฌํ๊ณ , ์น ๊ฐ๋ฐ์ ํ์ํ ์์๋ค์ ์๋ํํ๊ธฐ ์ํด ์นํฉ์ ์ค์นํด ์ฃผ์.

## 4-1. ์นํฉ ์ค์น

`webpack` : Javascript ์ ์  [๋ชจ๋ ๋ฒ๋ค๋ฌ](#๋ชจ๋-๋ฒ๋ค๋ฌ)

- ํ์ผ ๋จ์์ ์๋ฐ์คํฌ๋ฆฝํธ ๋ชจ๋ ๊ด๋ฆฌ
- ์น ๊ฐ๋ฐ ์์ ์๋ํ(ํ์ผ ๋ฐ ์ด๋ฏธ์ง ์์ถ, CSS ์ ์ฒ๋ฆฌ๊ธฐ ๋ณํ ๋ฑ)
- ์น ์ ํ๋ฆฌ์ผ์ด์์ ๋น ๋ฅธ ๋ก๋ฉ ์๋์ ๋์ ์ฑ๋ฅ ์ง์

```bash
npm i -D webpack webpack-cli webpack-dev-server
```

> `-D` ์ต์ : devDependencies์ ํจํค์ง๊ฐ ์ถ๊ฐ๋จ. ๋ฐฐํฌํ  ํ๋ก์ ํธ๋ฅผ ๋น๋ํ  ๋ devDependencies์ ์ถ๊ฐ๋ ํจํค์ง๋ค์ ํฌํจ๋์ง ์๋๋ค.

- **webpack** : ์นํฉ ํต์ฌ ํจํค์ง
- **webpack-cli**: ์นํฉ์ ์ปค๋งจ๋๋ผ์ธ์์ ์ฌ์ฉํ  ์ ์๊ฒํด ์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
- **webpack-dev-server**: ์นํฉ ๊ฐ๋ฐ ์๋ฒ๋ฅผ ๊ตฌ๋ํ  ์ ์๊ฒ ํ๊ณ (npm run dev), ์ค์๊ฐ ๋ฆฌ๋ก๋ฉ์ ์ง์

## 4-2. loader ์ค์น

javascript ํ์ผ์ด ์๋ html, css images, ํฐํธ ๋ฑ์ ํ์ผ๋ค๋ ์นํฉ์ด ํด์ํ  ์ ์๋๋ก ๋ณํํด ์ฃผ๋ ๋ก๋๋ค์ ์ค์นํด ์ฃผ์.

`Loader`: js, json ํ์ผ ์ธ์ html, css, images ํฐํธ ๋ฑ์ ํ์ผ์ ๋ชจ๋๋ก ๋ถ๋ฌ์ ๋ฒ๋ค๋ง ํ๊ธฐ ์ํด ์ฌ์ฉ.

```bash
npm i -D babel-loader style-loader css-loader
```

- **babel-loader**: JSX ๋ฐ ES6+ ๋ฌธ๋ฒ์ ๋ณํ.
- **style-loader**: ๋ณํ๋ CSSํ์ผ์ <style> ํ๊ทธ๋ก ์ฝ์
- **css-loader**: .css ํ์ผ์ ์ฝ๊ธฐ์ํ ๋ก๋

## 4-3. ํ๋ฌ๊ทธ์ธ ์ค์น

์นํฉ์ ๊ธฐ๋ณธ์ ์ธ ๋์์ ์ถ๊ฐ์ ์ธ ๊ธฐ๋ฅ๋ค์ ์ ๊ณตํ๊ธฐ ์ํด ํ๋ฌ๊ทธ์ธ์ ์ค์นํด ์ฃผ์.

`Plugin`: ์นํฉ ๋ฒ๋ค๋ง ํ ๋ณํ๋ ํ์ผ์ ์ถ๊ฐ์ ์ธ ๊ธฐ๋ฅ์ ๋ํ๊ธฐ ์ํด ์ฌ์ฉํ๋ค.

```
npm i -D html-webpack-plugin clean-webpack-plugin
```

- **html-webpack-plugin**: ๋ฒ๋ค๋ง๋ cssํ์ผ๊ณผ jsํ์ผ์ htmlํ์ผ์ link, script ํ๊ทธ๋ก ์ถ๊ฐํด ์ฃผ์ด์ผ ํ  ๋ ์ด๋ฅผ ์๋ํํ์ฌ html ํ์ผ์ ์์ฑํด์ค๋ค.
- **clean-webpack-plugion**: ๋น๋๋ ๊ฒฐ๊ณผ๋ฌผ์ ์๋ ์ ๋ฆฌํ๋ ํ๋ฌ๊ทธ์ธ์ผ๋ก ์ด์  ๋น๋ ๊ฒฐ๊ณผ๋ฌผ์ ์ ๊ฑฐํ๋ค.

## 4-4. ์นํฉ ์ค์ 

`webpack.config.js` ํ์ผ์ ์์ฑํด ๋ค์๊ณผ ๊ฐ์ด ์์ฑํ๋ค.

### mode & entry & output ์ค์ 

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/",
  },
};
```

### modules - loader ์ค์ 

```js
...
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: "babel-loader",
      },
    ],
  },
```

### ํ๋ฌ๊ทธ์ธ ์ค์ 

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
...
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  ...
}
```

# 5. ์คํ ์คํฌ๋ฆฝํธ ์์ฑ

`npm start` ๋ช๋ น์ ํตํด์ ์นํฉ ์๋ฒ๋ฅผ ๊ตฌ๋์ํค๊ธฐ ์ํด์ ์คํฌ๋ฆฝํธ๋ฅผ ์์ฑํด ์ฃผ์.

`package.json`

```json
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
```

`webpack serve` = `webpack-dev-server`์ ๋์ผํ๋ค.

- **production(๋ฐฐํฌ) ๋ชจ๋** : ๋ก๋ ์๊ฐ์ ์ค์ด๊ธฐ ์ํด ๋ฒ๋ค ์ต์ํ, ๊ฐ๋ฒผ์ด ์์ค๋งต ๋ฐ ์ ์ ์ต์ ํ์ ์ด์ ์ ๋ง์ถค
- **development(๊ฐ๋ฐ) ๋ชจ๋** : ๊ฐ๋ฐ ์์ฐ์ฑ์ ๋์ด๊ธฐ ์ํ ๋ชจ๋. ๋ฒ๊ทธ๋ฐ์ ์ํ์ด ์๋ ์ฝ๋๋ฅผ ๋ฏธ๋ฆฌ ๊ฒฝ๊ณ ํด ์ฃผ๋ ๊ฒ์ฆ ์ฝ๋๋ ํฌํจ๋์ด ์๋ค.

# 6. ๊ฐ๋ฐ ์์ ์์ฃผ ์ฌ์ฉํ๋ ์ค์ ๋ค

์์ ๋ด์ฉ๊น์ง๊ฐ ๊ธฐ๋ณธ์ ์ผ๋ก React ํ๋ก์ ํธ๋ฅผ ์ํด ํ์ํ ์ค์  ๋จ๊ณ์ด๊ณ , ์ด ์ธ์ ๊ฐ๋ฐ ์ ์์ฃผ ์ฌ์ฉํ๋ ์ค์ ๋ค์ด ์๋ค.

## 6-1. resolve ์ต์

```js
resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    Utilities: path.resolve(__dirname, 'src/utilities/'), //import Utility from 'Utilities/utility'; ์ฌ์ฉ ๊ฐ๋ฅ
  },
}
```

#### extensions

> ์นํฉ์ด ๋ชจ๋์ ์ฒ๋ฆฌํ๋ ๋ฐฉ์์ ์ค์ ํ๋ฉฐ ์์์๋ถํฐ ์ฐจ๋ก๋๋ก ํ์ผ์ ํด์ํ๋ค. ์ด ์ค์ ์ ํตํด import์ ํ์ฅ์๋ฅผ ์๋ตํ  ์ ์๋ค.(์ค์ ํด ์ฃผ์ง ์๊ณ  `.jsx` ํ์ผ์ ํ์ฅ์ ์์ด import์ ์ค๋ฅ ๋ฐ์)

#### alias

> ํน์  ๊ฒฝ๋ก์ ๋ณ์นญ์ ์ง์ ํ์ฌ ์ฌ์ฉํ  ์ ์๋ค.

## 6-2. devtool ์ต์

#### ์์ค๋งต ์ค์ 

**Source Map** : ๋ฐฐํฌ์ฉ์ผ๋ก ๋น๋ํ ํ์ผ๊ณผ ์๋ณธ ํ์ผ์ ์ฐ๊ฒฐ์์ผ์ฃผ๋ ๊ธฐ๋ฅ์ผ๋ก, ์๋ฌ๊ฐ ๋ฐ์ํ ๋ฐฐํฌ์ฉ ํ์ผ์ ํน์  ๋ถ๋ถ์ด ์๋ณธ์์ ์ด๋ ๋ถ๋ถ์ธ์ง ํ์ธ์ด ๊ฐ๋ฅํ๋ค.

```js
module.exports = {
  devtool: "eval-cheap-module-source-map",
};
```

## 6-3. devServer ์ต์

```js
module.exports = {
  ...
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  }
}
```

#### ์๋ฒ ์คํ ์ ์๋์ผ๋ก ๋ธ๋ผ์ฐ์  ์ด๊ธฐ - open : true

`devServer` option์ ์์ฑํ๋ ๋ด์ฉ๋ค์ `package.json` `scripts`์ ์ต์์ผ๋ก ์ถ๊ฐํ์ฌ ์ฌ์ฉํ  ์๋ ์๋ค.`"start": "webpack serve --open"`

#### ์ฃผ์์ฐฝ์ url ์ง์  ์๋ ฅ์/์๋ก๊ณ ์นจ ์ 404 ์๋ฌ ๋ฌธ์  - historyApiFallback : true

**historyApiFallback**

> History API ๋๋ react-router ์ฌ์ฉ ์ ์ค์ ํด ๋์ url ์ด์ธ์ ๊ฒฝ๋ก๋ก ์ ์ํ์ ๋์๋ index.html์ ์ ๊ณตํ ์ง ๊ฒฐ์ ํ๋ ์ต์

#### ์นํฉ์ผ๋ก ๋น๋ํ ๊ฒฐ๊ณผ๋ฌผ ์ค์๊ฐ์ผ๋ก ๋ฐ์ - hot : true

**HMR(Hot Module Replacement)**

> ์๋ก๊ณ ์นจ ์์ด ์นํฉ์ผ๋ก ๋น๋ํ ๊ฒฐ๊ณผ๋ฌผ์ด ์ค์๊ฐ์ผ๋ก ๋ฐ์๋  ์ ์๊ฒ ๋์์ฃผ๋ ์ค์ 

#### ํ๋ก์ ์ค์  - CORS ์๋ฌ ํด๊ฒฐ

```js
module.exports = {
  ...
  devServer: {
    proxy: {
       '/api': {
        target: 'domain.com',
        changeOrigin: true
      }
    }
  }
};
```

์์ ๊ฐ์ด ์ค์ ํ๋ฉด API ์์ฒญ์ `domain.com` ์ฃผ์์์๋ ๊ฐ์ ๋๋ฉ์ธ์์ ์จ ์์ฒญ์ผ๋ก ์ธ์ํ์ฌ CORS ์๋ฌ๊ฐ ๋์ง ์์.

## 6-4. ํ๋ฌ๊ทธ์ธ

#### ํ๊ฒฝ ๋ณ์์ ๊ฐ์ ์ ์ญ ๋ณ์ ์ฌ์ฉ - DefinePlugin

```js
const webpack = require("webpack");

module.exports = {
  //...
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    /* EnviromentPlugin์ ์ฌ์ฉํด๋ ๋จ.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development' 
    })
    */
  ],
};
```

#### CSS ํ์ผ ๋ถ๋ฆฌ - MiniCssExtractPlugin

CSS ํ์ผ์ ๋ณ๋๋ก ๋ถ๋ฆฌํํ์ฌ ๋ฒ๋ค๋งํ๋ ํ๋ฌ๊ทธ์ธ์ผ๋ก ํฐ ์ฌ์ด์ฆ์ ์ ํ๋ฆฌ์ผ์ด์์ ๊ฒฝ์ฐ ์ฌ์ฉํ๋ฉด ์ข๊ณ  ๋ฐฐํฌ ์์ ์ฌ์ฉํ๋ค.  
style-loader๋ cssํ์ผ์ ์ฝ์ด `<style>`๋ก ๋ง๋ค์ด `<head>` ํ๊ทธ์ ์ฝ์ํ๋ js ์ฝ๋๋ฅผ ์์ฑํ๋๋ฐ, ์ด๋ฌํ cssํ์ผ์ด ๋ง์ ๊ฒฝ์ฐ js ํ์ผ๋ ํฌ๊ธฐ๊ฐ ๋์ด๋  ์๋ฐ์ ์๊ธฐ ๋๋ฌธ์ css ํ์ผ์ ๋ณ๋๋ก ๋ถ๋ฆฌํ์ฌ ๋ฒ๋ค๋งํ๋ ๊ฒ์ด ์ข๋ค.

- style-loader์ ํจ๊ป ์ฌ์ฉ ๋ถ๊ฐ

## 6-5. module ์ต์

```js
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    },
  ];
}
```

`type: "asset/resoure"` : asset์ ๋ณ๋์ ํ์ผ๋ก ๋ด๋ณด๋ด๋ ๋ชจ๋

์ฉ๋์ด ๋น๊ต์  ์์ svg ํ์ผ์ inline์ผ๋ก ๋ฒ๋ค์ ํฌํจ์ํค๋ ๊ฒ์ด ์ข๋ค. - `type : "asset/inline"`

#### svg ์ฌ์ฉ์ํด์๋ svgr ์ค์น

```bash
npm i -D @svgr/webpack
```

```js
 {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
```

## 6-6. ๊ทธ ์ธ ํ๋ฌ๊ทธ์ธ

- ์๋ฐ์คํฌ๋ฆฝํธ ๋ฒ๋ค ์ฌ์ด์ฆ๋ฅผ ์ค์ด๋ uglity(์ฝ๋ ๋๋ํ) ํ๋ฌ๊ทธ์ธ : terser-webpack-plugin
- ์ด๋ฏธ์ง ํ์ผ ์ต์ ํ ํ๋ฌ๊ทธ์ธ : image-minimizer-webpack-plugin
- ๋ฏธ๋์ด ์ฟผ๋ฆฌ ํ๋ฌ๊ทธ์ธ : media-query-plugin
  > ๋ชจ๋ฐ์ผ/PC์์ ๊ฐ๊ฐ ํ์ํ ๋ฏธ๋์ด ์ฟผ๋ฆฌ ์ฝ๋๋ง ์ถ์ถํด ๋น๋๊ธฐ๋ก ๋ก๋
- CSS ์ต์ ํ ํ๋ฌ๊ทธ์ธ : css-minimazier-webpack-plugin

# 7. ์ปจ๋ฒค์ ํต์ผํ๊ธฐ - ESLint, Prettier ์ค์ 

์ฝ๋ ์์ฑ ์คํ์ผ์ ํต์ผํ๊ณ  ์ค๋ฅ๋ฅผ ๋ฐฉ์งํ๊ธฐ ์ํด์ `eslint`์ `prettier` ์ค์ ๊น์ง๋ ๊ธฐ๋ณธ ํ๋ก์ ํธ ํ๊ฒฝ ๊ตฌ์ถ์ ํฌํจ๋๋ ํธ์ด๋ค.  
์ด์ ๋ํ ๋ด์ฉ์ ๋ฐ๋ก ์ ๋ฆฌํด์ ์ฌ๋ฆด ์์ ์ด๋ค.

# ์ฉ์ด ์ ๋ฆฌ

- #### preset
  > plugin๋ค์ ๋ชจ์๋์ bundle
- #### polyfill
  > ๋ธ๋ผ์ฐ์ ์์ ์ง์ํ์ง ์๋ ๊ธฐ๋ฅ์ ์ง์ ๊ฐ๋ฅํ๋๋ก ์์ฑํ ์ฝ๋๋ฅผ ๋งํ๋ฉฐ, transfile๋ง์ผ๋ก ํด๊ฒฐํ  ์ ์๋ ๊ธฐ๋ฅ์ ๊ตฌํํ ์ฝ๋์ด๋ค.
- #### ๋ชจ๋ ๋ฒ๋ค๋ฌ
  > ์น ์ ํ๋ฆฌ์ผ์ด์์ ๊ตฌ์ฑํ๋ ์์(HTML,CSS,Javascript,Images ๋ฑ) ๊ฐ๊ฐ์ ๋ชจ๋ ๋ชจ๋๋ก ๋ณด๊ณ  ์ด๋ฅผ ์กฐํฉํ์ฌ ๋ณํฉ๋ ํ๋์ ๊ฒฐ๊ณผ๋ฌผ์ ๋ง๋๋ ๋๊ตฌ

> ๐ ์ฐธ๊ณ   
> [React Docs](https://ko.reactjs.org/docs/getting-started.html)  
> [ReactDOM Docs](https://ko.reactjs.org/docs/react-dom.html)  
> [Babel Docs](https://babeljs.io/docs/en/)  
> [stack overflow - When to use babel.config.js and .babelrc](https://stackoverflow.com/questions/60288375/when-to-use-babel-config-js-and-babelrc)  
> [์นํฉ ํธ๋๋ถ](https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html#%EB%AA%A8%EB%93%88%EC%9D%B4%EB%9E%80)
