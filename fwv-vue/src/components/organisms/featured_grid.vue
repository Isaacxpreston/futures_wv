<template>
    <!--'featured projects' and 'closer look' grid-->
    <div class="fonts featured-grid" v-bind:class="[customclass]">
      <div class="image-row top-row">
        <div class="wide-image">
          <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" customclasses="cover" type="expand"></labeled-image>
        </div>
        <div class="tall-image">
          <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" customclasses="cover" type="expand"></labeled-image>
        </div>
      </div>
      <div class="image-row bottom-row">
        <div class="tall-image">
          <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" customclasses="cover" type="expand"></labeled-image>
        </div>
        <div class="wide-image">
          <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" customclasses="cover" type="expand"></labeled-image>
        </div>
      </div>
    </div>
</template>

<script>
  import labeled_image from '../molecules/labeled_image'
  
  export default {
    props: ['customclass'],
    components: {
      'labeled-image': labeled_image
    }
  }
</script>

<style lang="scss">

//   @import '../../styles/breakpoints.scss';
//   @import '../../styles/colors.scss';

//   // $mobile-grid: 824px;

//   .featured-grid {
//     position: relative;
//     width: 100%;
//     // max-width: 1280px;
//     overflow: hidden;
//     height: calc(516px + 516px + 60px);
//     margin: auto;
//     margin-bottom: 108px;
//     @media screen and (max-width: 1150px) {
//       height: calc(240px + 240px + 24px);
//       width: calc(100% - 152px);
//       margin-left: 128px;
//       margin-right: 24px;
//       margin-bottom: 24px;
//     }
//     @media screen and (max-width: $mobile-grid) {
//       height: calc(240px + 240px + 240px + 240px + 24px + 24px + 24px);
//       width: 100%;
//       margin-left: 0px;
//       margin-right: 0px;
//       margin-top: 24px;
//     }
//     &.no-bottom {
//       margin-bottom: 0px;
//     }
//   }
//   .image-row {
//     position: absolute;
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//     height: 516px;
//     @media screen and (max-width: 1150px) {
//       justify-content: flex-end;
//       height: 240px;
//     }
//     @media screen and (max-width: $mobile-grid) {
//       height: auto;
//       flex-direction: column;
//     }
//     &.top-row {
//       top: 0;
//       right: 0;
//       margin-top: 0px;
//       .tall-image, .wide-image {
//         top: 0;
//         left: 0;
//       }
//       .tall-image {
//         margin-left: calc(628px + 128px);
//         @media screen and (max-width: 1150px) {
//           margin-left: 24px;
//         }
//         @media screen and (max-width: $mobile-grid) {
//           margin-left: auto;
//           margin-top: 24px;
//         }
//       }
//     }
//     &.bottom-row {
//       bottom: 0;
//       left: 0;
//       .tall-image, .wide-image {
//         bottom: 0;
//         left: 0;
//       }
//       .tall-image {
//         margin-left: 128px;
//         @media screen and (max-width: 1150px) {
//           margin-left: auto;
//         }
//         @media screen and (max-width: $mobile-grid) {
//           margin-bottom: 24px;
//         }
//       }
//       .wide-image {
//         margin-left: calc(128px + 128px + 395px);
//         @media screen and (max-width: 1150px) {
//           margin-left: 24px;
//         }
//         @media screen and (max-width: $mobile-grid) {
//           margin-left: 0px;
//         }
//       }
//     }
//   }
//   .tall-image, .wide-image {
//     position: absolute;
//     background: rgba(255, 0, 0, 0.15);
//     @media screen and (max-width: 1150px) {
//       position: relative;
//     }
//   }
//   .wide-image {
//     width: 628px;
//     height: 468px;
//     @media screen and (max-width: 1150px) {
//       width: 100%;
//       height: 240px;
//     }
//   }
//   .tall-image {
//     width: 395px;
//     height: 516px;
//     @media screen and (max-width: 1150px) {
//       width: 100%; //286px;
//       height: 240px; //216px;
//     }
//   }
</style>
