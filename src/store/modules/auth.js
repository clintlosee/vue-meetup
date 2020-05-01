import axios from 'axios';
import jwt from 'jsonwebtoken';
import axiosInstance from '@/services/axios';
import { rejectError } from '@/helpers';

function checkTokenValidity(token) {
  if (!token) return false;

  const decodedToken = jwt.decode(token);
  return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
}

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
      return axios.post('/api/v1/users/register', data).catch(err => rejectError(err));
    },

    loginWithEmailAndPassword({ commit }, data) {
      return axios
        .post('/api/v1/users/login', data)
        .then(res => {
          const user = res.data;
          localStorage.setItem('meetuper-jwt', user.token);
          commit('setAuthUser', user);
        })
        .catch(err => rejectError(err));
    },

    logout({ commit }) {
      //* For session auth only
      // return axios
      //   .post('/api/v1/users/logout')
      //   .then(() => {
      //     commit('setAuthUser', null);
      //     return true;
      //   })
      //   .catch(err => err);

      return new Promise(resolve => {
        localStorage.removeItem('meetuper-jwt');
        commit('setAuthUser', null);
        resolve(true);
      });
    },

    getAuthUser({ commit, getters }) {
      const { authUser } = getters;
      const token = localStorage.getItem('meetuper-jwt');
      const isTokenValid = checkTokenValidity(token);

      if (authUser && isTokenValid) {
        return Promise.resolve(authUser);
      }

      const config = {
        headers: {
          'Cache-Control': 'no-cache',
          // authorization: `Bearer ${token}`,
        },
      };

      return axiosInstance
        .get('/api/v1/users/me', config)
        .then(res => {
          const user = res.data;
          localStorage.setItem('meetuper-jwt', user.token);
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
