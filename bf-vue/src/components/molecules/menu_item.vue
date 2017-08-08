<template>
  <div class="h1 rollover menu-item" v-bind:class="hovered_class" v-on:click="toggle_hovered"><slot></slot></div>
</template>

<script>
  export default {
    data () {
      return {
        hovered_class: ''
      }
    },
    props: ['clearstate'],
    watch: {
      clearstate: function () {
        if(this.clearstate === 'clear') {
          this.hovered_class = ''
        }
      }
    },
    methods: {
      toggle_hovered: function () {
        this.$emit('clicked')
        var context = this
        setTimeout(function() {
          context.hovered_class = 'hovered'
        })
      }
    }
  }
</script>

<style scoped lang='scss'>
  .menu-item {
    user-select: none;
    cursor: pointer;
    margin-top: 18px;
    margin-bottom: 18px;
    &.inactive {
      &:before {
        opacity: 0 !important;
      }
    }
  }
</style>
