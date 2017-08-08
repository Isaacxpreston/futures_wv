<template>
  <div class="fonts">
    <div class="splash-container" v-bind:class="[splash_visible]">
      <div class="splash-inner">
        <highlight type="h1" color="#EFE8F6" paddingtype="no-padding">
          {{ title }}
        </highlight>
      </div>
    </div>
    <div class="header-image" v-bind:class="[is_visible]" v-on:click="scrolldown" v-on:mousewheel="getscroll" v-on:DOMMouseScroll="getscroll">
      <image-component v-bind:image="header_image" customclass="no-expand"></image-component>
    </div>
    <div class="grid-container">
      <r-individual-grid v-for="array in page_images" v-bind:imagelist="array" v-bind:key="array"></r-individual-grid>
    </div>
    <vfooter v-bind:wait="wait" v-bind:color="footer_color" v-bind:list="footer_list" footertype="twentyfive-percent" v-bind:viewall="viewall">More {{footer_title}}</vfooter>
  </div>
</template>

<script>
  import individual_grid from '../components/organisms/individual_grid'
  import highlight from '../components/atoms/highlight_component'
  import responsive_individual_grid from '../components/organisms/responsive_individual_grid'
  import image_component from '../components/atoms/image_component'
  import footer from '../components/organisms/footer'

  import scroll_reveal from '../utils/scroll_reveal'
  import sr_options from '../utils/sr_options'
  import chars from '../utils/replace_wp_chars'
  import addresses from '../utils/api_addresses'
  import scroll_it from '../utils/scroll_it'
  import vanilla_scroll from '../utils/vanilla_smooth_scroll'
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    data () {
      return {
        title: '',
        header_image: '',
        splash_visible: 'invisible',
        is_visible: 'invisible',
        page_images: [],
        footer_color: 'frost',
        footer_title: '',
        footer_list: [],
        wait: true,
        viewall: '',
        prev_scroll: 0,
        is_scrolling: false
      }
    },
    props: ['page', 'category'],
    components: {
      'individual-grid': individual_grid,
      'r-individual-grid': responsive_individual_grid,
      'highlight': highlight,
      'image-component': image_component,
      'vfooter': footer
    },
    methods: {
      getscroll: function () {
        if (window.scrollY > this.prev_scroll && window.scrollY < document.documentElement.clientHeight && !this.is_scrolling) {
          //jump down page.
          var context = this
          this.is_scrolling = true
          // scroll_it(
          //   document.documentElement.clientHeight,
          //   800,
          //   'easeOutQuad'
          // )
          vanilla_scroll(document.documentElement.clientHeight, 1200)
          setTimeout(function () {
            context.is_scrolling = false
            context.prev_scroll = document.documentElement.clientHeight
          }, 800)
        }
        this.prev_scroll = window.scrollY
      },
      scrolldown: function () {
          var context = this
          this.is_scrolling = true
          scroll_it(
            document.documentElement.clientHeight,
            800,
            'easeOutQuad'
          )
          setTimeout(function () {
            context.is_scrolling = false
            context.prev_scroll = document.documentElement.clientHeight
          }, 800)
      },
      init: function () {
        //hide header image before reload
        this.is_visible = 'invisible'

        var context = this

        //get images for page (same as closer look page)
        axios.get(addresses.live_production + 'pages/?slug=' + this.page)
        .then(function(response) {
          
          //render title
          context.title = chars(response.data[0].title.rendered)

          //render header image
          var loadme = new Image()
          var header_image = response.data[0].acf.main_image.url
          loadme.onload = function () {
            context.header_image = header_image
            setTimeout(function () {
              context.is_visible = ''
            }, 600)
          }
          loadme.src = header_image

          //render grids
          var final = []
          var temp = []
          var images = response.data[0].acf.additional_images
          for (var i = 0; i < images.length; i++) {
            if(temp.length > 5) {
              final.push(temp)
              temp = []
            }
            temp.push(images[i].url)
          }
          final.push(temp)
          context.page_images = final
          setTimeout(function () {
            window.sr = scroll_reveal(sr_options)
            sr.reveal('.reveal')
          })
        })
      }
    },
    mounted () {
      this.viewall = '/portfolio/' + this.category
      var context = this
      //scroll handler for title
      window.addEventListener('scroll', function () {
        var vh = document.documentElement.clientHeight * 1.25
        var half_vh = document.documentElement.clientHeight * 0.4
        if (window.scrollY < half_vh && context.splash_visible !== '') {
          context.splash_visible = 'invisible'
        }
        else if (window.scrollY > vh) {
          context.splash_visible = 'half-visible'
        }
        else {
          context.splash_visible = ''
        }
      })

      setTimeout(function() {
        context.is_visible = ''
      })

      this.init()

      // get footer content once.
      axios.get(addresses.live_production + 'pages?slug=' + context.category)
      .then(function (response) {
        context.footer_title = response.data[0].title.rendered
        context.footer_list = response.data[0].acf.portfolio_link.map(function (item) {
          return {
            label: item.title,
            image: item.rollover_image.url,
            url: item.url,
          }
        })
        setTimeout(function () {
          context.wait = false
        })
      })
    },
    watch: {
      '$route': function () {
        this.init()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/breakpoints.scss';

  .header-image {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100vh;
    transition: all 0.6s ease-in-out;
    &.invisible {
      opacity: 0;
    }
  }
  .splash-container {
    position: fixed;
    left: 0;
    width: calc(100% - 128px);
    margin-left: 128px;
    margin-top: 15vh; //20vh; //40vh
    opacity: 1;
    transition: all 0.6s ease-in-out;
    @media screen and (max-width: $mobile-grid) {
      position: absolute;
      margin-top: calc(100vh + 72px);
      width: 100%;
      margin-left: 0px;
    }
    @media screen and (min-width: 1281px) {
      width: calc(100% - 25% - 128px);
      left: 0;
      right: 0;
      margin: auto;
      margin-top: 20vh;
    }
    &.half-visible {
      opacity: 0.3;
    }
    &.invisible {
      opacity: 0;
    }
  }

  .splash-inner {
    position: absolute;
    z-index: -1;
    left: 0;
    width: 35%;
    text-align: left;
    @media screen and (max-width: $mobile-grid) {
      right: 0;
      margin: auto;
      width: calc(100% - 48px);
    }
    @media screen and (min-width: 1281px) {
      width: 45%;
    }
  }

  .grid-container {
    margin-top: 180px; //108px;
    padding-bottom: 120px;
    // @media screen and (max-width: $mobile-grid) {
    //   margin-top: calc(108px + 72px);
    // }
  }
</style>
