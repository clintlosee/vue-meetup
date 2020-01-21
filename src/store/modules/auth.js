// import axios from 'axios';

export default {
  namespaced: true,

  state: {},

  getters: {},

  actions: {
    registerUser({ commit }, data) {
      console.log('data:', data);
    },

    loginWithEmailAndPassword({ commit }, data) {
      console.log('data:', data);
    },
  },

  mutations: {},
};
