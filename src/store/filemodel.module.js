import FileModelService from '../services/filemodels.service';

const initialState = {
  fileModels: null,
  tableContent: null
};

export const filemodels = {
  namespaced: true,
  state: initialState,
  actions: {
    getAllFileModels({commit}) {
      return FileModelService.getAllFileModels()
        .then(
          fileModels => {
            commit('fileModelsSuccess', fileModels);
            return Promise.resolve(fileModels);
          },
          error => {
            commit('fileModelsFailure');
            return Promise.reject(error);
          }
        )
    },
    getBasePoints({commit}, fileModelId) {
      return FileModelService.getBaseBoints(fileModelId)
        .then(
          basePoints => {
            commit('basePointsSuccess', basePoints);
            return Promise.resolve(basePoints);
          },
          error => {
            commit('basePointsFailure');
            return Promise.reject(error);
          }
        )
    },
    getGrids({commit}, fileModelId) {
      return FileModelService.getGrids(fileModelId)
        .then(
          grids => {
            commit('gridsSuccess', grids);
            return Promise.resolve(grids);
          },
          error => {
            commit('gridsFailure');
            return Promise.reject(error);
          }
        )
    },
    getLevels({commit}, fileModelId) {
      return FileModelService.getLevels(fileModelId)
        .then(
          levels => {
            commit('levelsSuccess', levels);
            return Promise.resolve(levels);
          },
          error => {
            commit('levelsFailure');
            return Promise.reject(error);
          }
        )
    },
    getTypes({commit}, fileModelId) {
      return FileModelService.getTypes(fileModelId)
      .then(
        types => {
          commit('typesSuccess', types);
          return Promise.resolve(types);
        },
        error => {
          commit('typesFailure');
          return Promise.reject(error);
        }
      )
    },
    getTypesCharacteristics({commit}, fileModelId) {
      return FileModelService.getTypesCharacteristics(fileModelId)
        .then(
          typeCharacteristics => {
            commit('typeCharacteristicsSuccess', typeCharacteristics);
            return Promise.resolve(typeCharacteristics);
          },
          error => {
            commit('typeCharacteristicsFailure');
            return Promise.reject(error);
          }
        )
    },
    getFullTypesCharacteristics({commit}, fileModelId, characterId) {
      return FileModelService.getTypesCharacteristics(
        fileModelId, 
        characterId
      )
        .then(
          typesCharacteristics => {
            commit('typesCharacteristicsSuccess', typesCharacteristics);
            return Promise.resolve(typesCharacteristics);
          },
          error => {
            commit('typesCharacteristicsFailure');
            return Promise.reject(error);
          }
        )
    }
  },
  mutations: {
    fileModelsSuccess(state, fileModels) {
      state.fileModels = fileModels;
    },
    fileModelsFailure(state) {
      state.fileModels = null;
    },
    basePointsSuccess(state, tableContent) {
      state.tableContent = tableContent;
    },
    basePointsFailure(state) {
      state.tableContent = null;
    },
    gridsSuccess(state, tableContent) {
      state.tableContent = tableContent;
    },
    gridsFailure(state) {
      state.tableContent = null;
    },
    levelsSuccess(state, tableContent) {
      state.tableContent = tableContent;
    },
    levelsFailure(state) {
      state.tableContent = null;
    },
    typeCharacteristicsSuccess(state, tableContent) {
      state.tableContent = tableContent;
    },
    typeCharacteristicsFailure(state) {
      state.tableContent = null;
    },
    typesCharacteristicsSuccess(state, tableContent) {
      state.tableContent = tableContent;
    },
    typesCharacteristicsFailure(state) {
      state.tableContent = null;
    }
  }
}