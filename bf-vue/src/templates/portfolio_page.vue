<template>
  <div class="portfolio-page fonts">
    <div class="left-content" v-bind:class="[is_visible]">
      <div class="content-inner">
        <div class="portfolio-description p reveal text">{{portfolio_description}}</div>
        <div class="portfolio-list">
          <div v-for="item in portfolio_list" v-bind:key="item">
            <div class="list-item h2 rollover reveal-text" v-on:click="navtolink(item.url) " v-on:mouseover="display(item.rollover_image)">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- fixed objects -->
    <div class="right-image reveal" v-bind:style="right_image">
      <div class="right-image-loading" v-bind:class="right_image_classes"></div>
    </div>
    <div class="dropdown-wrapper" v-bind:class="[is_visible]">
      <div class="dropdown-mask"></div>
      <dropdown category="Portfolio" v-bind:subcategory="page_title" v-bind:list="portfolio_navigation" customstyle="block" v-on:clicked="nav_to_portfolio"></dropdown>
    </div>
  </div>
</template>

<script>
  import dropdown from '../components/molecules/dropdown'
  import scroll_reveal from '../utils/scroll_reveal'
  import sr_options from '../utils/sr_options'
  import chars from '../utils/replace_wp_chars'
  import addresses from '../utils/api_addresses'
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    data () {
      return {
        page_title: '',
        portfolio_description: '',
        portfolio_list: [],
        portfolio_navigation: [],
        is_visible: 'invisible',
        right_image_classes: 'is-loading',
        right_image: {},
        timeouts: []
      }
    },
    props: ['page'],
    methods: {
      display: function (img) {
        var context = this
        // clear current hover loads
        this.right_image_classes = 'is-loading'
        for(var i = 0; i < this.timeouts.length; i ++) {
          clearTimeout(this.timeouts[i])
        }
        // set new hover load
        this.timeouts.push(
          setTimeout(function () {
            context.right_image = {
              "background-image" : "url('" + img.url + "')"
            }
            context.right_image_classes = ''
          }, 400)
        )
      },
      preload_cache: function (list) {
        var images = []
        list = list.map(function(item) {
          return item.rollover_image.url
        })
        for (var i = 0; i < list.length; i++) {
					images[i] = new Image()
					images[i].src = list[i]
				}
      },
      nav_to_portfolio: function (url) {
        this.$emit('nav')
        var context = this
        setTimeout(function() {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/portfolio/' + url
          })
        }, 600)
      },
      navtolink: function (str) {
        this.$emit('nav')
        var context = this
        setTimeout(function() {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/individual-home/' + context.page + '/' + str
          })
        }, 600)
      },
      init: function () {
        var context = this

        setTimeout(function() {
          context.is_visible = ''
        }, 600)

        axios.get(addresses.live_production + 'pages?slug=' + this.page)
        .then(function(response) {
          context.page_title = chars(response.data[0].title.rendered)
          var portfolio_links = response.data[0].acf.portfolio_link
          context.portfolio_list = portfolio_links
          context.portfolio_description = response.data[0].acf.portfolio_description

          // background load images
          setTimeout(function () {
            context.preload_cache(context.portfolio_list)
          })

          // render default image
          if(response.data[0].acf.portfolio_main_image) {
            context.right_image = {  
              "background-image" : "url('" + response.data[0].acf.portfolio_main_image.url + "')"
            }
            setTimeout(function () {
              context.right_image_classes = ''
            }, 600)
            
          }
          //render dropdown list
          axios.get(addresses.live_production + 'pages?slug=navigation')
          .then(function (response) {
            var temp = []
            var navigation = response.data[0].acf.portfolio_navigation
            context.portfolio_navigation = navigation.filter(function (item) {
              return item.title !== context.page_title
            })
            sr.reveal('.reveal-text', {
              duration: 1000,
              delay: 0,
              distance: 0,
              container: '.portfolio-page',
              reset: true,
              scale: 1,
              easing: 'ease-in-out'
            })
          })
        })


      }
    },
    components: {
      'dropdown': dropdown
    },
    mounted () {
      window.sr = scroll_reveal()
      this.init()
      // sr.reveal('.reveal', sr_options)
    },
    watch: {
      $route: function () {
        this.init()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/colors.scss';
  @import '../styles/breakpoints.scss';

  .portfolio-page {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 24px);
    display: flex;
    overflow: auto;
    text-align: left;
  }
  .portfolio-description {
    width: 395px;
    margin-top: calc(120px + 96px + 24px);
    margin-bottom: 96px;
    @media screen and (max-width: 1150px) {
      width: 472px;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-bottom: 60px;
    }
  }
  .left-content {
    width: 50%;
    @media screen and (max-width: 1150px) {
      width: 472px;
    }
    transition: all 0.6s ease-in-out;
    &.invisible {
      opacity: 0;
    }
  }
  .content-inner {
    position: relative;
    margin-top: 120px;
    margin-left: 128px;
    @media screen and (max-width: 1150px) {
      margin-top: calc(50vh + 128px + 24px);
    }
    @media screen and (max-width: $mobile-grid) {
      width: calc(100% - 48px);
      margin-left: 24px;
    }
    @media screen and (min-width: 1281px) {
      width: 75%;
      margin-left: auto;
    }
  }
  .dropdown-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 120px;
    margin-left: 128px;
    width: 395px;
    transition: all 0.6s ease-in-out;
    @media screen and (max-width: 1150px) {
      width: 472px;
      position: absolute;
      margin-top: calc(50vh + 24px);
    }
    @media screen and (max-width: $mobile-grid) {
      width: calc(100% - 48px);
      margin-left: 24px;
    }
    @media screen and (min-width: 1281px) {
      margin-left: 12.5%;
    }
    &.invisible {
      opacity: 0;
    }
  }
  .dropdown-mask {
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(120px + 96px);
    background: linear-gradient(rgba(245, 245, 245, 1), rgba(245, 245, 245, 0.925));
    @media screen and (max-width: 1150px) {
      display: none;
    }
  }
  .right-image {
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    width: 50%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    transition: opacity 0.6s ease-in-out !important;
    // &.is-loading {
    //   opacity: 0 !important;
    // }
    @media screen and (max-width: 1150px) {
      position: absolute;
      width: 100%;
      margin-left: 0px;
      height: 50vh;
    }
  }

  .right-image-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $salt;
    transition: opacity 0.4s ease-in-out;
    user-select: none;
    pointer-events: none;
    opacity: 0;
    &.is-loading {
      opacity: 1 !important;
    }
  }

  .list-item {
    margin-bottom: 36px;
  }

  .portfolio-list {
    padding-bottom: 120px;
  }
</style>