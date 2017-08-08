<template>
  <div class="fonts">
    <h1>Organisms</h1>
    <p>Large components, image grids and menus</p>
    <p>Platform: {{platform}}</p>
    <div class="container">
      <h2>Popup</h2>
      <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" type="expand" v-on:clicked="open_popup"></labeled-image>
      <navigation>Current Page</navigation>
      <h2>Featured Projects/Closer Look grid</h2>
      <featured-grid></featured-grid>
      <h2>Individual Home grid</h2>
      <individual-grid></individual-grid>
      <vfooter color="frost">Footer</vfooter>
      <popup v-bind:inactive="popup_state" v-on:clicked="close_popup"></popup>
    </div>
  </div>
</template>

<script>
import labeled_image from '../molecules/labeled_image'
import navigation from '../organisms/navigation'
import footer from '../organisms/footer'
import popup from '../organisms/popup'
import featured_grid from '../organisms/featured_grid'
import individual_grid from '../organisms/individual_grid'

export default {
  components: {
    'vfooter': footer,
    'navigation': navigation,
    'popup': popup,
    'labeled-image': labeled_image,
    'featured-grid': featured_grid,
    'individual-grid': individual_grid
  },
  data () {
    return {
      platform: 'Determining platform...',
      popup_state: 'inactive',
      example_list: [
        'Renovated Homes', 'On The Coast', 'In The Mountains', 'Recreational Buildings'
      ],
      example_image_list: [
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg",
        "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"
      ]
    }
  },
  methods: {
    open_popup: function () {
      this.popup_state = ''
    },
    close_popup: function () {
      this.popup_state = 'inactive'
    }
  },
  beforeMount () {
    this.platform = navigator.platform
  }
}
</script>

<style scoped lang='scss'>
  @import '../../styles/breakpoints.scss';
  @import '../../styles/colors.scss';

  .container {
    width: 100%;
    max-width: 100%;
    margin: auto;
    padding-top: 24px;
    background: rgba(0, 0, 0, 0.075);
    user-select: none;
  }
  .tall-image, .wide-image {
    position: relative;
    margin: auto;
    background: $fossil;
    @media screen and (max-width: $tablet-size) {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .tall-image {
    width: 395px;
    height: 516px;
  }
  .wide-image {
    width: 628px;
    height: 468px;
  }
  .spacer {
    margin: 48px;
  }
  .image-grid {
    position: relative;
    display: flex;
    @media screen and (max-width: $mobile-size) {
      flex-direction: column;
    }
    width: 1280px;
    max-width: 100%;
    margin: auto;
    &:nth-child(odd) {
      .image-holder {
        margin-top: 0px;
      }
      & +.image-grid {
        margin-top: 60px;
        @media screen and (max-width: $tablet-size) {
          margin-top: 48px;
        }
        .image-holder {
          margin-bottom: 0px;
        }
      }
    }
  }
  .image-holder {
    position: relative;
    margin: auto;
    width: 50%;
    height: 50%;
    @media screen and (max-width: $tablet-size) {
      width: 286px;
      height: 216px;
      overflow: hidden;
    }
  }
</style>