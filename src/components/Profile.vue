<template>
  <v-container fluid>
    <v-container>
      <v-card class="mx-auto" elevatoin="2">
        <!--          <v-img-->
        <!--              class="white&#45;&#45;text align-end"-->
        <!--              height="200px"-->
        <!--              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"-->
        <!--          >-->
        <v-card-title>{{ username }}</v-card-title>
        <!--          </v-img>-->

        <v-card-text class="black--text">
          <h4>Role: {{ role }}</h4>
          <h4>Email: {{ email }}</h4>
        </v-card-text>


        <v-card-actions class="justify-end">

          <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary  ma-4"
                  fab v-bind="attrs"
                  v-on="on"
              >
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <v-card>

              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>


              <v-card-text>
                <v-form ref="form" @submit.prevent="save()">
                  <v-text-field label="Email" hint="not necessary" v-model="email" :rules="emailRules"></v-text-field>
                  <v-text-field label="New Password" placeholder="password" v-model="password" :rules="passwordRules"
                                type="password"></v-text-field>
                  <v-text-field label="Confirm Password" placeholder="confirm" v-model="passwordConfirm"
                                :rules="passwordRules"
                                type="password"></v-text-field>
                </v-form>

              </v-card-text>

              <v-card-actions>
                <v-checkbox
                    v-model="confirm"
                    label="Confirm"
                ></v-checkbox>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="reset">Cancel</v-btn>
                <v-btn :disabled="!confirm" color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>

            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-container>


    <!--      <v-container>-->
    <!--        <v-card class="mx-auto my-4">-->
    <!--          <v-card-title class="text-h6 font-weight-regular justify-space-between">-->
    <!--            <span>Change Password</span>-->
    <!--          </v-card-title>-->

    <!--          <v-card-text>-->
    <!--            <v-form ref="form" @submit.prevent="changePassword()">-->
    <!--              <v-text-field-->
    <!--                  v-model="password"-->
    <!--                  name="username"-->
    <!--                  label="New Password"-->
    <!--                  type="password"-->
    <!--                  placeholder="password"-->
    <!--                  :rules="rules"-->
    <!--                  required-->
    <!--              ></v-text-field>-->

    <!--              <v-text-field-->
    <!--                  v-model="confirm"-->
    <!--                  name="confirm"-->
    <!--                  label="Confirm Password"-->
    <!--                  type="password"-->
    <!--                  placeholder="confirm"-->
    <!--                  required-->
    <!--              ></v-text-field>-->
    <!--              <v-card-actions>-->
    <!--                <v-btn class="mt-4" @click="resetForm">Clear</v-btn>-->
    <!--                <v-spacer></v-spacer>-->
    <!--                <v-btn type="submit" class="mt-4" color="primary" value="log in">Change Password</v-btn>-->
    <!--              </v-card-actions>-->
    <!--            </v-form>-->
    <!--          </v-card-text>-->
    <!--        </v-card>-->
    <!--      </v-container>-->
  </v-container>
</template>

<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>


<script>

import axios from "axios";
import {mdiAlarmLight} from "@mdi/js";

var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {getRootPath, checkLogin, logIn, logOut} from "@/utils/tool";

defaultClient.basePath = getRootPath();
export default {
  name: "Profile",
  data: () => ({
    confirm: "",
    dialog: false,
    formTitle: "Edit Profile",
    username: "",
    role: "",
    password: "",
    passwordConfirm: "",
    email: null
  }),
  methods: {
    initialize() {
      if (!checkLogin()) {
        this.$router.push('/')
      }
      this.getUser();
    },
    reset: function () {
      this.$refs.form.reset()
      this.dialog=false;
    },
    save: async function () {
      let apiInstance = new Api.NonadminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let local_username = localStorage.getItem("username");

      if (this.$refs.form.validate() === false) {
        this.$message.bottom().error('Wrong Input Form')
      } else {
        let requestPayload = {
          'userUpdateRequest': {
            "username": local_username,
            "password": this.password,
            "email": this.email
          }
        }
        apiInstance.putnonadminUserNonadminUserUpdate(local_username, requestPayload, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('Profile Change Failed');
            }

          } else {
            console.log('API called successfully. Returned data: ' + data);
            this.$message.bottom().success('Password Changed');
          }
        });
        this.dialog=false;

      }
    },
    async getUser() {
      let apiInstance = new Api.NonadminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let local_username = localStorage.getItem("username");

      // console.log( defaultClient.authentications['token'] );
      apiInstance.getnonadminUserNonadminUserGet(local_username, (error, data, response) => {
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
          this.username = data.user.username;
          this.email = data.user.email;
          this.role = data.user.role;
        }
      });
    },
    setGlobalTitle: function () {
      let myElement = document.getElementById("global-title");
      myElement.textContent = "Profile";
    },
    validateField: function () {
      this.$refs.form.validate()
    }
    ,
  },
  mounted: function () {
    this.setGlobalTitle();
  },
  computed: {
    passwordRules() {
      const rules = []
      rules.push(v => (v || '').length <= 32 ||
          'A maximum of 32 characters is allowed')

      rules.push(v => (v || '').indexOf(' ') < 0 ||
          'No spaces are allowed')

      if (this.passwordConfirm) {
        rules.push(v => (!!v && v) === this.passwordConfirm ||
            'Values do not match')
      }

      if (this.password) {
        rules.push(v => (!!v && v) === this.password ||
            'Values do not match')
      }

      return rules
    },
    emailRules() {
      // check if email is valid
      const rules = []
      // rules.push(v => !!v || 'E-mail is required')
      rules.push(v => /.+@.+\..+/.test(v) || 'E-mail must be valid')
      return rules
    }
  },

  watch: {
    passwordConfirm: 'validateField',
    password: 'validateField',
  },
  created() {
    this.initialize();
  }
};
</script>