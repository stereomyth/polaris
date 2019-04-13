<template>
  <div class="container">
    <nuxt/>
  </div>
</template>

<style lang="scss">
@mixin at-least($device-width) {
  @media screen and (min-width: $device-width) {
    @content;
  }
}

@mixin until($device-width) {
  @media screen and (max-width: $device-width - 1px) {
    @content;
  }
}

$tablet: 768px;
$laptop: 992px;
$desktop: 1200px;

body {
  margin: 0;
  padding: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  background-color: #222;
  color: rgba(white, 0.5);
  padding-bottom: 100px;
}

h1 {
  font-family: "aw-conqueror-inline", sans-serif;
  font-weight: lighter;
  line-height: 1;
  letter-spacing: 0.53em;
  margin-top: 50px;
  color: rgba(white, 0.9);
  font-size: 10.8vw;

  @include at-least($tablet) {
    margin-top: 100px;
    font-size: 80px;
  }
}

h2 {
  font-family: "aw-conqueror-inline", sans-serif;
  letter-spacing: 0.2em;
  position: relative;
  margin-bottom: 1.5em;
  margin-top: 3em;
  color: rgba(white, 0.7);

  &:after {
    content: "";
    width: 50px;
    height: 3px;
    background-color: rgba(white, 0.3);
    position: absolute;
    bottom: 0.4em;
    transform: translateX(10px);
    font-weight: normal;
  }
}

a {
  color: #00b7ff;
}

.container {
  max-width: 600px;
  margin: auto;
  padding: 30px;
}

.row {
  margin: 0 -15px;
  overflow: auto;
}

.col {
  width: 50%;
  float: left;
  padding: 0 15px;
  box-sizing: border-box;
}

label {
  display: block;
  color: rgba(white, 0.3);
}

button {
  background-color: transparent;
  border: 1px solid rgba(white, 0.1);
  color: rgba(white, 0.5);
  text-transform: uppercase;
  padding: 15px 30px;
  cursor: pointer;
  letter-spacing: 0.4em;
  transition: all 0.3s;
  outline: none;

  &:hover {
    border-color: rgba(white, 0.4);
    color: rgba(white, 0.8);
  }
}

.geo-btn {
  padding: 11px 16px;
  margin-right: 6px;
  display: none;

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

input,
.faux-input {
  transition: all 0.3s;
  background-color: transparent;
  color: white;
  padding: 18px 0;
  padding-top: 8px;
  border: none;
  border-bottom: 1px solid rgba(white, 0.2);
  width: 100%;
  margin-bottom: 2em;
  font-size: 20px;

  @include at-least($tablet) {
    font-size: 24px;
    display: flex;
  }
}

input:focus {
  border-bottom-color: rgba(white, 0.8);
  outline: none;
}

.form-flex {
  display: flex;

  @include until($tablet) {
    flex-wrap: wrap;
  }
}

.form-message {
  // flex-grow: 2;
  width: 100%;

  & div {
    padding-bottom: 14px;
    display: none;

    @include at-least($tablet) {
      padding: 14px 0;
    }

    &.visible {
      display: block;
    }
  }
}

hr {
  border: none;
  border-bottom: 1px solid rgba(white, 0.2);
  margin: 3em 0;
}

.compass-flex {
  @include at-least($tablet) {
    display: flex;
  }
}

.bearing-contain {
  box-sizing: border-box;

  @include at-least($tablet) {
    padding-right: 15px;
  }
}

.bearing-contain,
.compass-contain {
  @include at-least($tablet) {
    width: 50%;
  }
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

#map {
  height: 600px;
  border: 1px solid #4e4e4e;
  margin-top: 3em;
}
</style>
