<template>
  <div class="fonts individual-grid">
    <div class="half-row">
      <div class="half-image left">
        <image-component image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"></image-component>
        <!-- <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" customclasses="cover">Label</labeled-image> -->
      </div>
      <div class="half-image right">
        <image-component image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"></image-component>
      </div>
    </div>
    <div class="full-row">
      <div class="full-image left">
        <image-component image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"></image-component>
      </div>
    </div>
    <div class="half-row">
      <div class="half-image left">
        <image-component image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"></image-component>
      </div>
      <div class="half-image right">
        <image-component image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"></image-component>
      </div>
    </div>
    <div class="full-row">
      <div class="full-image right">
        <image-component image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"></image-component>
      </div>
    </div>
  </div>
</template>

<script>
  import image_component from '../atoms/image_component'

  export default {
    components: {
      'image-component': image_component
    }
  }
</script>

<style scoped lang='scss'>

//   @import '../../styles/breakpoints.scss';

//   // $mobile-grid: 824px;

//   .individual-grid {
//     position: relative;
//   }

//   .full-row {
//     position: relative;
//     width: 1280px;
//     max-width: 100%;
//     height: 588px;
//     overflow: hidden;
//     margin: auto;
//     margin-bottom: 108px;
//     @media screen and (max-width: $tablet-size) {
//       height: 384px;
//       margin-bottom: 60px;
//     }
//     @media screen and (max-width: $mobile-grid) {
//       margin-bottom: 36px;
//     }
//   }
  
//   .full-image {
//     position: absolute;
//     width: 1046px;
//     height: 100%;
//     top: 0;
//     @media screen and (max-width: $tablet-size) {
//       width: 724px;
//     }
//     @media screen and (max-width: $mobile-grid) {
//       width: 100%;
//     }
//     &.left {
//       left: 0;
//     }
//     &.right {
//       width: calc(100% - 128px);
//       left: 0;
//       margin-left: 128px;
//       @media screen and (max-width: $mobile-grid) {
//         width: calc(100% - 48px);
//         right: auto;
//         left: 0;
//         margin-left: 24px;
//       }
//     }
//   }

//   .half-row {
//     position: relative;
//     width: 1280px;
//     max-width: 100%;
//     height: 750px;
//     overflow: hidden;
//     margin: auto;
//     margin-bottom: 108px;
//     @media screen and (max-width: $tablet-size) {
//       height: calc(96px + 384px);
//       margin-bottom: 60px;
//     }
//     @media screen and (max-width: $mobile-grid) {
//       height: calc(720px + 72px);
//       margin-bottom: 36px;
//     }
//   }

//   .half-image {
//     position: absolute;
//     width: 395px;
//     height: 528px;
//     @media screen and (max-width: $tablet-size) {
//       width: 286px;
//       height: 384px;
//     }
//     @media screen and (max-width: $mobile-grid) {
//       height: 360px;
//       width: calc(100% - 48px);
//     }
//     &.left {
//       bottom: 0;
//       left: 0;
//       margin-left: 128px; //232px;
//       @media screen and (max-width: $tablet-size) {
//         margin-left: 128px;
//       }
//       @media screen and (max-width: $mobile-grid) {
//         position: relative;
//         margin: auto;
//         margin-bottom: 36px;
//       }
//     }
//     &.right {
//       top: 0;
//       left: 0;
//       margin-left: calc(395px + 128px + 128px); //calc(395px + 232px + 128px);
//       @media screen and (max-width: $tablet-size) {
//         margin-left: calc(128px + 286px + 24px);
//       }
//       @media screen and (max-width: $mobile-grid) {
//         position: relative;
//         margin: auto;
//       }
//     }
//   }
</style>