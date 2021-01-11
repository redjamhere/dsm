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
    <v-list 
      dense 
      color="#424242" 
      class="overflow-y-auto" 
      :max-height="height"
      style="position: absolute; width: 100%;"
    >
      <v-subheader><h3>Категории</h3></v-subheader>
      <v-list-item-group
        v-model="selectedCategory"
        color="#55c6d3"
      >
        <v-list-item
          v-for="(category, i) in categories"
          :key="i"
          @click="handlePickCategory(category)"
        >
          <v-list-item-title>{{category.name}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'FileModelsCategoryPickerList',
  props: ['loader', 'categories'],
  data: () => ({
    autoCompleteLoading: false,
    selectedCategory: null,
    height: 0,
  }),
  created() {
    // this.autoCompleteLoading = true;
    // this.$store.dispatch('filemodels/getAllFileModels')
    //   .then(
    //     () => {
    //       this.allFileModels = this.$store.state.filemodels.fileModels
    //       this.autoCompleteLoading = false;
    //     }
    //   );
  },
  mounted () {
    this.matchCardHeight();
  },
  methods: {
    matchCardHeight() {
      this.height = this.$refs.mycard.$el.clientHeight;
    },
    handlePickCategory(category) {
      this.$store.dispatch('charts/setCategory', category);
      this.$emit('getChartData');
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