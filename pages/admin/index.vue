<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Admin Dashboard</h1>
    </v-flex>
  </v-layout>
</template>
<script>
import gql from 'graphql-tag'

export default {
  middleware: ['auth'],
  components: {},
  apollo: {},
}
</script>
