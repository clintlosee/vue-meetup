import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetups: [],
    categories: [],
    threads: [],
    meetup: {},
  },
  getters: {},
  actions: {
    fetchMeetups({ state, commit }) {
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data;
        commit('setMeetups', meetups);
        return state.meetups;
      });
    },

    fetchMeetupById({ state, commit }, id) {
      axios.get(`/api/v1/meetups/${id}`).then(res => {
        const meetup = res.data;
        commit('setMeetup', meetup);
        return state.meetup;
      });
    },

    fetchCategories({ state, commit }) {
      axios.get('/api/v1/categories').then(res => {
        const categories = res.data;
        commit('setCategories', categories);
        return state.categories;
      });
    },

    fetchThreads({ state, commit }, id) {
      axios.get(`/api/v1/threads?meetupId=${id}`).then(res => {
        const threads = res.data;
        commit('setThreads', threads);
        return state.threads;
      });
    },
  },
  mutations: {
    setMeetups(state, meetups) {
      state.meetups = meetups;
    },

    setMeetup(state, meetup) {
      state.meetup = meetup;
    },

    setCategories(state, categories) {
      state.categories = categories;
    },

    setThreads(state, threads) {
      state.threads = threads;
    },
  },
});
