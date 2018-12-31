<template>
  <div
    class="photo-box"
    v-show="img"
    @mouseup="up"
    @touchend="up"
    @touchstart="down"
    @mousedown="down"
    @mousemove="move"
    @touchmove="move"
    @dragstart.prevent="noop"
    @mousewheel="wheel"
  >
    <div class="controll-bar">
      <div
        class="large"
        @click="resize('reset')"
      > <redo/> <span>{{label.reset}}</span></div>
      <div
        class="large"
        @click="resize('large')"
      > <large/> <span>{{label.large}}</span></div>
      <div
        class="small"
        @click="resize('small')"
      > <icon-small />  <span>{{label.small}}</span></div>
      <div
        class="link"
        v-show="link"
        @click="openLink"
      > <icon-link/> <span>{{ label.link }}</span></div>
      <div
        class="close"
        @click="close"
      > <icon-close />  <span>{{ label.close }}</span></div>
    </div>
    <img
      :src="img"
      :style="PositionStyle"
      v-show="imgLoaded"
      @load="loaded"
    >
    <div
      class="loading"
      v-if="!imgLoaded"
    ><loading/></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import loading from "./loading.vue";
import redo from "./redo.vue";
import IconClose from "./close.vue";
import IconSmall from "./small.vue";
import large from "./large.vue";
import IconLink from "./link.vue";

const defaultLabel = () => ({
      reset: "重置",
      link: "跳转",
      large: "放大",
      small: "缩小",
      close: "关闭"
})

@Component({
    components: {
        loading,
        redo,
        IconClose,
        IconSmall,
        large,
        IconLink
    }
})
export default class iBox extends Vue {
  @Prop() private img!: string;
  @Prop() private link!: string;

  @Prop({default: defaultLabel }) label! : object ;

  scale = 1;
  firstClickPosition = {
    x: 0,
    y: 0
  };
  firstClickDomPosition = {
    x: 0,
    y: 0
  };

  domPosotin = {
    x: 0,
    y: 0
  };

  imgLoaded = false;
  canMove = false;

  openLink() {
    window.open(this.link);
  }

  close() {
    this.scale = 1;
    this.imgLoaded = false;
    this.$emit("close")
  }

  loaded() {
    this.imgLoaded = true;
  }
  noop() {}
  wheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY | e.detail;
    if (delta < 0) {
      this.resize("small");
    } else {
      this.resize("large");
    }
  }
  resize(type: String, step = 0.1) {
    switch (type) {
      case "large":
        this.scale += step;
        if (this.scale > 2) {
          this.scale = 2;
        }
        break;
      case "small":
        this.scale -= step;
        if (this.scale < 0.1) {
          this.scale = 0.1;
        }
        break;
      case "reset":
        this.domPosotin = {
            x: 0,
            y: 0
        }
        this.scale = 1;
        break;
    }
  }
  down(e: any) {
    const img = <HTMLElement>this.$refs.img;
    if (e.touches) {
      e = e.touches[0];
    }
    this.firstClickPosition = {
      x: e.clientX,
      y: e.clientY
    };
    this.firstClickDomPosition = Object.assign({}, this.domPosotin)
    this.canMove = true;
  }
  move(e: any) {
    if (!this.canMove) {
      return;
    }
    if (e.touches) {
      e.preventDefault();
      e = e.touches[0];
    }
    const distanceX = e.clientX - this.firstClickPosition.x;
    const distanceY = e.clientY - this.firstClickPosition.y;
    this.domPosotin.x = this.firstClickDomPosition.x + distanceX;
    this.domPosotin.y = this.firstClickDomPosition.y + distanceY;
  }

  up(e: any) {
    this.canMove = false;
  }

  get PositionStyle(){
      return {
          transform: `scale(${this.scale})`,
          left: this.domPosotin.x + "px",
          top: this.domPosotin.y + "px"
      }
  }
}
</script>


<style scoped lang="stylus">
.photo-box
  position fixed
  z-index 99
  left 0
  right 0
  bottom 0
  top 0
  display flex
  justify-content center
  align-items center
  .controll-bar
    position fixed
    top 0
    left 0
    right 0
    height 4rem
    background #000
    color #fff
    z-index 5
    display flex
    justify-content flex-end
    align-items: center
    div
      display flex
      line-height 4rem
      height 4rem
      width 6rem
      justify-content center
      user-select: none;
      font-size .9rem
      font-weight 300
      cursor pointer
      i
        font-size 1.1rem
        margin-right .5rem
      &:hover
        background #232323
  img
    z-index 2
    max-width 100vw
    max-height 100vh
    position relative
    user-select none
  &::after
    background rgba(0,0,0, .95)
    z-index -1
    position absolute
    filter: grayscale(50%)
    left 0
    right 0
    top 0
    bottom 0
    content: ' '

</style>
