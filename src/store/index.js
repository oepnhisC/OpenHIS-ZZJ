

import Vuex from 'vuex';



const store = new Vuex.Store({
  state: {
    responseData: null,
    danJuData: null,
    fjzid : null,
    fzyzd : null,
  },
  mutations: {
    setResponseData(state, data) {
      state.responseData = data;
    },
    setDanJuData(state, data) {
      state.danJuData = data;
    },
    setDataNull(state) {
      state.responseData = [];
      state.danJuData = [];
    },
    setFjzid(state, data) {
      state.fjzid = data;
    },
    setFzyzd(state, data) {
      state.fzyzd = data;
    }
  },
  actions: {
    updateResponseData({ commit }, data) {
      commit('setResponseData', data);
    },
    updateDanJuData({ commit }, data) {
      commit('setDanJuData', data);
    },
    clearData({ commit }) {
      commit('setDataNull');
    },
    updateFjzid({ commit }, data) {
      commit('setFjzid', data);
    },
    updateFzyzd({ commit }, data) {
      commit('setFzyzd', data);
    }
  },
  getters: {
    
  }
});

export default store;
