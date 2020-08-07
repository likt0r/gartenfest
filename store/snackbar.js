import shortid from 'shortid'

export const state = () => ({
  snackbars: [],
  snack: null,
})

export const mutations = {
  SET_SNACK(state, snack) {
    state.snack = snack
  },
}

export const actions = {
  setSnackbar({ commit }, { message, color }) {
    const snack = {
      message,
      color: color || 'success',
    }
    commit('SET_SNACK', snack)
  },
}
