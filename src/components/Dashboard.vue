<template>
  <div>
    <v-container>
      <!--      <v-card-->
      <!--          class="mx-auto my-4"-->
      <!--      >-->
      <!--        <div class="pa-4 text-center">-->
      <!--          <h3 class="text-h6 font-weight-light mb-2">Welcome, {{ username }}</h3>-->
      <!--          <span class="text-caption grey&#45;&#45;text">Have a great day !! </span>-->
      <!--        </div>-->
      <!--      </v-card>-->

      <v-card class="mx-auto  my-4">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Backend Version</v-list-item-title>
            <v-list-item-subtitle>{{ backendVersion }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <!--      <v-card class="mx-auto my-4" >-->
      <!--        <v-row align="center">-->
      <!--          <v-col>-->
      <!--            <v-list-item three-line>-->
      <!--              <v-list-item-content>-->
      <!--                <v-list-item-title class="headline mb-1">Health</v-list-item-title>-->
      <!--              </v-list-item-content>-->
      <!--            </v-list-item>-->
      <!--            <v-card-text class="display-3" cols="6">-->
      <!--              {{ healthOK }}-->
      <!--            </v-card-text>-->
      <!--          </v-col>-->
      <!--          <v-col>-->
      <!--            <v-list-item three-line>-->
      <!--              <v-list-item-content>-->
      <!--                <v-list-item-title class="headline mb-1">Response Time</v-list-item-title>-->
      <!--              </v-list-item-content>-->
      <!--            </v-list-item>-->
      <!--            <v-card-text class="display-3" cols="6" color="healthColor">-->
      <!--              {{ healthTimeout }}-->
      <!--            </v-card-text>-->
      <!--          </v-col>-->
      <!--        </v-row>-->
      <!--        <v-card-actions>-->
      <!--          <v-btn text @click="getHealth()">Refresh</v-btn>-->
      <!--        </v-card-actions>-->
      <!--      </v-card>-->

    </v-container>
  </div>
</template>

<script>
// import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";
var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {getRootPath} from "@/utils/tool";

defaultClient.basePath = getRootPath();


export default {
  name: "Dashboard",
  data: () => ({
    username: localStorage.getItem("username"),
    backendVersion: "",
  }),

  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    initialize() {
      this.getVersion()
    },
    getVersion() {
      // console.log("getVersion")
      var apiInstance = new Api.DefaultApi();
      apiInstance.getv1Health((error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + response);
          this.backendVersion = response.body.version;
        }
      });
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Dashboard";
    },

  },
  computed: {},
  created() {
    this.initialize()
  },
};
</script>
