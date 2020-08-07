<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm
      buttonText="Register"
      :submitForm="registerUser"
      :register="true"
    />
  </v-container>
</template>

//
<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm,
  },
  middleware({ store, redirect, $auth }) {
    if ($auth.loggedIn) {
      return redirect('/')
    }
  },
  methods: {
    async registerUser(registrationinfo) {
      try {
        await this.$axios.post('/auth/local/register', registrationinfo)
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `Thanks for registrating in, ${this.$auth.user}`,
        })
        this.$router.push(
          `/${this.$route.query.invitation ? this.$route.query.invitation : ''}`
        )
      } catch (error) {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          message:
            typeof error.response.data.message === 'string'
              ? error.response.data.message
              : error.response.data.message[0].messages[0].message,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
