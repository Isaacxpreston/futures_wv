<template>
  <div class="fonts about-page our-story">
    <div class="about-block first" v-on:mousewheel="getscroll(1)" v-on:DOMMouseScroll="getscroll(1)">
      <div class="about-header p large reveal">
        <brooks-falotico></brooks-falotico> was founded in 1988 by Louise Brooks, with Vincent Falotico joining as partner in 1999. 
        Two decades later, our team of more than 20 offers 
        <highlight type="p large rollover" color="#EFE8F6" paddingtype="no-padding" v-on:clicked="scroll_page_to('.services')">
          Services
        </highlight> 
        ranging in scale and complexity in multiple 
        <highlight type="p large rollover" color="#EFE8F6" paddingtype="no-padding" v-on:clicked="scroll_page_to('.locations')">
          Locations
        </highlight>
        across the U.S., 
        to great recognition within our field.
      </div>
    </div>
    <div class="about-block salt services" v-on:mousewheel="getscroll(2)" v-on:DOMMouseScroll="getscroll(2)">
      <div class="block-content">
        <div class="content-inner reveal">
          <div class="h2">Services</div>
          <div class="p margined">{{services_caption}}</div>
          <li v-for="service in services" v-bind:key="service" class="p">{{service}}</li>
        </div>
      </div>
      <div class="block-image reveal-alt" v-bind:style="locations_image"></div>
    </div>
    <div class="about-block locations">
      <div class="block-content alternate">
        <div class="content-inner reveal">
          <div class="h2 hello">Locations</div>
          <div class="p margined">{{locations_caption}}</div>
          <li v-for="location in locations" v-bind:key="location" class="p">{{location}}</li>
          <div class="button-container">
            <v-button type='standard' v-on:clicked="nav_to_portfolio">View Portfolio</v-button>
          </div>
        </div>
      </div>
      <div class="block-image alternate reveal-alt" v-bind:style="services_image"></div>
    </div>
  </div>
</template>

<script>
  import button from '../components/atoms/button'
  import highlight from '../components/atoms/highlight_component'
  import brooks_falotico from '../components/atoms/brooks_falotico'

  import scroll_it from '../utils/scroll_it'
  import vanilla_scroll from '../utils/vanilla_smooth_scroll'
  import scroll_reveal from '../utils/scroll_reveal.js'
  import sr_options from '../utils/sr_options.js'

  import addresses from '../utils/api_addresses'
  
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    components: {
      'v-button': button,
      'highlight': highlight,
      'brooks-falotico': brooks_falotico,
    },
    data () {
      return {
        services: [],
        locations: [],
        services_image: {},
        locations_image: {},
        services_caption: '',
        locations_caption: '',
        prev_scroll: 0,
        is_scrolling: false
      }
    },
    props: ['page'],
    methods: {
      getscroll: function (multiplier) {
        if (window.scrollY > this.prev_scroll && window.scrollY < document.documentElement.clientHeight * multiplier && !this.is_scrolling) {
          //jump down page.
          var context = this
          this.is_scrolling = true
          // scroll_it(
          //   document.documentElement.clientHeight * multiplier,
          //   800,
          //   'easeOutQuad'
          // )
          vanilla_scroll(document.documentElement.clientHeight * multiplier, 1200)
          setTimeout(function () {
            context.is_scrolling = false
            context.prev_scroll = document.documentElement.clientHeight * multiplier
          }, 1200)
        }
        this.prev_scroll = window.scrollY
      },
      scroll_page_to: function (anchor) {
        var context = this
        scroll_it(
          document.querySelector(anchor),
          800,
          'easeOutQuad'
        )
        setTimeout(function () {
          context.prev_scroll = window.scrollY
        }, 800)
      },
      nav_to_portfolio: function () {
        this.$emit('nav')
        var context = this
        setTimeout(function () {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/portfolio/new-homes'
          })
        }, 600)
      },
      init_scroll: function () {
        scroll_it(
          document.querySelector('.' + this.page),
          800,
          'easeOutQuad'
        )
      }
    },
    mounted () {
      this.init_scroll()
      var context = this

      axios.get(addresses.live_production + 'pages?slug=about')
      .then(function(response) {
        context.services_caption = response.data[0].acf.services_caption
        context.locations_caption = response.data[0].acf.locations_caption
        var locations_image = response.data[0].acf.locations_image.url
        var services_image = response.data[0].acf.services_image.url
        context.locations_image = {
          "background-image" : "url('" + locations_image + "')"
        }
        context.services_image = {
          "background-image" : "url('" + services_image + "')"
        }
        context.services = response.data[0].acf.services.map(function(item) {
          return item.service
        })
        context.locations = response.data[0].acf.locations.map(function(item) {
          return item.location
        })
        setTimeout(function () {
          window.sr = scroll_reveal()
          sr.reveal('.reveal', sr_options)
          sr.reveal('.reveal-alt', {
            duration: 1000,
            delay: 150,
            distance: 0,
            scale: 1,
            easing: 'ease-in-out'
          })
        })
      })
    },
    watch: {
      $route: function () {
        this.init_scroll()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/breakpoints.scss';

  .about-block {
    position: relative;
    margin: auto;
    display: flex;
    width: 100%;
    height: 100vh;
    // height: 720px;
    @media screen and (max-width: 1150px) {
      height: 1046px;
    }
    @media screen and (max-width: $mobile-size) {
      height: 774px;
    }
    &.first {
      background-image: url('http://s3-us-west-2.amazonaws.com/brooks-falotico-vpv/Large+Ampersands.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      @media screen and (max-width: $mobile-size) {
        height: calc(774px - 240px);
      }
    }
  }

  .block-content, .block-image {
    position: absolute;
    display: flex;
    width: 50%;
    height: 100%;
    @media screen and (max-width: 1150px) {
      height: 50%;
      width: 100%;
    }
  }

  .block-image {
    @media screen and (max-width: $mobile-size) {
      height: 240px;
    }
  }

  .block-content {
    @media screen and (max-width: $mobile-size) {
      height: calc(774px - 240px);
    }
  }


  .block-content {
    top: 0;
    left: 0;
    &.alternate {
      left: auto;
      right: 0;
    }
    @media screen and (max-width: 1150px) {
      top: auto;
      bottom: 0;
    }
  }

  .block-image {
    top: 0;
    right: 0;
    background-size: cover;
    background-repeat: no-repeat;
    &.alternate {
      right: auto;
      left: 0;
    }

  }

  .about-header {
    width: 833px;
    max-width: calc(100% - 48px);
    margin: auto;
    @media screen and (max-width: 1150px) {
      width: 534px;
    }
    @media screen and (max-width: $mobile-size) {
      width: calc(100% - 48px);
      text-align: left;
    }
  }

  .content-inner {
    .h2, .margined {
      margin-bottom: 24px;
    }
    li {
      margin-bottom: 6px;
    }
    text-align: left;
    margin: auto;
    width: 395px;
    max-width: calc(100% - 48px);
    @media screen and (max-width: 1150px) {
      width: 500px;
    }
    @media screen and (max-width: $mobile-size) {
      width: calc(100% - 48px);
    }
  }

  .button-container {
    margin-top: 24px;
  }
</style>

