<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-flex row justify-start align-baseline class="mb-8 mx-0">
          <v-btn
            v-if="$route.query.invitation"
            class="mr-3"
            fab
            dark
            floating
            small
            color="primary"
            @click="goBack"
            nuxt
          >
            <v-icon
              class="lighten-1 white--text"
              v-text="'mdi-arrow-left'"
            ></v-icon>
          </v-btn>
          <h1>{{ $t('login') }}</h1>
        </v-flex>
        <UserAuthForm class="mx-2" buttonText="Login" :submitForm="loginUser" />
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

        this.$router.push(
          `/${this.$route.query.invitation ? this.$route.query.invitation : ''}`
        )
      } catch (error) {
        console.log(error.response)
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          message: error.response
            ? typeof error.response.data.message === 'string'
              ? error.response.data.message
              : error.response.data.message[0].messages[0].message
            : error,
        })
      }
    },
    goBack() {
      this.$router.push(
        `/${this.$route.query.invitation ? this.$route.query.invitation : ''}`
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
