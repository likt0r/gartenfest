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
  setSnackbar({ commit }, { message, color, timeout }) {
    const snack = {
      message,
      color: color || 'success',
      timeout: timeout,
    }
    commit('SET_SNACK', snack)
  },
  showError({ commit }, error) {
    console.log('Show error')
    if (error.response && error.response.status === 404) {
      commit('SET_SNACK', {
        color: 'red',
        message: 'Diese Seite konnte nicht gefunden werden',
      })
    } else {
      let message
      if (error.response) {
        if (typeof error.response.data.message === 'string') {
          message = error.response.data.message
        } else if (Array.isArray(error.response.data.message)) {
          message = error.response.data.message[0].messages[0].message
        } else {
          message = error.response.data.message.error
        }
      } else {
        message = error.message ? error.message : TypeError
      }

      commit('SET_SNACK', {
        color: 'red',
        message,
      })
    }
  },
}
