<template>
  <v-app dark>
    <div v-if="$auth.loggedIn">
      <v-system-bar window dark>
        <v-spacer></v-spacer>
        <span @click="logout()" v-ripple>Ausloggen</span>
      </v-system-bar>
    </div>
    <v-main>
      <nuxt />
    </v-main>

    <TheSnackbar />
  </v-app>
</template>

<script>
import TheSnackbar from '@/components/TheSnackbar'

export default {
  components: {
    TheSnackbar,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mid-format-list-bulleted',
          title: 'Events',
          to: '/admin/events',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {},
  mounted() {},
  methods: {
    async logout() {
      this.$auth.logout()
      this.$router.go()
    },
  },
}
</script>
