<template>  
    <v-container 
      grid-list-md class="table-wrapper ma-0 fill-height"
      align-start 
      ref="tableWrapper"
      fluid
    >
      <v-row class="fill-height custom-row">
        <v-col cols="2" class="fill-height">
          <!-- <file-models-picker-list
            :loader="fileModelsLoading"
            :filemodels="fileModels"
            @getChartData="getChartData"
          /> -->
          <file-models-chart-picker-list
            :loader="fileModelsLoading"
            :filemodels="fileModels"
            @getChartData="getChartData"
          />
        </v-col>
        <v-col cols="2">
          <file-models-category-picker-list
            :loader="fileModelsLoading"
            :categories="categories"
            @getChartData="getChartData"
          />
        </v-col>
        <v-col md="6" >
          <file-models-data-chart
            :agregateChartData="agregateChartData"
            :separateChartData="separateChartData"
           />
          <!-- <file-models-data-table 
            :tableHeaders="tableHeaders" 
            :tableData="tableData"
            @matchCost="matchCost"
            :totalCost="totalCost"
          /> -->
        </v-col>
        <v-col cols="2">
          <chart-type-list 
            :charts="charts" 
            @getCategories="getCategories"
          />
        </v-col>
      </v-row>
      <v-snackbar
      v-model="snackbar"
      :multi-line="true"
    >
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
          >
          Закрыть
          </v-btn>
      </template>
    </v-snackbar>
     <v-snackbar
      v-model="snackbarSuccess"
      :multi-line="true"
    >
      {{ successMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="green"
          text
          v-bind="attrs"
          @click="snackbarSuccess = false"
          >
          OK
          </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
// import FileModelsPickerList from '@/components/FileModelsPickerList.vue';
// import FileModelsDataTable from '@/components/FileModelsDataTable.vue';
import FileModelsCategoryPickerList from '@/components/FileModelsCategoryPickerList.vue';
import ChartTypeList from '../components/ChartTypeList.vue';
import FileModelsDataChart from '../components/FileModelsDataChart.vue';
import FileModelsChartPickerList from '../components/FileModelsChartPickerList.vue';

  export default {
    name: 'Charts',
    components: {
      // FileModelsPickerList, 
      // FileModelsDataTable,
      FileModelsCategoryPickerList,
      ChartTypeList,
      FileModelsDataChart,
      FileModelsChartPickerList
    },
    data: () => ({
      projectName: 'всем моделям',
      charts: [
        { 
          title: 'Количество элементов', 
          action: 'charts/getQuantityElementsCategories', 
          value: 'quantity', 
        }, 
        { 
          title: 'Объем элементов', 
          action: 'charts/getVolumeElementsCategories', 
          value: 'volume'
        }, 
        { 
          title: 'Площадь элементов', 
          action: 'charts/getAreaElementsCategories', 
          value: 'area' 
        }, 
        { title: 'Стоимость(₽)', action: '', value: '' },
        { title: 'Тенге(₸)', action: '' , value: '' }, 
      ],
      snackbar: false,
      errorMessage: '',
      projectId: null,
      innerHeight: 0,
      fileModelsLoading: false,
      fileModels: { sortedByProjects: null, unsorted: [] },
      agregateChartData: [],
      separateChartData: [],
      categories: null,
      snackbarSuccess: false,
      successMessage: '',
    }),
    created () {
      this.fileModelsLoading = true;
      if (this.$route.params.projectCode == 'all') {
        this.$store.dispatch('filemodels/getAllFileModels')
          .then(
            () => {
              this.$store.dispatch('projects/getProjects')
                .then(
                  () => {
                    this.sortFileModels();
                    this.fileModelsLoading = false;
                  }
                );
            },
            error => {
              this.fileModelsLoading = false;
              this.errorMessage = (error.response && error.response.data) 
                                  || error.message 
                                  || error.toString();
              this.snackbar = true;
            }
          );
      } else {
        this.$store.dispatch('projects/getProjects')
          .then(
            () => {
              this.$store.state.projects.projects.map(el => {
                if(el.code == this.$route.params.projectCode) {
                  this.fileModels.sortedByProjects.push(el);
                }
              })
              this.fileModelsLoading = false;
            }
          )
      }
    },
    methods: {
      sortFileModels() {
        this.fileModels.sortedByProjects = this.$store.state.projects.projects;
        this.$store.state.filemodels.fileModels.map((fileModel) => {
          if(fileModel.projectcode === null) {
            this.fileModels.unsorted.push(fileModel);
          }
        })
      },
      getChartData() {
        if( this.$store.state.charts.selectedChart === null 
            || this.$store.state.filemodels.selectedFileModel === null
            || this.$store.state.charts.selectedCategory === null) {
          this.errorMessage = 'Выберите тип графика, категорию и модуль для отображения';
          this.snackbar = true;
        } else {
          this.$store.dispatch(
            'charts/getQuantityElementsAggregate', 
            {
              "fileModelDtos": this.$store.state.filemodels.selectedFileModel,
              "rvtBuiltInCategoryDtos" : [this.$store.state.charts.selectedCategory],
            }
          ).then(
            () => {
              this.agregateChartData = this.sortData(this.$store.state.charts.agregateElements);
              this.$store.dispatch(
                'charts/getQuantityElementsSeparate',
                {
                  "fileModelDtos": this.$store.state.filemodels.selectedFileModel,
                  "rvtBuiltInCategoryDtos" : [this.$store.state.charts.selectedCategory],
                }
              ).then(
                () => {
                  this.separateChartData = this.sortSeparateData(this.$store.state.charts.separateElements);
                  this.successMessage = 'Данные успешно загружены';
                  this.snackbarSuccess = true;
                }
              )
            },
            error => {
              this.cardLoading = false;
              this.errorMessage = (error.response && error.response.data) || error.message || error.toString();
              this.snackbar = true;
            }
          )
        }
      },
      getCategories() {
        (this.$route.params.projectCode == 'all') ? '' : this.$route.params.projectCode; 
        this.$store.dispatch(
          this.$store.state.charts.selectedChart.action, 
          (this.$route.params.projectCode == 'all') ? '' : this.$route.params.projectCode
        )
        .then(() => this.categories = this.$store.state.charts.categories);
      },
      sortData(data) {
        let sortedData = {};
        let dataKeys = Object.keys(data);
        data[dataKeys[1]].map(el => {
          let keys = Object.keys(el);
          sortedData[this.dateStringify(el[keys[1]])] = el[keys[0]];
        });
        return sortedData;
      },
      sortSeparateData(data) {
        let sortedData = [];
        data.map(el => {
          let keys = Object.keys(el);
          let sortedValues = {};
          el[keys[2]].map(el => {
          let keys = Object.keys(el);
            sortedValues[this.dateStringify(el[keys[1]])] = el[keys[0]];
          });
          sortedData.push({name: el.fileModel.filename, data: sortedValues});
        })
        return sortedData;
      },
      dateStringify(date) {
        var cDate = new Date(date)
        var month = cDate.getUTCMonth() + 1; //months from 1-12
        var day = cDate.getUTCDate();
        var year = cDate.getUTCFullYear();
        return year + "-" + month + "-" + day;
      }
    }
  }
</script>

<style scoped>
  .table-wrapper {
    overflow-y: auto;
  }
  .custom-row {
    padding-bottom: 120px;
  }
  /* .flex-block {
    height: inherit;
  } */
</style>