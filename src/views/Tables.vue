<template>  
    <v-container 
      grid-list-md class="table-wrapper ma-0 fill-height"
      align-start 
      ref="tableWrapper"
      fluid
    >
      <v-row class="fill-height custom-row">
        <v-col cols="12">
          <v-card dark color="#424242">
            <v-card-title>Таблицы по {{projectName}}</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="2" class="fill-height">
            <file-models-picker-list
              :loader="fileModelsLoading"
              :filemodels="fileModels"
              @getTableData="getTableData"
            />
        </v-col>
        <v-col md="8" >
            <file-models-data-table 
              :tableHeaders="tableHeaders" 
              :tableData="tableData"
              @matchCost="matchCost"
              :totalCost="totalCost"
            />
        </v-col>
        <v-col cols="2">
            <table-type-list 
              :tables="tables" 
              @getTableData="getTableData"
              :tableLoading="tableLoading"
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
  </v-container>
</template>
<script>
import TableTypeList from '@/components/TableTypeList.vue';
import FileModelsPickerList from '@/components/FileModelsPickerList.vue';
import FileModelsDataTable from '@/components/FileModelsDataTable.vue';

  export default {
    name: 'Tables',
    components: {TableTypeList, FileModelsPickerList, FileModelsDataTable},
    data: () => ({
      projectName: 'всем моделям',
      tables: [
        { title: 'Оси', action: 'filemodels/getGrids', value: 'grids', }, 
        { title: 'Уровни', action: 'filemodels/getLevels', value: 'levels'}, 
        { title: 'Базовые точки', action: 'filemodels/getBasePoints', value: 'basePoints' }, 
        { title: 'Типы', action: 'filemodels/getTypes', value: 'types'},
        { 
          title: 'Характеристики типов', 
          action: 'filemodels/getTypesCharacteristics',
          value: 'typesCharacteristics' 
        },
        { 
          title: 'Параметры элементов', 
          action: 'filemodels/getFullTypesCharacteristics' ,
          value: 'fullTypesCharacteristics'
        }, 
      ],
      snackbar: false,
      errorMessage: '',
      projectId: null,
      innerHeight: 0,
      tableData: [],
      tableLoading: true,
      tableHeaders: [],
      fileModelsLoading: false,
      fileModels: { sortedByProjects: [], unsorted: [] },
      selectedFileModelId: null,
      totalCost: 0
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
      matchCost(item) {
        this.tableData.map(el => {
          if(item.id === el.id) {
            el.cost = parseFloat(item.price) * parseFloat(el.volume);
          }
        });
        this.totalCost = item.cost + this.totalCost;
        this.totalCost.toFixed(5);
      },
      getTableData() {
        if( this.$store.state.tables.selectedTable === null 
            || this.$store.state.filemodels.selectedFileModel === null) {
          this.errorMessage = 'Выберите тип таблицы и модуль для отображения';
          this.snackbar = true;
        } else {
          this.tableHeaders = this.$store.state.tables.tableHeader[
            this.$store.state.tables.selectedTable.value
          ];
          this.$store.dispatch(
            this.$store.state.tables.selectedTable.action, 
            this.$store.state.filemodels.selectedFileModel.id
          ).then(
            () => {
              this.tableData = this.$store.state.filemodels.tableContent;
            },
            error => {
              this.cardLoading = false;
              this.errorMessage = (error.response && error.response.data) || error.message || error.toString();
              this.snackbar = true;
            }
          )
        }
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