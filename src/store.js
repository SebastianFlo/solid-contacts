import Vue from 'vue'
import Vuex from 'vuex'
import { SET_SESSION } from './data/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    user: null
  },
  mutations: {
    [SET_SESSION] (state, payload) {
        // mutate state
        state.session = payload.session;
    }
  },
  actions: {

  },
  getters: {
    loggedIn: state => {
      return !!state.session;
    },
    user: state => {
      return state.user;
    }
  }
})
