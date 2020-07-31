import shortid from 'shortid'

export const state = () => ({
  snackbars: [],
})

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = [snackbar]
  },
  DELETE_SNACKBAR(state, id) {
    state.snackbars = state.snackbars.filter((snackbar) => snackbar.id !== id)
  },
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true
    snackbar.id = shortid.generate()
    snackbar.color = snackbar.color || 'success'
    commit('SET_SNACKBAR', snackbar)
  },
  deleteSnackbar({ commit }, id) {
    commit('DELETE_SNACKBAR', id)
  },
}
