# vue-ibox

## how to use
```
npm install vue-ibox
```

```
import IBox from 'vue-ibox'
import 'vue-ibox/dist/vue-ibox.css'
Vue.component('IBox',IBox)
```


# props

* img 

imgSrc

* link

a href link url

* label

set your language label

default is

```
{
    reset: "重置",
    link: "跳转",
    large: "放大",
    small: "缩小",
    close: "关闭"
}
```

# event

* close

when user click close btn you should reset img variable


```
close() {
    this.img = ''
}
```