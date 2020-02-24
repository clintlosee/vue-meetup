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
      return axios.post('/api/v1/users/login', data).then(res => {
        const user = res.data;
        commit('setAuthUser', user);
      });
    },

    logout({ commit }) {
      return axios
        .post('/api/v1/users/logout')
        .then(() => {
          commit('setAuthUser', null);
          return true;
        })
        .catch(err => err);
    },

    getAuthUser({ commit }) {
      return axios
        .get('/api/v1/users/me')
        .then(res => {
          const user = res.data;
          commit('setAuthUser', user);
          return user;
        })
        .catch(err => {
          commit('setAuthUser', null);
          return err;
        });
    },
  },

  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },
  },
};
