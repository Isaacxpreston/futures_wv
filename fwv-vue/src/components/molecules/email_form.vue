<template>
  <div class="fonts">
    <div class="notification utility" v-bind:class="notification_class">{{notification}}</div>
    <div class="main-container">
        <div class="input-container">
          <forminput label="Email address" v-on:change="update_email" v-bind:clear="clearstate"></forminput>
        </div>
        <div class="button-container">
          <v-button v-on:clicked="subscribe">Subscribe</v-button>
        </div>
    </div>
  </div>
</template>

<script>
  import button from '../atoms/button'
  import form_input from '../atoms/form_input'

  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'
  import addresses from '../../utils/api_addresses'
  import valid_email from '../../utils/valid_email'
  
  export default {
    components: {
      'forminput': form_input,
      'v-button': button
    },
    data () {
      return {
        email: '',
        notification: 'Subscribing...',
        notification_class: '',
        clearstate: false
      }
    },
    methods: {
      set_notification: function (st) {
        var context = this
        this.notification = st
        this.notification_class = 'active'
        setTimeout(function () {
          context.notification_class = ''
        }, 2400)
      },
      subscribe: function () {
        var context = this
        if(!valid_email(this.email)) {
          context.set_notification('Please enter a valid email address.')
        } else {
          var submitting = setTimeout(function () {
            context.set_notification('Subscribing...')
          }, 1000)
          axios.post(addresses.mailchimp, {
            email: this.email
          })
          .then(function(response) {
            clearTimeout(submitting)
            context.clearstate = true
            context.set_notification('Subscribed!')
            setTimeout(function () {
              context.clearstate = false
            })
          })
        }

      },
      update_email: function (val) {
        this.email = val
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../../styles/breakpoints.scss';

  .button-container {
    position: relative;
    width: 104px;
    height: 36px;
  }
  .input-container {
    position: relative;
    width: calc(100% - 104px);
  }
  .main-container {
    width: 395px;
    max-width: 100%;
    display: flex;
    margin: auto;
    margin-top: 24px;
    @media screen and (max-width: $mobile-size) {
      width: 100%;
    }
  }
  .notification {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    user-select: none;
    pointer-events: none;
    &.active {
      opacity: 1;
    }
  }
</style>