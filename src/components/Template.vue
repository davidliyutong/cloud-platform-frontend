<template>
  <div>
    <v-card class="mx-auto  my-4">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Notice</v-list-item-title>
          <v-list-item-subtitle>
            - Follow the directives of
            https://github.com/davidliyutong/cloud-platform-apiserver/blob/main/tests/templates/default.yaml when
            building template strings
            - Be careful when deleting templates, it will not affect the pods associated with the template.
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-container>
      <template v-for="(template, index) in templates">
        <v-list-item :key="template.name">
          <template>
            <v-list-item-content>
              <div class="overline mb-2 text-h6">
                <span class="font-weight-bold">{{ template.name }}</span>
              </div>
              <v-list-item-subtitle
                  class="text--primary"
                  v-text="template.description"
              ></v-list-item-subtitle>

              <v-list-item-subtitle
                  class="text--primary"
                  v-text="'Template ID: ' + template.template_id"
              ></v-list-item-subtitle>


            </v-list-item-content>

            <v-list-item-action>
              <v-col>
                <v-dialog
                    v-model="updateDialog"
                    persistent
                    :retain-focus="false"
                    max-width="800px"
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
                        updatingTemplate.name = template.name;
                        updatingTemplate.description=template.description;
                        updatingTemplate.image_ref=template.image_ref;
                        updatingTemplate.template_str=template.template_str;
                        updatingTemplate.template_id=template.template_id;"
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
                      <v-form class="create-form"
                              ref="creatingForm"
                              @submit.prevent="saveCreateForm()">
                        <v-text-field
                            label="Name *"
                            hint="Name of Template"
                            v-model="updatingTemplate.name"
                        ></v-text-field>
                        <v-text-field
                            label="Description"
                            hint="not necessary"
                            placeholder="Describe the template"
                            v-model="updatingTemplate.description"
                        ></v-text-field>
                        <v-text-field
                            label="Image Reference *"
                            hint="e.g. docker.io/davidliyutong/code-server-speit:latest"
                            placeholder="Provide the image"
                            v-model="updatingTemplate.image_ref"
                        ></v-text-field>
                        <v-textarea
                            label="Template String"
                            disabled
                            v-model="updatingTemplate.template_str">
                        </v-textarea>
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
                        @click="deletingTemplate = template"
                    >
                      <v-icon> mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      Delete this Template ?
                    </v-card-title>
                    <v-card-text>Warning: The template ({{ deletingTemplate.name }}) will be removed forever, pods will
                      not be
                      affected
                    </v-card-text>
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
                          @click="actionDeleteTemplate(deletingTemplate.template_id)"
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider
            v-if="index < templates.length"
            :key="index"
        ></v-divider>
      </template>

    </v-container>
    <div class="float-right">
      <v-dialog
          v-model="createDialog"
          persistent
          :retain-focus="false"
          max-width="800px"
          @input="createDialogToggle"
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
            <v-form class="create-form"
                    ref="creatingForm"
                    @submit.prevent="saveCreateForm()">
              <v-text-field
                  label="Name *"
                  hint="Name of Template"
                  v-model="creatingTemplate.name"
              ></v-text-field>
              <v-text-field
                  label="Description"
                  hint="not necessary"
                  placeholder="Describe the template"
                  v-model="creatingTemplate.description"
              ></v-text-field>
              <v-text-field
                  label="Image Reference *"
                  hint="e.g. docker.io/davidliyutong/code-server-speit:latest"
                  placeholder="Provide the image"
                  v-model="creatingTemplate.image_ref"
              ></v-text-field>
              <h3>Template String *</h3>
              <textarea v-model="creatingTemplate.template_str" ref="createTemplateInput"></textarea>
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

<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .create-form-textarea textarea {
  line-height: 1.1; /* Adjust as needed */
}
</style>


<script>
// import axios from "axios";
// import {mdiAlarmLight} from "@mdi/js";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/mode/yaml/yaml.js";
import "codemirror/addon/display/autorefresh.js";

var Api = require('../client/src');
var defaultClient = Api.ApiClient.instance;
import {checkLogin, getRootPath, logOut} from "@/utils/tool";

defaultClient.basePath = getRootPath();


