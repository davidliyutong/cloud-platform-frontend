<template>
  <v-app id="login">
    <v-main>
      <!-- 如果使用 vue-router -->
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "Root",
  data: function () {
    return {}
  },
  methods: {},
  mounted() {
  },
  created() {
  }
};
</script>