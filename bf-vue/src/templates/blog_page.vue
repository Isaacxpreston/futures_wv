<template>
  <div class="fonts blog-page" v-bind:class="[is_visible]">
    <div class="blog-header">
      <div class="blog-title">
        <highlight type="h1" color="#EEF5E6" long>
          {{title}}
        </highlight>
      </div>
      <div class="blog-details">
        <div class="blog-author utility">
          <span v-if="author">By <span class="subheader">{{author}}</span></span>
          <span v-if="date">{{date}}</span>
        </div>
        <div class="blog-social-share utility">
          <span>Share:</span>
          <facebook v-on:clicked="share('facebook')"></facebook>
          <twitter v-on:clicked="share('twitter')"></twitter>
          <pinterest v-on:clicked="share('pinterest')"></pinterest>
        </div>
      </div>
    </div>

    <div class="blog-header-image">
      <image-component v-bind:image="header_image" customclass="no-expand"></image-component>
    </div>

    <div class="blog-content">
      <div class="p large">{{headline}}</div>
      <div v-for="paragraph in paragraphs" v-bind:key="paragraph" class="p">{{paragraph}}</div>
      <swiper v-bind:wait="swiper_wait" v-bind:images="carousel_images" v-bind:secondary="secondary_images" v-bind:text="carousel_text" type="modal-swiper" imageclasses="no-expand" nonav="true"></swiper>
    </div>
  </div>
</template>

<script>
  import swiper from '../components/molecules/swiper'
  import highlight from '../components/atoms/highlight_component'
  import facebook from '../components/SVG/facebook'
  import twitter from '../components/SVG/twitter'
  import pinterest from '../components/SVG/pinterest'

  import image_component from '../components/atoms/image_component'
  import chars from '../utils/replace_wp_chars'
  import convert_date from '../utils/convert_date'
  import share_api from '../utils/share_api'
  import addresses from '../utils/api_addresses'
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    data () {
      return {
        all_posts: [],
        author: '',
        date: '',
        title: '',
        headline: '',
        header_image: '',
        paragraphs: [],
        carousel_images: [],
        secondary_images: [],
        carousel_text: [],
        swiper_wait: true,
        example_image_list: [
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
          "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"
        ],
        image: "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/8.3_progress_exterior.jpg",
        example_text: "The exterior desperately needed work, and the owners wanted the house to be more in-line with the other homes on this very historic street. We mean that literally, as the whole house was picked up and moved closer to the street and angled to fit in better with its neighbors.",
        is_visible: 'invisible'
      }
    },
    components: {
      'swiper': swiper,
      'highlight': highlight,
      'facebook': facebook,
      'twitter': twitter,
      'pinterest': pinterest,
      'image-component': image_component
    },
    props: ['page'],
    methods: {
      share: function (type) {
        var types = {
          'facebook': 5,
          'twitter': 7,
          'pinterest': 309
        }
        var url = 'https://www.shareaholic.com/api/share/?v=1&apitype=1&apikey=' + share_api + '&service=' + types[type] + '&title=' + encodeURIComponent(this.title) + '&link=' + encodeURIComponent(window.location.href) + '&shortener=google&source=Shareaholic'
        window.open(url, null, "height=500, width=600")
      }
    },
    mounted () {
      var context = this
      axios.get(addresses.live_production + 'posts?slug=' + this.page)
      .then(function (response) {
        context.title = chars(response.data[0].title.rendered),
        context.author = response.data[0].acf.author,
        context.date = convert_date(response.data[0].date),
        context.headline = response.data[0].acf.headline_text,
        context.header_image = response.data[0].acf.header_image.url,
        context.paragraphs = response.data[0].acf.paragraphs.map(function (p) {
          return p.paragraph
        })
        context.carousel_images = response.data[0].acf.carousel.map(function(item) {
          // console.log(item.second_image.url)
          // fix here
          return item.image.url
        })
        context.secondary_images = response.data[0].acf.carousel.map(function(item) {
          return item.second_image.url
        })
        context.carousel_text = response.data[0].acf.carousel.map(function(item) {
          return item.caption
        })
        setTimeout(function () {
          context.is_visible = ''
          context.swiper_wait = false
        })
      })
    }
  }
</script>

<style scoped lang="scss">

  @import '../styles/breakpoints.scss';

  .blog-page {
    position: relative;
    text-align: left;
    width: calc(100% - 128px);
    margin-left: 128px;
    margin-top: 120px;
    margin-bottom: 120px;
    transition: all 0.6s ease-in-out;
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-left: 0px;
      margin-top: 60px;
      margin-bottom: 48px;
    }
    @media screen and (min-width: 1281px) {
      width: calc(100% - 10%);
      margin-left: 10%;
    }
    &.invisible {
      opacity: 0;
    }
  }

  .blog-header {
    @media screen and (max-width: $mobile-grid) {
      margin-top: 96px;
      margin-bottom: 24px;
    }
  }

  .blog-content {
    width: 800px;
    max-width: calc(100% - 96px);
    margin-top: 36px;
    .p {
      margin-bottom: 24px;
    }
    @media screen and (max-width: $mobile-grid) {
      max-width: calc(100% - 48px);
      margin-left: 24px;
    }
    // @media screen and (min-width: 1281px) {
    //   margin: auto;
    //   margin-top: 72px;
    // }
  }

  .blog-header-image {
    position: relative;
    width: 100%;
    height: 650px;
    // background-image: url('https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/8.3_progress_exterior.jpg');
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: center center;
  }

  .blog-title {
    margin-left: -24px;
    margin-bottom: 12px;
    @media screen and (max-width: $mobile-grid) {
      margin-left: 0px;
    }
  }
  .blog-social-share {
    span {
      margin-right: 12px;
    }
    svg {
      transform: translateY(4px);
    }
  }
  .blog-author {
    margin-top: 2px;
    span {
      margin-right: 12px;
    }
  }
  .blog-details {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 800px;
    max-width: calc(100% - 96px);
    margin-bottom: 12px;
    @media screen and (max-width: $tablet-size) {
      max-width: calc(100% - 24px);
    }
    @media screen and (max-width: $mobile-grid) {
      max-width: calc(100% - 48px);
      margin-left: 24px;
    }
  }
</style>