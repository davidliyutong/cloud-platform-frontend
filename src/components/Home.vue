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
        <v-list-item link to="/dashboard">
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

      <!--      &lt;!&ndash;            <v-btn icon>&ndash;&gt;-->
      <!--      &lt;!&ndash;                <v-icon>mdi-magnify</v-icon>&ndash;&gt;-->
      <!--      &lt;!&ndash;            </v-btn>&ndash;&gt;-->
      <!--      &lt;!&ndash;            <v-btn icon link to="/dashboard">&ndash;&gt;-->
      <!--      &lt;!&ndash;                <v-icon>mdi-home</v-icon>&ndash;&gt;-->
      <!--      &lt;!&ndash;            </v-btn>&ndash;&gt;-->
      <!--      <v-avatar color="indigo" size="36">-->
      <!--        <span class="white&#45;&#45;text headline">{{ username }}</span>-->
      <!--      </v-avatar>-->
      <!--      <v-menu bottom left>-->
      <!--        <template v-slot:activator="{ on, attrs }">-->
      <!--          <v-btn-->
      <!--              dark-->
      <!--              icon-->
      <!--              v-bind="attrs"-->
      <!--              v-on="on"-->
      <!--          >-->
      <!--            <v-icon>mdi-dots-vertical</v-icon>-->
      <!--          </v-btn>-->
      <!--        </template>-->

      <!--        <v-list>-->
      <!--          <v-list-item @click="logout">-->
      <!--            <v-list-item-title>Logout</v-list-item-title>-->
      <!--          </v-list-item>-->
      <!--        </v-list>-->
      <!--      </v-menu>-->

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
import axios from "axios";
import {mdiAlarmLight} from "@mdi/js";
import io from 'socket.io-client';
import {getRootPath, getRootWSPath, refreshToken} from "@/utils/tool";
import SocketClient from "@/utils/SocketClient";

export default {
  name: "Home",
  data: function () {
    return {
      socketClient: null,
      drawer: null,
      timerID: null,
      isAdmin: localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'super_admin',
    };
  },
  methods: {},
  computed: {},
  created() {
    let token = localStorage.getItem('token');
    let uri = getRootWSPath() + '/v1/heartbeat/user?token=' + token;
    this.socketClient = new SocketClient(uri);
  },
  mounted() {
    // Set the timer to call the function every 10 minutes (600000 ms = 10 minutes)
    this.timerID = setInterval(refreshToken, 600000);
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.timerID);
  }
};
</script>
