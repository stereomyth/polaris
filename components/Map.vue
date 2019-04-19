<script>
import mapStyle from "~/assets/mapStyle";

export default {
  props: ["coords"],

  mounted() {
    // const initMap = () => {
    // Create a map object and specify the DOM element for display.
    let map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      backgroundColor: "#222",
      disableDefaultUI: true,
      scrollwheel: false,
      styles: mapStyle,
      zoom: 1
    });
    let location = new google.maps.Marker({
      icon: {
        scaledSize: { width: 20, height: 20 },
        url: "/marker1.png",
        anchor: { x: 20, y: 20 }
      },
      position: this.coords,

      map: map
    });
    // let destination = new google.maps.Marker({
    //   icon: {
    //     scaledSize: { width: 20, height: 20 },
    //     url: "/images/marker2.png",
    //     anchor: { x: 20, y: 20 }
    //   },
    //   position: dest,
    //   map: map
    // });

    // var bounds = new google.maps.LatLngBounds();
    // bounds.extend(location.position);
    // bounds.extend(destination.position);
    // map.fitBounds(bounds);
    // };
  },

  data: () => ({})
};
</script>

<template>
  <div>
    <div id="map"></div>
    <!-- <pre>{{coords}}</pre> -->
  </div>
</template>

<style lang="scss">
#map {
  height: 600px;
  border: 1px solid #4e4e4e;
  margin-top: 3em;
}
</style>




