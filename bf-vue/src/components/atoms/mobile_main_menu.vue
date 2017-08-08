<template lang='pug'>
  div(class='fonts mobile-main-menu' v-on:click="emit_clicked")
    div(class='svg-container')
      left-chevron
    div(class='p small')
      | Main Menu
</template>

<script>
  import left_chevron from '../SVG/left_chevron'
  export default {
    components: {
      'left-chevron':left_chevron
    },
    methods: {
      emit_clicked: function () {
        this.$emit('clicked')
      }
    }
  }
</script>

<style scoped lang="scss">
  .mobile-main-menu {
    position: relative;
    // background: white;
    height: 18px;
    width: 83px;
    cursor: pointer;
    user-select: none;
    &:hover {
      .svg-container {
        transform: translateX(-4px);
      }
    }
  }
  .svg-container {
    display: inline-block;
    position: absolute;
    left: 0;
    margin-top: -1px;
    margin-left: 1px;
    transition: all 0.2s ease;
  }
  .p {
    position: absolute;
    right: 0;
  }
</style>

