require('dotenv').config();
import pkg from './package';

export default {
  mode: 'spa',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'theme-color', content: '#222' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'stylesheet', href: 'https://use.typekit.net/cmb4wle.css' },
    ],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${
          process.env.MAPS_KEY
        }`,
        async: true,
        defer: true,
      },
    ],
  },

  loading: { color: '#fff' },
  css: [],
  plugins: [],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  build: {
    extend(config, ctx) {},
  },
};
