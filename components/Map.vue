<script>
import { gmapApi } from "vue2-google-maps";
import mapStyle from "~/assets/mapStyle";

const iconConf = {
  anchor: { x: 20, y: 20 },
  scaledSize: { width: 20, height: 20 }
};

export default {
  props: ["location", "destination"],

  mounted() {
    this.bounds();
  },

  watch: {
    location: "bounds",
    destination: "bounds"
  },

  methods: {
    bounds() {
      this.$refs.mapRef.$mapPromise.then(map => {
        let bounds = new google.maps.LatLngBounds();
        bounds.extend(this.location);
        bounds.extend(this.destination);
        map.fitBounds(bounds);
      });
    }
  },

  data: () => ({
    options: {
      backgroundColor: "#222",
      disableDefaultUI: true,
      scrollwheel: false,
      styles: mapStyle,
      zoom: 1
    },

    locationOptions: {
      icon: { url: "/location.svg", ...iconConf }
    },

    destinationOptions: {
      icon: { url: "/destination.svg", ...iconConf }
    }
  }),

  computed: {
    google: gmapApi,

    hasLocation() {
      return this.location.lat !== 0 && this.location.lat !== 0;
    },
    hasDestination() {
      return this.destination.lat !== 0 && this.destination.lat !== 0;
    }
  }
};
</script>

<template>
  <div>
    <gmap-map id="map" :center="{ lat: 45.508, lng: -73.587 }" :options="options" ref="mapRef">
      <gmap-marker :position="location" :options="locationOptions" v-if="hasLocation"></gmap-marker>
      <gmap-marker :position="destination" :options="destinationOptions" v-if="hasDestination"></gmap-marker>
    </gmap-map>
  </div>
</template>

<style lang="scss">
#map {
  height: 600px;
  border: 1px solid #4e4e4e;
  margin-top: 3em;
}
</style>
