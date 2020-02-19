import axios from 'axios';

export default {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    authUser(state) {
      return state.user || null;
    },

    isAuthenticated(state) {
      return !!state.user;
    },
  },

  actions: {
    registerUser({ commit }, data) {
      return axios.post('/api/v1/users/register', data);
    },

    loginWithEmailAndPassword({ commit }, data) {
      console.log('data:', data);
      return axios.post('/api/v1/users/login', data).then(res => {
        const user = res.data;
        commit('setAuthUser', user);
      });
    },
  },

  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },
  },
};
