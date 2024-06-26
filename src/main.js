import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router.js'
import 'vuetify/dist/vuetify.min.css'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'leaflet/dist/leaflet.css'
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import L from 'leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false

// ApexCharts
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts)

// LMap
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.L = Vue.prototype.$L = L
/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

// axios
import axios from "axios";
// Vue.prototype.$axios = axios;
import http from "./axios";
Vue.prototype.$http = Vue.$http = http;

// Vuex
import store from './store'

import message from 'vuetify-message-snackbar';
const vuetifyPreset = {}
Vue.use(message, {
    appendTo: '.v-application--wrap',
    autoRemove: false,
    vuetifyInstance: vuetify,
    offsetTop: 50,
    lass: 'margin-top-animation',
    vuetifyPreset
})

Vue.use(JsonViewer);

// import { basicSetup } from 'codemirror'
// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'
// Vue.use(VueCodemirror)
//
//
// Vue.use(VueCodemirror, {
//     // optional default global options
//     autofocus: true,
//     disabled: false,
//     indentWithTab: false,
//     tabSize: 4,
//     placeholder: 'Code goes here...',
//     extensions: [basicSetup]
//     // ...
// })


new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

