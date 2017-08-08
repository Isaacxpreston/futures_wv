<template>
<div>
    <div class="navigation-overlay" v-bind:class="menu_class" v-on:click="toggle_menu"></div>

    <div class="fonts navigation-container">
      <navbar v-on:toggle='toggle_menu' v-on:clicked="navtolink('', true)"><slot></slot></navbar>
      <navbar-mobile v-on:toggle='toggle_menu' v-on:clicked="navtolink('', true)"></navbar-mobile>

      <div class="menu" v-bind:class="menu_class">
        <div class="menu-inner">
          <div v-for="item in menu_list">
            <menutag v-on:clicked="toggle_submenu(item.submenu, item.color, item.title, item.template_url)" v-bind:clearstate="clear_state">{{item.title}}</menutag><br/>  
          </div>
        </div>
      </div>

      <div class="submenu" v-bind:class="[submenu_class, submenu_color]">

        <div v-if="current_submenu === 'Contact Us'" class="contact-container" v-bind:class="submenu_innerclass">
          <div class="main-menu">
            <mainmenu v-on:clicked="hide_submenu"></mainmenu>
          </div>
          <mapcomponent></mapcomponent>
          <contactmenu></contactmenu>
        </div>

        <div v-else class="submenu-inner" v-bind:class="submenu_innerclass">
          <div class="main-menu">
            <mainmenu v-on:clicked="hide_submenu"></mainmenu>
          </div>

          <div class="submenu-item" v-for="item in submenu_list">
            <div class="h2 rollover" v-on:click="navtolink(current_template_url + item.url)">{{item.title}}</div>
          </div>

          <div v-if="current_submenu === 'News'" class="newsletter-container">
            <div class="subheader">Newsletter Sign Up</div>
            <div class="p small">Stay up to date with our lastest blog posts, interior decorating tips and tricks and B&F happennings.</div>
            <div class="email-signup-container">
              <email-form></email-form>
            </div>
          </div>
        </div>

      </div>

    </div>

</div>
</template>

<script>
  import email_form from '../molecules/email_form'
  import navbar from '../molecules/navbar'
  import navbar_mobile from '../molecules/navbar_mobile'
  import menu_item from '../molecules/menu_item'
  import mapcomponent from '../atoms/map'
  import menu_contact from '../molecules/menu_contact'
  import main_menu from '../atoms/mobile_main_menu'

  import addresses from '../../utils/api_addresses'

  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    data () {
      return {
        menu_class: '',
        submenu_class: '',
        submenu_color: 'white',
        submenu_innerclass: '',
        current_submenu: '',
        current_template_url: '',
        clear_state: '',
        show_initial: true,
        menu_list: [
          {
            title: 'Portfolio',
            template_url: 'portfolio/',
            submenu: [],
            color: 'frost'
          }, 
          {
            title: 'A Closer Look',
            template_url: 'closer-look/',
            submenu: [],
            color: 'eggshell'
          },
          {
            title: 'About Us',
            template_url: 'about/',
            submenu: [],
            color: 'salt'
          },
          {
            title: 'News',
            template_url: "",
            submenu: [],
            color: 'chiffon'
          },
          {
            title: 'Contact Us',
            color: 'white'
          }
        ],
        submenu_list: []
      }
    },
    components: {
      'navbar': navbar,
      'navbar-mobile': navbar_mobile,
      'menutag': menu_item,
      'email-form': email_form,
      'mapcomponent': mapcomponent,
      'contactmenu': menu_contact,
      'mainmenu': main_menu
    },
    methods: {
      set_clear_state: function () {
        this.clear_state = 'clear'
        var context = this
        setTimeout(function() {
          context.clear_state = ''
        })
      },
      set_list: function (scope, title, list, template_url) {
        scope.current_submenu = title
        scope.submenu_list = list
        scope.current_template_url = template_url
      },
      toggle_menu: function (bool) {
        if(this.menu_class === 'menu-open' || bool) {
          this.set_clear_state()
          this.submenu_class = ''
          this.menu_class = ''
          this.show_initial = true
          for(var i = 0; i < document.getElementsByTagName('input').length; i ++) {
            document.getElementsByTagName('input')[i].checked = false
          }
        } else {
          this.submenu_class = 'submenu-half-open'
          this.menu_class = 'menu-open'
          for(var i = 0; i < document.getElementsByTagName('input').length; i ++) {
            document.getElementsByTagName('input')[i].checked = true
          }
        }
      },
      toggle_submenu: function (list, color, title, template_url) {
        this.set_clear_state()
        this.submenu_class = 'submenu-open'
        this.submenu_color = color || 'white'
        if(!this.show_initial) {
          this.submenu_innerclass = 'hidden'
          var context = this
          setTimeout(function () {
            context.set_list(context, title, list, template_url)
            context.submenu_innerclass = ''
          }, 600)
        } else {
          this.set_list(this, title, list, template_url)
          this.show_initial = false
          this.submenu_innerclass = ''
        }
      },
      hide_submenu: function () {
        this.set_clear_state()
        this.submenu_innerclass = 'hidden'
        this.submenu_class = ''
      },
      navtolink: function (str, bool) {
        this.$emit('nav')
        var context = this
        this.toggle_menu(bool)
        setTimeout(function() {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/' + str
          })
        }, 600)
      }
    },
    mounted () {
      var context = this
      axios.get(addresses.live_production + 'pages?slug=navigation')
      .then(function (response) {
        var portfolio_links = response.data[0].acf.portfolio_navigation
        context.menu_list[0].submenu = portfolio_links

        var closer_look_links = response.data[0].acf.closer_look_navigation
        context.menu_list[1].submenu = closer_look_links

        var about_links = response.data[0].acf.about_navigation
        context.menu_list[2].submenu = about_links

        var news_links = response.data[0].acf.news_navigation
        context.menu_list[3].submenu = news_links
      })
    }
  }
