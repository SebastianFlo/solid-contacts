import Vue from 'vue';
import Vuex from 'vuex';
import { SET_SESSION, SET_USER, UPDATE_USER } from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    user: null
  },
  mutations: {
    [SET_SESSION] (state, payload) {
        state.session = payload.session;
    },
    [SET_USER] (state, payload) {
        state.user = payload.user;
    },
    [UPDATE_USER] (state, payload) {
        state.user = {
            ...state.user,
            ...payload.user
        };
    }
  },
  getters: {
    loggedIn: state => {
      return !!state.session;
    },
    session: state => {
      return state.session;
    },
    user: state => {
      return state.user;
    }
  }
})
