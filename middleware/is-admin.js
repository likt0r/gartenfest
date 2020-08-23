export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (
    !store.state.auth.loggedIn ||
    store.state.auth.user.role.type !== 'admin'
  ) {
    store.dispatch('snackbar/showError', new Error('Access denied'))
    return redirect('/')
  }
}
