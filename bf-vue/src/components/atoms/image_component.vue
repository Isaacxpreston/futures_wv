<template>
  <!-- <div v-bind:class="{'shadow-container': this.overlay === undefined ? true : false, 'noshadow-container': this.overlay === undefined ? false : true, 'hovered': hoveredstate}"></div> -->
  <div 
    class="noshadow-container" 
    v-bind:class="[has_overlay, reveal, customclass]" v-bind:style="container_style" >
    <!-- v-bind:id="unique_id" -->
    <slot></slot>
    <div class="image-background" v-bind:class="[customclass, loaded]" v-bind:style="[background_image, scan_image]"></div> 
    <div class="image-loader" v-bind:class="loaded"></div> 
    <div v-if="overlay !== undefined" v-bind:style="overlay_image" class="overlay"></div> 
  </div>
</template>

<script>
  import make_random_string from '../../utils/make_random_string'
  // import scroll_reveal from '../../utils/scroll_reveal'

  export default {
    data () {
      return {
        container_style: {
          "height": this.height,
          "width": this.width
        },
        has_overlay: this.overlay === undefined ? 'shadow-container' : 'noshadow-container',
        background_image: {},
        scan_image: {},
        overlay_image: {
          "background-image" : "url('" + this.overlay + "')"
        },
        loaded: '',
        // visible: 'visible',
        // unique_id: make_random_string() + '-image'
      }
    },
    props: ['image', 'overlay', 'height', 'width', 'hoveredstate', 'customclass', 'reveal', 'scan'],
    //customclass is always no-expand.
    mounted () {
      var context = this
      var downloadingImage = new Image()
      downloadingImage.onload = function(){
        context.background_image = { "background-image" : "url('" + context.image + "')" }
        context.loaded = 'finished'
      }
      downloadingImage.src = this.image; 
      if(this.scan === true) {
        this.scan_image = {
          'background-size': 'contain !important'
        }
      }
    },
    watch: {
      image: function () {
        var context = this
        context.overlay_image = {
          "background-image" : "url('" + this.overlay + "')"
        }
        var context = this
        var downloadingImage = new Image()
        downloadingImage.onload = function(){
          context.background_image = { "background-image" : "url('" + context.image + "')" }
          context.loaded = 'finished'
        }
        downloadingImage.src = this.image; 
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/colors.scss';

  .shadow-container, .noshadow-container {
    position: relative;
    margin: auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // transition: all 0.6s ease-in-out;
    transition: all 1.2s ease-in-out;
    cursor: pointer;
    user-select: none;
    //ADD BACK IN SOON
    // opacity: 0;
    // transform: translateY(50%);
    &:hover, &.hovered {
      .image-background {
        transform: scale(1.05, 1.05);
        //this is messing up our expand icon ~980-1000 on desktop, and all over tablet/mobile, but only sometimes...
        //one workaround would be to rotate the icons manually instead of in css.
        //TODO -> REDO EXPAND ICONS
        &.no-expand {
          transform: none;
        }
      }
    }
    // &.visible {
    //   opacity: 1;
    //   transform: none;
    // } 
  }
  .shadow-container {
    &:hover {
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
      &.no-expand {
        box-shadow: none;
      }
      &.noshadow-override {
        box-shadow: none;
      }
    }
  }
  .image-background {
    width: 100%;
    height: 100%;
    margin: auto;
    background: white;
    background-size: cover;
    // background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0;
    cursor: pointer;
    // transition: all 0.85s ease-in-out;
    transition: all 1s ease-in-out;
    &.finished {
      opacity: 1;
    }
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    opacity: 1;
    // background-size: 150px auto;
    background-size: 230px auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.6s ease-in-out;
  }

  .image-loader {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $salt;
    top: 0;
    left: 0;
    transition: all 0.6s ease-in-out;
    &.finished {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>