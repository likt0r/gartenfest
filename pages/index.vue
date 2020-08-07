<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm6 md4 ml4>
      <div class="text-center">
        <logo />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware: 'auth',
  components: {
    Logo,
    VuetifyLogo,
  },
  data() {
    return {}
  },
}
</script>
