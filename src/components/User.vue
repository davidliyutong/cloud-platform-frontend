<template>
  <div>
    <v-container>

    </v-container>
  </div>
</template>

<script>
import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";
var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {getRootPath} from "@/utils/tool";

defaultClient.basePath = getRootPath();


export default {
  name: "Users",
  data: () => ({
    username: localStorage.getItem("username"),
  }),

  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    initialize() {
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Users";
    },

  },
  computed: {},
  created() {
    this.initialize();
  },
};
</script>
