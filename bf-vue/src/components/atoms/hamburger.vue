<template lang="pug">
  div(class="hamburger")
    input(type="checkbox" v-on:click="emit_toggle")
    div(class="line line-1")
    div(class="line line-2")
    div(class="line line-3")
</template>

<script>
  export default {
    methods: {
      emit_toggle: function () {
        this.$emit('toggle')
      }
    }
  }
</script>

<style scoped lang="scss">
  .hamburger {
    width: 24px; 
    height: 24px;
    background: white;
    cursor: pointer;
    user-select: none;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    &:hover {

      transform: scale(1.15, 1.15);
    }
  }
  input {
    position: absolute;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    opacity: 0;
    top: 0;
    left: 0;
    transform: scale(4, 4);
    &:checked ~ .line {
      transition: transform 0.2s ease 0.2s, margin-top 0.2s ease 0s, opacity 0.2s ease 0s; //transition in
      &.line-1 {
        margin-top: 11px;
        transform: rotate(45deg);
      }
      &.line-2 {
        opacity: 0;
      }
      &.line-3 {
        margin-top: 11px;
        transform: rotate(-45deg);
      }
    }
  }
  .line {
    position: absolute;
    z-index: 1;
    width: 20px;
    margin-left: 2px;
    height: 1px;
    background: #454545;
    transform-origin: 50% 50%;
    transition: transform 0.2s ease 0s, margin-top 0.2s ease 0.2s, opacity 0.2s ease 0s; //transition out
  }
  .line-1 {
    margin-top: 5px;
  }
  .line-2 {
    margin-top: 11px;
  }
  .line-3 {
    margin-top: 17px;
  }
</style>
