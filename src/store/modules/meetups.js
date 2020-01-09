import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
  },

  getters: {
    meetups: state => state.meetups,
  },

  actions: {
    fetchMeetups({ state, commit }) {
      commit('setItems', { resource: 'meetups', items: [] }, { root: true });
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data;
        commit('setItems', { resource: 'meetups', items: meetups }, { root: true });
        return state.meetups;
      });
    },

    fetchMeetupById({ state, commit }, id) {
      commit('setItem', { resource: 'meetups', item: {} }, { root: true });
      axios.get(`/api/v1/meetups/${id}`).then(res => {
        const meetup = res.data;
        commit('setItem', { resource: 'meetups', item: meetup }, { root: true });
        return state.meetup;
      });
    },
  },

  mutations: {},
};
