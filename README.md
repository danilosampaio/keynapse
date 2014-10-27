keynapse
===============
[![NPM version](https://badge.fury.io/js/keynapse.svg)](http://badge.fury.io/js/keynapse) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://travis-ci.org/danilosampaio/keynapse.svg?branch=0.0.5)](https://travis-ci.org/danilosampaio/keynapse)

** beta version **

keynapse is a lightweight front-end library for improve your app navigation. 
Make your app more productive highlighting its main components.

Installation
------------

- [Bower](http://bower.io): `bower install keynapse`.
- [npm](https://www.npmjs.org): `npm install keynapse`.

What's included
------------

Within the build you'll find the following directories and files:

```
keynapse/
├── css/
│   ├── keynapse.min.css
│   └── keynapse-theme.min.css
└── js/
    └── keynapse.min.js
```

Building keynapse
------------

```sh

# Run the default task
grunt

# build with custom theme
grunt --white
```

Usage
------------

Once you've included keynapse javascript and css files, start keynapse just pressing `ctrl + shift + [up|down|left|right]`:


![keynapse.gif](https://github.com/danilosampaio/keynapse/blob/master/doc/keynapse.gif?raw=true "Keynapse working!")


Navigate between main components of your app, pressing 'tab'.

Hotkeys
------------
* `ctrl + shift + [up|down|left|right]`: start/stop keynapse
* `tab`: Navigate between keynapse cells(tags marked with `kn-cell` the main components of application )
* `esc`: reset selected kn-cell to first one, or if selected kn-cell already is first one, stop keynapse
* `[1-9]|[a-z]`: dynamic hotkeys, created for each kn-cell


Developer Usage
------------

* Defining kn-cells

The only thing you need to do is define the main components of your application adding `kn-cell` attribute:

```
<button kn-cell type="submit">Submit</button>
<a kn-cell href="#">Link</a>
```

Roadmap
------------

* Improve documentation
* Create a second method to define `kn-cell` using jquery plugin strategy, like: `$('my selector').keynapse()`
* Create options to use different themes
* Create more themes
* Create enhancements for bootstrap components like grids, menus
* Improve Travis-CI tests

Dependencies
------------

* [jquery](https://jquery.org/)
* [Keypress](http://dmauro.github.io/Keypress)


Copyright and license
------------

The MIT License

Copyright (c) 2014 Danilo Sampaio (danilo.sampaio@gmail.com)

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