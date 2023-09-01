<template>
  <v-container fluid>
    <v-container>
      <v-card class="mx-auto  my-4">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Notice</v-list-item-title>
            <v-list-item-subtitle>
              - Default password of OIDC users are empty, which prevents them from connecting pods. Change it
              immediately.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>


      <v-card class="mx-auto" elevatoin="2">
        <v-list-item three-line>
          <v-list-item-content>
            <!--          <v-img-->
            <!--              class="white&#45;&#45;text align-end"-->
            <!--              height="200px"-->
            <!--              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"-->
            <!--          >-->
            <div class="title mb-1 text-h3" v-text="username.toUpperCase()"></div>
            <!--          </v-img>-->

            <div class="overline mb-2 text-h6">
              Role: <span class="font-weight-bold">{{ role }}</span><br>
              Email: <span class="font-weight-bold">{{ email }}</span>
            </div>

            <v-list-item-subtitle class="subtitle-1">
              <div><b>CPU Quota: </b> {{ quota.cpu_m }} mCPU</div>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1">
              <div><b>Memory Quota: </b> {{ quota.memory_mb }} MB</div>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1">
              <div><b>Storage Quota: </b> {{ quota.storage_mb }} MB</div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!--        <v-divider></v-divider>-->

        <v-card-actions class="justify-end">

          <v-dialog
              v-model="dialog"
              persistent
              :retain-focus="false"
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary  ma-4"
                  fab v-bind="attrs"
                  v-on="on"
                  @click="editingItem.email = email; editingItem.password = null; editingItem.passwordConfirm = null;"
              >
                <v-icon class="white--text">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <v-card>

              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>


              <v-card-text>
                <v-form v-model=formIsValid ref="form" @submit.prevent="save()">
                  <v-text-field label="Email" hint="not necessary" v-model="editingItem.email"
                                :rules="emailRules"></v-text-field>
                  <v-text-field label="Old Password" placeholder="password" v-model="editingItem.oldPassword"
                                type="password"></v-text-field>
                  <v-text-field label="New Password" placeholder="password" v-model="editingItem.password"
                                type="password"></v-text-field>
                  <v-text-field label="Confirm Password" placeholder="confirm" v-model="editingItem.passwordConfirm"
                                :rules="passwordRules"
                                type="password"></v-text-field>
                </v-form>

              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="reset">Cancel</v-btn>
                <v-btn :disabled="!formIsValid" color="blue darken-1" text @click="save">Save</v-btn>
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

// import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";

var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {getRootPath, checkLogin, logOut} from "@/utils/tool";

defaultClient.basePath = getRootPath();
export default {
  name: "Profile",
  data: () => ({
    formIsValid: false,
    confirm: "",
    dialog: false,
    formTitle: "Edit Profile",
    username: "",
    role: "",
    quota: {
      "cpu_m": "unlimited",
      "memory_mb": "unlimited",
      "storage_mb": "unlimited"
    },
    password: null,
    passwordConfirm: null,
    email: null,
    editingItem: {
      oldPassword: null,
      password: null,
      passwordConfirm: null,
      email: ""
    }
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
      this.dialog = false;
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
            "old_password": this.editingItem.oldPassword || null,
            "password": this.editingItem.password || null,
            "email": this.editingItem.email || null,
          }
        }
        apiInstance.putnonadminUserNonadminUserUpdate(local_username, requestPayload, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('Profile Change Failed: ' + JSON.parse(response.text).message);
            }

          } else {
            console.log('API called successfully. Returned data: ' + data);
            this.$message.bottom().success('Profile Changed');

            localStorage.setItem('email', this.email);
          }
        });
        this.dialog = false;

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
            this.$message.bottom().error('Profile Get Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.username = data.user.username;
          this.email = data.user.email;
          this.role = data.user.role;
          if (data.user.quota !== null) {
            this.quota = data.user.quota
          }
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

      if (this.editingItem.password) {
        rules.push(v => v === this.editingItem.password ||
            'Values do not match')
      }

      return rules
    },
    emailRules() {
      // check if email is valid
      const rules = []
      // rules.push(v => !!v || 'E-mail is required')
      if (this.editingItem.email) {
        rules.push(v => /.+@.+\..+/.test(v) || 'E-mail must be valid')
      }
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