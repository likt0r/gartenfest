<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-flex row justify-start align-baseline class="mb-8 mx-0">
          <v-btn
            class="mr-3"
            fab
            dark
            floating
            small
            color="primary"
            to="/"
            nuxt
          >
            <v-icon
              class="lighten-1 white--text"
              v-text="'mdi-arrow-left'"
            ></v-icon>
          </v-btn>

          <div>
            <h1>{{ event.name }}</h1>
            <h3>
              von {{ new Date(event.startDate).toLocaleDateString() }} bis
              {{ new Date(event.endDate).toLocaleDateString() }}
            </h3>
          </div>
        </v-flex>

        <div
          v-if="event.description"
          class="mb-2"
          v-html="toHTML(event.description)"
        ></div>
        <div v-if="event.directions" v-html="toHTML(event.directions)"></div>
        <div class="mb-2" v-if="location.view">
          <leaflet :options="location" :markers="markers"></leaflet>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Leaflet from 'easy-vue-leaflet'
import axios from 'axios'
import showdown from 'showdown'
showdown.setOption('noHeaderId', 'true')
const converter = new showdown.Converter()
export default {
  middleware: 'auth',
  components: {
    Leaflet,
  },
  data() {
    return {
      invitation: null,
    }
  },

  methods: {
    toHTML(markdown) {
      return converter.makeHtml(markdown)
    },
  },
  async asyncData({ params, $axios }) {
    const { data: event } = await $axios.get(`/events/${params.eventId}`)
    console.log(event)
    return {
      event,
      location: { view: event.location },
      markers: [{ position: event.location }],
    }
  },
}
</script>
<style scoped>
@import url('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css');
#leaflet {
  width: 100%;
  height: 220px !important;
}
</style>
