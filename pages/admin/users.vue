<template>
  <v-container class="fill-height align-start mt-4" fluid>
    <v-row justify="center">
      <v-col cols="12">
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

        <v-card flat>
          <v-card-title>Users without Ticket</v-card-title
          ><v-card-subtitle
            >Users: {{ userWithoutTickets.length }}/{{
              users.length
            }}</v-card-subtitle
          >
          <v-card-text
            ><v-data-table
              dense
              :headers="headers"
              :items="userWithoutTickets"
              :items-per-page="20"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:item.confirmed="{ item }">
                <v-simple-checkbox
                  v-model="item.confirmed"
                  disabled
                ></v-simple-checkbox>
              </template> </v-data-table
          ></v-card-text>
          <v-card-actions>
            <v-btn
              :href="getCSVData(userWithoutTickets)"
              :download="`users-without-ticket.csv`"
              >Download</v-btn
            >
          </v-card-actions>
        </v-card>
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

    events.forEach((event) => {
      event.tickets.forEach((ticket) => {
        // check if user still exists

        if (userMap[ticket.guest]) {
          console.log(userMap[ticket.guest].id + ' has ticket')
          userMap[ticket.guest].hasTicket = true
        }
      })
    })

    return {
      users,
      userMap,
      userWithoutTickets: users.filter((user) => !user.hasTicket),
    }
  },

  data: () => ({
    search: '',
    headers: [
      {
        text: 'Email',
        align: 'start',
        value: 'email',
      },
      {
        text: 'Confimed',
        align: 'start',
        value: 'confirmed',
      },
    ],
  }),

  methods: {
    openTicketDetails(event) {
      this.$router.push('/admin/ticket/' + event.id)
    },
    getCSVData(users) {
      console.log(users)
      const content = users
        .map((user) =>
          [
            user.username ? user.username.replace(/;/g, ',') : null,
            user.email,
            user.address ? user.address.replace(/;/g, ',') : null,
            user.tel ? user.tel.replace(/;/g, ',') : null,
            ,
          ].join(';')
        )
        .join('\n')
      const data = new Blob([content], { type: 'text/csv;charset=utf-8;' })
      return URL.createObjectURL(data)
    },
    addDownloadUrls() {},
  },
  mounted() {},
}
</script>
