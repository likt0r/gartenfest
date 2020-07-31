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
  methods: {
    async loginUser(loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo,
        })
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `Thanks for signing in, ${this.$auth.user.name}`,
        })
        console.log('LoggedIn')
        this.$router.push('/user')
      } catch {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: 'There was an issue signing in.  Please try again.',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
