<script>
export default {
  props: {
    location: Object
  },

  mounted() {
    this.geolocation = "geolocation" in navigator;
  },

  methods: {
    getCoordsFromGeo() {
      this.busy = true;
      navigator.geolocation.getCurrentPosition(
        position => {
          this.$emit("setLocation", position.coords);
          this.busy = false;
        },
        error => {
          alert(error.message);
          this.busy = false;
        }
      );
    }
  },

  data: () => ({
    geolocation: false,
    busy: false
  }),

  computed: {},

  filters: {
    round: function(value) {
      if (!value) return 0;
      // value = value.toString();
      return +value.toFixed(3);
    }
  }
};
</script>

<template>
  <div>
    <h2>Location</h2>
    <form>
      <div class="row">
        <div class="col">
          <label for="lat">Latitude</label>
          <input type="text" id="lat" :value="location.lat | round" required>
        </div>
        <div class="col">
          <label for="lng">Longitude</label>
          <input type="text" id="lng" :value="location.lng  | round" required>
        </div>
      </div>
      <div class="form-flex">
        <div class="form-message">
          <div class="update-success">Compasslocation updated</div>
          <div class="update-fail">Update failed</div>
        </div>
        <button class="geo-btn" type="button" v-if="geolocation" @click="getCoordsFromGeo">
          <div class="geo-icon">
            <div class="geo-icon-mask"></div>
          </div>
        </button>
      </div>
    </form>
  </div>
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
</style>
