<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12 align-center">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form ref="form" @submit.prevent="login()">
              <v-text-field
                  v-model="username"
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="username"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="password"
                  required
              ></v-text-field>
              <v-card-actions>
                <v-btn class="mt-4" @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="mt-4" color="success" value="log in">Login</v-btn>
              </v-card-actions>
              <v-snackbar
                  v-model="snackbarFail"
                  color="red"
              >
                Login Failed
                <template v-slot:action="{ attrs }">
                  <v-btn
                      text
                      v-bind="attrs"
                      @click="snackbarFail = false"
                  >
                    {{ failMessage }}
                  </v-btn>
                </template>
              </v-snackbar>
              <v-snackbar
                  v-model="snackbarOK"
                  color="green"
              >
                {{ successMessage }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                      text
                      v-bind="attrs"
                      @click="snackbarOK = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </form>
          </v-card-text>
        </v-card>
        <v-btn color="blue"
               class="elevation-12 white--text my-12"
               block
               v-show="oidcConfig !== null"
               @click="oidcLogin"
               x-large>
          OIDC ({{ oidcName }})
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import qs from 'qs'
import axios from 'axios';

var api = require('../client/src');
import {checkLogin, getRootPath, logIn} from "@/utils/tool";
import jwt_decode from "jwt-decode";

var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;


export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      drawer: false,
      snackbarFail: false,
      snackbarOK: false,
      token: null,
      refreshToken: null,
      oidcConfig: null,
      oidcName: "",
      success: null,
      successMessage: "Login Succeed",
      failMessage: "Login Failed",
    }
  },
  methods: {
    resetForm: function () {
      this.$refs.form.reset();
    },
    login: async function () {
      let loginSucceed = await logIn(this.username, this.password);

      // console.log(loginSucceed)
      if (loginSucceed !== true) {
        this.snackbarFail = true;
      } else {
        this.snackbarOK = true;
        await this.$router.push('/home');
      }
    },
    getOIDCConfig() {
      // console.log("getVersion")
      var apiInstance = new Api.DefaultApi();
      apiInstance.getv1Health((error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + response);
          this.oidcConfig = response.body.oidc;
          this.oidcName = response.body.oidc.name;
        }
      });
    },
    oidcLogin() {
      // redirect to to this.oidcConfig.path
      // console.log(this.oidcConfig)
      let url = getRootPath() + this.oidcConfig.path;
      // do the redirection in current page
      window.location.replace(url);
    }
  },
  mounted() {
    this.getOIDCConfig();
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get("token");
    this.refreshToken = urlParams.get("refreshToken");
    // convert string to boolean
    if (urlParams.get("success") !== null) {
      this.success = urlParams.get("success") === 'true';
      this.failMessage = urlParams.get("message");
    }

    if (this.success === false) {
      this.snackbarFail = true;
    } else {
      if (this.token != null) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('refreshToken', this.refreshToken);
        let decoded = jwt_decode(this.token);
        localStorage.setItem('username', decoded.username);
        localStorage.setItem('user_uid', decoded.uid);
        localStorage.setItem('user_role', decoded.role);
        localStorage.setItem('email', decoded.email);
        this.$router.push('/home');
      }
    }


    if (checkLogin()) {
      let decoded = jwt_decode(localStorage.getItem('token'));
      localStorage.setItem('username', decoded.username);
      this.$router.push('/home');
    }
  },
  created() {

  }
};
</script>