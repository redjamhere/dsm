<template>
    <v-bottom-navigation 
        :value="value" 
        color="#55c6d3"
        dark
        absolute
        grow
    >
        <v-btn class="bottom-nav-item" value="models" to="/models" color="#2e2e2e">
            <h3>Все модели</h3>
            <v-icon>mdi-wall</v-icon>
        </v-btn>

        <v-btn class="bottom-nav-item" value="projects" to="/projects" color="#2e2e2e">
            <h3>Все проекты</h3>
            <v-icon>mdi-domain</v-icon>
        </v-btn>

        <v-btn class="bottom-nav-item" value="control" to="/controls" color="#2e2e2e">
            <h3>Управление</h3>
            <v-icon>mdi-tools</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNav',
  data: () => ({
    value: 'projects'
  })
}
</script>

<style scoped>
    .v-btn:not(.v-btn--round).v-size--default {
       height: 100%; 
    }
</style>