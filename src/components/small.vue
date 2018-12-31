<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 47.61 48.5"
  >
    <ellipse
      cx="16.15"
      cy="16"
      rx="14.15"
      ry="14"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px"
    />
    <path
      d="M26.76,27.7,44.61,45.5Z"
      style="fill:#fff;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:6px"
    />
    <line
      x1="10.15"
      y1="16"
      x2="22.15"
      y2="16"
      style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"
    /></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Small extends Vue {}
</script>


<style lang="stylus" scoped>
svg {
    width 14px
    margin-right 7px
    top -1px
    position relative
}
</style>


