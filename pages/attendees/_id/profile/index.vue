<template>
  <v-layout>
    <v-flex class="text-center">
      <div v-if="!$apollo.queries.character.loading">
        <h1>Hallo Teilnehmer {{ character.email }}</h1>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      characterId: this.$route.params.id,
    }
  },
  validate({ params }) {
    // must be a Nnumer
    return /^\d+$/.test(params.id)
  },
  apollo: {
    character: {
      query: gql`
        query getAttendee($id: ID) {
          attendee(id: $id) {
            id
            email
          }
        }
      `,
      variables() {
        return {
          id: this.characterId,
        }
      },
    },
  },
}
</script>
