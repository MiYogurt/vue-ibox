<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 53 50"
  >
    <path
      d="M436.5,275.5a21,21,0,1,0,21-21"
      transform="translate(-429 -250)"
      style="fill:#000;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px"
    />
    <polygon
      points="3 24 7.5 18 12 24 3 24"
      style="stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Redo extends Vue {}
</script>


<style lang="stylus" scoped>
svg {
    width 14px
    margin-right 5px
    top -2px
    position relative
}
</style>


