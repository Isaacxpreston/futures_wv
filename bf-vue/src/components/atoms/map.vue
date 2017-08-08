<template>
  <div id="bf-map"></div>
</template>

<style scoped lang='scss'>
  @import '../../styles/breakpoints.scss';
  #bf-map {
    position: relative;
    width: 100%; 
    margin: 0px auto;
    margin-top: 24px;
    height: 300px;
    background: grey;
    @media screen and (max-width: $mobile-size) {
      width: calc(100% + 48px);
      margin-left: -24px;
    }
  }
</style>

<script>
  import maps_styles from '../../utils/maps_styles'
  import addresses from '../../utils/api_addresses'

  export default {
    methods: {
      initMap: ()  => {
        var uluru = {lat: 41.146479, lng: -73.496818};
        var map = new google.maps.Map(document.getElementById('bf-map'), {
          zoom: 14,
          center: uluru,
          scrollwheel: false,
          disableDefaultUI: true,
          styles: maps_styles
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      },
      appendMap: function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = addresses.maps;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },
    mounted () {
      window.initMap = this.initMap
      this.appendMap()
    }
  }
</script>