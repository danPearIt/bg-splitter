** NOTE: This project is not maintained. Feel free to fork it if you need to.**

# Angular pane splitter with min and max options

Pane splitter for angular.js based bg-splitter (http://blackgate.github.io/bg-splitter)

## Sample

HTML:
```html

<bg-splitter class ="panel panel-default" orientation="horizontal" style="margin: inherit">
  <bg-pane min-size="40" label="Window Top">
    <bg-splitter orientation="vertical">
      <bg-pane min-size="40" label="Window Right">Pane 1</bg-pane>
      <bg-pane min-size="40" label="Window Left">Pane 2</bg-pane>
    </bg-splitter>
  </bg-pane>
  <bg-pane min-size="50" label="Window buttom">
    <h3 style="margin-left: 20px;">1st graph inner label</h3>
    <div class="col-md-12">Pane 3</div>
  </bg-pane>
</bg-splitter>

```

Javascript:
```javascript
var app = angular.module('myApp', ['bgDirectives']);
```

This project is working out of the box with no need bower.


## Licence

The MIT License

Copyright (c) 2013 blackgate, https://github.com/blackgate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
