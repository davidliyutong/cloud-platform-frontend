<template>
  <div>
    <v-card class="mx-auto  my-4">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Notice</v-list-item-title>
          <v-list-item-subtitle>
            - New users MUST change their password before using the system.
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            - Do not store your files in directories other than /root. They will be deleted when
            your pods restarts
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            - Pods may not be ready after creation or startup, wait for at least 60 seconds.
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            - Click connect and connect to WebIDE or VNC (GUI) of Pod, you will be asked to provide your credentials.
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            - If you close this page, pods will automatically shutdown after timeout.
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            - If a pod failed to start, click its "Edit" button and force change its status.
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-data-table
        v-show="isAdmin"
        v-model="selectedItems"
        class="elevation-1 my-4"
        :headers="podHeaders"
        :items="podItems"
        :items-per-page=30
        item-key="pod_id"
        show-select
        :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All Pods</v-toolbar-title>
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
          <v-btn color="success" @click="listGlobalPod()" class="mx-2">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn color="error" @click="actionDeleteSelectedPods()" class="mx-2" :disabled="selectedItems.length === 0">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-dialog v-model="editDialog" :retain-focus="false" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ editFormTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="editingFrom" @submit.prevent="saveEditForm()" v-model="formIsValid">
                  <v-text-field
                      label="Pod ID"
                      v-model="editingPod.pod_id"
                      disabled
                  ></v-text-field>
                  <v-text-field
                      label="Name"
                      hint="not necessary"
                      v-model="editingPod.name"></v-text-field>
                  <v-text-field
                      label="Description"
                      hint="not necessary"
                      placeholder="Describe the pod"
                      v-model="editingPod.description"
                  ></v-text-field>
                  <v-text-field
                      label="Timeout (s)"
                      hint="timeout < 86400"
                      placeholder="3600"
                      v-model="editingPod.timeout_s"
                  ></v-text-field>
                  <v-select
                      v-model="editingPod.target_status"
                      :items="target_status_list"
                      label="Target Status"
                  ></v-select>
                  <v-text-field
                      label="Template Reference (s)"
                      disabled
                      v-model="editingPod.template_ref"
                  ></v-text-field>

                </v-form>


              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="resetEditForm">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveEditForm" :disabled="!formIsValid">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
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
    <v-divider v-show="isAdmin"></v-divider>
    <v-container>
      <template v-for="(pod, index) in pods">
        <v-list-item :key="pod.uuid">
          <template>
            <v-list-item-content>
              <v-list-item-title v-text="pod.name"></v-list-item-title>

              <v-list-item-subtitle
                  class="text--primary"
                  v-text="pod.description"
              ></v-list-item-subtitle>

              <v-list-item-subtitle
                  v-text="'Timeout at:' +addDateStrSeconds(pod.accessed_at,pod.timeout_s)"></v-list-item-subtitle>
              <v-list-item-subtitle
                  v-text="'CPU:'+ pod.cpu_lim_m_cpu + 'm MEM:' + pod.mem_lim_mb + 'MiB DISK:' + pod.storage_lim_mb + 'MiB'"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="'WebIDE: ' + pod.pod_id + '.' + coder_hostname"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="'noVNC: ' + pod.pod_id + '.' + vnc_hostname"></v-list-item-subtitle>


            </v-list-item-content>

            <v-list-item-action>
              <v-col>


                <v-dialog
                    v-model="updateDialog"
                    persistent
                    :retain-focus="false"
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        :color="'blue'"
                        bottom
                        right
                        class="mx-2 white--text"
                        v-on="on"
                        v-bind="attrs"
                        @click="
                        updatingPod.name = pod.name;
                        updatingPod.description=pod.description;
                        updatingPod.timeout_s=pod.timeout_s;
                        updatingPod.target_status=pod.target_status;
                        updatingPod.template_ref=pod.template_ref;
                        updatingPod.pod_id=pod.pod_id;"
                    >
                      <v-icon> mdi-pencil</v-icon>
                      Edit
                    </v-btn>
                  </template>
                  <v-card>

                    <v-card-title>
                      <span class="headline">{{ updateFormTitle }}</span>
                    </v-card-title>


                    <v-card-text>
                      <v-form ref="updatingForm" @submit.prevent="saveUpdateForm()">
                        <v-text-field
                            label="Name"
                            hint="not necessary"
                            v-model="updatingPod.name"></v-text-field>
                        <v-text-field
                            label="Description"
                            hint="not necessary"
                            placeholder="Describe the pod"
                            v-model="updatingPod.description"
                        ></v-text-field>
                        <v-text-field
                            label="Timeout (s)"
                            hint="timeout < 86400"
                            placeholder="3600"
                            v-model="updatingPod.timeout_s"
                        ></v-text-field>
                        <v-select
                            v-model="updatingPod.target_status"
                            :items="target_status_list"
                            label="Target Status"
                        ></v-select>
                        <v-text-field
                            label="Template Reference (s)"
                            disabled
                            v-model="updatingPod.template_ref"
                        ></v-text-field>

                      </v-form>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="resetUpdateForm">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="saveUpdateForm">Save</v-btn>
                    </v-card-actions>

                  </v-card>
                </v-dialog>


                <v-dialog
                    v-model="deleteDialog"
                    persistent
                    :retain-focus="false"
                    max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        :color="'red'"
                        bottom
                        right
                        class="mx-2 white--text"
                        v-bind="attrs"
                        v-on="on"
                        @click="deletingPod = pod"
                    >
                      <v-icon> mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      Delete this Pod?
                    </v-card-title>
                    <v-card-text>Warning: All data of pod ({{ deletingPod.pod_id }}) will be lost</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="darken-1"
                          text
                          @click="deleteDialog = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          color="red darken-1"
                          text
                          @click="actionDeletePod(deletingPod.pod_id)"
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn
                    :color="pod.current_status === 'running' ? 'orange' : 'green'"
                    bottom
                    right
                    class="mx-2 white--text"
                    @click="powerPod(pod.pod_id, pod.current_status !== 'running')"
                    :disabled="pod.current_status === 'pending'"
                >
                  <v-icon> mdi-power</v-icon>
                  {{ pod.current_status === 'running' ? 'Stop' : 'Start' }}
                </v-btn>
                <v-menu
                    offset-y
                    :disabled="pod.current_status !== 'running'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        :color="pod.current_status === 'running' ? 'primary' : 'grey'"
                        class="white--text"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>mdi-connection</v-icon>
                      Connect
                    </v-btn>
                  </template>
                  <v-container class="mx-2">
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <v-btn @click="redirect(pod.pod_id, 'webide')">
                            WebIDE
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <v-btn @click="redirect(pod.pod_id, 'vnc')">VNC</v-btn>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-container>
                </v-menu>

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
      <v-dialog
          v-model="createDialog"
          persistent
          :retain-focus="false"
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              :color="'blue'"
              fab
              large
              bottom
              right
              class="ma-8 white--text"
              v-on="on"
              v-bind="attrs"
          >
            <v-icon> mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>

          <v-card-title>
            <span class="headline">{{ createFormTitle }}</span>
          </v-card-title>


          <v-card-text>
            <v-form ref="creatingForm" @submit.prevent="saveCreateForm()">
              <v-text-field
                  label="Name"
                  hint="not necessary"
                  v-model="creatingPod.name"
              ></v-text-field>
              <v-text-field
                  label="Description"
                  hint="not necessary"
                  placeholder="Describe the pod"
                  v-model="creatingPod.description"
              ></v-text-field>
              <v-text-field
                  label="Timeout (s) *"
                  hint="timeout < 86400"
                  placeholder="3600"
                  v-model="creatingPod.timeout_s"
              ></v-text-field>
              <v-text-field
                  label="CPU Limit (m) *"
                  hint="1000 = 1 CPU, cpu limit must > 500"
                  placeholder="1000"
                  v-model="creatingPod.cpu_lim_m_cpu"
              ></v-text-field>
              <v-text-field
                  label="Memory Limit (MiB) *"
                  hint="memory limit must > 512"
                  placeholder="1024"
                  v-model="creatingPod.mem_lim_mb"
              ></v-text-field>
              <v-text-field
                  label="Storage Limit (MiB) *"
                  hint="storage limit must > 10240 MiB"
                  placeholder="10240"
                  v-model="creatingPod.storage_lim_mb"
              ></v-text-field>
              <v-select
                  v-model="creatingPod.template_ref"
                  :items="templates"
                  item-text="friendlyName"
                  item-value="template_id"
                  label="Template *"
                  :rules="notNullRule"
              ></v-select>

            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetCreateForm">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveCreateForm">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>


    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";
