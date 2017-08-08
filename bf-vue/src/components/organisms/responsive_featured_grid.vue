<template>
  <div>
    <div class="featured-grid">
      <div class="wrapper">
        <div v-if="imagelist[0]" class="wide-image left reveal">
          <labeled-image v-if="type === 'image'" v-bind:image="imagelist[0]" type="expand" customclasses="cover" v-on:clicked="emit_clicked(imagelist[0])"></labeled-image>
          <labeled-image v-else v-bind:image="imagelist[0].url" customclasses="cover" v-on:clicked="emit_clicked(imagelist[0].navigation_url)">{{imagelist[0].title}}</labeled-image> 
        </div>
        <div v-if="imagelist[1]" class="tall-image right reveal">
          <labeled-image v-if="type === 'image'" v-bind:image="imagelist[1]" type="expand" customclasses="cover" v-on:clicked="emit_clicked(imagelist[1])"></labeled-image>
          <labeled-image v-else v-bind:image="imagelist[1].url" customclasses="cover" v-on:clicked="emit_clicked(imagelist[1].navigation_url)">{{imagelist[1].title}}</labeled-image> 
        </div>
      </div>
    </div>
    <div class="featured-grid last" v-bind:class="[customclass]">
      <div class="wrapper">
        <div v-if="imagelist[3]" class="wide-image right reveal">
          <labeled-image v-if="type === 'image'" v-bind:image="imagelist[3]" type="expand" customclasses="cover" v-on:clicked="emit_clicked(imagelist[3])"></labeled-image>
          <labeled-image v-else v-bind:image="imagelist[3].url" customclasses="cover" v-on:clicked="emit_clicked(imagelist[3].navigation_url)">{{imagelist[3].title}}</labeled-image> 
        </div>
        <div v-if="imagelist[2]" class="tall-image left reveal">
          <labeled-image v-if="type === 'image'" v-bind:image="imagelist[2]" type="expand" customclasses="cover" v-on:clicked="emit_clicked(imagelist[2])"></labeled-image>
          <labeled-image v-else v-bind:image="imagelist[2].url" customclasses="cover" v-on:clicked="emit_clicked(imagelist[2].navigation_url)">{{imagelist[2].title}}</labeled-image> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import image_component from '../atoms/image_component'
  import labeled_image from '../molecules/labeled_image'
  
  export default {
    props: ['customclass', 'type', 'imagelist'],
    components: {
      'image-component': image_component,
      'labeled-image': labeled_image
    },
    mounted () {
      // console.log(this.imagelist)
    },
    methods: {
      emit_clicked (str) {
        this.$emit('clicked', str)
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../../styles/breakpoints.scss';

  .featured-grid {
    position: relative;
    width: 100%;
    height: 0px; //need this
    padding-bottom: 40%;
    margin-bottom: 5%;
    &.last {
      margin-bottom: 10%;
      @media screen and (max-width: $tablet-size) {
        margin-bottom: 24px;
      }
    }
    &.no-bottom {
      margin-bottom: 0px;
    }
    @media screen and (max-width: $tablet-size) {
      width: calc(100% - 128px - 24px);
      margin-left: 128px;
      margin-bottom: 24px;
    }
    @media screen and (max-width: $mobile-grid) {
      padding-bottom: 150%;
      width: 100%;
      margin-left: 0px;
    }
  }

  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .wide-image {
    position: absolute;
    // background: rgba(0, 0, 255, 0.15);
    width: 50%;
    height: 90%;
    &.left {
      top: 0;
      left: 0;
    }
    &.right {
      bottom: 0;
      right: 0;
    }
    @media screen and (max-width: $tablet-size) {
      width: calc(50% - 12px);
      height: 100%;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      height: calc(50% - 12px);
    }
  }

  .tall-image {
    position: absolute;
    // background: rgba(0, 0, 255, 0.15);
    width: 30%;
    height: 100%;
    &.left {
      top: 0;
      left: 0;
      margin-left: 10%;
      @media screen and (max-width: 1280px) {
        margin-left: 128px;
      }
      @media screen and (max-width: $tablet-size) {
        margin-left: 0px;
      }
    }
    &.right {
      bottom: 0;
      right: 0;
      margin-right: 10%;
      @media screen and (max-width: $tablet-size) {
        margin-right: 0px;
      }
    }
    @media screen and (max-width: $tablet-size) {
      width: calc(50% - 12px);
      height: 100%;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      height: calc(50% - 12px);
    }
  }
</style>