export default {
  name: "Templates",
  data: () => ({
    username: localStorage.getItem("username"),
    templates: [],
    deleteDialog: false,
    createDialog: false,
    updateDialog: false,
    updatingTemplate: {
      "name": "",
      "description": "",
      "image_ref": "",
      "template_str": "",
      "template_id": ""
    },
    creatingTemplate: {
      "name": "",
      "description": "",
      "image_ref": "",
      "template_str": "",
    },
    deletingTemplate: {
      "name": "",
    },
    createFormTitle: "Create Template",
    updateFormTitle: "Update Template",
    editorOptions: {
      indent: 4
    },
    createFormToggled: false,
    updateFormToggled: false,
    content: ""
  }),

  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    initialize() {
      if (!checkLogin()) {
        this.$router.push('/');
      }
      this.listTemplates();
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
          this.templates = data.templates;
        }
      });
    },
    createDialogToggle: function (dialogState) {
      // var scope = this;
      if (dialogState && !this.createFormToggled) {
        this.createFormToggled = true;
        this.$nextTick(() => {
          this.editor = CodeMirror.fromTextArea(this.$refs.createTemplateInput, {
            lineNumbers: true,
            mode: 'yaml',
            theme: 'material-ocean',
            autoRefresh: true,
          });
          // this.editor.on('change', function (cm) {
          //   scope.createTemplate.template_str = cm.getValue();
          // });
        });

      }
    },
    resetCreateForm: function () {
      // this.$refs.creatingForm.reset();
      this.createDialog = false;
    },
    saveCreateForm: function () {
      this.createTemplate(
          this.creatingTemplate.name,
          this.creatingTemplate.description,
          this.creatingTemplate.image_ref,
          this.editor.getValue(),
      );
      this.createDialog = false;
      this.listTemplates();
    },
    resetUpdateForm: function () {
      // this.$refs.updatingForm.reset();
      this.updateDialog = false;
    },
    async saveUpdateForm() {
      // console.log(this.updatingPod);
      await this.updateTemplate(
          this.updatingTemplate.template_id,
          this.updatingTemplate.name,
          this.updatingTemplate.description,
          this.updatingTemplate.image_ref,
          null
      );
      this.updateDialog = false;
    },
    actionDeleteTemplate: function (template_id) {
      this.deleteTemplate(template_id);
      this.deleteDialog = false;
      this.listTemplates();
    },
    async createTemplate(
        name,
        description,
        imageRef,
        templateStr,
    ) {
      let apiInstance = new Api.AdminTemplateApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      if (imageRef === null || imageRef === "") {
        this.$message.bottom().error('Please Provide Image');
        return;
      }

      if (name === null || name === "") {
        this.$message.bottom().error('Please Provide Name');
        return;
      }

      if (templateStr === null || templateStr === "") {
        this.$message.bottom().error('Please Provide Template String');
        return;
      }

      let payload = {
        'templateCreateRequest': {
          name: name,
          description: description || "",
          image_ref: imageRef,
          template_str: templateStr,
          fields: null,
          defaults: null,
        }
      }

      apiInstance.postadminTemplateAdminTemplateCreate(payload, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Template Create Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.$message.bottom().success('Template Create Succeed');
          this.listTemplates();
        }
      })

    },
    async updateTemplate(
        templateID = null,
        name = null,
        description = null,
        imageRef = null,
        templateStr = null) {
      let apiInstance = new Api.AdminTemplateApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");

      let payload = {
        'templateUpdateRequest': {
          template_id: templateID,
          name: name,
          description: description,
          image_ref: imageRef,
          template_str: templateStr,
        }
      }

      // console.log( defaultClient.authentications['token'] );
      apiInstance.putadminTemplateAdminTemplateUpdate(templateID, payload, (error, data, response) => {
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
        }
      });

    },
    async deleteTemplate(
        template_id = null,
    ) {
      let apiInstance = new Api.AdminTemplateApi();
      let token = defaultClient.authentications['token'];
      token.accessToken = localStorage.getItem("token");


      // console.log( defaultClient.authentications['token'] );
      apiInstance.deleteadminTemplateAdminTemplateDelete(template_id, (error, data, response) => {
        if (error) {
          console.error(error);
          if (response.status === 401) {
            this.$message.bottom().error('Please Login');
            logOut();
          } else {
            this.$message.bottom().error('Template Delete Failed: ' + JSON.parse(response.text.message));
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.$message.bottom().success('Template Delete Succeed');
        }
      });
    },
    setGlobalTitle: function () {
      var myElement = document.getElementById("global-title");
      myElement.textContent = "Templates";
    },

  },
  computed: {},
  created() {
    this.initialize();
  },
};
</script>
