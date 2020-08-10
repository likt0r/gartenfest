<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8" md="6">
        <h3>Hi {{ $auth.user.username }}</h3>
        <div>{{ $t('welcomeText') }}</div>
        <v-flex row justify-end>
          <v-btn
            class="mx-1"
            fab
            dark
            floating
            small
            color="primary"
            @click="reloadData()"
          >
            <v-icon
              class="lighten-1 white--text"
              v-text="'mdi-reload'"
            ></v-icon>
          </v-btn>
        </v-flex>
        <v-list
          class="mt-3"
          two-line
          v-for="(list, listIndex) in lists"
          :key="listIndex"
        >
          <v-subheader class="lighten-1 white--text">
            {{ list.header }}
            <span class="mx-1 lighten-1 primary--text"
              >({{ list.tickets.length }})</span
            >
          </v-subheader>
          <v-divider :key="listIndex + 'b'"></v-divider>
          <v-list-item v-if="list.tickets.length == 0">
            <v-list-item-content>
              <v-list-item-subtitle v-text="list.noEntries" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item-group multiple active-class="secondary--text">
            <template v-for="(item, itemIndex) in list.tickets">
              <v-list-item
                :key="item.id"
                @click.stop="action(listIndex, item.event.id)"
              >
                <v-list-item-avatar>
                  <v-icon
                    v-if="listIndex == 0"
                    class="lighten-1 white--text"
                    v-text="'mdi-information'"
                  ></v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.event.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="
                      `von ${new Date(
                        item.event.startDate
                      ).toLocaleDateString()} bis ${new Date(
                        item.event.endDate
                      ).toLocaleDateString()}`
                    "
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action
                  @click.stop="deleteAction(listIndex, item.id)"
                >
                  <v-btn icon>
                    <v-icon color=" lighten-1">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider :key="itemIndex"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ deleteMessage }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary darken-1" text @click="dialog = false">{{
            deleteCancel
          }}</v-btn>
          <v-btn color="primary darken-1" text @click="deleteTicket()">{{
            deleteOk
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  async asyncData({ params, $axios }) {
    const { data } = await $axios.get(`/tickets`)
    return { data }
  },

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
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          message: error.response.data.message,
        })
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
        this.$store.dispatch('snackbar/setSnackbar', {
          message: 'red',
          text: error.response.data.message,
        })
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
