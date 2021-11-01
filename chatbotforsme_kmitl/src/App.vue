<template>
  <v-app>
    <v-app-bar app color="#FFCDD2" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src=""
          transition="scale-transition"
          width="40"
        />

      </div>
      
      <v-spacer></v-spacer>

      <v-btn
        href=""
        target=""
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-account-arrow-right-outline</v-icon>
      </v-btn>
      
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
