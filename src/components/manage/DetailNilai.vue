<template>
  <v-dialog v-model="dialog" max-width="500px" fullscreen hide-overlay>
    <v-btn color="primary" small slot="activator" title="Nilai" outline>
      Penilaian
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
              <h5 class="headline">Pendahuluan</h5>
              <v-divider light></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_pendahuluan_1" label="Pendahuluan 1" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_pendahuluan_2" label="Pendahuluan 2" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_pendahuluan_3" label="Pendahuluan 3" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_pendahuluan_4" label="Pendahuluan 4" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <h5 class="headline">Abstrak</h5>
              <v-divider light></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field v-model="form.abstrak_praktikum_1" label="Abstrak Praktikum 1" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.abstrak_praktikum_2" label="Abstrak Praktikum 2" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.abstrak_praktikum_3" label="Abstrak Praktikum 3" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.abstrak_praktikum_4" label="Abstrak Praktikum 4" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <h5 class="headline">Aktivitas</h5>
              <v-divider light></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field v-model="form.aktivitas_praktikum_1" label="Aktivitas Praktikum 1" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.aktivitas_praktikum_2" label="Aktivitas Praktikum 2" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.aktivitas_praktikum_3" label="Aktivitas Praktikum 3" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.aktivitas_praktikum_4" label="Aktivitas Praktikum 4" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <h5 class="headline">Paska Praktikum</h5>
              <v-divider light></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_paska_praktikum_1" label="Paska Praktikum 1" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_paska_praktikum_2" label="Paska Praktikum 2" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_paska_praktikum_3" label="Paska Praktikum 3" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tugas_paska_praktikum_4" label="Paska Praktikum 4" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <h5 class="headline">Nilai Akhir</h5>
              <v-divider light></v-divider>
            </v-flex>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field v-model="form.tes_akhir" label="Tes Akhir" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.nilai_bimbingan_dosen" label="Bimbingan Dosen" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.status_laporan" label="Status Laporan" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.nilai_akhir" label="Nilai Akhir" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="form.grade" label="Grade" readonly></v-text-field>
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
      tugas_pendahuluan_1: '',
      tugas_pendahuluan_2: '',
      tugas_pendahuluan_3: '',
      tugas_pendahuluan_4: '',
      abstrak_praktikum_1: '',
      abstrak_praktikum_2: '',
      abstrak_praktikum_3: '',
      abstrak_praktikum_4: '',
      aktivitas_praktikum_1: '',
      aktivitas_praktikum_2: '',
      aktivitas_praktikum_3: '',
      aktivitas_praktikum_4: '',
      tugas_paska_praktikum_1: '',
      tugas_paska_praktikum_2: '',
      tugas_paska_praktikum_3: '',
      tugas_paska_praktikum_4: '',
      tes_akhir: '',
      nilai_bimbingan_dosen: '',
      status_laporan: '',
      nilai_akhir: '',
      grade: 'E'
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
