<template>
    <div class="navbar">
      <div class="nav-inner top">
        <div class="inner-icon" v-on:click="emit_clicked">
          <bf-logo v-on:clicked="emit_clicked"></bf-logo>
          <div class="bf-trigger"></div>
        </div>
      </div>
      <div class="nav-text fonts">
        <div class="text-inner utility">
          <slot></slot>
        </div>
      </div>
      <div class="nav-inner bottom">
        <div class="inner-icon" style="margin-top: 0px;">
          <hamburger v-on:toggle="toggle"></hamburger>
        </div>
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

<style scoped lang='scss'>
  @import '../../styles/breakpoints.scss';

  .navbar {
    width: 80px;
    height: calc(100vh - 48px);
    // max-height: 912px;
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    margin-top: 24px;
    background: white;
    user-select: none;
    cursor: default;
    @media screen and (max-width: $mobile-grid) {
      display: none;
    }
  }
  .nav-text {
    position: absolute;
    user-select: none;
    cursor: default;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    transform: rotate(-90deg);
    height: 24px;
  }
  .text-inner {
    position: absolute; 
    text-align: center; 
    width: calc(100vh - 48px);
    margin-left: calc(-50vh + 64px);
  }
  .nav-inner {
    position: absolute;
    width: 100%;
    height: 48px;
    &.bottom {
      bottom: 0;
      .inner-icon {
        margin-top: 0px;
      }
    }
    &.top {
      top: 0;
      // cursor: grab;
      .inner-icon {
        margin-top: 24px;
      }
    }
  }
  .inner-icon {
    display: inline-block;
    margin: auto; 
  }

  .bf-trigger {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }
</style>