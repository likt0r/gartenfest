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
  showError({ commit }, error) {
    console.log('Show error')
    if (error.response.status === 404) {
      commit('SET_SNACK', {
        color: 'red',
        message: 'Diese Seite konnte nicht gefunden werden',
      })
    } else
      commit('SET_SNACK', {
        color: 'red',
        message: error.response
          ? typeof error.response.data.message === 'string'
            ? error.response.data.message
            : error.response.data.message[0].messages[0].message
          : error,
      })
  },
}
