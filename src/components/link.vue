<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 66 39"
  >
    <path
      d="M22.39,37H14A12,12,0,0,1,2,25V14A12,12,0,0,1,14,2h8.39"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px"
    />
    <path
      d="M42.54,2H52A12,12,0,0,1,64,14V25A12,12,0,0,1,52,37H42.54"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px"
    />
    <line
      x1="18"
      y1="19"
      x2="47"
      y2="19"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px"
    /></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Link extends Vue {}
</script>


<style lang="stylus" scoped>
svg {
    width 17px
    margin-right 7px
    top -2px
    position relative
}
</style>


