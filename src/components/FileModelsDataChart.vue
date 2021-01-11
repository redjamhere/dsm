<template>
    <v-card ref="card" dark color="#424242" class="fill-height" style="position: relative; overflow: hidden;">
    <v-card-title>
      Тип: {{this.$store.state.charts.selectedChart.title}} |
      Категория: {{this.$store.state.charts.selectedCategory.name}}
      <v-spacer></v-spacer>
       <!-- <v-checkbox
        v-model="dataType"
        label="Разбить по моделям"
        color="#55c6d3"
        value="dataType"
        hide-details
      ></v-checkbox> -->
    </v-card-title>
    <v-card-text>
      <v-container fluid style="">
        <v-row>
          <v-col cols="12">
            <line-chart label="Value" width="100%" :data="agregateChartData"></line-chart>
          </v-col>
          <v-col cols="12">
            <line-chart :data="separateChartData"></line-chart>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'FileModelsDataChart',
  props: ['agregateChartData', 'separateChartData'],
  data: () => ({
    chartName: 'График',
    sortedChartData: {}
  }),
  mounted () {
  },
  methods: {}
}
</script>

<style>

</style>