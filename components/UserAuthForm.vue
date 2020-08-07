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
      :rules="[required('password'), minLength('password', 2)]"
    />

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{
      buttonText
    }}</v-btn>
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
      ...validations,
    }
  },
  props: {
    submitForm: Function,
    buttonText: String,
    register: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped></style>
