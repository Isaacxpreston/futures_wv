<template>
  <div class="fade-in" v-bind:class="[visible]" id="fade-in">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        'visible': ''
      }
    },
    mounted () {
      var context = this
      window.addEventListener('scroll', function () {
        var el_offset = document.getElementById('fade-in').offsetTop + document.getElementById('fade-in').offsetHeight
        var current_position = document.body.scrollTop + window.innerHeight
        if (current_position >= el_offset) {
          context.visible = 'visible'
        } else {
          context.visible = ''
        }
      })
    }
  }

</script>

<style scoped lang="scss">
  .fade-in {
    width: 100%;
    height: 100%;
    opacity: 0.1;
    transition: all 0.8s ease-in-out;
    transform: translateY(100%);
    &.visible {
      transform: none;
      opacity: 1;
    }
  }
</style>

