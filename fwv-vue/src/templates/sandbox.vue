<template>
  <div>
    <h1>Sandbox</h1>
    <input v-model="name" placeholder="name"></input>
    <input v-model="email" placeholder="email"></input>
    <input v-model="school" placeholder="school"></input>
    <button v-on:click="submit_login">submit</button>
    <p>{{status}}</p>
  </div>
</template>

<script>
  import addresses from '../utils/api_addresses'
  import "babel-polyfill" // needed for axios in IE browsers
  import axios from 'axios'

  export default {
    data () {
      return {
        name: '',
        email: '',
        school: '',
        status: 'press submit to save to db'
      }
    },
    methods: {
      submit_login () {
        var context = this
        this.status = 'submitting'
        axios.post('api-address-HERE', {
          name: this.name,
          email: this.email,
          school: this.school
        })
        .then((response) => {
          //do something client side
        })
        .catch((error) => {
          context.status = 'error'
        })
      }
    },
    mounted () {
    }
  }
</script>