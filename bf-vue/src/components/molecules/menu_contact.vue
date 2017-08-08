<template>
  <div>
    <div class="contact-main">
      <div class="subheader">Contact Us</div>
      <div class="p small extra-margin">{{caption}}</div>
      
      <div class="subheader">Careers</div>
      <div class="p small">{{careers_caption}} <a v-bind:href="careers_email_mailto">{{careers_email}}</a></div>
    </div>
    <div class="contact-address">
      <div class="p small">
        {{address1}} <br />
        {{address2}}
      </div>
      <div class="p small">
        Phone: {{phone}} <br />
        Fax: {{fax}} <br />
        <a v-bind:href="email_href">Email us</a>
      </div>
    </div>
    <div class="contact-social">
      <div class="subheader">Follow Us</div>
      <!-- make these v ifs -->
      <facebook v-if="facebook_url" v-on:clicked="external('facebook_url')"></facebook>
      <instagram v-if="instagram_url" v-on:clicked="external('instagram_url')"></instagram>
      <twitter v-if="twitter_url" v-on:clicked="external('twitter_url')"></twitter>
      <pinterest v-if="pinterest_url" v-on:clicked="external('pinterest_url')"></pinterest>
      <dering-hall v-if="dering_hall_url" v-on:clicked="external('dering_hall_url')"></dering-hall>
      <houzz v-if="houzz_url" v-on:clicked="external('houzz_url')"></houzz>
    </div>
  </div>
</template>

<script>
  import facebook from '../SVG/facebook'
  import instagram from '../SVG/instagram'
  import twitter from '../SVG/twitter'
  import pinterest from '../SVG/pinterest'
  import dering_hall from '../SVG/dering_hall'
  import houzz from '../SVG/houzz'

  import addresses from '../../utils/api_addresses'
  
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    components: {
      'instagram': instagram,
      'facebook': facebook,
      'twitter': twitter,
      'pinterest': pinterest,
      'houzz': houzz,
      'dering-hall': dering_hall
    },
    data () {
      return {
        phone: '',
        fax: '',
        address1: '',
        address2: '',
        caption: '',
        careers_caption: '',
        careers_email: '',
        careers_email_mailto: '',
        instagram_url: '',
        facebook_url: '',
        twitter_url: '',
        pinterest_url: '',
        houzz_url: '',
        dering_hall_url: '',
        email_href: ''
      }
    },
    methods: {
      external: function (str) {
        window.open(this[str])
      }
    },
    mounted () {
      var context = this
      axios.get(addresses.live_production + 'pages?slug=navigation')
      .then(function (response) {
        var acf = response.data[0].acf
        context.email_href = 'mailto:' + acf.email
        context.phone = acf.phone
        context.fax = acf.fax
        context.address1 = acf.address_line_1
        context.address2 = acf.address_line_2
        context.caption = acf.contact_text
        context.careers_caption = acf.careers_text
        context.careers_email = acf.careers_email
        context.careers_email_mailto = 'mailto:' + acf.careers_email
        context.instagram_url = acf.instagram_url
        context.facebook_url = acf.facebook_url
        context.twitter_url = acf.twitter_url
        context.pinterest_url = acf.pinterest_url
        context.houzz_url = acf.houzz_urls
        context.dering_hall_url = acf.dering_hall_url
      })
    }
  }
</script>

<style scoped lang='scss'>

  @import '../../styles/breakpoints.scss';

  .contact-main {
    margin-right: 36px;
    margin-top: 36px;
    margin-bottom: 24px;
  }

  .contact-address {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 24px;
    .p {
      margin-right: 120px;
      @media screen and (max-width: $mobile-size) {
        margin-bottom: 12px;
      }
    }
    @media screen and (max-width: $mobile-size) {
      flex-direction: column;
      margin-bottom: 12px;
    }
  }

  .contact-social {
    display: flex;
    justify-content: flex-start;
    .subheader {
      margin-right: 12px;
    }
    svg {
      margin-left: 12px;
      margin-right: 12px;
    }
  }

  .extra-margin {
    margin-bottom: 12px;
  }

</style>