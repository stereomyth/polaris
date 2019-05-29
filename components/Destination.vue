<script>
export default {
  props: ["loc"],

  methods: {},

  data: () => ({}),

  computed: {}
};
</script>

<template>
  <div>
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
  </div>
</template>

<style lang="scss">
</style>
