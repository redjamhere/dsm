const initialState = {selectedTableAction: null}

export const tables = {
  namespaced: true,
  state: initialState,
  actions: {
    selectTable({commit}, tableAction) {
      commit('selectedSuccess', tableAction);
    }
  },
  mutations: {
    selectedSuccess(state, tableAction) {
      state.selectedTableAction = tableAction;
    }
  }
}