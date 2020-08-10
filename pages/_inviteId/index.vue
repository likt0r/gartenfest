<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1>{{ invitation.event.name }}</h1>
        <h3>
          von
          {{ new Date(invitation.event.startDate).toLocaleDateString() }} bis
          {{ new Date(invitation.event.endDate).toLocaleDateString() }}
        </h3>
        <v-img
          v-if="invitation.event.image"
          :aspect-ratio="16 / 9"
          :src="
            getImageUrl(invitation.event.image.url, $axios.defaults.baseURL)
          "
          class="mb-4 mt-2"
        >
        </v-img>

        <div
          class="mb-4"
          v-if="invitation.description"
          v-html="toHTML(invitation.description)"
        ></div>
        <v-btn
          color="primary darken-1"
          @click="participate()"
          v-if="$auth.loggedIn"
        >
          Teilnehmen
        </v-btn>

        <p v-else>
          <v-card class="mx-auto mt-8" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-subtitle>
                  Um an diesem Event teilzunehmen musst du dich einloggen oder
                  registrieren
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="justify-center">
              <v-btn
                color="primary darken-1"
                nuxt
                :to="`/login?invitation=${$route.params.inviteId}`"
                >Eingloggen</v-btn
              >
              <v-btn
                color="primary darken-1"
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
import Vue from 'vue'
import axios from 'axios'
import showdown from 'showdown'
showdown.setOption('noHeaderId', 'true')
const converter = new showdown.Converter()
export default {
  data() {
    return {
      invitation: {},
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
    getImageUrl(path, host) {
      return new URL(path, host).href
    },
    async participate() {
      try {
        await this.$axios.$post('/tickets', {
          invitation: this.invitation.id,
          event: this.invitation.event.id,
        })
      } catch (error) {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: error.response.data.message,
        })
      }
      this.$router.push('/')
    },
  },
  async asyncData({ params, $axios, redirect, store }) {
    try {
      const { data: invitation } = await $axios.get(
        `/invitations/${params.inviteId}`
      )
      return { invitation }
    } catch (error) {
      setTimeout(() => {
        store.dispatch('snackbar/showError', error), redirect('/')
      }, 0)
      return { invitation: null }
    }
  },
}
</script>
