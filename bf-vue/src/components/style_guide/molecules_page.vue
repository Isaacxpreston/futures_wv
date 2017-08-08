<template>
  <div class="fonts">
    <h1>Molecules</h1>
    <p>Small components</p>
    <p>Platform: {{platform}}</p>
    <div class="container">
      <navbar>Current Page</navbar>
      <navbar-mobile></navbar-mobile>
      <div class="spacer">
        <dropdown category="Category" subcategory="Sub-Category" v-bind:list="example_list"></dropdown>
      </div>
      <div class="spacer">
        <email-form></email-form>
      </div>
      <div class="utility">Image with label</div>
      <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg">Label</labeled-image>
      <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg">Really long label Really long label Really long label</labeled-image>
      <labeled-image image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg" type="expand"></labeled-image>

      <div class="spacer">
        <div class="utility">Press link</div>
        <press-article>Pro Spotlight: How to Clear the Hurdles of Property Limitations</press-article>
      </div>

      <div class="spacer">
        <div class="utility">Image carousel/swiper (blog/modal)</div>
        <div class="width-container">
          <swiper v-bind:images="example_image_list" v-bind:text="example_text" type="modal-swiper"></swiper>
        </div>
      </div>

      <div class="spacer">
        <div class="utility">Image carousel/swiper (footer)</div>
        <swiper v-bind:images="example_image_list" type="footer-swiper" labeled></swiper>
      </div>

    </div>
  </div>
</template>

<script>
import detect_browser from '../../utils/detect_browser'

import navbar from '../molecules/navbar'
import navbar_mobile from '../molecules/navbar_mobile'
import dropdown from '../molecules/dropdown'
import email_form from '../molecules/email_form'
import labeled_image from '../molecules/labeled_image'
import press_article from '../molecules/press_article'
import swiper from '../molecules/swiper'

import image_label from '../atoms/image_label'
import image_component from '../atoms/image_component'
import expand from '../SVG/expand'

export default {
  components: {
    'expand': expand,
    'image-label': image_label,
    'image-component': image_component,
    'navbar': navbar,
    'dropdown': dropdown,
    'email-form': email_form,
    'labeled-image': labeled_image,
    'press-article': press_article,
    'navbar-mobile': navbar_mobile,
    'swiper': swiper
  },
  data () {
    return {
      platform: 'Determining platform...',
      example_list: [
        'Renovated Homes', 'On The Coast', 'In The Mountains', 'Recreational Buildings'
      ],
      example_text: "The exterior desperately needed work, and the owners wanted the house to be more in-line with the other homes on this very historic street. We mean that literally, as the whole house was picked up and moved closer to the street and angled to fit in better with its neighbors.",
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
  beforeMount () {
    this.platform = navigator.platform
  }
}
</script>

<style scoped lang='scss'>
  .width-container {
    width: 500px;
    max-width: 100%;
    margin: auto;
  }
  .container {
    width: 100%;
    max-width: 100%;
    margin: auto;
    padding-top: 24px;
    padding-bottom: 24px;
    background: rgba(0, 0, 0, 0.075);
    user-select: none;
    .utility {
      margin: 12px auto;
    }
  }
  .spacer {
    margin: 48px;
    margin-left: 0px;
    margin-right: 0px;
  }
</style>