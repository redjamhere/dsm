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
        <v-col>
          <v-card height="100%" dark color="#424242">

          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card height="100%" dark color="#424242">
          </v-card>
        </v-col>
        <v-col>
          <table-type-list :tables="tables"/>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import TableTypeList from '@/components/TableTypeList.vue';

  export default {
    components: {TableTypeList},
    data: () => ({
      projectName: 'всем моделям',
      tables: [
        { title: 'Оси', action: 'filemodels/getGrids' }, 
        { title: 'Уровни', action: 'filemodels/getLevels'}, 
        { title: 'Базовые точки', action: 'filemodels/getBasePoints'}, 
        { title: 'Типы', action: 'filemodels/getTypes'},
        { title: 'Характеристики типов', action: 'filemodels/getTypesCharacteristics' },
        { 
          title: 'Параметры элементов', 
          action: 'filemodels/getFullTypesCharacteristics' 
        }, 
        { title: 'Ведомость объемов работ', action: '' }
      ],
    }),
  }
</script>

<style scoped>
  .table-wrapper {
    padding-bottom: 70px;
  }
</style>