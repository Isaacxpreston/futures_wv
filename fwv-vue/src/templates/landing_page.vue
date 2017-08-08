<template>
  <div class="fonts" v-bind:class="[scroll_disabled]">
    <div class="nav-wrapper" v-bind:class="[nav_disabled]">
      <navigation v-on:nav="emit_nav">B&F Home</navigation>
    </div>

    <div class="landing-splash" v-bind:class="[splash_hidden, splash_initial_animation]" v-on:click="hide_splash">
      <div class="splash-background" v-bind:style="landing_splash_image">
      </div>
      <div class="logo-container">
        <landing-logo></landing-logo>
      </div>
    </div>

    <div class="landing-main width-maxer">

      <div class="left-text" v-bind:class="[left_text_hidden]">
        <div class="p large landing-paragraph">
          <brooks-falotico></brooks-falotico> 
          <span>{{bf_is}}</span>
          <div class="down-arrow-container" v-on:click="scrolldown">
            <down-arrow></down-arrow>
          </div>
        </div>
      </div>

      <div class="right-image" v-bind:class="[right_image_hidden]" v-bind:style="right_image"></div>

    </div>
    <div class="landing-featured">
      <div class="h2">Featured Projects</div>
      <r-featured-grid v-for="list in featured_projects" v-bind:imagelist="list" v-bind:key="list" customclass="no-bottom" v-on:clicked="nav_to_project"></r-featured-grid>
    </div>
  </div>
</template>

<script>
  // components
  import featured_grid from '../components/organisms/featured_grid'
  import brooks_falotico from '../components/atoms/brooks_falotico'
  import landing_logo from '../components/atoms/landing_logo'
  import navigation from '../components/organisms/navigation'
  import responsive_featured_grid from '../components/organisms/responsive_featured_grid'
  import down_arrow from '../components/SVG/down_arrow'

  // scripts
  import scroll_it from '../utils/scroll_it'
  import vanilla_scroll from '../utils/vanilla_smooth_scroll'
  import scroll_reveal from '../utils/scroll_reveal'
  import sr_options from '../utils/sr_options'
  import addresses from '../utils/api_addresses'
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    data () {
      return {
        right_image_hidden: 'hidden-initial',
        left_text_hidden: 'hidden-initial',
        nav_disabled: 'hidden-initial',
        splash_hidden: '',
        splash_initial_animation: '',
        scroll_disabled: 'main-noscroll',
        landing_splash_image: {},
        right_image: {},
        featured_projects: [],
        bf_is: ''
      }
    },
    methods: {
      hide_splash: function () {
        this.splash_hidden = 'landing-splash-hidden',
        this.scroll_disabled = ''
        this.right_image_hidden = ''
        this.left_text_hidden = ''
        this.nav_disabled = ''
      },
      emit_nav: function () {
        this.$emit('nav')
      },
      nav_to_project: function (url) {
        this.$emit('nav')
        var context = this
        setTimeout(function () {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/individual-home/' + url
          })
        }, 600)
      },
      scrolldown: function () {
        // scroll_it(
        //   document.querySelector('.landing-featured'),
        //   800,
        //   'easeOutQuad'
        // )
        vanilla_scroll(document.querySelector('.landing-featured'), 1200)
      }
    },
    components: {
      'featured-grid': featured_grid,
      'brooks-falotico': brooks_falotico,
      'landing-logo': landing_logo,
      'navigation': navigation,
      'r-featured-grid': responsive_featured_grid,
      'down-arrow': down_arrow
    },
    mounted () {
      //eventually add an image loader here/wait for image to load before applying transform classes
      var context = this
      setTimeout(function() {
        context.splash_initial_animation = 'initial-transform'
      })
      setTimeout(function() {
        context.hide_splash()
      }, 2250)
      var hide_event_handler = function() {
        setTimeout(function() {
          context.hide_splash()
        }, 150)     
      }
      window.addEventListener('keydown', hide_event_handler)

      axios.get(addresses.live_production + 'pages?slug=landing')
      .then(function (response) {
        var data = response.data[0].acf

        //render images
        var main_image = data.main_image.url
        var second_image = data.second_image.url
        var loadme = new Image()
        loadme.onload = function () {
          context.landing_splash_image = {
            'background-image': "url('" + main_image + "')"
          }
        }
        loadme.src = main_image

        context.right_image = {
          'background-image': "url('" + second_image + "')"
        }

        //BF description
        context.bf_is = data.brooks_and_falotico

        //render grid
        var featured_projects = data.featured_projects
        var final = []
        var temp = []
        for (var i = 0; i < featured_projects.length; i++) {
          if(temp.length > 5) {
            final.push(temp)
            temp = []
          }
          temp.push({
            'title': featured_projects[i].title,
            'url': featured_projects[i].image.url,
            'navigation_url': featured_projects[i].url
          })
        }
        final.push(temp)

        context.featured_projects = final
        setTimeout(function () {
          window.sr = scroll_reveal(sr_options)
          sr.reveal('.reveal')
        })
      })
    }
  }
