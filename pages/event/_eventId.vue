<template>
  <v-container class="fill-height" align-start>
    <v-btn
      class="mx-1 mt-8"
      fixed
      fab
      top
      dark
      floating
      small
      color="primary"
      to="/"
      nuxt
    >
      <v-icon class="lighten-1 white--text" v-text="'mdi-arrow-left'"></v-icon
    ></v-btn>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" class="text-center">
        <h1>
          {{ event.name }}
        </h1>
        <h3>
          von {{ new Date(event.startDate).toLocaleDateString() }} bis
          {{ new Date(event.endDate).toLocaleDateString() }}
        </h3>

        <div v-if="event.description" v-html="toHTML(event.description)"></div>
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
  },
  async asyncData({ params, $axios }) {
    const { data: event } = await $axios.get(`/events/${params.eventId}`)
    console.log(event)
    return { event }
  },
}
</script>
