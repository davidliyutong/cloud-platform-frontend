<template>
  <v-app id="main">
    <v-navigation-drawer v-model="drawer" app bottom>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">APIServer</v-list-item-title>
          <v-list-item-subtitle>UI For Cloud Platform APIServer</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link to="/dashboard" v-show="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/pods">
          <v-list-item-action>
            <v-icon>mdi-console</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pods</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/users" v-show="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/templates" v-show="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-file-edit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Templates</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense nav>
          <v-list-item link to="/profile">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--          <v-list-item link to="/settings">-->
          <!--            <v-list-item-action>-->
          <!--              <v-icon>mdi-cog</v-icon>-->
          <!--            </v-list-item-action>-->
          <!--            <v-list-item-content>-->
          <!--              <v-list-item-title>Settings</v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->
        </v-list>
        <!-- <div class="pa-2">
            <v-btn block>Logout</v-btn>
        </div> -->
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title id="global-title"></v-toolbar-title>
      <v-spacer></v-spacer>

            <!--            <v-btn icon>-->
            <!--                <v-icon>mdi-magnify</v-icon>-->
            <!--            </v-btn>-->
            <!--            <v-btn icon link to="/dashboard">-->
            <!--                <v-icon>mdi-home</v-icon>-->
            <!--            </v-btn>-->
            <v-avatar color="indigo" size="36" class="mx-4">
<!--              <span class="white&#45;&#45;text headline">{{ username[0] }}</span>-->
              <img :src="gravatarUrl" :alt="email">
            </v-avatar>
            <v-toolbar-title>  {{ username }}  </v-toolbar-title>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="logOut">
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container fluid>
        <!-- 如果使用 vue-router -->
        <router-view></router-view>
      </v-container>
      <!--      <v-snackbar-->
      <!--          v-model="snackbar"-->
      <!--      >-->
      <!--        {{ snackbarText }}-->

      <!--        <template v-slot:action="{ attrs }">-->
      <!--          <v-btn-->
      <!--              color="red"-->
      <!--              text-->
      <!--              v-bind="attrs"-->
      <!--              @click="snackbar = false"-->
      <!--          >-->
      <!--            Close-->
      <!--          </v-btn>-->
      <!--        </template>-->
      <!--      </v-snackbar>-->

    </v-main>

    <v-footer color="primary" app>
      <span class="white--text">&copy; 2023 davidliyutong@sjtu.edu.cn</span>
      <!--      <v-spacer></v-spacer>-->
      <!--      <span class="white&#45;&#45;text">{{ username }}</span>-->
    </v-footer>
  </v-app>
</template>

<script>
// import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";
// import io from 'socket.io-client';
import { logOut, refreshToken} from "@/utils/tool";
import KeepAliveClient from "@/utils/KeepAliveClient";
import md5 from 'md5';

var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;

export default {
  name: "Home",
  data: function () {
    return {
      socketClient: null,
      drawer: null,
      refreshTokenTimerID: null,
      isAdmin: localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'super_admin',
      username: localStorage.getItem('username'),
      logOut: logOut,
      email: ''
    };
  },
  methods: {
    async getUser() {
      let apiInstance = new Api.NonadminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");
      let local_username = localStorage.getItem("username");
      apiInstance.getnonadminUserNonadminUserGet(local_username, (error, data, response) => {
        if (error) { console.error(error);
          if (response.status === 401) { this.$message.bottom().error('Please Login'); logOut();
          } else { this.$message.bottom().error('Profile Get Failed: ' + JSON.parse(response.text).message); }
        } else { console.log('API called successfully. Returned data: ' + data);}
      });
    },
  },
  computed: {
    gravatarUrl() {
      // If the email is empty, return a default Gravatar image
      if (this.email.trim() === '') {
        return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
      }

      // Otherwise, generate the Gravatar URL
      return 'https://2.gravatar.com/avatar/' + md5(this.email.trim().toLowerCase());
    },
  },
  created() {
    this.socketClient = new KeepAliveClient();
    this.getUser();
  },
  mounted() {
    // Set the timer to call the function every 10 minutes (600000 ms = 10 minutes)
    this.refreshTokenTimerID = setInterval(refreshToken, 600000);
    this.email = localStorage.getItem('email') || '';

  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.refreshTokenTimerID);
  }
};
</script>
