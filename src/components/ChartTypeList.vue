<template>
  <v-card dark color="#424242" class="mx-auto" height="100%">
    <v-list dense color="#424242">
      <v-subheader><h3>Графики</h3></v-subheader>
      <v-list-item-group
        v-model="selectedChart"
        color="#55c6d3"
      >
        <v-list-item
          v-for="(chart) in charts"
          :key="chart.value"
          @click="handleChartSelect(chart)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="chart.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "ChartTypeList",
  props: ['charts', 'height'],
  data: () => ({
    selectedChart: null,
  }),
  created() {
    this.selectedChart = this.$store.state.charts.selectedChart;
  },
  methods: {
    handleChartSelect(chart) {
      this.$store.dispatch('charts/setChart', chart);
      this.$emit('getCategories');
    },
  }
}
</script>

<style>
</style>