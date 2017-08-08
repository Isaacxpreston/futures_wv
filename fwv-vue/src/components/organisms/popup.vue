<template>
<div>
  <div class="popup-overlay" v-bind:class="[inactive]" v-on:click="emit_clicked"></div>
  <div class="fonts popup" v-bind:class="[inactive]">
    <div class="close-container">
      <close-icon v-on:clicked="emit_clicked"></close-icon>
    </div>
    <div class="popup-inner" v-bind:class="[inactive]">
      <div class="subheader invisible">Label (removed for now)</div>
      <swiper v-bind:images="imagelist" v-bind:type="type" imageclasses="no-expand" v-bind:wait="wait" nonav="true"></swiper>
    </div>
  </div>
</div>
</template>

<script>
  import close_icon from '../SVG/close_icon'
  import swiper from '../molecules/swiper'

  export default {
    props: ['inactive', 'imagelist', 'wait', 'type'],
    data () {
      return {
        example_image_list: [
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"
        ]
      }
    },
    methods: {
      emit_clicked: function () {
        this.$emit('clicked')
      }
    },
    components: {
      'swiper': swiper,
      'close-icon': close_icon
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/breakpoints.scss';
  @import '../../styles/colors.scss';

  .popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 5;
    width: calc(100% - 96px - 96px - 96px);
    height: calc(100vh - 48px);
    margin-top: 24px;
    background: white;
    display: flex;
    user-select: none;
    transition: all 0.6s ease-in-out;
    transition-delay: 0.15s;
    &.inactive {
      margin-top: 100vh;
      pointer-events: none;
    }
    @media screen and (max-width: $tablet-size) {
      width: calc(100% - 48px);
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
    }
  }
  .popup-inner {
    //INNER is not margin auto on IE
    width: calc(100% - 96px);
    height: calc(100% - 96px);
    text-align: left;
    margin: auto;
    margin-top: 36px;
    transition: all 0.6s ease-in-out;
    transition-delay: 0.15s;
    &.inactive {
      opacity: 0;
    }
    .subheader {
      margin-bottom: 12px;
    }
    @media screen and (max-width: $mobile-size) {
      width: calc(100% - 48px);
    }
  }
  .close-container {
    position: absolute;
    top: 0;
    right: 0;
  }

  .popup-overlay {
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    transition: all 0.6s ease-in-out;
    &.inactive {
      opacity: 0;
      pointer-events: none;
    }
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }
</style>
