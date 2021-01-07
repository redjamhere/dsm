<template>
  <v-card dark color="#424242" class="custom-card overflow-y-auto mx-auto" :loading="loader" >
    <template slot="progress">
      <v-progress-linear color="#55c6d3" indeterminate></v-progress-linear>
    </template>
    <v-list dense color="#424242" max-height="0">
      <v-list-group
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
          >
            <v-list-item-content>
              <v-list-item-title v-text="filemodel.filename"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
      <v-list-group
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
    selectedFileModel: null
  }),
  computed: {},
  methods: {}
}
</script>

<style>
  .custom-card {
    height: 100%;
  }
</style>