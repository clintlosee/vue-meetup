import axios from 'axios';

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthResolved: false,
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

    getAuthUser({ commit, getters }) {
      const { authUser } = getters;
      if (authUser) {
        return Promise.resolve(authUser);
      }

      return axios
        .get('/api/v1/users/me')
        .then(res => {
          const user = res.data;
          commit('setAuthUser', user);
          commit('setAuthState', true);
          return user;
        })
        .catch(err => {
          commit('setAuthUser', null);
          commit('setAuthState', true);
          return err;
        });
    },
  },

  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },

    setAuthState(state, authState) {
      return (state.isAuthResolved = authState);
    },
  },
};
