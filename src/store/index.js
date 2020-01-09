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
      commit('setItems', { resource: 'meetups', items: [] });
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data;
        commit('setItems', { resource: 'meetups', items: meetups });
        return state.meetups;
      });
    },

    fetchMeetupById({ state, commit }, id) {
      commit('setItem', { resource: 'meetup', item: {} });
      axios.get(`/api/v1/meetups/${id}`).then(res => {
        const meetup = res.data;
        commit('setItem', { resource: 'meetup', item: meetup });
        return state.meetup;
      });
    },

    fetchCategories({ state, commit }) {
      axios.get('/api/v1/categories').then(res => {
        const categories = res.data;
        commit('setItems', { resource: 'categories', items: categories });
        return state.categories;
      });
    },

    fetchThreads({ state, commit }, id) {
      commit('setItems', { resource: 'threads', items: [] });
      axios.get(`/api/v1/threads?meetupId=${id}`).then(res => {
        const threads = res.data;
        commit('setItems', { resource: 'threads', items: threads });
        return state.threads;
      });
    },
  },
  mutations: {
    setItems(state, { resource, items }) {
      state[resource] = items;
    },

    setItem(state, { resource, item }) {
      state[resource] = item;
    },
  },
});
