<template>
  <v-card dark color="#424242" class="mx-auto" height="100%">
    <v-list dense color="#424242">
      <v-subheader><h3>Таблицы</h3></v-subheader>
      <v-list-item-group
        v-model="selectedTable"
        color="#55c6d3"
      >
        <v-list-item
          v-for="(table, i) in tables"
          :key="i"
          @click="handleTableSelect(table, i)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="table.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        <v-list-item link to="/projects">
          <v-list-item-content>
            <v-list-item-title>Ведомость объемов работ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "TableTypeList",
  props: ['tables', 'height'],
  data: () => ({
    selectedTable: null,
  }),
  created() {
    this.selectedTable = this.$store.state.tables.selectedTable;
  },
  methods: {
    handleTableSelect(table) {
      this.$store.dispatch('tables/setTable', table);
      this.$emit('getTableData');
    },
  }
}
</script>

<style>
</style>