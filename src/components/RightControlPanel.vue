<template>
    <v-navigation-drawer
      permanent
      right
      dark
    >
        <v-list dense>
          <v-list-item
            link
            v-for="item in items"
            :key="item.title"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content> 
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'RightControlPanel',
  data () {
    return {
      items: [
        { title: 'Оси', icon: 'mdi-home-city' },
        { title: 'Уровни', icon: 'mdi-account' },
        { title: 'Базовые точки', icon: 'mdi-account-group-outline' },
      ],
    }
  }
}
</script>

<style>

</style>