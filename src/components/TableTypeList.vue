<template>
  <v-card height="100%" dark color="#424242" class="mx-auto">
    <v-list dense color="#424242">
      <v-subheader><h3>Таблицы</h3></v-subheader>
      <v-list-item-group
        v-model="selectedTable"
        color="#55c6d3"
      >
        <v-list-item
          v-for="(table, i) in tables"
          :key="i"
          @click="handleTableSelect(table.action)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="table.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "TableTypeList",
  props: ['tables'],
  data: () => ({
    selectedTable: 0,
  }),
  created () {
    // console.log(this.$store.state.filemodels.tableContent);
  },
  methods: {
    handleTableSelect(action) {
      this.$store.dispatch(action, 1)
        .then(
          () => {
            console.log('ok');
          },
          error => {
            console.log(error);
          }
        )
    },
  }
}
</script>

<style>
</style>