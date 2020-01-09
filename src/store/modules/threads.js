import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
  },

  getters: {
    threads: state => state.threads,
  },

  actions: {
    fetchThreads({ state, commit }, id) {
      commit('setItems', { resource: 'threads', items: [] }, { root: true });
      return axios.get(`/api/v1/threads?meetupId=${id}`).then(res => {
        const threads = res.data;
        commit('setItems', { resource: 'threads', items: threads }, { root: true });
        return state.items;
      });
    },
  },

  mutations: {},
};
