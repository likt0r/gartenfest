<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.username"
      label="Name"
      :rules="[required('name')]"
      v-if="register"
    />

    <v-text-field
      v-model="userInfo.email"
      label="Email"
      :rules="[required('email') /*emailFormat()*/]"
    />

    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      counter="true"
      :rules="[required('password'), minLength('password', 8)]"
    />
    <v-row justify="space-between" class="align-baseline ml-0 mt-4">
      <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{
        buttonText
      }}</v-btn>
      <v-btn text v-if="!register" @click="resetDialog = true">
        <span class="text-caption">
          Password vergessen?
        </span>
      </v-btn>
    </v-row>
    <v-dialog v-model="resetDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"
          >Du hast dein Passwort vergessen?
        </v-card-title>

        <v-card-text>
          Wenn ja du willst schicken shicken wir dir eine Email mit der dein
          Passwort neu setzen kannst.
          <v-text-field
            v-model="resetEmail"
            label="Email"
            :rules="[required('email') /*emailFormat()*/]"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="resetDialog = false">
            Nein danke
          </v-btn>

          <v-btn color="green darken-1" text @click="sendResetEmail()">
            Email senden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import validations from '@/utils/validations'
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        identifier: '',
        password: '',
      },
      resetEmail: '',
      resetDialog: false,
      ...validations,
    }
  },
  props: {
    submitForm: Function,
    buttonText: String,
    register: { type: Boolean, default: false },
  },
  methods: {
    sendResetEmail() {
      this.$axios.post('/auth/forgot-password', {
        email: this.resetEmail,
      })
      this.resetDialog = false
    },
  },
  watch: {
    resetDialog() {
      this.resetEmail = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
