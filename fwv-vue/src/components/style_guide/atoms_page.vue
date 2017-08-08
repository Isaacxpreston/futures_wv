<template>
  <div class="fonts">
    <h1>Atoms</h1>
    <p>Icons, buttons, images, and decorated text</p>
    <p>Platform: {{platform}}</p>
    <div class="container">
      <v-button type="standard">Button (standard)</v-button>
      <v-button width="148px" height="36px">Button (custom)</v-button>
      <image-label type="normal">Label</image-label>
      <forminput label="Text input" width="290px"></forminput>

      <arrows index="1" length="4"></arrows>
      <expand></expand>
      <hamburger></hamburger>
      <dropdown-chevron></dropdown-chevron>
      <mobile-main-menu></mobile-main-menu>
      <close-icon></close-icon>

      <left-arrow></left-arrow>
      <right-arrow></right-arrow>
      <down-arrow></down-arrow>
      <download-arrow></download-arrow>
      <facebook></facebook>
      <instagram></instagram>
      <twitter></twitter>
      <pinterest></pinterest>
      <dering-hall></dering-hall>
      <houzz></houzz>
      <bf-small></bf-small>
      <brooks-falotico></brooks-falotico>

      <h1 class="rollover">Link with rollover</h1>
      <p class="rollover large">Link with rollover</p>

      <highlight type="h1" color="white">Highlight</highlight>
      <highlight type="h1" color="white">Multi Line<br> Highlight</highlight>
      <highlight type="p large rollover" color="white">Rollover + Highlight</highlight>
      <highlight type="h1" color="white" long>Longer Highlight</highlight>
      <landing-logo></landing-logo>
      
      <div class="utility">Image with box shadow</div> 

      <image-component height="288px" width="500px" image= "https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg">
      </image-component>

      <div class="utility">Image with icon overlay</div>
      <image-component height="288px" width="500px" image="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/%C2%A9Jane-Beiles-6455web.jpg"
      overlay="https://s3-us-west-2.amazonaws.com/image-dump-isaacxpreston/House_Garden.png"></image-component>

      <mapcomponent></mapcomponent>

    </div>
  </div>
</template>

<script>
import detect_browser from '../../utils/detect_browser'

import button from '../atoms/button'
import arrows from '../atoms/arrows'
import mobile_main_menu from '../atoms/mobile_main_menu'
import image_label from '../atoms/image_label'
import hamburger from '../atoms/hamburger'
import brooks_falotico from '../atoms/brooks_falotico'
import highlight_component from '../atoms/highlight_component'
import mapcomponent from '../atoms/map'
import image_component from '../atoms/image_component'
import landing_logo from '../atoms/landing_logo'
import form_input from '../atoms/form_input'

import bf_small from '../SVG/bf_logo'
import expand from '../SVG/expand'
import dropdown_chrevron from '../SVG/dropdown_chevron'
import close_icon from '../SVG/close_icon'
import facebook from '../SVG/facebook'
import instagram from '../SVG/instagram'
import twitter from '../SVG/twitter'
import pinterest from '../SVG/pinterest'
import dering_hall from '../SVG/dering_hall'
import houzz from '../SVG/houzz'
import down_arrow from '../SVG/down_arrow'
import left_arrow from '../SVG/left_arrow'
import right_arrow from '../SVG/right_arrow'
import download_arrow from '../SVG/download'
import highlight from '../SVG/highlight'
import main_logo from '../SVG/main_logo'

export default {
  components: {
    'v-button': button,
    'arrows': arrows,
    'bf-small': bf_small,
    'expand': expand,
    'hamburger': hamburger,
    'dropdown-chevron': dropdown_chrevron,
    'instagram': instagram,
    'facebook': facebook,
    'twitter': twitter,
    'pinterest': pinterest,
    'houzz': houzz,
    'down-arrow': down_arrow,
    'mobile-main-menu':mobile_main_menu,
    'left-arrow': left_arrow,
    'right-arrow': right_arrow,
    'close-icon': close_icon,
    'image-label': image_label,
    'download-arrow':download_arrow,
    'highlight': highlight_component,
    'highlight-old': highlight,
    'brooks-falotico': brooks_falotico,
    'mapcomponent': mapcomponent,
    'image-component': image_component,
    'main-logo': main_logo,
    'landing-logo': landing_logo,
    'forminput': form_input,
    'dering-hall': dering_hall
  },
  data () {
    return {
      platform: 'Determining platform...'
    }
  },
  beforeMount () {
    this.platform = navigator.platform
  }
}
</script>

<style scoped lang='scss'>
  .container {
    width: 800px;
    max-width: calc(100% - 72px);
    margin: auto;
    padding: 24px;
    background: rgba(0, 0, 0, 0.075);
    user-select: none;
    * {
        margin: 24px;
    }
  }
</style>