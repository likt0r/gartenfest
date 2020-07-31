<template>
  <v-layout>
    <v-flex class="text-center">
      <div>
        <h1>Hallo Teilnehmer {{ invitationId }}</h1>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      invitationId: this.$route.params.invitationId,
    }
  },
  middleware({ store, reddirect, route }) {
    return axios.get(
      `http://localhost:1337/invitations/${route.params.invitationId}`
    )
  },
}
</script>
