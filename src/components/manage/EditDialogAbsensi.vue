<template>
  <v-dialog v-model="dialog" max-width="500px" persistent="">
    <v-btn color="primary" small slot="activator" outline>
      Absensi
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{mahasiswa.nama_mahasiswa}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="validate" >
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <h5 class="headline">Pertemuan</h5>
              <v-divider light></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs6>
                <v-checkbox
                  v-model="form.pertemuan_1"
                  label="Pertemuan 1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs6>
                <v-checkbox
                  v-model="form.pertemuan_2"
                  label="Pertemuan 2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs6>
                <v-checkbox
                  v-model="form.pertemuan_3"
                  label="Pertemuan 3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs6>
                <v-checkbox
                  v-model="form.pertemuan_4"
                  label="Pertemuan 4"
                ></v-checkbox>
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
    mahasiswa: '',
    form: {
      pertemuan_1: '',
      pertemuan_2: '',
      pertemuan_3: '',
      pertemuan_4: ''
    }
  },
  data () {
    return {
      state: this.$store.state,
      dialog: false,
      valid: true,
      nilai: []
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
