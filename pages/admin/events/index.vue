<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md10>
      <v-data-table
        :headers="headers"
        :items="$apollo.queries.events.loading ? [] : events"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import gql from 'graphql-tag'

export default {
  components: {},
  apollo: {
    events: gql`
      query getEvents {
        events {
          Name
          id
          Date
        }
      }
    `,
  },
  data() {
    return {
      headers: [
        {
          text: 'Name)',
          align: 'start',
          sortable: true,
          value: 'name',
        },

        { text: 'date', value: 'date' },
      ],
    }
  },
}
</script>
<style scoped></style>
