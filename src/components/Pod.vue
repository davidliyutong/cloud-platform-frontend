<template>
  <div>
    <v-container>
      <template v-for="(pod, index) in pods">
        <v-list-item :key="pod.name">
          <template>
            <v-list-item-content>
              <v-list-item-title v-text="pod.name"></v-list-item-title>

              <v-list-item-subtitle
                  class="text--primary"
                  v-text="pod.description"
              ></v-list-item-subtitle>

              <v-list-item-subtitle v-text="pod.accessed_at"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-col>


                <v-btn
                    :color="'blue'"
                    dark
                    bottom
                    right
                    class="mx-2"
                >
                  <v-icon> mdi-pencil </v-icon> Edit
                </v-btn>
                <v-btn
                    :color="'red'"
                    dark
                    bottom
                    right
                    class="mx-2"
                >
                  <v-icon> mdi-delete </v-icon>Delete
                </v-btn>
                <v-btn
                    :color="pod.current_status === 'running' ? 'red' : 'green'"
                    dark
                    bottom
                    right
                    class="mx-2"
                >
                  <v-icon> mdi-power </v-icon>{{ pod.current_status === 'running' ? 'Stop' : 'Start' }}
                </v-btn>
              </v-col>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider
            v-if="index < pods.length"
            :key="index"
        ></v-divider>
      </template>
    </v-container>
    <div class="float-right">
      <v-btn
          :color="blue"
          fab
          large
          dark
          bottom
          right
          class="ma-8"
      >
        <v-icon> mdi-plus</v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script>
import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";
var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {checkLogin, getRootPath, logOut} from "@/utils/tool";

defaultClient.basePath = getRootPath();


export default {
  name: "Pod",
  data: () => ({
    username: localStorage.getItem("username"),
    pods: [],
  }),

  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    initialize() {
      if (!checkLogin()) {
        this.$router.push('/')
      }
      this.getPod()
    },
    async getPod() {
      let apiInstance = new Api.NonadminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let local_username = localStorage.getItem("username");

      // console.log( defaultClient.authentications['token'] );
      apiInstance.getnonadminPodNonadminPodList(null, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Profile Get Failed');
          }
        } else {
          // console.log('API called successfully. Returned data: ' + data);
          this.pods = data.pods;
        }
      });
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Pods";
    },

  },
  computed: {},
  created() {
    this.initialize()
  },
};
</script>
