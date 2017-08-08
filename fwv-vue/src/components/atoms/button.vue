<template>
  <div class="button" v-bind:class="type" v-bind:style="button_style" v-on:click="emit_clicked">
    <div class="text utility"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        button_style: {
          "height": this.height,
          "width": this.width
        }
      }
    },
    methods: {
      emit_clicked: function () {
        this.$emit('clicked')
      }
    },
    props: ['text', 'height', 'width', 'type']
  }
</script>

<style scoped lang="scss">
  @import '../../styles/breakpoints.scss';
  
  .button {
    height: 100%;
    width: 100%;
    display: flex;
    background: #454545;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    transition: all 0.4s ease;
    .text { 
      height: 24px;
      margin: auto;
      color: #FFFFFF;
      transition: all 0.4s ease;
    }
    &:hover {
      background: #7C7774;
    }
    &.standard {
      width: 210px;
      height: 48px;
      @media screen and (max-width: $tablet-size) {
        height: 36px;
        width: 148px;
      }
      @media screen and (max-width: $mobile-size) {
        height: 48px;
        width: 157px;
      }
    }
  }
</style>