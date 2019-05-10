<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12>
        <v-container id="hero">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mb-3"
          ></v-text-field>
          <v-alert
            :value="alert"
            outline
            type="success"
            transition="scale-transition"
            class="mb-3"
            @click="alert = !alert"
          >
            {{message}}
          </v-alert>
          <v-card>
            <v-card-title>
              Nilai
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="datas"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.mahasiswa.nomor_induk }}</td>
                <td>{{ props.item.mahasiswa.nama_mahasiswa }}</td>
                <td>{{ props.item.kelas.nama_kelas }}</td>
                <td>
                  <edit-dialog-nilai-akhir :form="props.item.nilai" :mahasiswa="props.item.mahasiswa" :id="props.item.id" :patcher="options.patcher" :dialog="na"></edit-dialog-nilai-akhir>
                </td>
              </template>
              <p slot="no-results" :value="true">
                Your search for "{{ search }}" found no results.
              </p>
            </v-data-table>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import EditDialogNilaiAkhir from '../../components/manage/EditDialogNilaiAkhir'

export default {
  name:'nilai',
  components: {
    EditDialogNilaiAkhir
  },
  data () {
    return {
      state: this.$store.state,
      alert: false,
      message: '',
      search: '',
      headers: [
        { text: 'NBI', value: 'mahasiswa.nomor_induk' },
        { text: 'Mahasiswa', value: 'mahasiswa.nama_mahasiswa' },
        { text: 'Kelas', value: 'kelas.nama_kelas' },
        { text: '', value: 'penilaian'},
      ],
      datas: [ ],
      form: {
        id_praktikum: null,
        kelas: '',
        tahun_pelajaran: '',
        semester: ''
      },
      options: {
        patcher: 'nilai'
      },
      penilaian: [
        { text: 'Pendahuluan'},
        { text: 'Abstrak'},
        { text: 'Aktivitas'},
        { text: 'Paska Praktikum'},
        { text: 'Nilai Akhir'}
      ],
      na: false
    }
  },
  methods: {
    getData() {
      this.$Progress.start()
      this.axios.get(`${this.options.patcher}?kelas=${this.$route.params.kelas}`, {
        headers: this.state.headers
      })
      .then(responses => {
        this.datas = responses.data
        this.$Progress.finish()
      })
      .catch(error => {
        this.$Progress.fail()
      })
    },
    opened() {
      this.na = true
    }
  },
  mounted() {
    this.$root.$on('refresh', (message) => {
      this.message = message
      this.alert = true
      this.getData()
    }),
    this.getData()
  }
}
</script>
