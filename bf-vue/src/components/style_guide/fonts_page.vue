<template lang='pug'>
  <div class="container fonts">
    <h1> Header One</h1>
    <h2> Header Two </h2>
    <h3> Header Three </h3>
    <p class="large" >Paragraph Large</p>
    <p class="large">{{ lorem_ipsum }}</p>
    <p>Paragraph</p>
    <p>{{ lorem_ipsum }}</p>
    <p class="small">Paragraph Small</p>
    <p class="small">{{ lorem_ipsum }}</p>
    <p class="subheader">Subheader</p>
    <p class="utility">Utility</p>
    <router-link to="#">Text Link</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lorem_ipsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non aliquam metus. Cras aliquet justo eget molestie eleifend. Donec iaculis gravida euismod. Maecenas eget mauris non augue eleifend fermentum. Suspendisse et augue sodales, iaculis lectus quis, molestie diam. Phasellus vitae scelerisque eros. Nam finibus id erat non luctus. Nam maximus sapien ac urna suscipit cursus. Pellentesque semper ante dui.'
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  width: 800px;
  max-width: calc(100% - 48px);
  margin: auto;
  text-align: left;
}
</style>
