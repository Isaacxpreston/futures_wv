<template>
<div>
  <div v-if="imagelist[0] || imagelist[1]" class="individual-grid first tall">
     <div class="wrapper no-cover"> 
      <div v-if="imagelist[0]" class="tall-image reveal alt">
        <image-component v-bind:image="imagelist[0]" customclass="no-expand"></image-component>
      </div>
      <div v-if="imagelist[1]" class="tall-image bottom reveal alt">
        <image-component v-bind:image="imagelist[1]" customclass="no-expand"></image-component>
      </div>
     </div> 
  </div>
  <div v-if="imagelist[2]" class="individual-grid">
     <div class="wrapper"> 
       <div class="wide-image left-anchor reveal">
        <image-component v-bind:image="imagelist[2]" customclass="no-expand"></image-component>
       </div>
     </div> 
  </div>
  <div v-if="imagelist[3] || imagelist[4]" class="individual-grid tall">
     <div class="wrapper no-cover"> 
      <div v-if="imagelist[3]" class="tall-image reveal">
        <image-component v-bind:image="imagelist[3]" customclass="no-expand"></image-component>
      </div>
      <div v-if="imagelist[4]" class="tall-image bottom reveal">
        <image-component v-bind:image="imagelist[4]" customclass="no-expand"></image-component>
      </div>
     </div> 
  </div>
  <div v-if="imagelist[5]" class="individual-grid last">
     <div class="wrapper"> 
       <div class="wide-image reveal">
        <image-component v-bind:image="imagelist[5]" customclass="no-expand"></image-component>
       </div>
     </div> 
  </div>
</div>
</template>

<script>
  import image_component from '../atoms/image_component'
  export default {
    components: {
      'image-component': image_component    
    },
    props: ['imagelist']
  }
</script>

<style scoped lang="scss">
  @import '../../styles/breakpoints.scss';

  .individual-grid {
    position: relative;
    width: calc(100% - 128px);
    margin-left: 128px;
    margin-bottom: 10%;
    padding-bottom: 50%;
    &.first {
      margin-top: 15%
    }
    // &.last {
    //   margin-bottom: 0px;
    // }
    @media screen and (min-width: 1281px) {
      width: 100%;
      margin-left: 0px;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-left: 0px;
      margin-bottom: 0px;
      padding-bottom: 0%;
      height: 420px;
      &.tall {
        height: 840px;
      }
      &.first {
        margin-top: 0px;
      }
    }
  }
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    &.no-cover {
      @media screen and (min-width: 1281px) {
        width: calc(100% - 25% - 128px);
        left: 0;
        right: 0;
        margin: auto;
      }
    }

  }
  .tall-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 80%;
    width: 35%;
    right: 0;
    @media screen and (min-width: 1281px) {
      width: 45%;
    }
    &.alt {
      @media screen and (min-width: 761px) {
        top: auto;
        bottom: 0;
      }
    }
    &.bottom {
      top: auto;
      bottom: 0;
      margin-left: calc(35% + 10%);
      &.alt {
        @media screen and (min-width: 761px) {
          top: 0;
          bottom: auto;
        }
      }
      @media screen and (min-width: 1281px) {
        left: auto;
        right: 0;
      }
      @media screen and (max-width: $mobile-grid) {
        margin-bottom: 36px;
      }
    }
    @media screen and (max-width: $mobile-grid) {
      height: calc(50% - 36px - 18px);
      margin-left: auto !important;
      margin-top: 36px;
      width: 100%;
    }
  }
  .wide-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    margin-right: 0px;
    width: calc(35% + 35% + 10%);
    height: 80%;
    background: rgba( 255, 0, 0, 0.25);
    &.left-anchor {
      margin-right: auto;
      margin-left: -128px;
    }
    @media screen and (max-width: $mobile-grid) {
      margin-left: auto !important;
      margin-right: auto;
      width: 100%;
      height: 100%;
    }
  }
</style>
