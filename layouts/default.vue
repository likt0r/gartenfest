<template>
  <v-app dark>
    <div v-if="$auth.loggedIn">
      <v-system-bar window dark>
        <v-spacer></v-spacer>
        <span @click="logout()" v-ripple>Ausloggen</span>
      </v-system-bar>
    </div>
    <TheSnackbar />
    <SnackBar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TheSnackbar from '@/components/TheSnackbar'
import SnackBar from '~/components/SnackBar.vue'
export default {
  components: {
    TheSnackbar,
    SnackBar,
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
