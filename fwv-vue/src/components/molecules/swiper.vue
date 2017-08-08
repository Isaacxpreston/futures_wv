<template>
  <div class="footer-scroll" :class="type">
    <div class="main-container" :class="type">

      <!-- images -->
      <div class="swiper-container" v-bind:class="parentid">
        <div class="fonts swiper-wrapper">
          <div class="swiper-slide full" :class="type" :key="item" v-for="(item, index) in images" v-on:click="navigateto(item.url)">
            <!-- double case -->
            <div v-if="secondary" class="cover">
              <div class="double-image" v-if="secondary[index]">
                <div class="double-inner" v-if="item">
                  <image-component v-bind:image="item" v-bind:customclass="imageclasses" v-bind:scan="scan"></image-component>
                </div>
                <div class="double-inner" v-if="secondary[index]">
                  <image-component v-bind:image="secondary[index]" v-bind:customclass="imageclasses" v-bind:scan="scan"></image-component> 
                </div>
              </div>
              <image-component v-else v-bind:image="item" v-bind:customclass="imageclasses" v-bind:scan="scan"></image-component>
              <div v-if="text" class="utility swiper-text">{{text[index]}}</div>
            </div>

            <!-- single case -->
            <div v-else class="cover">
              <labeled-image v-if="labeled !== undefined" v-bind:image="item.image" customclasses="cover" :imageclass="imageclasses">{{item.label}}</labeled-image>
              <!-- blog -->
              <image-component v-else v-bind:image="item" v-bind:customclass="imageclasses" v-bind:scan="scan"></image-component>
              <div v-if="text" class="utility swiper-text">{{text[index]}}</div>
            </div>
          </div>

          <!-- text -->
          <div class="swiper-slide swiper-spacer" :class="type"></div>

        </div>
      </div>

      <!-- text -->
      <div v-if="text" class="fonts text-area">
        <div class="utility hide-me">{{text[swiperIndex - 1]}}</div> <!-- spacer -->
        <div class="text-line"></div>
      </div>

      <!-- buttons -->
      <div v-if="type !== 'popup-swiper'" class="buttons-container" v-bind:class="type">
        <arrows v-bind:index="swiperIndex" v-bind:length="images.length" v-bind:prevclass="parentprevclass" v-bind:nextclass="parentnextclass"></arrows>
      </div>

    </div>
  </div>
</template>

<script> 
  import arrows from '../atoms/arrows'
  import image_component from '../atoms/image_component'

  import labeled_image from './labeled_image'

  import make_random_string from '../../utils/make_random_string'

  import swiper from 'Swiper'

  export default {
    data () {
      var temp = make_random_string()
      return {
        'parentnextclass': temp + 'parentnext',
        'parentprevclass': temp + 'parentprev',
        'parentid': temp + 'parentid',
        swiperIndex: 1,
        scan: false
      }
    },
    props: ['images', 'labeled', 'text', 'type', 'imageclasses', 'wait', 'secondary', 'nonav'],
    methods: {
      navigateto: function (str) {
        if(this.nonav) {
          return false
        }

        this.$emit('nav')

        var context = this
        setTimeout(function() {
          window.scrollTo(0, 0)
          if(!context.$route.params.category) {
            context.$router.push({
              path: context.$route.meta.footer_redirect + str
            })
          } else {
            context.$router.push({
              path: context.$route.meta.footer_redirect + context.$route.params.category + '/' + str
            })
          }
        }, 600)
      },
      init: function () {
        // generate unique parent, next and previous ids within component.
        var context = this
        var image_swiper = new swiper('.' + context.parentid, {
          nextButton: '.' + context.parentnextclass,
          prevButton: '.' + context.parentprevclass,
          speed: 750,
          spaceBetween: '1.25%',
          slidesPerView: 'auto',
          onSlideChangeStart: function(swiper) {
            context.swiperIndex = swiper.activeIndex + 1
          }
        })
      }
    },
    components: {
      'arrows': arrows,
      'image-component': image_component,
      'labeled-image': labeled_image
    },
    mounted () {
      if(!this.wait && this.type !== 'popup-swiper') {
        this.init()
      }
      if(this.type === 'popup-swiper-press') {
        this.scan = true
      }
    },
    watch: {
      wait: function () {
        if(!this.wait && this.type !== 'popup-swiper') {
          var context = this
          setTimeout(function () {
            context.init()
          })
        }
      }
    }
  }
</script>

<style lang="scss">

    //footer swiper, modal swiper

    @import '../../styles/colors.scss';
    @import '../../styles/breakpoints.scss';
    
    .footer-scroll {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      &.footer-swiper {
        padding-bottom: 30%;
        height: 0px;
        @media screen and (max-width: 1280px) {
          padding-bottom: 350px;
        }
      }
      &.modal-swiper {
        height: 100%;
        padding-bottom: 0px;
      }
    }
    .main-container {
      user-select: none;
      cursor: pointer;
      position: absolute;
      top: 0;
      margin: auto;
      max-width: 100%;
      &.modal-swiper {
        position: relative;
        width: 100%;
        height: 458px;
        @media screen and (max-width: $tablet-size) {
          height: 300px;
        }
        @media screen and (max-width: $mobile-grid) {
          height: 200px;
        }
      }
      &.popup-swiper, &.popup-swiper-press {
        width: 100%;
        height: calc(100% - 48px);
      }
      &.footer-swiper {
        margin-right: 0px;
        height: calc(100% - 48px);
        width: 100%;
      }
    }
    .swiper-container { //do not modify name
      width: 100% !important;
      height: 100%;
      overflow: visible !important;
    }
    .buttons-container {
      float: right;
      margin-right: 4px;
      margin-top: 12px;
      &.footer-swiper {
        margin-right: 96px; //128px;
        @media screen and (max-width: $mobile-grid) {
          margin-right: 24px;
        }
        @media screen and (min-width: 1281px) {
          margin-right: 7.5%;
        }
      }
    }
    .text-area {
      margin-top: 12px;
      text-align: left;
    }
    .text-line {
      width: 100%;
      height: 1px;
      background: $fossil;
      margin-top: 12px;
    }
    .swiper-slide {
      &.footer-swiper {
        // width: 500px;
        width: 45%;
        @media screen and (max-width: 1280px) {
          width: 500px;
        }
      }
      &.modal-swiper, &.popup-swiper, &.popup-swiper-press {
        &.full {
          width: 100%;
        }
        &.half {
          width: 50%;
        }
      }
      @media screen and (max-width: $mobile-grid) {
        width: 100% !important;
      }
      &.swiper-spacer {
        // width: 628px !important;
        width: calc(45% + 128px) !important;
        @media screen and (min-width: 1281px) {
          width: calc(45% + 10%) !important;
        }
        &.modal-swiper, &.popup-swiper, &.popup-swiper-press {
          display: none;
        }
        @media screen and (max-width: $mobile-grid) {
          width: 0px;
          display: none;
        }
      }
    }
    .hide-me {
      opacity: 0;
      pointer-events: none;
    }

    .swiper-text {
      pointer-events: none;
      margin-top: 12px;
    }

    .cover {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .double-image {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
    }

    .double-inner {
      position: relative;
      width: calc(50% - 6px);
      height: 100%;
    }

</style>
