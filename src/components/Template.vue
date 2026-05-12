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
                <v-btn
                    :color="'blue'"
                    bottom
                    right
                    class="mx-2 white--text"
                    @click="openEditDialog(template)"
                >
                  <v-icon> mdi-pencil</v-icon>
                  Edit
                </v-btn>
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
          v-model="formDialog"
          persistent
          :retain-focus="false"
          max-width="800px"
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
              @click="openCreateDialog"
          >
            <v-icon> mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>

          <v-card-title>
            <span class="headline">{{ formDialogTitle }}</span>
          </v-card-title>


          <v-card-text>
            <v-form class="create-form" ref="templateForm" @submit.prevent="saveForm()">
              <v-text-field
                  label="Name *"
                  hint="Name of Template"
                  v-model="editingTemplate.name"
              ></v-text-field>
              <v-text-field
                  label="Description"
                  hint="not necessary"
                  placeholder="Describe the template"
                  v-model="editingTemplate.description"
              ></v-text-field>
              <v-text-field
                  label="Image Reference *"
                  hint="e.g. docker.io/davidliyutong/code-server-speit:latest"
                  placeholder="Provide the image"
                  v-model="editingTemplate.image_ref"
              ></v-text-field>
              <h3>Template String *</h3>
              <textarea v-model="editingTemplate.template_str" ref="templateStrInput"></textarea>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeFormDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveForm">Save</v-btn>
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
.create-form .CodeMirror {
  height: 400px;
  border: 1px solid #ddd;
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
    formDialog: false,
    formDialogMode: 'create',
    formEditorInitialized: false,
    editingTemplate: {
      "name": "",
      "description": "",
      "image_ref": "",
      "template_str": "",
      "template_id": ""
    },
    deletingTemplate: {
      "name": "",
    }
  }),

  mounted: function () {
    this.setGlobalTitle();
  },
  methods: {
    async initialize() {
      if (!await checkLogin()) {
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
    openCreateDialog: function () {
      this.formDialogMode = 'create';
      this.editingTemplate = { name: "", description: "", image_ref: "", template_str: "", template_id: "" };
    },
    openEditDialog: function (template) {
      this.formDialogMode = 'update';
      this.editingTemplate = {
        name: template.name,
        description: template.description,
        image_ref: template.image_ref,
        template_str: template.template_str,
        template_id: template.template_id,
      };
      this.formDialog = true;
    },
    closeFormDialog: function () {
      if (this.formEditor) {
        this.formEditor.toTextArea();
        this.formEditor = null;
        this.formEditorInitialized = false;
      }
      this.formDialog = false;
    },
    async saveForm() {
      let templateStr = this.formEditor ? this.formEditor.getValue() : this.editingTemplate.template_str;
      if (this.formEditor) {
        this.formEditor.toTextArea();
        this.formEditor = null;
        this.formEditorInitialized = false;
      }
      if (this.formDialogMode === 'create') {
        await this.createTemplate(
            this.editingTemplate.name,
            this.editingTemplate.description,
            this.editingTemplate.image_ref,
            templateStr,
        );
      } else {
        await this.updateTemplate(
            this.editingTemplate.template_id,
            this.editingTemplate.name,
            this.editingTemplate.description,
            this.editingTemplate.image_ref,
            templateStr,
        );
      }
      this.formDialog = false;
      this.listTemplates();
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
            this.$message.bottom().error('Template Update Failed: ' + JSON.parse(response.text).message);
          }
        } else {
          console.log('API called successfully. Returned data: ' + data);
          this.$message.bottom().success('Template Update Succeed');
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
  watch: {
    formDialog(val) {
      if (val) {
        this.$nextTick(() => {
          if (this.formEditorInitialized && this.formEditor) {
            this.formEditor.setValue(this.editingTemplate.template_str || '');
            this.formEditor.refresh();
          } else {
            this.formEditor = CodeMirror.fromTextArea(this.$refs.templateStrInput, {
              lineNumbers: true,
              mode: 'yaml',
              theme: 'material-ocean',
              autoRefresh: true,
            });
            this.formEditor.setValue(this.editingTemplate.template_str || '');
            this.formEditorInitialized = true;
          }
        });
      }
    },
  },
  computed: {
    formDialogTitle() {
      return this.formDialogMode === 'create' ? 'Create Template' : 'Update Template';
    },
  },
  created() {
    this.initialize();
  },
};
</script>
