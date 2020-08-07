<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in snackbars"
      :key="snackbar.id"
      :timeout="snackbar.timeout"
      v-model="getModel().showing"
      :color="snackbar.color"
      :style="`top: ${index * 60 + 8}px`"
    >
      {{ snackbar.text }}

      <v-btn
        text
        @click="$store.dispatch('snackbar/deleteSnackbar', snackbar.id)"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      snackbars: (state) => state.snackbar.snackbars,
    }),
  },
  methods: {
    getModel(id) {
      return {
        showing: {
          get() {
            return true
          },
          set(value) {
            if (!value)
              this.$store.dispatch('snackbar/deleteSnackbar', snackbar.id)
          },
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
