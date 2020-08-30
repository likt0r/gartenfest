<template>
  <v-app dark>
    <div v-if="$auth.loggedIn">
      <v-system-bar window dark fixed>
        <nuxt-link to="/profile">
          <v-icon class="lighten-1 white--text" v-ripple
            >mdi-account-circle-outline</v-icon
          >
        </nuxt-link>
        <nuxt-link to="/admin" v-if="isAdmin">
          <v-icon class="lighten-1 white--text" v-ripple
            >mdi-head-lightbulb-outline</v-icon
          >
        </nuxt-link>
        <nuxt-link to="/admin/users" v-if="isAdmin">
          <v-icon class="lighten-1 white--text" v-ripple>mdi-rabbit</v-icon>
        </nuxt-link>
        <v-spacer></v-spacer>
        <span @click="logout()" v-ripple class="lighten-1 primary--text"
          >Ausloggen</span
        >
      </v-system-bar>
    </div>
    <SnackBar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from '~/components/SnackBar.vue'
export default {
  components: {
    SnackBar,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.auth.user.role.type === 'admin'
    },
  },
  mounted() {},
  methods: {
    async logout() {
      this.$auth.logout()
      this.$router.go()
    },
  },
}
</script>
