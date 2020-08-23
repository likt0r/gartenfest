<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-flex row justify-start align-baseline class="mb-8 mx-0">
          <v-btn
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
          <h1>{{ $t('register') }}</h1>
        </v-flex>
        <p>{{ $t('coronaInfo') }}</p>
        <UserAuthForm
          buttonText="Register"
          :submitForm="registerUser"
          :register="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

//
<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm,
  },
  data: function () {
    return {
      showForm: true,
      contactInfo: {
        adresse: '',
        tel: '',
      },
    }
  },
  middleware({ store, redirect, $auth }) {
    if ($auth.loggedIn) {
      return redirect('/')
    }
  },
  methods: {
    async registerUser(registrationinfo) {
      try {
        this.showForm = false
        await this.$axios.post('/auth/local/register', registrationinfo)
        this.$store.dispatch('snackbar/setSnackbar', {
          message: this.$i18n.t('registerMessage'),
          timeout: -1,
        })
        // his.goBack()
      } catch (error) {
        this.showForm = true
        this.$store.dispatch('snackbar/showError', error)
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