</script>

<style scoped lang="scss">

  @import '../../styles/colors.scss';
  @import '../../styles/breakpoints.scss';

  .navigation-container {
    position: absolute;
    z-index: 3;
  }

  .navigation-overlay {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    transition: all 0.6s ease-in-out;
    transition-delay: 0.25s;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    &.menu-open {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .menu {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin-top: 24px;
    margin-left: -498px;
    width: 498px;
    height: calc(100vh - 48px);
    // max-height: 912px;
    overflow-y: auto;
    background: white;
    transition: margin-left 0.6s, margin-top 0.6s ease-in-out;
    transition-delay: 0.25s;
    @media screen and (max-width: 1150px) {
      width: calc(100% - 104px);
      margin-left: -100%;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      // margin-top: 60px;
      margin-left: 0px;
      margin-top: -100vh;
      height: calc(100vh - 60px);
    }
    &.menu-open {
      margin-left: 80px;
      @media screen and (max-width: $mobile-grid) {
        margin-top: 60px;
        margin-left: 0px;
      }
    }
  }
  .submenu {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 24px;
    margin-left: -576px;
    width: 576px;
    height: calc(100vh - 48px);
    // max-height: 912px;
    overflow-y: auto;
    transition: all 0.6s ease-in-out;
    @media screen and (max-width: 1150px) {
      width: calc(100% - 104px);
      margin-left: -100%;
      opacity: 0;
      z-index: 2;
      pointer-events: none;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-top: 60px;
      height: calc(100vh - 60px);
    }
    &.submenu-half-open {
      margin-left: 0px;
      transition-delay: 0.45s;
      @media screen and (max-width: 1150px) {
        margin-left: 80px;
      }
      @media screen and (max-width: $mobile-grid) {
        margin-left: 0px;
      }
    }
    &.submenu-open {
      margin-left: 578px;
      @media screen and (max-width: 1150px) {
        opacity: 1;
        margin-left: 80px;
        pointer-events: auto;
      }
      @media screen and (max-width: $mobile-grid) {
        margin-left: 0px;
      }
    }
  }
  .menu-inner {
    text-align: left;
    margin-top: 72px;
    margin-left: 48px;
    @media screen and (max-width: $mobile-grid) {
      margin-top: 24px;
      margin-left: 24px;
    }
  }
  .submenu-inner {
    text-align: left;
    margin-top: 72px;
    margin-left: 72px;
    transition: opacity 0.6s ease-in-out;
    &.hidden {
      opacity: 0;
    }
    @media screen and (max-width: $mobile-grid) {
      margin-top: 24px;
      margin-left: 24px;
    }
  }
  .submenu-item {
    user-select: none;
    cursor: pointer;
    padding-top: 12px;
    padding-bottom: 12px;
    transition: all 0.4s ease;
    &:hover {
      opacity: 0.9;
    }
  }

  .newsletter-container {
    margin-top: 120px;
    width: 400px;
    max-width: calc(100% - 24px);
    .p {
      margin-bottom: 12px;
    }
    .email-signup-container {
      position: relative;
      display: block;
    }
  }

  .contact-container {
    text-align: left;
    width: 100%;
    margin-top: -24px;
    margin-bottom: 0px;
    transition: opacity 0.6s ease-in-out;
    .p {
      margin-bottom: 12px;
    }
    &.hidden {
      opacity: 0;
    }
    @media screen and (max-width: 1150px) {
      width: calc(100% - 144px);
      margin: 72px;
    }
    @media screen and(max-width: $mobile-grid) {
      width: calc(100% - 48px);
      margin: 24px;
    }
  }

  .main-menu {
    display: none;
    margin-bottom: 24px;
    @media screen and (max-width: 1150px) {
      display: block;
    }
  }
</style>
