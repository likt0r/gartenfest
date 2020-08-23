<template>
  <v-container class="fill-height align-start mt-4" fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-sheet elevation="6">
          <v-tabs
            background-color="primary"
            dark
            v-model="tabs"
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
            <v-tab
              v-for="event in events"
              :key="event.id"
              :href="`#tab-${event.id}`"
            >
              {{ event.name }}
            </v-tab>
          </v-tabs>
        </v-sheet>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-card>
        <v-tabs-items v-model="tabs">
          <v-tab-item
            v-for="event in events"
            :key="event.id"
            :value="`tab-${event.id}`"
          >
            <v-card
              flat
              v-for="invitation in event.invitations"
              :key="invitation.id"
            >
              <v-card-title>{{ invitation.channel }} </v-card-title
              ><v-card-subtitle
                >Ticket: {{ ticketMap[invitation.id].length }}/{{
                  invitation.maxTickets
                }}</v-card-subtitle
              >
              <v-card-text
                ><v-data-table
                  dense
                  :headers="headers"
                  :items="ticketMap[invitation.id]"
                  :items-per-page="5"
                  :search="search"
                  class="elevation-1"
                  @click:row="openTicketDetails"
                >
                  <template v-slot:item.waitingList="{ item }">
                    <v-simple-checkbox
                      v-model="item.waitingList"
                      disabled
                    ></v-simple-checkbox>
                  </template> </v-data-table
              ></v-card-text>
              <v-card-actions>
                <v-btn
                  :href="getCSVData(ticketMap[invitation.id])"
                  :download="`${event.name}-${invitation.channel}.csv`"
                  >Download</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth', 'is-admin'],

  async asyncData({ params, $axios }) {
    const { data: events } = await $axios.get(`/events`)
    const { data: users } = await $axios.get(`/users`)

    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user
      return acc
    }, {})
    const ticketMap = events.reduce((tmpMap, event) => {
      event.tickets.forEach((ticket) => {
        // check if user still exists
        if (userMap[ticket.guest]) {
          ticket.guestInfo = userMap[ticket.guest]
          userMap[ticket.guest].hasTicket = true
          if (tmpMap[ticket.invitation]) {
            tmpMap[ticket.invitation].push(ticket)
          } else {
            tmpMap[ticket.invitation] = [ticket]
          }
        }
      })
      console.log(tmpMap)
      return tmpMap
    }, {})

    console.log('ticketMap: ', ticketMap)

    return { events, users, userMap, ticketMap }
  },

  data: () => ({
    tabs: null,
    search: '',
    headers: [
      {
        text: 'Email',
        align: 'start',
        value: 'guestInfo.email',
      },
      {
        text: 'Signed',
        align: 'start',
        value: 'signed',
      },
      { text: 'waitingList', value: 'waitingList' },
    ],
  }),

  methods: {
    openTicketDetails(event) {
      this.$router.push('/admin/ticket/' + event.id)
    },
    getCSVData(tickets) {
      console.log(tickets)
      const content = tickets
        .map((ticket) =>
          [
            ticket.guestInfo.username
              ? ticket.guestInfo.username.replace(/;/g, ',')
              : null,
            ticket.guestInfo.email,
            ticket.guestInfo.address
              ? ticket.guestInfo.address.replace(/;/g, ',')
              : null,
            ticket.guestInfo.tel
              ? ticket.guestInfo.tel.replace(/;/g, ',')
              : null,
            ,
          ].join(';')
        )
        .join('\n')
      console.log(content)
      const data = new Blob([content], { type: 'text/csv;charset=utf-8;' })
      return URL.createObjectURL(data)
    },
    addDownloadUrls() {},
  },
  mounted() {},
}
</script>
