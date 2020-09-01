<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8" md="6">
        <h3>
          Hallo, <br />
          <br />
          <p>
            leider haben wir schlechte Neuigkeiten für dich. Das Gartenfest kann
            leider <span style="color: red;">nicht stattfinden</span>, da
            Brandenburg heute neue Coronaregelen erlassen hat. <br />Diese
            untersagen private Feierlichkeiten über 75 Personen und somit ist
            das Gartenfest nicht mehr darstellbar. Wir sind alle sehr traurig
            und hoffen auf bessere Zeiten für ausgelassene und sichere Feierei.
          </p>
          <br />Euer Hngr/Paczka Team <br />
          <br />Bis hoffentlich im nächsten Jahr
        </h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    lists: [
      {
        header: 'Deine Tickets',
        noEntries: 'Du hast leider noch kein Ticket',
        tickets: [],
      },
      {
        header: 'Deine Plätze auf der Warteliste',
        noEntries: 'Du hast keinen Platz auf einer Warteliste',
        tickets: [],
      },
    ],
    data: [],
    dialog: false,
    deleteMessage: '',
    deleteOk: '',
    deleteCancel: '',
    deleteId: null,
  }),

  methods: {
    updateTickets() {
      this.lists[0].tickets = this.data.filter((ticket) => !ticket.waitingList)
      this.lists[1].tickets = this.data.filter((ticket) => ticket.waitingList)
    },
    showDeleteDialog({ id, message, cancel, ok }) {
      this.dialog = true
      this.deleteId = id
      this.deleteMessage = message
      this.deleteOk = ok
      this.deleteCancel = cancel
    },
    action(listIndex, id) {
      if (listIndex == 0) {
        this.gotoEvent(id)
      }
    },
    deleteAction(listIndex, id) {
      if (listIndex == 0) {
        this.showDeleteDialog({
          id,
          message: 'Willst du wirklich dein Ticket zurückgeben?',
          cancel: 'behalten',
          ok: 'zurückgeben,',
        })
      } else {
        this.showDeleteDialog({
          id,
          message: 'Willst du wirklich dein Listenplatz aufgeben?',
          cancel: 'behalten',
          ok: 'aufgeben,',
        })
      }
    },
    async deleteTicket() {
      try {
        await this.$axios.$delete(`/tickets/${this.deleteId}`)
      } catch (error) {
        this.$store.dispatch('snackbar/showError', error)
      }
      this.dialog = false
      this.reloadData()
    },
    async reloadData() {
      try {
        const { data: result } = await this.$axios.get(`/tickets`)
        console.log('result', result)
        this.data = result
      } catch (error) {
        this.$store.dispatch('snackbar/showError', error)
      }
    },
    gotoEvent(eventId) {
      this.$router.push(`/event/${eventId}`)
    },
  },
  mounted() {
    console.log('Auth,', this.$auth.user)
    this.updateTickets()
  },

  watch: {
    data(data) {
      this.updateTickets()
    },
  },
}
</script>
