<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="10" class="text-center">
        <h1>
          {{ invitation.event.Name }}
        </h1>
        <h2>{{ new Date(invitation.event.Date).toLocaleDateString() }}</h2>

        <div
          v-if="invitation.description"
          v-html="toHTML(invitation.description)"
        ></div>

        <p v-if="$auth.loggedIn">
          <v-btn rounded @click="participate()">Teilnehmen</v-btn>
        </p>
        <p v-else>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-subtitle
                  >Um an diesem Event teilzunehmen musst du dich einloggen oder
                  registrieren</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="justify-center">
              <v-btn
                rounded
                nuxt
                :to="`/login?invitation=${$route.params.inviteId}`"
                >Eingloggen</v-btn
              >
              <v-btn
                rounded
                nuxt
                :to="`/register?invitation=${$route.params.inviteId}`"
                >registrieren</v-btn
              >
            </v-card-actions>
          </v-card>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
import showdown from 'showdown'
showdown.setOption('noHeaderId', 'true')
const converter = new showdown.Converter()
export default {
  data() {
    return {
      invitation: null,
    }
  },
  computed: {
    date() {
      return new Date(this.invitation.event.Date).toLocaleDateString()
    },
  },
  methods: {
    toHTML(markdown) {
      return converter.makeHtml(markdown)
    },
    async participate() {
      try {
        await this.$axios.$post('/tickets', {
          invitation: this.invitation.id,
          event: this.invitation.event.id,
        })
      } catch (error) {
        console.log(error.response)
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: error.response.data.message,
        })
      }
      this.$router.push('/')
    },
  },
  async asyncData({ params, $axios }) {
    const { data: invitation } = await $axios.get(
      `/invitations/${params.inviteId}`
    )
    console.log(invitation)
    return { invitation }
  },
}
</script>
