<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12>
        <v-container>
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
            transition="slide-y-reverse-transition"
            class="mb-3"
            @click="alert = !alert"
          >
            {{message}}
          </v-alert>
          <v-card>
            <v-card-title>
              Absensi
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="mahasiswa"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.mahasiswa.nomor_induk }}</td>
                <td>{{ props.item.mahasiswa.nama_mahasiswa }}</td>
                <td>{{ props.item.kelas.nama_kelas }}</td>
                <td v-if="props.item.presentase != null">
                  {{ props.item.presentase }}%
                </td>
                <td v-else>
                  NULL
                </td>
                <td>
                  <edit-dialog-absensi v-if="[3].includes(state.user.id_roles)" :form="props.item.pertemuan" :mahasiswa="props.item.mahasiswa" :id="props.item.id" :patcher="options.patcher"></edit-dialog-absensi>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="mdi-warning" transition="slide-y-reverse-transition">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import EditDialogAbsensi from '../../components/manage/EditDialogAbsensi'

export default {
  name:'absensi',
  components: {
    EditDialogAbsensi
  },
  data () {
    return {
      state: this.$store.state,
      alert: false,
      message: '',
      search: '',
      headers: [
        { text: 'Nomor Induk', sortable: false, value: 'nbi' },
        { text: 'Mahasiswa', value: 'mahasiswa' },
        { text: 'Kelas', value: 'kelas' },
        { text: 'Persentase', value: 'presentase' },
        { text: 'Options', value: ''}
      ],
      mahasiswa: [ ],
      form: {
        dosen: ''
      },
      options: {
        patcher: 'absensi'
      }
    }
  },
  methods: {
    getData() {
      this.$Progress.start()
      this.axios.get(`${this.options.patcher}?kelas=${this.$route.params.kelas}`, {
        headers: this.state.headers
      })
      .then(responses => {
        this.mahasiswa = responses.data
        this.$Progress.finish()
      })
      .catch(error => {
        this.$Progress.fail()
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$root.$on('refresh', (message) => {
      this.message = message
      this.alert = true
      this.getData()
    })
  }
}
</script>
