<script>
export default {
  components: {},
  data: () => ({
    loc: { lat: 0, lng: 0 },
    dest: null
    // hmm = loc
  })
};
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
        <button class="geo-btn">
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

    <div id="map"></div>
  </section>
</template>

<style>
</style>
