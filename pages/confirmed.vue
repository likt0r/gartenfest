<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <h3>{{ $t('confirmed') }}</h3>
        <p>{{ $t('confirmedMessage') }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validations from '@/utils/validations'
import UserAuthForm from '@/components/UserAuthForm'

export default {

 
}
</script>

<style lang="scss" scoped></style>
