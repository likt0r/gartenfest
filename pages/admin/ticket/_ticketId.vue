<template>
  <v-container class="fill-height align-start mt-4" fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-flex row justify-start align-baseline class="mb-8 mx-0">
          <v-btn
            class="mr-3"
            fab
            dark
            floating
            small
            color="primary"
            to="/admin"
            nuxt
          >
            <v-icon
              class="lighten-1 white--text"
              v-text="'mdi-arrow-left'"
            ></v-icon>
          </v-btn>
        </v-flex>
        <v-card flat>
          <v-card-title>Ticket für {{ ticket.event.name }} </v-card-title
          ><v-card-subtitle>erhalten am {{ ticket.signed }}</v-card-subtitle>
          <v-card-text
            ><v-form ref="form" v-model="valid">
              <v-text-field
                v-model="ticket.guest.username"
                label="Name"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="ticket.guest.address"
                label="Adresse"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="ticket.guest.email"
                label="Email"
                disabled
              ></v-text-field>
              <v-select
                v-model="ticket.invitation"
                :items="
                  invitations.map((invitation) => {
                    return {
                      text: invitation.channel,
                      value: invitation.id,
                    }
                  })
                "
                :rules="[(v) => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>

              <v-checkbox
                v-model="ticket.waitingList"
                label="On waiting list"
                required
              ></v-checkbox>

              <v-btn color="primary" @click="updateTicket">
                Update
              </v-btn>
            </v-form></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import showdown from 'showdown'
showdown.setOption('noHeaderId', 'true')
const converter = new showdown.Converter()
export default {
  data() {
    return { valid: true }
  },
  computed: {
    date() {
      return new Date(this.invitation.event.Date).toLocaleDateString()
    },
  },
  methods: {
    async updateTicket() {
      this.$axios.put(`/tickets/${this.ticket.id}`, {
        invitation: this.ticket.invitation,
        waitingList: this.ticket.waitingList,
      })
    },
  },
  async asyncData({ params, $axios, redirect, store }) {
    try {
      const { data: ticket } = await $axios.get(`/tickets/${params.ticketId}`)
      const { data: invitations } = await $axios.get(
        `/invitations/?event=${ticket.event.id}`
      )
      // depopulate inviation so selection is able to show inviation channel
      ticket.invitation = ticket.invitation.id
      console.log(ticket)
      return { ticket, invitations }
    } catch (error) {
      setTimeout(() => {
        store.dispatch('snackbar/showError', error), redirect('/admin')
      }, 0)
      return { ticket: null, invitations: [] }
    }
  },
}
</script>
