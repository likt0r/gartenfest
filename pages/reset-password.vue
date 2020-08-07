<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h3 class="mb-8">Denk dir ein neues Passwort aus.</h3>
        <v-form v-model="valid">
          <v-text-field
            v-model="password"
            label="Passwort"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            counter="true"
            :rules="[required('password'), minLength('password', 8)]"
          />
          <v-text-field
            v-model="passwordConfirmation"
            label="Wiederhole Passwort"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            counter="true"
            :rules="[required('password'), minLength('password', 8)]"
          />
          <v-row justify="space-between" class="align-baseline ml-0 mt-4">
            <v-btn
              @click="resetPassword()"
              :disabled="
                !(password.length >= 8 && password === passwordConfirmation)
              "
              >Password setzen</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validations from '@/utils/validations'

export default {
  data() {
    return {
      valid: false,
      showPassword: false,

      passwordConfirmation: '',
      password: '',

      resetEmail: '',
      resetDialog: false,

      ...validations,
    }
  },
  middleware({ store, redirect, $auth }) {
    // If the user is not authenticated
    if ($auth.loggedIn) {
      return redirect('/')
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.$axios.post('/auth/reset-password', {
          code: this.$route.query.code,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        })
      } catch (error) {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          message:
            typeof error.response.data.message === 'string'
              ? error.response.data.message
              : error.response.data.message[0].messages[0].message,
        })
      }
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
