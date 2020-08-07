<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <UserAuthForm buttonText="Login" :submitForm="loginUser" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm,
  },
  middleware({ store, redirect, $auth }) {
    // If the user is not authenticated
    if ($auth.loggedIn) {
      return redirect('/')
    }
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        loginInfo.identifier = loginInfo.email
        delete loginInfo.email
        await this.$auth.loginWith('local', { data: loginInfo })
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `Thanks for signing in, ${this.$auth.user.username}`,
        })

        this.$router.push(
          `/${this.$route.query.invitation ? this.$route.query.invitation : ''}`
        )
      } catch (error) {
        console.log(error.message)
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: error.message,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
