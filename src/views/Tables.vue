<template>  
    <v-container fluid fill-height align-content-start class="table-wrapper">
      <v-row class="mb-1">
        <v-col cols="12">
          <v-card dark color="#424242">
            <v-card-title>Таблицы по {{projectName}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="2">
          <file-models-picker-list 
            :loader="fileModelsLoading"
            :filemodels="fileModels"
            @getTableData="getTableData"
          />
        </v-col>
        <v-col cols="8">
          <v-card dark class="custom-card">
          </v-card>
        </v-col>
        <v-col>
          <table-type-list :tables="tables" @getTableData="getTableData"/>
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

  export default {
    components: {TableTypeList, FileModelsPickerList},
    data: () => ({
      projectName: 'всем моделям',
      tables: [
        { title: 'Оси', action: 'filemodels/getGrids' }, 
        { title: 'Уровни', action: 'filemodels/getLevels'}, 
        { title: 'Базовые точки', action: 'filemodels/getBasePoints'}, 
        { title: 'Типы', action: 'filemodels/getTypes'},
        { 
          title: 'Характеристики типов', 
          action: 'filemodels/getTypesCharacteristics' 
        },
        { 
          title: 'Параметры элементов', 
          action: 'filemodels/getFullTypesCharacteristics' 
        }, 
        { title: 'Ведомость объемов работ', action: '' }
      ],
      snackbar: false,
      errorMessage: '',
      projectId: null,
      fileModelsLoading: false,
      fileModels: { sortedByProjects: null, unsorted: [] },
      selectedFileModelId: null
    }),
    created () {
      this.fileModelsLoading = true;
      if (this.projectId === null) {
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
      getTableData() {
        if( this.$store.state.tables.selectedTableAction === null 
            || this.$store.state.filemodels.selectedFileModelId === null) {
          this.errorMessage = 'Выберите тип таблицы и модуль для отображения';
          this.snackbar = true;
        } else {
          this.$store.dispatch(
            this.$store.state.tables.selectedTableAction, 
            this.$store.state.filemodels.selectedFileModelId
          ).then(
            () => {
              console.log('ok');
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
    padding-bottom: 70px;
  }
</style>