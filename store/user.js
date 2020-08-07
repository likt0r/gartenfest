import shortid from 'shortid'

export const state = () => ({
  loggedIn: false,
  data: null,
})

export const mutations = {
  SET_LOGGED_IN(state, loggedIn) {
    state.loggedIn = loggedIn
  },
  SET_DATA(state, data) {
    state.data = data
  },
}

export const actions = {
  login({ commit }, user) {
    commit('SET_DATA', user)
    commit('SET_LOGGED_IN', true)
  },
  logout({ commit }) {
    commit('SET_DATA', null)
    commit('SET_LOGGED_IN', false)
  },
}
