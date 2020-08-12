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
            to="/"
            nuxt
          >
            <v-icon
              class="lighten-1 white--text"
              v-text="'mdi-arrow-left'"
            ></v-icon>
          </v-btn>
          <h1>{{ $t('yourProfile') }}</h1>
        </v-flex>
        <p>{{ $t('coronaInfo') }} {{}}</p>
        <v-form v-model="valid">
          <v-text-field
            v-model="userInfo.email"
            disabled
            label="Email"
            type="email"
            :rules="[required('email') /*emailFormat()*/]"
          />
          <v-text-field
            v-model="userInfo.username"
            label="Name"
            :rules="[required('name')]"
          />
          <v-text-field v-model="userInfo.address" label="Adresse" />
          <v-text-field type="tel" v-model="userInfo.tel" label="Telefon" />

          <v-row justify="space-between" class="align-baseline ml-0 mt-4">
            <v-btn text @click="sendResetEmail()"></v-btn>
            <v-btn @click="submitForm(userInfo)" :disabled="!valid"
              >Update</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validations from '@/utils/validations'
import UserAuthForm from '@/components/UserAuthForm'

export default {
  data: function () {
    return {
      showPassword: false,
      valid: true,
      userInfo: {},
      ...validations,
    }
  },
  middleware: ['auth'],
  methods: {
    submitForm(userInfo) {
      console.log('userinfo', userInfo)
      this.$axios.put('/profile', userInfo)
    },
  },
  beforeMount() {
    this.userInfo = {
      email: '' + this.$auth.user.email,
      username: '' + this.$auth.user.username,
      address: '' + this.$auth.user.address ? this.$auth.user.address : '',
      tel: '' + this.$auth.user.tel,
    }
  },
}
</script>

<style lang="scss" scoped></style>
