<script>
import Map from "~/components/Map";
import Location from "~/components/Location";

export default {
  components: { Map, Location },

  methods: {
    setLocation({ latitude, longitude }) {
      this.location = { lat: latitude, lng: longitude };
    },

    setCoords(lat, long) {
      if (lat && long) {
        fetch("/set", {
          method: "post",
          body: JSON.stringify({ lat: lat, long: long }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => {
            console.log("success");
            $(".update-success").addClass("visible");
          })
          .catch(err => {
            console.log("error", err);
          });
      }
    }
  },

  data: () => ({
    geoloc: false,
    location: { lat: 0, lng: 0 },
    dest: null
    // hmm = loc
  })
};

// $('.set-btn').on('click', function () {
//   let lat = $('#lat').val();
//   let long = $('#long').val();

//   setCoords(lat, long);
// });
</script>

<template>
  <section>
    <h1>Polaris</h1>

    <Location :location="location" @setLocation="setLocation"/>
    <!-- <Destination/> -->
    <Map :location="location" :destination="{ lat: 45.508, lng: -73.587 }"/>
  </section>
</template>

<style lang="scss">
.compass {
  border: 2px solid rgba(white, 0.2);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  padding: 10px;
  margin: 0px auto;
}

.needle {
  height: 100px;
  width: 12px;
  margin: auto;
  position: relative;

  &:before,
  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    border: 6px solid transparent;
  }

  &:before {
    border-bottom: 50px solid rgba(white, 0.7);
    border-top-width: 0px;
  }

  &:after {
    border-top: 50px solid rgba(white, 0.2);
    border-bottom-width: 0px;
    top: 50%;
  }
}
</style>
