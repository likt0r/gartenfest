export default function ({ store, redirect, $auth }) {
  // If the user is not authenticated
  if (!$auth.loggedIn) {
    return redirect('/login')
  }
}
