<template>
  <div v-on:keydown="check_for_enter">
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
        status: 'press submit to save to db',
        default_status: 'press submit to save to db'
      }
    },
    methods: {
      check_for_enter (e) {
        if(e.keyCode === 13) {
          this.submit_login()
        }
      },
      reset_fields () {
        this.name = ''
        this.email = ''
        this.school = ''
        this.status = this.default_status
      },
      submit_login () {
        var context = this
        if(!this.name || !this.email || !this.school) {
          this.status = 'please fill out all fields'
          setTimeout(function () {
            context.reset_fields()
          }, 2000)
          return false
        }
        this.status = 'submitting'
        axios.post(addresses.db_server, {
          name: this.name,
          email: this.email,
          school: this.school
        })
        .then((response) => {
          context.status = response.data
          setTimeout(function () {
            context.reset_fields()
          }, 2000)
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