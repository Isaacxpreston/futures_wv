<template>
  <div class="navbar-mobile">
    <div class="nav-icon left" v-on:click="emit_clicked">
      <bf-logo v-on:clicked="emit_clicked"></bf-logo>
      <div class="bf-trigger"></div>
    </div>
    <div class="nav-icon right">
      <hamburger v-on:toggle="toggle"></hamburger>
    </div>
  </div>
</template>

<script>
  import hamburger from '../atoms/hamburger'
  import bf_logo from '../SVG/bf_logo'
  export default {
    components: {
      'hamburger': hamburger,
      'bf-logo': bf_logo
    },
    methods : {
      toggle: function () {
        this.$emit('toggle')
      },
      emit_clicked: function () {
        this.$emit('clicked')
      }
    }
  }
</script>


<style scoped lang="scss">
  @import '../../styles/breakpoints.scss';
  .navbar-mobile {
    width: 100%;
    height: 60px;
    position: fixed;
    overflow: hidden;
    z-index: 2;
    top: 0;
    left: 0;
    background: white;
    display: none;
    pointer-events: none;
    user-select: none;
    cursor: pointer;
    @media screen and (max-width: $mobile-grid) {
      display: block;
      pointer-events: auto;
    }
  }
  .nav-icon {
    position: absolute;
    top: 0;
    height: 24px;
    &.left {
      left: 0;
      margin-left: 24px;
      margin-top: 20px;
    }
    &.right {
      right: 0;
      margin-right: 24px;
      margin-top: 18px;
    }
  }
  .bf-trigger {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -12px;
    margin-left: -12px;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    cursor: pointer;
    z-index: 1;
  }
</style>