var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {checkLogin, getRootPath, logOut, addDateStrSeconds} from "@/utils/tool";

defaultClient.basePath = getRootPath();


export default {
  name: "Pod",
  data: () => ({
    username: localStorage.getItem("username"),
    coder_hostname: "",
    vnc_hostname: "",
    pods: [],
    templates: [],
    deleteDialog: false,
    createDialog: false,
    updateDialog: false,
    editDialog: false,
    editFormTitle: "Edit Pod",
    formIsValid: false,
    updatingPod: {
      name: "",
      description: "",
      timeout_s: "",
      template_ref: "",
      target_status: "",
      pod_id: "",
    },
    creatingPod: {
      name: "",
      description: "",
      timeout_s: 3600,
      template_ref: "",
      cpu_lim_m_cpu: 1000,
      mem_lim_mb: 1024,
      storage_lim_mb: 10240,
    },
    deletingPod: {
      "pod_id": "",
    },
    editingPod: {
      name: "",
      description: "",
      timeout_s: "",
      template_ref: "",
      target_status: "",
      pod_id: "",
    },
    createFormTitle: "Create Pod",
    updateFormTitle: "Edit Pod",
    target_status_list: ['running', 'stopped'],
    keepAliveTimerID: null,
    isAdmin: localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'super_admin',
    podItems: [],
    selectedItems: [],
    podHeaders: [
      {text: 'Name', value: 'name'},
      {text: 'Pod ID', value: 'pod_id'},
      {text: 'Template', value: 'template_ref'},
      {text: 'Status', value: 'target_status'},
      {text: 'Owner', value: 'username'},
      {text: 'Accessed At', value: 'accessed_at'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    search: '',
    editingIndex: -1,

  }),

  mounted: function () {
    this.setGlobalTitle();
    this.getHostname();
  },
  methods: {
    addDateStrSeconds,
    userHasAdminPrivilege() {
      return localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'super_admin';
    },
    initialize() {
      if (!checkLogin()) {
        this.$router.push('/')
      }
      this.listPod();
      if (this.userHasAdminPrivilege()) {
        this.listGlobalPod();
      }
      this.keepAliveTimerID = setInterval(this.listPod, 60000);
      this.listTemplates();
    },
    redirect(pod_id, type) {
      let uri = "";
      if (type === 'webide') {
        uri = window.location.protocol + '//' + pod_id + '.' + this.coder_hostname;

      } else if (type === 'vnc') {
        uri = window.location.protocol + '//' + pod_id + '.' + this.vnc_hostname;
      } else {
        console.error('unknown type');
      }
      window.open(uri, '_blank');
    },
    getHostname() {
      // console.log("getVersion")
      var apiInstance = new Api.DefaultApi();
      apiInstance.getv1Health((error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + response);
          this.coder_hostname = response.body.config.coder_hostname;
          this.vnc_hostname = response.body.config.vnc_hostname;
        }
      });
    },
    resetCreateForm: function () {
      this.$refs.creatingForm.reset();
      this.createDialog = false;
    },
    saveCreateForm: function () {
      // console.log(this.creatingPod);
      this.createPod(
          this.creatingPod.name,
          this.creatingPod.description,
          this.creatingPod.template_ref,
          this.creatingPod.cpu_lim_m_cpu,
          this.creatingPod.mem_lim_mb,
          this.creatingPod.storage_lim_mb,
          this.creatingPod.timeout_s,
      );
      this.createDialog = false;
      this.listPod();
    },
    resetUpdateForm: function () {
      // this.$refs.updatingForm.reset();
      this.updateDialog = false;
    },
    saveUpdateForm: function () {
      // console.log(this.updatingPod);
      this.updatePod(
          this.updatingPod.pod_id,
          this.updatingPod.name,
          this.updatingPod.description,
          this.updatingPod.timeout_s,
          this.updatingPod.target_status,
      );
      this.updateDialog = false;
    },
    editItem: function (item) {
      this.editingIndex = this.podItems.indexOf(item);
      this.editingPod = Object.assign({}, item);
      this.editDialog = true;
    },
    resetEditForm: function () {
      this.editDialog = false;
    },
    saveEditForm: function () {
      this.updateGlobalPod(
          this.editingPod.pod_id,
          this.editingPod.name,
          this.editingPod.description,
          this.editingPod.timeout_s,
          this.editingPod.target_status,
      );
      this.editDialog = false;
    },
    powerPod: function (pod_id, status) {
      if (status) {
        this.updatePod(pod_id, null, null, null, 'running');
      } else {
        this.updatePod(pod_id, null, null, null, 'stopped');
      }
    },
    actionDeletePod: function (pod_id) {
      this.deletePod(pod_id);
      this.deleteDialog = false
    },
    async listTemplates() {
      let apiInstance = new Api.NonadminTemplateApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      // console.log( defaultClient.authentications['token'] );
      apiInstance.getnonadminTemplateNonadminTemplateList(null, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Template List Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.templates = data.templates.map((item) => {
            item.friendlyName = item.name + ' (' + item.template_id + ')';
            return item
          });
        }
      });
    },
    async listPod() {
      let apiInstance = new Api.NonadminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      // console.log( defaultClient.authentications['token'] );
      apiInstance.getnonadminPodNonadminPodList(null, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Pod List Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.pods = data.pods;
        }
      });
    },
    async listGlobalPod() {
      let apiInstance = new Api.AdminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      // console.log( defaultClient.authentications['token'] );
      apiInstance.getadminPodAdminPodList(null, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Pod List Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.podItems = data.pods;
        }
      });
    },
    async actionDeleteSelectedPods() {
      let pods = this.selectedItems;
      console.log(pods);
      if (pods.length === 0) {
        return;
      }
      let ret = confirm('Are you sure you want to delete ' + pods.length + ' pod(s) ?');
      if (ret === true) {
        await this.deleteGlobalPods(pods);
        await this.listGlobalPod();
      }
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Pods";
    },
    async createPod(
        name,
        description,
        templateRef,
        cpuLimMCpu,
        memLimMB,
        storageLimMB,
        timeout_s
    ) {
      let apiInstance = new Api.NonadminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      if (templateRef === null || templateRef === "") {
        this.$message.bottom().error('Please Select Template');
        return;
      }

      let payload = {
        'podCreateRequest': {
          name: name || "",
          description: description || "",
          template_ref: templateRef,
          cpu_lim_m_cpu: parseInt(cpuLimMCpu),
          mem_lim_mb: parseInt(memLimMB),
          storage_lim_mb: parseInt(storageLimMB),
          timeout_s: parseInt(timeout_s),
        }
      }

      // console.log( defaultClient.authentications['token'] );
      apiInstance.postnonadminPodNonadminPodCreate(payload, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Pod Create Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.$message.bottom().success('Pod Create Succeed');
          this.listPod();
        }
      });
    },

    async updatePod(
        podID = null,
        name = null,
        description = null,
        timeoutS = null,
        targetStatus = null) {
      let apiInstance = new Api.NonadminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let payload = {
        'podUpdateRequest': {
          pod_id: podID,
          name: name,
          description: description,
          timeout_s: parseInt(timeoutS),
          target_status: targetStatus,
        }
      }

      // console.log( defaultClient.authentications['token'] );
      apiInstance.putnonadminPodNonadminPodUpdate(podID, payload, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Pod Update Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.$message.bottom().success('Pod Update Succeed');
          this.listPod();
        }
      });

    },
    async updateGlobalPod(
        podID = null,
        name = null,
        description = null,
        timeoutS = null,
        targetStatus = null) {
      let apiInstance = new Api.AdminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let payload = {
        'podUpdateRequest': {
          pod_id: podID,
          name: name,
          description: description,
          timeout_s: parseInt(timeoutS),
          target_status: targetStatus,
        }
      }

      // console.log( defaultClient.authentications['token'] );
      apiInstance.putadminPodAdminPodUpdate(podID, payload, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Pod Update Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.$message.bottom().success('Pod Update Succeed');
          this.listGlobalPod();
        }
      });

    },
    async deletePod(
        podID = null,
    ) {
      let apiInstance = new Api.NonadminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");


      // console.log( defaultClient.authentications['token'] );
      let succeed = await new Promise((resolve, reject) => {
        apiInstance.deletenonadminPodNonadminPodDelete(podID, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('Pod Delete Failed: ' + JSON.parse(response.text).message);
            }
            reject(error);
          } else {
            console.log('API called successfully. Returned data: ' + data);
            this.$message.bottom().success('Pod Delete Succeed');
            this.listPod();
            resolve(true);
          }
        });
      }).catch(err => {
        console.error(err);
        this.$message.bottom().error('Pod Delete Failed: ' + err);
        return false;
      });
      return succeed;
    },
    async deleteGlobalPod(
        podID = null,
    ) {
      let apiInstance = new Api.AdminPodApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      // console.log( defaultClient.authentications['token'] );
      let succeed = await new Promise((resolve, reject) => {
        apiInstance.deleteadminPodAdminPodDelete(podID, (error, data, response) => {
          if (error) {
            console.error(error);
            if (response.status === 401) {
              this.$message.bottom().error('Please Login');
              logOut();
            } else {
              this.$message.bottom().error('Pod Delete Failed: ' + JSON.parse(response.text).message);
            }
            reject(error);
          } else {
            console.log('API called successfully. Returned data: ' + data);
            this.$message.bottom().success('Pod Delete Succeed');
            this.listGlobalPod();
            resolve(true);
          }
        });
      }).catch(err => {
        console.log(err);
        return false;
      });
      return succeed;
    },
    async deleteGlobalPods(pods) {
      // loop every pod
      var successNum = 0;
      var failNum = 0;
      for (var index in pods) {
        let succeed = await this.deleteGlobalPod(pods[index].pod_id);
        if (succeed) {
          successNum++;
        } else {
          failNum++;
        }
      }
      if (failNum === 0) {
        this.$message.bottom().success("Deleted " + successNum + " Pods");
      } else {
        this.$message.bottom().error("Deleted " + successNum + " Pods, Failed " + failNum + " Pods");
      }
    },

  },
  computed: {
    notNullRule() {
      const rules = []
      rules.push(v => ((v != null) && (v !== "")) || 'This field is required')
      return rules
    }
  },
  created() {
    this.initialize()
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.keepAliveTimerID);
  }
};
</script>
