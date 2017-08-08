<template lang='pug'>
  div(class='arrow-container text')
    div(class='left-arrow' v-bind:class="prevclass" v-on:click="change_count(true)")
      left-arrow
    div(class='utility')
      | {{ index }} / {{ length }}
    div(class='right-arrow' v-bind:class="nextclass" v-on:click="change_count(false)")
      right-arrow
</template>

<script>
  import right_arrow from '../SVG/right_arrow'
  import left_arrow from '../SVG/left_arrow'
  export default {
    props: ['index', 'length', 'prevclass', 'nextclass'],
    methods: {
      change_count: function(bool) {
        if(bool && this.index > 1) {
          //getting a vue warn here for mutating prop directly, use computed instead.
          //https://vuejs.org/v2/guide/computed.html
          this.index --
        } else if ( !bool && this.index < this.length) {
          this.index ++
        }
      }
    },
    components: {
      'right-arrow': right_arrow,
      'left-arrow': left_arrow
    }
  }
</script>

<style scoped lang='scss'>
  .arrow-container {
    position: relative;
    cursor: pointer;
    width: 89px;
    height: 24px;
    display: flex;
  }
  .utility {
    height: 24px;
    margin: auto;
    user-select: none;
  }
  .left-arrow, .right-arrow {
    position: absolute;
    transition: transform 0.2s ease;
    user-select: none;
  }
  .left-arrow {
    left: 0;
    padding-right: 29px;
    &:hover {
      transform: translateX(-4px);
    }
  }
  .right-arrow {
    right: 0;
    padding-left: 29px;
    &:hover {
      transform: translateX(4px);
    }
  }
</style>
