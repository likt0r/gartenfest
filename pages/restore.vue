<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        Wir senden dir eine Email mit einem Passwordreset-Link zu.
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
  middleware({ store, redirect, $strapi }) {
    // If the user is not authenticated
    if ($strapi.user) {
      return redirect('/')
    }
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        loginInfo.identifier = loginInfo.email
        await this.$strapi.login(loginInfo)
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `Thanks for signing in, ${this.$strapi.user.username}`,
        })
        this.$store.dispatch('user/login', this.$strapi.user)

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
