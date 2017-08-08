<template>
  <div class="main">
    <div class="router-wrapper" v-bind:class="[router_transition]">
      <router-view></router-view>
      <!-- <vfooter v-if="route_has_footer()" v-bind:color="footer_color" v-bind:footertype="footer_type">Footer</vfooter> -->
    </div>
    <!-- <navigation v-if="this.$route.name !== 'landing'" v-on:nav="do_nav">{{ $route.name }}</navigation> -->
  </div>
</template>

<script>
  // import footer from './organisms/footer'
  // import navigation from './organisms/navigation'

  import scroll_reveal from '../utils/scroll_reveal'

  export default {
    // components: {
    //   'navigation': navigation,
    //   'vfooter': footer
    // },
    data () {
      return {
        footer_color: 'frost',
        footer_type: 'twentyfive-percent', //can make responsive if needed.
        router_transition: ''
      }
    },
    methods: {
      route_has_footer: function () {
        var no_footer = ['about', 'portfolio', 'landing']
        return no_footer.indexOf(this.$route.name.toLowerCase()) === -1
      },
      do_nav: function () {
        var context = this
        this.router_transition = 'change'
        setTimeout(function () {
          context.router_transition = ''
        }, 600)
      }
    },
    mounted () {
      setTimeout(function () {
        window.scrollTo(0, 0)
      })
      window.onbeforeunload = function () {
        window.scrollTo(0, 0)
      }
    },
    watch: {
      $route: function () {
        this.do_nav()
      }
    }
  }
</script>

<style scoped lang='scss'>
  .router-wrapper {
    transition: opacity 0.6s ease-in-out;
    &.change {
      opacity: 0;
    }
  }
</style>
