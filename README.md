
<h1 align="center"><a href="http://cesardeazevedo.github.io/ng-input/">ng-input</a></h1>
<p align="center">


<img src="http://i.cubeupload.com/rUrKrL.png" />
<h4 align="center">Text Input Effects Directives</h4>
<p align="center">
<a href="http://badge.fury.io/js/ng-input">
<img src="https://badge.fury.io/js/ng-input.svg" />
</a>
<a href="https://travis-ci.org/cesardeazevedo/ng-input">
<img src="https://travis-ci.org/cesardeazevedo/ng-input.svg">
</a>

</p>

</p>

ng-input is a fork from [codrops - Text Input Effects](https://github.com/codrops/TextInputEffects), to work with angular directives.

# Demo


[Demo](http://cesardeazevedo.github.io/ng-input/)

# Install

####Install using `bower`

    bower install ng-input
  
####Install using `npm`

    npm install ng-input

# Usage

Include the `ngInput` as a dependency for your app.

```js
angular.module('myApp', ['ngInput']);
```

add the directive to your html.

  ```html
  <ng-input theme='hoshi'></ng-input>
  ```

# Base Styles
To make it work as the demo page, there is some css properties that you should include.

```css
    *, *:after, *:before {
        box-sizing: border-box;
    }
    
    input{
        font-size: 100%
    }
```
and for bigger
```css
    .input{
        font-size: 150%
    }
```


# Options

- theme
- type
- label
- color
- icon

default attributes from default angular [input directive](https://docs.angularjs.org/api/ng/directive/input)

- name
- ng-model
- ng-required
- ng-minlength
- ng-maxlength
- ng-pattern
- ng-change
- ng-trim

# Icons

The examples are using [material design icons](https://materialdesignicons.com/), you should declare `icon icon--theme mdi mdi-account` to make it work.

````html
<ng-input theme='fumi' icon='icon icon--fumi mdi mdi-account'></ng-input>
```

# Themes

### Our Themes

 > TODO

### [Codrops Themes](http://tympanus.net/Development/TextInputEffects/)

- Haruki
- Hoshi
- Kuro
- Jiro
- Minoru
- Yoko
- Hideo
- Kyo
- Akira
- Ichiro
- Juro
- Madoka
- Kaede
- Isao
- Manami
- Nariko
- Nao
- Yoshiko
- Shoko
- Chisato
- Makiko
- Sae
- Kozakura
- Fumi
- Ruri
- Kohana


# Contributing

Feel free to add your own style.

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request

# Credits

Credit goes to [codrops](http://tympanus.net/codrops/) for an **AWESOME** work with [Text Input Effects](https://github.com/codrops/TextInputEffects)

[check their article](http://tympanus.net/codrops/2015/01/08/inspiration-text-input-effects/)


# License

[LICENSE](./LICENSE)
