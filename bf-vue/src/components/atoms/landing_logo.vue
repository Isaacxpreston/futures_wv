<template>
  <highlight color="white">
    <div class="main-logo-container">
      <main-logo></main-logo>
    </div>
  </highlight>
</template>

<script>
  import main_logo from '../SVG/main_logo'
  import highlight from './highlight_component'
  export default {
    components: {
      'highlight': highlight,
      'main-logo': main_logo
    }
  }
</script>

<style scoped lang='scss'>
  .main-logo-container {
    height: 60px; margin-top: 12px; padding-left: 12px; padding-right: 12px;
  }
</style>
