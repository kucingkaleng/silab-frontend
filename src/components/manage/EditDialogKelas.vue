<template>
  <v-dialog v-model="dialog" max-width="500px">
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
              <v-select
                v-model="form.id_praktikum"
                :items="praktikum"
                item-text="nama_praktikum"
                item-value="id"
                :rules="[v => !!v || 'Item is required']"
                label="Praktikum"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.kelas" label="Kelas" :rules="kelasRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.tahun_pelajaran" label="Tahun Ajaran" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.semester" label="Semester" required></v-text-field>
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
      id_praktikum: null,
      kelas: '',
      tahun_pelajaran: '',
      semester: ''
    }
  },
  data () {
    return {
      state: this.$store.state,
      dialog: false,
      valid: true,
      praktikum: [],
      kelasRules: [
        v => !!v || 'Kelas is required',
        v => (v && v.length <= 5) || 'Nama must be less than 5 characters'
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
            id_praktikum: this.form.id_praktikum,
            kelas: this.form.kelas,
            tahun_pelajaran: this.form.tahun_pelajaran,
            semester: this.form.semester
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
    },
    dataPraktikum() {
      this.axios.get(`praktikum`, {
        headers: this.state.headers
      })
      .then(responses => {
        this.praktikum = responses.data.data
      })
    },
	},
  created() {
    this.dataPraktikum()
  }
}
</script>
