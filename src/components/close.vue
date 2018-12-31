<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 46 46"
  >
    <circle
      cx="23"
      cy="23"
      r="21"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px"
    />
    <line
      x1="17"
      y1="29"
      x2="29"
      y2="17"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"
    />
    <line
      x1="29"
      y1="29"
      x2="17"
      y2="17"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"
    /></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Close extends Vue {}
</script>


<style lang="stylus" scoped>
svg {
    width 14px
    margin-right 5px
    top -2px
    position relative
}
</style>


