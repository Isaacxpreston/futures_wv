<template lang='pug'>
  div(class='image-label fonts' v-bind:class="type")
    div(class='inner utility' )
      slot
</template>

<script>
  export default {
    props: ['type']
  }
</script>

<style scoped lang="scss">
  @import '../../styles/breakpoints.scss';

  .image-label {
    //width: 225px;
    //height: 48px;
    // width: 100%;
    background: white;
    cursor: pointer;
    user-select: none;
    // &.normal {
    //   @media screen and (max-width: $tablet-size) {
    //     height: 36px;
    //     .inner {
    //       padding-top: 6px;
    //       padding-left: 12px;
    //     }
    //   }
    // }
    // &.more-in {
    //   @media screen and (max-width: $mobile-size) {
    //     height: 36px;
    //     width: 100%;
    //     .inner {
    //       padding-top: 6px;
    //     }
    //   }
    // }
  }
  .inner {
    padding: 12px;
    padding-left: 24px;
    padding-right: 24px;
    text-align: left;
  }

</style>

