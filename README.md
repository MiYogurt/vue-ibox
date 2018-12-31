# vue-ibox

## how to use
```
npm install vue-ibox
```

```
import IBox from 'vue-ibox'
import 'vue-ibox/dist/ibox.css'
Vue.component('IBox',IBox)
```

```
<i-box :img="src" link="https://www.baidu.com" @close="close"></i-box>
```

> TIP
UMD library gobal variable name is `window.Ibox`


# props

## `img `

imgSrc

## `link`

A href link url

## `label`

Set your language label


```js
// default
{
    reset: "重置",
    link: "跳转",
    large: "放大",
    small: "缩小",
    close: "关闭"
}
```

# event

## `close`

When user click close btn you should reset img variable

```
close() {
    this.img = ''
}
```