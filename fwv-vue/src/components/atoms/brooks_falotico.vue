<template>
  <span class="p large bf-logo-container">Brooks <div class="ampersand-container"><ampersand></ampersand></div> Falotico</span>
</template>

<script>
  import ampersand from '../SVG/ampersand'
  export default {
    components: {
      'ampersand': ampersand
    }
  }
</script>

<style scoped lang="scss">
  .bf-logo-container {
    display: inline-block;
    margin: 0px auto; 
    svg {
      margin: 24px;
    }
  }
  .ampersand-container {
    position: relative;
    display: inline-block;
    margin: 0px auto;
    margin-bottom: -4px; 
    margin-left: -24px;
    margin-right: -6px;
    height: 48px; 
    width: 48px;
    overflow: hidden;
  }
</style>