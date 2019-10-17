# basic.js

Basic JS is a collection of basic and standard logical functions for programmers who are writing the similar logics repeatedly.

# Installation

### HTML Document
```bash
<script type="text/javascript" src="./basic.js"></script>
```

### Node.js
```bash
var Basic = require("./basic.js");
```

### Typescript
```bash
import * as Basic from "./basic";
```

### Angular

1. Put the JS under the `assets` folder say `/assets/js/basic.js`
2. Go to your `angular.json` file and under `scripts` node of `architect` node put as entry in the array

```bash
"scripts": [
  ...
  "./src/assets/js/basic.js"
]
```

3. Now you can refer the external js in any of your projects components

```bash
...
declare const Basic: any;
...
```

# License

You are free to use this in any way you want, in case you find this useful or working for you but you must keep the copyright notice and license. (MIT)