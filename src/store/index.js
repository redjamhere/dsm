import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import { projects } from './project.module';
import { filemodels } from './filemodel.module';
import { tables } from './table.module';
import { charts } from './chart.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    projects,
    filemodels,
    tables,
    charts
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
