<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="setSrc"> opn </button>
    <iBox :img="src" link="https://www.baidu.com" @close="close"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import iBox from './components/iBox.vue';

@Component({
  components: {
    HelloWorld,
    iBox
  },
})
export default class App extends Vue {
  src = ''
  setSrc(){
    this.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546264440122&di=f283efdf2aca568903399fade3ba0519&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201311%2F19%2F20131119204800_HLkRx.jpeg"
  }
  close(){
    this.src  = ''
  }
}
</script>


<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
