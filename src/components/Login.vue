<template>
  <v-app id="login">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
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
                        Close
                      </v-btn>
                    </template>
                  </v-snackbar>
                  <v-snackbar
                      v-model="snackbarOK"
                      color="green"
                  >
                    Login Succeed
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


          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>
import qs from 'qs'
import axios from 'axios';

var api = require('../client/src');
import {checkLogin, logIn, logOut} from "@/utils/tool";


export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      drawer: false,
      snackbarFail: false,
      snackbarOK: false,
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

    }
  },
  created() {
    if (!checkLogin()) {
      this.$router.push('/home');
    }
  }
};
</script>