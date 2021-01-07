const initialState = {
  selectedTable: null,
  selectedTableAction: null,
}

export const tables = {
  namespaced: true,
  state: initialState,
  actions: {
    setTableAction({commit}, tableAction) {
      commit('setTableActionSuccess', tableAction);
    },
    setSelectedTable({commit}, key) {
      commit('setSelectedTableSuccess', key);
    }
  },
  mutations: {
    setTableActionSuccess(state, tableAction) {
      state.selectedTableAction = tableAction;
    },
    setSelectedTableSuccess(state, key) {
      state.selectedTable = key;
    }
  }
}