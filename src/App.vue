<template>
  <v-app>
    <v-app-bar app dark v-if="this.$router.currentRoute.path != '/auth'">
      <v-toolbar-title>
        <font :color="logo.colors[0]">{{logo.text[0]}}</font>        
        <font :color="logo.colors[1]">{{logo.text[1]}}</font>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <NavigationDrawer v-if="this.$router.currentRoute.path != '/auth'"/>
    <v-main class="main-wrapper">
      <router-view />
    </v-main>
    <div>
      <BottomNav v-if="this.$router.currentRoute.path != '/auth'"/>
    </div>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer';
import BottomNav from '@/components/BottomNavigation';

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    BottomNav
  },
  data: () => ({
    logo: {
      text: ['Development ', 'System'],
      colors: ['#ffffff', '#55c6d3']
    },
    value: 'projects'
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
  .main-wrapper {
    background-image: url('./assets/wbBG.png');
    background-size: 100%;
    background-repeat: repeat;
  }
</style>
