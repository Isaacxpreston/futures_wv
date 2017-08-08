<template>
  <div class="fonts footer" v-bind:class="[color]">
    <div class="footer-inner" v-bind:class="[footertype]">
      <!-- footer inner width maxer -->
       <div class="inner-text">
        <div class="h2"><slot></slot></div>
        <router-link v-if="viewall" v-bind:to="viewall" class="viewall">View All</router-link>
      </div> 
      <swiper v-bind:images="list" type="footer-swiper" v-bind:wait="wait" labeled v-on:nav="emit_nav"></swiper>
    </div>
  </div>
</template>

<script>
  import swiper from '../molecules/swiper'
  export default {
    props: ['color', 'footertype', 'list', 'wait', 'viewall'],
    data () {
      return {
        example_image_list: [
          {
            label: 'lorem ipsum',
            image: "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
            url: 'nothing'
          },
          {
            label: 'lorem ipsum two',
            image: "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
            url: 'nothing'
          },
          {
            label: 'lorem ipsum three',
            image: "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
            url: 'nothing'
          }
        ]
      }
    },
    components: {
      'swiper': swiper
    },
    methods: {
      emit_nav: function () {
        this.$emit('nav')
      }
    },
  }
</script>

<style scoped lang="scss">

  @import '../../styles/breakpoints.scss';
  
  .footer {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 0px;
    padding-bottom: calc(30% + 48px + 24px);
    display: flex;
    @media screen and (max-width: 1280px) {
      padding-bottom: 0px;
      height: 450px;
    }
  }
  .footer-inner {
    position: absolute;
    margin: auto;
    width: calc(100% - 128px);
    height: calc(100% - 48px);
    margin-top: 24px;
    margin-left: 128px;
    &.twenty-percent, &.twentyfive-percent {
      @media screen and (min-width: 1281px) {
        width: calc(100% - 10%);
        margin-left: 10%;
      }
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-left: 0px;
    }
  }
  .inner-text {
    display: flex;
    justify-content: space-between;
    // margin-left: 128px;
    margin-right: 128px;
    margin-bottom: 24px;
    @media screen and (max-width: $mobile-grid) {
      margin-left: 24px;
      margin-right: 24px;
    }
    @media screen and (min-width: 1281px) {
      margin-left: auto;
      margin-right: 9%;
    }
  }
  .viewall {
    margin-top: 6px;
  }
</style>