</script>

<style scoped lang="scss">

  @import '../styles/breakpoints.scss';
  @import '../styles/colors.scss';

  .main-noscroll {
    position: relative;
    width: 100%;
    height: 0px;
    overflow: hidden;
  }

  .nav-wrapper {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    transition: all 0.6s ease-in-out;
    transition-delay: 1s;
    &.hidden-initial {
      transform: translateX(-80px);
      @media screen and (max-width: $mobile-grid) {
        transform: none;
      }
    }
  }

  .landing-splash {
    position: fixed;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    &.initial-transform {
      .splash-background {
        transition: all 4s ease-in-out;
        transform: scale(1.1, 1.1)
      }
    }
    &.landing-splash-hidden { // has to be after &.initial-transform class
      cursor: auto;
      transition: all 0.8s ease-in-out;
      transform: translateY(-100vh);
      pointer-events: none;
    }
  }

  .splash-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    // background-image: url('https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/Jane-Beiles-6244web.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    pointer-events: none;
  }

  .logo-container {
    height: 72px;
    position: relative;
    margin: auto;
    pointer-events: none;
    @media screen and(max-width: 400px) {
      // margin-left: 0px;
      transform: scale(0.75, 0.75);
    }
  }

  .landing-main {
    height: 100vh;
    width: 100%;
    display: flex;
    @media screen and (max-width: $tablet-size) {
      display: block;
      height: auto;
    }
  }

  .left-text{ 
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    transition: all 0.8s ease-in-out;
    transition-delay: 0.4s;
    @media screen and (max-width: $tablet-size) {
      margin-top: 50vh;
      width: 100%;
      height: 50vh;
    }
    &.hidden-initial {
      opacity: 0;
    }
  }

  .landing-paragraph {
    width: 400px;
    max-width: calc(100% - 48px);
    text-align: left;
    margin: auto;
    margin-left: 128px;
    @media screen and (max-width: $mobile-grid) {
      margin-left: auto;
    }
    @media screen and (min-width: 1281px) {
      margin-left: auto
    }
  }

  .right-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    opacity: 1;
    // background-image: url('https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/Jane-Beiles-6308web.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    transition: all 0.8s ease-in-out;
    transition-delay: 0.25s;
    @media screen and (max-width: $tablet-size) {
      transition-delay: 0.4s;
    }
    &.hidden-initial {
      opacity: 0;
      transform: translateY(100vh);
      @media screen and (max-width: $tablet-size) {
        transform: translateY(-100vh);
      }
    }
    @media screen and (max-width: $tablet-size) {
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 0px;
      width: 100%;
      height: 50vh;
    }
  }

  .landing-featured {
    position: relative;
    width: 100%;
    background: $frost;
    padding-top: 120px;
    padding-bottom: 96px;
    @media screen and (max-width: $tablet-size) {
      padding-top: 60px;
    }
    @media screen and (max-width: $mobile-grid) {
      padding-top: 48px;
    }
    .h2 {
      text-align: left;
      margin-left: 128px;
      margin-bottom: 24px;
      @media screen and (max-width: $tablet-size) {
        margin-bottom: 12px;
      }
      @media screen and (max-width: $mobile-grid) {
        margin-left: 48px;
      }
      @media screen and (min-width: 1281px) {
        margin-left: 10%;
      }
    }
  }

  .down-arrow-container {
    cursor: pointer;
    user-select: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-bottom: 12px;
    width: 12px;
  }
</style>
