<template>
  <div v-bind:class="[container_type, paddingtype]" v-on:click="emit_clicked">
    <highlight v-bind:length="length" v-bind:color="color"></highlight>
    <div v-bind:class="text_type">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .highlight-container {
    position: relative;
    padding-left: 32px; //24
    padding-right: 32px;
    padding-top: 6px;
    padding-bottom: 6px;
    display: inline-block;
    cursor: default;
    user-select: none;
    text-align: left;
    
    // &.long {
    //   display: block;
    // }
    &.no-padding {
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }
  .text-container {
    position: relative; margin: auto; margin-top: 6px;
  }
</style>

<script>
  import highlight from '../SVG/highlight'
  export default {
    props: ['type', 'color', 'long', 'paddingtype'],
    components: {
      'highlight': highlight
    },
    methods: {
      emit_clicked: function () {
        this.$emit('clicked')
      }
    },
    data () {
      return {
        text_type: this.type + ' text-container',
        container_type: this.long === undefined ? 'fonts highlight-container' : 'fonts highlight-container long',
        length: this.long === undefined ? 'short' : 'long'
      }
    }
  }
</script>
