<template>
  <div class="press-article" v-on:mouseover="toggleHovered(true)" v-on:mouseleave="toggleHovered(false)">
    <div class="image-container">
      <image-component v-bind:hoveredstate="article_hovered" v-bind:image="image" v-bind:overlay="overlay" v-bind:customclass="customclass"></image-component>
    </div>
    <div class="fonts press-text">
      <div class="h3"><slot></slot></div>
      <div v-if="scan" class="read-link a">Read Scan</div>
      <div v-else class="read-link a">Read Article</div>
    </div>
  </div>
</template>

<script>
  import image_component from '../atoms/image_component'
  export default {
    data () {
      return {
        article_hovered: false
      }
    },
    props: ['image', 'overlay', 'scan', 'customclass'],
    methods: {
      toggleHovered: function(bool) {
        this.article_hovered = bool
      }
    },
    components: {
      'image-component': image_component
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/breakpoints.scss';
  $transition: all 0.75s ease-in-out;
  .press-article {
    position: relative;
    // width: 500px;
    width: 100%;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    transition: $transition;
    @media screen and (max-width: $tablet-size) {
      // width: 286px;
      width: 100%;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
    }
    &:hover {
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
      .h3 {
        transform: none;
      }
      .read-link {
        opacity: 1;
        transform: none;
      }
    }
  }
  .image-container {
    height: 288px;
    @media screen and (max-width: $tablet-size) {
      height: 161px;
    }
    @media screen and (max-width: $mobile-grid) {
      height: 180px;
    }
  }
  .press-text {
    text-align: left;
    padding: 24px;
    background: white;
    @media screen and (max-width: $tablet-size) {
      padding: 12px;  
    }
    @media screen and (max-width: $mobile-grid) {
      padding-left: 24px;
    }
    .h3 {
      transform: translateY(12px);
      margin-bottom: 6px;
      transition: $transition;
      @media screen and (max-width: $tablet-size) {
        transform: none;
      }
    }
    .read-link {
      opacity: 0;
      display: inline-block;
      transition: $transition;
      transform: translateY(24px);
      @media screen and (max-width: $tablet-size) {
        opacity: 1;
        transform: none;
      }
    }
  }
</style>