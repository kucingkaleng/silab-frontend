<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-icon
      slot="activator"
      small
    >
      mdi-pencil
    </v-icon>
    <v-card>
      <v-card-title>
        <h5 class="text-xs-center headline">Edit Data</h5>
      </v-card-title>
      <v-divider light></v-divider>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="validate"
      >
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="form.nomor_induk" label="Nomor Induk" :rules="nomorIndukRules" readonly></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.nama" label="Nama" :rules="namaRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.email" label="Email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.nomor_whatsapp" label="Nomor HP"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = !dialog">Cancel</v-btn>
        <v-btn color="primary" type="submit">Save</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:{
    id: '',
    patcher: '',
    form: {
      nomor_induk: '',
      nama: '',
      email: '',
      nomor_whatsapp: ''
    }
  },
  data () {
    return {
      state: this.$store.state,
      dialog: false,
      valid: true,
      nomorIndukRules: [
        v => !!v || 'Nomor Induk is required',
        v => (v && v.length <= 20) || 'Nomor Induk must be less than 20 characters'
      ],
      namaRules: [
        v => !!v || 'Nama is required',
        v => (v && v.length <= 50) || 'Nama must be less than 20 characters'
      ],
    }
  },
  methods: {
    refresh (){
      this.$root.$emit('refresh','Data updated successfully.')
    },
    validate () {
      if (this.$refs.form.validate()) {
				this.snackbar = true
				if (this.valid) {
					this.axios.put(`${this.patcher}/${this.id}`, {
            nomor_induk: this.form.nomor_induk,
            nama: this.form.nama,
            email: this.form.email,
            nomor_whatsapp: this.form.nomor_whatsapp
          }, {
            headers: this.state.headers
          })
          .then(responses => {
            this.dialog = false
            this.refresh()
          })
          .catch(error => {
            console.log(error)
          })
				}
			}
    }
	}
}
</script>
