<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-btn color="primary" small slot="activator" title="Nilai" outline>
      Edit
      <v-icon right dark>mdi-pencil</v-icon>
    </v-btn>
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
              <v-text-field v-model="form.nama_praktikum" label="Praktikum" required></v-text-field>
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
      id: null,
      nama_praktikum: ''
    }
  },
  data () {
    return {
      state: this.$store.state,
      dialog: false,
      valid: true
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
					this.axios.put(`${this.patcher}/${this.id}`, this.form, {
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
