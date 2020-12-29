<template>
  <v-app>
    <!-- <v-app-bar app dark>
      <v-toolbar-title>
        <font :color="logo.colors[0]">{{logo.text[0]}}</font>        
        <font :color="logo.colors[1]">{{logo.text[1]}}</font>
      </v-toolbar-title>
    </v-app-bar> -->
    <v-main class="main-wrapper">
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    logo: {
      text: ['Development ', 'System'],
      colors: ['#ffffff', '#55c6d3']
    },
  })
}
</script>

<style lang="scss">

#app {
  @font-face {
    font-family: "Ubuntu";
    src: url(./assets/fonts/Ubuntu/Ubuntu-Regular.ttf) format("truetype");
  }
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
