<template>
  <div>
    <div v-for="item in data">
      {{item}}
    </div>
  </div>
</template>

<script>
  import addresses from '../utils/api_addresses'
  import "babel-polyfill";
  import axios from 'axios'
  // import 'es6-promise'

  export default {
    data () {
      return {
        data: '',
        categories: {},
        list: ['portfolio', 'a closer look', 'about us', 'news']
      }
    },
    mounted () {
      
      var context = this

      // -> get images from acf

      // axios.get(addresses.live_production + 'posts?slug=testing')
      // .then(function (response) {
      //   var temp = []
      //   var acf = response.data[0].acf
      //   for (var i = 0; i < acf.property_gallery.length; i++) {
      //     temp.push(acf.property_gallery[i].url)
      //   }
      //   context.data = temp
      // })

      // get lists from categories ->

      // axios.get(addresses.live_production + 'categories')
      // .then(function(response) {
      //   for(var i = 0; i < response.data.length; i ++) {
      //     context.categories[response.data[i].name.toLowerCase()] = response.data[i].id
      //   }
      // })

      // .then(function() {
      //   for(var c = 0; c < context.list.length; c ++) {
      //     axios.get(addresses.live_production + 'posts?categories=' + context.categories[context.list[c]])
      //     .then(function(response) {
      //       for(var j = 0; j < response.data.length; j ++) {
      //         console.log(response.data[j].title.rendered)
      //       }
      //     })
      //   }
      // })

      axios.get(addresses.live_production + 'pages?slug=navigation')
      .then(function (response) {
        var portfolio_links = response.data[0].acf.portfolio_navigation
      })

    }
  }
</script>

