<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          All Attendees
        </v-card-title>
        <v-card-text>
          <ul v-if="!$apollo.queries.characters.loading">
            <li
              v-for="character in characters.results"
              :key="character.id"
              @click="characterId = character.id"
            >
              <nuxtLink :to="`/attendees/${character.id}/profile`">
                {{ character.name }}
              </nuxtLink>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import gql from 'graphql-tag'

export default {
  components: {},
  apollo: {
    characters: gql`
      query getCharacters {
        characters {
          results {
            id
            name
          }
        }
      }
    `,
  },
}
</script>
