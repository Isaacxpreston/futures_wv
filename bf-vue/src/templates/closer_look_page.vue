<template>
  <div class="fonts">

    <div class="header-wrapper">
      <div class="page-header" v-bind:class="[is_visible]">
        <dropdown category="A Closer Look" v-bind:subcategory="page_title" v-bind:list="navigation_list" v-on:clicked="nav_to_closer_look"></dropdown>
        <div class="page-description">
          <div class="p">
            {{page_description}}
            <!-- We work collaboratively with our clients to build dream homes from the ground up. 
            When we start with a blank canvas, the possibilities are endless. -->
          </div>
        </div>
      </div>
    </div>

    <r-featured-grid v-for="array in page_images" type="image" v-on:clicked="open_popup" v-bind:imagelist="array" v-bind:key="array"></r-featured-grid>

    <div class="load-more">
      <vbutton v-if="page_queue.length" type="standard" v-on:clicked="load_more">Load More</vbutton>
    </div>

    <vfooter v-bind:wait="wait" v-bind:color="footer_color" v-bind:list="footer_list" footertype="twentyfive-percent"  v-on:nav="emit_nav">More Interiors</vfooter>

    <popup v-bind:inactive="popup_state" v-on:clicked="close_popup" v-bind:imagelist="current_image_list" v-bind:wait="wait" type="popup-swiper"></popup>

  </div>
</template>

<script>
  import featured_grid from '../components/organisms/featured_grid'
  import dropdown from '../components/molecules/dropdown'
  import button from '../components/atoms/button'
  import responsive_featured_grid from '../components/organisms/responsive_featured_grid'
  import popup from '../components/organisms/popup'
  import footer from '../components/organisms/footer'

  import scroll_reveal from '../utils/scroll_reveal'
  import sr_options from '../utils/sr_options'
  import chars from '../utils/replace_wp_chars'
  import addresses from '../utils/api_addresses'
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    components: {
      'featured-grid': featured_grid,
      'dropdown': dropdown,
      'vbutton': button,
      'r-featured-grid': responsive_featured_grid,
      'popup': popup,
      'vfooter': footer
    },
    data () {
      return {
        page_title: '',
        navigation_list: [],
        popup_state: 'inactive',
        is_visible: 'invisible',
        current_image_list: [],
        wait: true,
        page_images: [],
        page_queue: [],
        footer_color: 'chiffon',
        footer_list: [],
        footer_title: '',
        page_description: ''
      }
    },
    props: ['page'],
    methods: {
      emit_nav: function () {
        this.$emit('nav')
      },
      open_popup: function (image) {
        this.current_image_list = [image]
        this.popup_state = ''
      },
      close_popup: function () {
        this.popup_state = 'inactive'
      },
      nav_to_closer_look: function (url) {
        this.$emit('nav')
        var context = this
        setTimeout(function () {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/closer-look/' + url
          })
        }, 600)
      },
      load_more: function () {
        //render images from queue
        var context = this
        this.page_images.push(this.page_queue[0])
        this.page_queue = this.page_queue.slice(1)
        setTimeout(function () {
          sr.reveal('.reveal')
        })
      },
      init_sr: function () {
        window.sr = scroll_reveal(sr_options)
        sr.reveal('.reveal')
      },
      init: function () {
        this.wait = true
        var context = this

        //set page title, set slider images
        axios.get(addresses.live_production + 'pages/?slug=' + this.page)
        .then(function(response) {
          context.page_description = response.data[0].acf.page_description
          //REPLACE WP CHARACTERS
          context.page_title = chars(response.data[0].title.rendered)

          //set navigation links and footer links.
          axios.get(addresses.live_production + 'pages/?slug=navigation')
          .then(function (response) {
            var nav_links = response.data[0].acf.closer_look_navigation
            context.navigation_list = nav_links.filter(function(item) {
              return item.title !== context.page_title
            })
            context.footer_list = nav_links.map(function (item) {
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

        })

        //get images for page
        axios.get(addresses.live_production + 'pages/?slug=' + this.page)
        .then(function (response) {
          var final = []
          var temp = []
          var images = response.data[0].acf.image
          for (var i = 0; i < images.length; i++) {
            if(temp.length > 3) {
              final.push(temp)
              temp = []
            }
            temp.push(images[i].main_image.url)
          }
          final.push(temp)
          context.page_images = [final[0], final[1]]
          context.page_queue = final.slice(2)
          setTimeout(function() {
            context.init_sr()
          })
          setTimeout(function() {
            context.is_visible = ''
          }, 600)
        })
      }
    },
    watch: {
      '$route': function () {
        this.init()
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/breakpoints.scss';
  @import '../styles/page_headers.scss';

  .load-more {
    position: relative;
    display: inline-block;
    margin-top: calc(120px - 108px);
    margin-bottom: 120px;
    @media screen and (max-width: $tablet-size) {
      margin-top: 48px;
      margin-bottom: 48px;
    }
  }

  .header-wrapper {
    width: 100%;
    @media screen and (min-width: 1281px) {
      width: calc(100% - 10%);
      margin-left: 10%;
    }
  }
</style>
