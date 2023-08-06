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
import {checkLogin, getRootPath} from "@/utils/tool";

defaultClient.basePath = getRootPath();


export default {
  name: "Templates",
  data: () => ({
    username: localStorage.getItem("username"),
  }),

  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    initialize() {
      if (!checkLogin()) {
        this.$router.push('/')
      }
      this.listPod()
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Templates";
    },

  },
  computed: {},
  created() {
    this.initialize()
  },
};
</script>
