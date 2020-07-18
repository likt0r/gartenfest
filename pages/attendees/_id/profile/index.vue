<template>
  <v-layout>
    <v-flex class="text-center">
      <div v-if="typeof character !== 'undefined'">
        <h1>Hallo Teilnehmer {{ character.name }}</h1>
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
        query getCharacter($id: ID) {
          character(id: $id) {
            id
            name
            gender
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
