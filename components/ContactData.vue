<template>
  <v-form v-model="valid">
    <v-text-field v-model="contactInfo.adresse" label="Adresse" />
    <v-text-field v-model="contactInfo.tel" label="Telephon" />
  </v-form>
</template>

<script>
import validations from '@/utils/validations'
export default {
	data() {
		return {
			valid: false,
			showPassword: false,
			contactInfo: {
				identifier: '',
				password: '',
			},
			resetEmail: '',
			resetDialog: false,
			...validations,
		}
	},
	props: {
		submitForm: Function,
		buttonText: String,
		register: { type: Boolean, default: false },
	},
	methods: {
		sendResetEmail() {
			this.$axios.post('/auth/forgot-password', {
				email: this.resetEmail,
			})
			this.resetDialog = false
		},
	},
	watch: {
		resetDialog() {
			this.resetEmail = ''
		},
	},
}
</script>

<style lang="scss" scoped></style>
