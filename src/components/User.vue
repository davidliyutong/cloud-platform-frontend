<template>
  <div>
    <v-card class="mx-auto  my-4">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Notice</v-list-item-title>
          <v-list-item-subtitle>
            - Click the download button to download a csv template for operating a batch of users.
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            - Click the download button to download a csv template for operating a batch of users.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-data-table
        v-model="selectedItems"
        class="elevation-1"
        :headers="extCheckBox ? userExtHeaders : userHeaders"
        :items="userItems"
        :items-per-page=30
        item-key="username"
        show-select
        dense
        multi-sort
        :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-checkbox
              class="shrink mr-2 mt-0"
              hide-details
              v-model="extCheckBox"
              :label="`Show extended info`"
          ></v-checkbox>
          <v-btn color="success" @click="listUsers()" class="mx-2">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn color="error" @click="actionDeleteSelectedUsers()" class="mx-2" :disabled="selectedItems.length === 0">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary" @click="actionAddUser()" class="mx-2">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
          <v-btn color="blue" @click="downloadExampleCSV()" class="mx-2">
            <v-icon>mdi-download</v-icon>
          </v-btn>
          <v-dialog v-model="editDialog" max-width="800px" :retain-focus="false">
            <v-card>
              <v-card-title>
                <span class="headline">{{ editFormTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form v-model="formIsValid">
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.username" label="Username" :rules="notNullRule"
                                    :disabled="editedIndex !== -1"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-select
                      v-model="editedItem.status"
                      :items="statusEnum"
                      label="Target Status"
                      :disabled="editedIndex === -1"
                  ></v-select>

                  <v-select
                      v-model="editedItem.role"
                      :items="roleEnum"
                      label="Role"
                      :rules="notNullRule"
                  ></v-select>

                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.password" label="New Password"
                                    placeholder="password"
                                    type="password"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.confirmPassword" label="Confirm Password"
                                    placeholder="confirm"
                                    :rules="passwordRules"
                                    type="password"></v-text-field>
                    </v-col>
                  </v-row>
                  <!--                <v-row v-if="editedItem.quota != null">-->
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.quota.cpu_m" label="CPU Limit (mCPU)"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.quota.memory_mb" label="Memory Limit (MB)"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.quota.storage_mb" label="Storage Limit (MB)"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.quota.pod_n" label="Number Limit"></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>


              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEditForm">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveEditForm" :disabled="!formIsValid">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
<!--      <template v-slot:item.extra_info="{ item }">-->
<!--        <json-viewer :value="item.extra_info" :expand-depth=1></json-viewer>-->
<!--        {{ JSON.stringify(item.extra_info, null, 2)}}-->
<!--      </template>-->
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mx-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <v-container my="8"></v-container>
    <!--    <v-card class="mt-2 pa-2">-->
    <!--      <pre>{{ selectedItems }}</pre>-->
    <!--    </v-card>-->
    <v-data-table
        class="elevation-1"
        :headers="batchUserHeaders"
        :items="batchUserItems"
        :items-per-page=30
        item-key="username"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Batch Editor</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-file-input
              ref="fileInput"
              v-model="fileSelection"
              label="File input"
              accept="text/csv"
              class="mx-2"
              dense
              single-line
              hide-details
              outlined
              show-size
              @change="uploadCSV"
          ></v-file-input>

          <!--          <v-btn color="success" @click="uploadCSV()" class="mx-2">-->
          <!--            <v-icon>mdi-upload</v-icon>-->
          <!--          </v-btn>-->
          <v-btn color="grey" @click="clearBatchUsers()" class="mx-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteBatchUsers()" class="mx-2" :disabled="batchUserItems.length === 0">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary" @click="actionAddBatchUsers()" class="mx-2" :disabled="batchUserItems.length === 0">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
          <v-btn color="blue" @click="actionUpdateBatchUsers()" class="mx-2" :disabled="batchUserItems.length === 0">
            <v-icon>mdi-update</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>

var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {logOut} from "@/utils/tool";
import JsonViewer from 'vue-json-viewer'
import Papa from 'papaparse'
import _ from 'lodash'

export default {
  name: "Users",
  data: () => ({
    formIsValid: false,
    selectedItems: [],
    search: "",
    extCheckBox: false,
    userHeaders: [
      {text: 'uid', value: 'uid'},
      {text: 'username', value: 'username'},
      {text: 'uuid', value: 'uuid'},
      {text: 'email', value: 'email'},
      {text: 'status', value: 'status'},
      {text: 'role', value: 'role'},
      {text: 'quota', value: 'quota'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    userExtHeaders: [
      {text: 'uid', value: 'uid'},
      {text: 'username', value: 'username'},
      {text: 'uuid', value: 'uuid'},
      {text: 'email', value: 'email'},
      {text: 'status', value: 'status'},
      {text: 'role', value: 'role'},
      {text: 'quota', value: 'quota'},
      {text: 'extra_info', value: 'extra_info', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    batchUserHeaders: [
      {text: 'uid', value: 'uid'},
      {text: 'username', value: 'username'},
      {text: 'email', value: 'email'},
      {text: 'password', value: 'password'},
      {text: 'status', value: 'status'},
      {text: 'role', value: 'role'},
      {text: 'quota', value: 'quota'},
    ],
    userFields: ['username', 'email', 'password', 'role'],
    userItems: [],
    editDialog: false,
    editFormTitle: "Edit User",
    editedItem: {
      username: '',
      email: '',
      uid: '',
      role: '',
      password: '',
      confirmPassword: '',
      quota: {
        cpu_m: null,
        memory_mb: null,
        storage_mb: null,
        pod_n: null,
        gpu: null,
        network_mb: null
      },
    },
    defaultItem: {
      username: '',
      email: '',
      uid: '',
      role: '',
      password: '',
      confirmPassword: '',
      quota: {
        cpu_m: null,
        memory_mb: null,
        storage_mb: null,
        pod_n: null,
        gpu: null,
        network_mb: null,
      },
    },
    editedIndex: -1,
    statusEnum: ['active', 'inactive'],
    roleEnum: ['super_admin', 'admin', 'user'],
    batchUserItems: [],
    fileSelection: undefined,
  }),
  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    initialize() {
      this.listUsers();
    },
    async listUsers() {
      let apiInstance = new Api.AdminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      // console.log( defaultClient.authentications['token'] );
      apiInstance.getadminUserAdminUserList(null, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('User List Failed: ' + JSON.parse(error.response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.userItems = data.users.map(user => {
            user.extra_info = JSON.stringify(user.extra_info);
            // user.quota = JSON.stringify(user.quota);
            return user
          });
        }
      });
    },
    async deleteUser(username) {
      let apiInstance = new Api.AdminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let succeed = await new Promise((resolve, reject) => {
        apiInstance.deleteadminUserAdminUserDelete(username, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('Delete User Failed: ' + JSON.parse(error.response.text).message);
            }
            reject(error);
          } else {
            this.$message.bottom().success('Delete User Succeed');
            resolve(true);
          }
        });
      }).catch(err => {
        console.error(err);
        return false;
      });

      return succeed;
    },

    async deleteUsers(users) {
      // loop every user
      var successNum = 0;
      var failNum = 0;
      for (var index in users) {
        let succeed = await this.deleteUser(users[index].username);
        if (succeed) {
          successNum++;
        } else {
          failNum++;
        }
      }
      if (failNum === 0) {
        this.$message.bottom().success("Deleted " + successNum + " Users");
      } else {
        this.$message.bottom().error("Deleted " + successNum + " Users, Failed " + failNum + " Users");
      }

    },
    async actionDeleteSelectedUsers() {
      let users = this.selectedItems;
      if (users.length === 0) {
        return;
      }
      let ret = confirm('Are you sure you want to delete ' + users.length + ' user(s) ?');
      if (ret === true) {
        await this.deleteUsers(users);
        await this.listUsers();
      }
    },
    actionAddUser() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editDialog = true;
    },
    editItem: function (item) {
      this.editedIndex = this.userItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (item.quota === null) {
        this.editedItem.quota = {
          cpu_m: null,
          memory_mb: null,
          storage_mb: null,
          pod_n: null,
          gpu: null,
          network_mb: null
        }
      }
      this.editedItem.password = null;
      this.editDialog = true;
    },
    closeEditForm: function () {
      this.editDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    async createUser(user) {
      let request = {
        username: user.username,
      };

      if (user.quota.cpu_m === null || user.quota.cpu_m === '' &&
          user.quota.memory_mb === null || user.quota.memory_mb === '' &&
          user.quota.storage_mb === null || user.quota.storage_mb === '' &&
          user.quota.pod_n === null || user.quota.pod_n === '') {
        request.quota = null;
      } else {
        request.quota = {
          cpu_m: Number(user.quota.cpu_m),
          memory_mb: Number(user.quota.memory_mb),
          storage_mb: Number(user.quota.storage_mb),
          pod_n: Number(user.quota.pod_n),
          gpu: 0,
          network_mb: 0
        }
      }

      if (user.password === null || user.password === '') {
        this.$message.bottom().error('Password cannot be empty');
        return;
      } else {
        request.password = user.password;
      }

      if (user.email === null || user.email === '') {
        request.email = null;
      } else {
        request.email = user.email;
      }

      request.role = user.role;

      let payload = {
        userCreateRequest: request
      }

      let apiInstance = new Api.AdminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let succeed = await new Promise((resolve, reject) => {
        apiInstance.postadminUserAdminUserCreate(payload, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('User Create Failed: ' + JSON.parse(error.response.text).message);
            }
            reject(error);
          } else {
            console.log('API called successfully. Returned data: ' + data);
            this.$message.bottom().success("User Created");
            resolve(true);
          }
        });
      }).catch(err => {
        console.error(err);
        return false;
      });

      return succeed;
    },
    async createUsers(users) {
      // loop every user
      var successNum = 0;
      var failNum = 0;
      for (var index in users) {
        let succeed = await this.createUser(users[index]);
        if (succeed) {
          successNum++;
        } else {
          failNum++;
        }
      }
      if (failNum === 0) {
        this.$message.bottom().success("Created " + successNum + " Users");
      } else {
        this.$message.bottom().error("Created " + successNum + " Users, Failed " + failNum + " Users");
      }
    },
    async updateUser(user) {
      let request = {
        username: user.username,
      };

      if (user.quota.cpu_m === null || user.quota.cpu_m === '' &&
          user.quota.memory_mb === null || user.quota.memory_mb === '' &&
          user.quota.storage_mb === null || user.quota.storage_mb === '' &&
          user.quota.pod_n === null || user.quota.pod_n === '') {
        request.quota = null;
      } else {
        request.quota = {
          cpu_m: Number(user.quota.cpu_m),
          memory_mb: Number(user.quota.memory_mb),
          storage_mb: Number(user.quota.storage_mb),
          pod_n: Number(user.quota.pod_n),
          gpu: 0,
          network_mb: 0
        }
      }

      if (user.password === null || user.password === '') {
        request.password = null;
      } else {
        request.password = user.password;
      }

      if (user.email === null || user.email === '') {
        request.email = null;
      } else {
        request.email = user.email;
      }

      if (user.role === null || user.role === '') {
        request.role = null;
      } else {
        request.role = user.role;
      }

      if (user.status === null || user.status === '') {
        request.status = null;
      } else {
        request.status = user.status;
      }

      let payload = {
        userUpdateRequest: request
      }

      let apiInstance = new Api.AdminUserApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let succeed = await new Promise((resolve, reject) => {
        apiInstance.putadminUserAdminUserUpdate(user.username, payload, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('User Update Failed: ' + JSON.parse(error.response.text).message);
            }
            reject(error);
          } else {
            console.log('API called successfully. Returned data: ' + data);
            this.$message.bottom().success("User Updated");
            resolve(true);
          }
        });
      }).catch(err => {
        console.log(err);
        return false;
      });

      return succeed;
    },
    async updateUsers(users) {
      // loop every user
      var successNum = 0;
      var failNum = 0;
      for (var index in users) {
        let succeed = await this.updateUser(users[index]);
        if (succeed) {
          successNum++;
        } else {
          failNum++;
        }
      }
      if (failNum === 0) {
        this.$message.bottom().success("Updated " + successNum + " Users");
      } else {
        this.$message.bottom().error("Updated " + successNum + " Users, Failed " + failNum + " Users");
      }
    },
    async saveEditForm() {
      if (this.editedIndex > -1) {
        Object.assign(this.userItems[this.editedIndex], this.editedItem);
        await this.updateUser(this.editedItem);
      } else {
        await this.createUser(this.editedItem);
      }
      this.closeEditForm();
      await this.listUsers();
    },
    downloadExampleCSV() {
      let _header = [
        ['username', 'email', 'password', 'status', 'role', 'quota.cpu_m', 'quota.memory_mb', 'quota.storage_mb', 'quota.pod_n']
        // add data rows here
      ];
      let data = _header.concat(this.selectedItems.map(user => {
        if (user.quota === null) {
          user.quota = {
            cpu_m: null,
            memory_mb: null,
            storage_mb: null,
            pod_n: null,
            gpu: 0,
            network_mb: 0
          }
        }
        return [user.username, user.email, null, user.status, user.role, user.quota.cpu_m, user.quota.memory_mb, user.quota.storage_mb, user.quota.pod_n]
      }));

      const csv = Papa.unparse(data);

      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, 'example.csv');
      } else {
        const link = document.createElement('a');

        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', 'users.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    uploadCSV(file) {
      console.log(file);
      if (file === null) {
        return;
      }

      this.uploadedFile = file;

      Papa.parse(this.uploadedFile, {
        header: true,
        complete: result => {
          this.parsedData = result.data;
          this.batchUserItems = this.parsedData.map(obj => {
            const newObj = {};
            Object.keys(obj).forEach(key => _.set(newObj, key, obj[key]));
            return newObj;
          });
          console.log(JSON.stringify(this.batchUserItems));
        }
      });
    },
    clearBatchUsers() {
      this.batchUserItems = [];
      this.fileSelection = undefined;
    },
    async deleteBatchUsers() {
      let users = this.batchUserItems;
      if (users.length === 0) {
        return;
      }
      let ret = confirm('Are you sure you want to delete ' + users.length + ' user(s) ?');
      if (ret === true) {
        await this.deleteUsers(users);
      }
    },
    async actionAddBatchUsers() {
      await this.createUsers(this.batchUserItems);
    },
    async actionUpdateBatchUsers() {
      await this.updateUsers(this.batchUserItems);
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Users";
    },

  },
  computed: {
    passwordRules() {
      const rules = []
      rules.push(v => (v || '').length <= 32 ||
          'A maximum of 32 characters is allowed')

      rules.push(v => (v || '').indexOf(' ') < 0 ||
          'No spaces are allowed')


      if (this.editedItem.password) {
        rules.push(v => (!!v && v) === this.editedItem.password ||
            'Values do not match')
      }

      return rules
    },
    notNullRule() {
      const rules = []
      rules.push(v => ((v != null) && (v !== "")) || 'This field is required')
      return rules
    }
  },
  created() {
    this.initialize();
  },
};
</script>