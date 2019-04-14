<script>
import Map from "~/components/Map";

export default {
  components: { Map },

  mounted() {
    this.geoloc = "geolocation" in navigator;
  },

  methods: {
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
    },

    getCoordsFromGeo() {
      // console.log("geo?");

      navigator.geolocation.getCurrentPosition(
        position => {
          this.loc.lat = position.coords.latitude;
          this.loc.lng = position.coords.longitude;

          //     // setCoords(lat, long);
        },
        error => {
          alert(error.message);
        }
      );
    }
  },

  data: () => ({
    geoloc: false,
    loc: { lat: 0, lng: 0 },
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

    <h2>Location</h2>
    <form>
      <div class="row">
        <div class="col">
          <label for="lat">Latitude</label>
          <input type="text" id="lat" :value="loc.lat" required>
        </div>
        <div class="col">
          <label for="lng">Longitude</label>
          <input type="text" id="lng" :value="loc.lng" required>
        </div>
      </div>
      <div class="form-flex">
        <div class="form-message">
          <div class="update-success">Compasslocation updated</div>
          <div class="update-fail">Update failed</div>
        </div>
        <button class="geo-btn" v-if="geoloc" @click="getCoordsFromGeo" type="button">
          <div class="geo-icon">
            <div class="geo-icon-mask"></div>
          </div>
        </button>
      </div>
    </form>

    <h2>Destination</h2>

    <template v-if="dest">
      <div class="tweet">
        <div class="meta">
          <strong>{{dest.name}}</strong>
          <small>@{{dest.user}}</small>
        </div>
      </div>
      <p>{{dest.text}}</p>

      <hr>

      <div class="row">
        <div class="col">
          <label for>Latitude</label>
          <div class="faux-input">{{dest.lat}}</div>
        </div>
        <div class="col">
          <label for>Longitude</label>
          <div class="faux-input">{{dest.long}}</div>
        </div>
      </div>

      <div class="compass-flex">
        <div class="bearing-contain">
          <label>Bearing</label>
          <div class="faux-input">{{dest.bearing || 'unkown'}}°</div>
        </div>
        <div class="compass-contain">
          <div class="compass">
            <div class="needle" :style="`transform: rotate(${dest.bearing}deg)`"></div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p>No destination can be found</p>
    </template>

    <!-- <hr> -->

    <Map :coords="loc"/>
  </section>
</template>

<style lang="scss">
.geo-btn {
  padding: 11px 16px;
  margin-right: 6px;

  &.visible {
    display: inline-block;
    vertical-align: bottom;
  }
}

.geo-icon {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 2px;
    width: 2px;
    background-color: currentColor;
  }

  &:before {
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}

.geo-icon-mask {
  position: relative;
  background-color: #222;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 2px;
  z-index: 10;
}

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
