<template>
    <v-card ref="card" dark color="#424242" class="fill-height" style="position: relative; overflow: hidden;">
      <v-card-title ref="cardHeader">
        {{this.$store.state.tables.selectedTable.title}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-card-subtitle 
          v-if="this.$store.state.tables.selectedTable.value == 'typesCharacteristics'"
        >
            Итоговая стоимость: {{totalCost}}
        </v-card-subtitle>
      </v-card-title>
        <v-data-table
          :loading="tableLoading"
          :headers="tableHeaders"
          :items="tableData"
          :height="height - 60"
          :search="search"
          :calculate-widths="true"
          fixed-header
          class="elevation-1"
          style="position: absolute; width: 100%; background-color: #424242;"
          no-results-text="Нет данных"
        >
          <template v-slot:item.price="props">
            <v-edit-dialog
              :return-value.sync="props.item.price"
              large
              persistent
              @save="save(props.item)"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              <div>{{ props.item.price }}</div>
              <template v-slot:input>
                <div class="mt-4 title">
                  Введите цену
                </div>
                <v-text-field
                  v-model="props.item.price"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
  name: 'FileModelsDataTable',
  props: ['tableData', 'tableLoading', 'tableHeaders', 'totalCost'],
  data () {
      return {
        search: '',
        height: 0,
        max25chars: v => v.length <= 25 || 'Input too long!',
      }
    },
  mounted() {
    this.matchHeight();
  },
  methods: {
    matchHeight() {   
      this.height = this.$refs.card.$el.offsetHeight - this.$refs.cardHeader.offsetHeight;
    },
    reducer(val, current) {
      parseFloat(val) + parseFloat(current);
    },
    save (item) {
      this.$emit('matchCost', item);
    },
    cancel () {
    },
    open () {
    },
    close () {
      console.log('Dialog closed')
    },
  }
}
</script>

<style lang="scss" scoped>
  .v-data-table-header tr th {
    background-color: blue;
  }
</style>