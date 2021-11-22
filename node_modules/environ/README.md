# Environ

Pretty secure detection of Node, browser, Electron, Deno, and other execution environments.

* Zero dependencies.
* Tree-shaking friendly so you're only left with what you use.

## Install

```shell
yarn add environ
```

Or

```shell
npm install --save environ
```

## Usage

```javascript
// esm usage (Typescript, Babel,  Node 12+ with flags)
import { isBrowser } from 'environ'

// commonjs usage
const { isBrowser } = require('environ')

if (isBrowser()) {
  // do something
}
```
