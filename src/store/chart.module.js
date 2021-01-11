import ChartsService from '../services/charts.service';

const initialState = {
  categories: null,
  agregateElements: {},
  separateElements: {},
  selectedCategory: null,
  selectedChart: null,
}

export const charts = {
  namespaced: true,
  state: initialState,
  actions: {
    setCategory({commit}, category) {
      commit('setCategorySuccess', category);
    },
    setChart({commit}, chart) {
      commit('setChartSuccess', chart);
    },
    getQuantityElementsCategories({commit}, projectId = '') {
      return ChartsService.getQuantityElementsCategories(projectId)
        .then(
          categories => {
            commit('quantityCategoriesSuccess', categories);
            return Promise.resolve(categories);
          },
          error => {
            commit('quantityCategoriesFailure');
            return Promise.reject(error);
          }
        )
    },
    getQuantityElementsAggregate({commit}, model) {
      return ChartsService.getQuantityElementsAggregate(model)
        .then(
          elements => {
            commit('quantityAggregateElementsSuccess', elements);
            return Promise.resolve(elements);
          },
          error => {
            commit('quantityAggregateElementsFailure');
            return Promise.reject(error);
          }
        )
    },
    getQuantityElementsSeparate({commit}, model) {
      return ChartsService.getQuantityElementsSeparate(model)
        .then(
          elements => {
            commit('quantitySeparateElementsSuccess', elements);
            return Promise.resolve(elements);
          },
          error => {
            commit('quantitySeparateElementsFailure');
            return Promise.reject(error);
          }
        )
    },
    // -----------------------------------------------------------------
    getAreaElementsCategories({commit}, projectId = '') {
      return ChartsService.getAreaElementsCategories(projectId)
        .then(
          categories => {
            commit('areaCategoriesSuccess', categories);
            return Promise.resolve(categories);
          },
          error => {
            commit('areaCategoriesFailure');
            return Promise.reject(error);
          }
        )
    },
    getAreaElementsAggregate({commit}, model) {
      return ChartsService.getAreaElementsAggregate(model)
        .then(
          elements => {
            commit('areaAggregateElementsSuccess', elements);
            return Promise.resolve(elements);
          },
          error => {
            commit('areaAggregateElementsFailure');
            return Promise.reject(error);
          }
        )
    },
    getAreaElementsSeparate({commit}, model) {
      return ChartsService.getAreaElementsSeparate(model)
        .then(
          elements => {
            commit('areaSeparateElementsSuccess', elements);
            return Promise.resolve(elements);
          },
          error => {
            commit('areaSeparateElementsFailure');
            return Promise.reject(error);
          }
        )
    },
    // -----------------------------------------------------------------
    getVolumeElementsCategories({commit}, projectId = '') {
      return ChartsService.getVolumeElementsCategories(projectId)
        .then(
          categories => {
            commit('volumeCategoriesSuccess', categories);
            return Promise.resolve(categories);
          },
          error => {
            commit('volumeCategoriesFailure');
            return Promise.reject(error);
          }
        )
    },
    getVolumeElementsAggregate({commit}, model) {
      return ChartsService.getVolumeElementsAggregate(model)
        .then(
          elements => {
            commit('volumeAggregateElementsSuccess', elements);
            return Promise.resolve(elements);
          },
          error => {
            commit('volumeAggregateElementsFailure');
            return Promise.reject(error);
          }
        )
    },
    getVolumeElementsSeparate({commit}, model) {
      return ChartsService.getVolumeElementsSeparate(model)
        .then(
          elements => {
            commit('volumeSeparateElementsSuccess', elements);
            return Promise.resolve(elements);
          },
          error => {
            commit('volumeSeparateElementsFailure');
            return Promise.reject(error);
          }
        )
    }
  },
  mutations: {
    setCategorySuccess(state, category) {
      state.selectedCategory = category;
    },
    setChartSuccess(state, chart) {
      state.selectedChart = chart;
    },
    quantityCategoriesSuccess(state, categories) {
      state.categories = categories;
    },
    quantityCategoriesFailure(state) {
      state.categories = null;
    },
    quantityAggregateElementsSuccess(state, elements) {
      state.agregateElements = elements;
    },
    quantityAggregateElementsFailure(state) {
      state.agregateElements = null;
    },
    quantitySeparateElementsSuccess(state, elements) {
      state.separateElements = elements;
    },
    quantitySeparateElementsFailure(state) {
      state.separateElements = null;
    },
    // ------------------------------------------
    areaCategoriesSuccess(state, categories) {
      state.categories = categories;
    },
    areaCategoriesFailure(state) {
      state.categories = null;
    },
    areaAggregateElementsSuccess(state, elements) {
      state.agregateElements = elements;
    },
    areaAggregateElementsFailure(state) {
      state.agregateElements = null;
    },
    areaSeparateElementsSuccess(state, elements) {
      state.separateElements = elements;
    },
    areaSeparateElementsFailure(state) {
      state.separateElements = null;
    },
    // ------------------------------------------
    volumeCategoriesSuccess(state, categories) {
      state.categories = categories;
    },
    volumeCategoriesFailure(state) {
      state.categories = null;
    },
    volumeAggregateElementsSuccess(state, elements) {
      state.agregateElements = elements;
    },
    volumeAggregateElementsFailure(state) {
      state.agregateElements = null;
    },
    volumeSeparateElementsSuccess(state, elements) {
      state.separateElements = elements;
    },
    volumeSeparateElementsFailure(state) {
      state.separateElements = null;
    }
  }
}