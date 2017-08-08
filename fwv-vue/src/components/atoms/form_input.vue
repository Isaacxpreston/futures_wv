<template>
  <div class="form-input fonts" v-bind:style="form_styles">
    <input type="text" v-bind:placeholder="label" class="utility" v-model="message"></input>
    <div class="form-label utility">{{label}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        'form_styles': {
          'width': this.width
        },
        message: ''
      }
    },
    props: ['label', 'width', 'clear'],
    watch: {
      message: function () {
        this.$emit('change', this.message)
      },
      clear: function () {
        if (this.clear) {
          this.message = ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/colors.scss';
  .form-input {
    position: relative;
    height: 36px;
    width: 100%;
    border: 1px solid $rice;
    border-right: 1px solid transparent;
    background: white;
  }
  input {
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 16px;
    background: none;
    height: calc(100% - 2px);
    width: calc(100% - 20px);
    &::selection {
      background: $rice;
    }
    &::placeholder {
      color: $anchor;
      opacity: 1;
      transition: all 0.6s ease-in-out
    }
    &:active, &:focus {
      outline: none;
      & + .form-label {
        background: white;
        transform: translateY(-18px) ;
        opacity: 1;
      }
      &::placeholder {
        opacity: 0;
      }
    }
  }
  .form-label {
    position: absolute;
    display: inline-block;
    color: $anchor;
    height: 24px;
    top: 0; left: 0; bottom: 0;
    margin: auto;
    margin-left: 4px;
    padding-left: 12px;
    padding-right: 12px;
    pointer-events: none;
    opacity: 0;
    transition: all 0.6s ease-in-out;
  }
</style>
