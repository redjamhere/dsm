<template>
  <v-card 
    dark 
    ref="mycard" 
    color="#424242" 
    class="custom-card mx-auto fill-height" 
    :loading="loader"
    style="position: relative"
  >
    <template slot="progress">
      <v-progress-linear color="#55c6d3" indeterminate></v-progress-linear>
    </template>

    <div ref="cardHeader" class="pa-2">
      <v-autocomplete
        :loading="autoCompleteLoading"
        :items="allFileModels"
        :filter="customFilter"
        item-text="filename"
        v-model="fileModelSelected"
        item-value="id"
        label="Поиск по названию и id"
        @change="handlePickFileModel(fileModelSelected)"
      ></v-autocomplete>
    </div>
    
    <v-list 
      dense 
      color="#424242" 
      class="overflow-y-auto" 
      :max-height="height"
      style="position: absolute; width: 100%;"
    >
      <v-subheader><h3>Модели</h3></v-subheader>
      <v-list-group
        max-height="100%"
        :value="false"
        v-for="(project) in filemodels.sortedByProjects"
        :key="project.code"
      >
        <template v-slot:activator>
          <v-list-item-title>{{project.name}}</v-list-item-title>
        </template>
        <v-list-item-group
          v-model="selectedFileModel"
          color="#55c6d3"
        >
          <v-list-item
            v-for="(filemodel) in project.fileModelDtos"
            :key="filemodel.id"
            @click="handlePickFileModel(filemodel)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="filemodel.filename"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
      <v-list-group
        v-if="this.$route.params == 'all'"
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-title>Не привязанные</v-list-item-title>
        </template>
        <v-list-item-group
          v-model="selectedFileModel"
          color="#55c6d3"
        >
          <v-list-item
            v-for="(filemodel) in filemodels.unsorted"
            :key="filemodel.id"
            @click="handlePickFileModel(filemodel)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="filemodel.filename"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'FileModelPickerList',
  props: ['loader', 'filemodels'],
  data: () => ({
    selectedFileModel: null,
    autoCompleteLoading: false,
    allFileModels: [],
    fileModelSelected: null,
    height: 0,
  }),
  created() {
    this.autoCompleteLoading = true;
    this.$store.dispatch('filemodels/getAllFileModels')
      .then(
        () => {
          this.allFileModels = this.$store.state.filemodels.fileModels
          this.autoCompleteLoading = false;
        }
      );
  },
  mounted () {
    this.matchCardHeight();
  },
  methods: {
    matchCardHeight() {
      this.height = this.$refs.mycard.$el.clientHeight - this.$refs.cardHeader.clientHeight;
    },
    handlePickFileModel(fileModel) {
      this.$store.dispatch('filemodels/setSelectedFileModel', fileModel);
      if(this.$parent.$options.name == 'Tables') {
        this.$emit('getTableData');
      } else if (this.$parent.$options.name == 'Charts') {
        this.$emit('getChartData');
      }
    },
    customFilter (item, queryText) {
      const textOne = item.filename.split('_').join('').toLowerCase();
      const textTwo = item.id.toString().toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
  }
}
</script>

<style>
  .custom-card {
    overflow: hidden;
  }
</style>