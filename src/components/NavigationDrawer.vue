<template>
  <v-navigation-drawer
    permanent
    app
    dark
    expand-on-hover
    class="pt-13 custom-nav"
    src="../assets/flatbgGrey.png"
  >
    <v-list
      nav
      dense
    >
      <v-list-item link to="/tables">
        <v-list-item-icon>
          <v-icon>mdi-table</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Таблицы</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/charts">
        <v-list-item-icon>
          <v-icon>mdi-chart-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Графики</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Выход</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
    name: 'NavigationDrawer',
    methods: {
      logout() {
        this.$store.dispatch('auth/logout').then(
          () => this.$router.push('/auth')
        )
      }
    }
}
</script>

<style lang="scss">
  .castom-nav {
    display: flex;
    flex-direction: column;
  }
</style>