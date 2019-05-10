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
            transition="scale-transition"
            class="mb-3"
            @click="alert = !alert"
          >
            {{message}}
          </v-alert>
          <v-card>
            <v-card-title>
              Dosbim
              <v-spacer></v-spacer>
              <ImportDialog :patcher="options.patcher"></ImportDialog>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="mahasiswa"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.mahasiswa.nomor_induk }}</td>
                <td>{{ props.item.mahasiswa.nama_mahasiswa }}</td>
                <td>{{ props.item.dosen.nama_dosen }}</td>
                <td>{{ props.item.kelas.nama_kelas }}</td>
                <td>
                  <edit-dialog-dosbim :form="props.item" :id="props.item.id" :patcher="options.patcher"></edit-dialog-dosbim>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
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
import EditDialogDosbim from '../../components/manage/EditDialogDosbim'
import ImportDialog from '../../components/users/ImportDialog'

export default {
  name:'dosbim',
  components: {
    EditDialogDosbim,
    ImportDialog
  },
  data () {
    return {
      state: this.$store.state,
      alert: false,
      message: '',
      search: '',
      headers: [
        { text: 'Nomor Induk', sortable: false, value: '' },
        { text: 'Mahasiswa', value: 'mahasiswa' },
        { text: 'Dosen', value: 'dosen' },
        { text: 'Kelas', value: 'kelas' },
        { text: 'Options', value: ''}
      ],
      mahasiswa: [

      ],
      form: {
        dosen: ''
      },
      options: {
        patcher: 'dosbim'
      }
    }
  },
  methods: {
    getData() {
      this.$Progress.start()
      this.axios.get(this.options.patcher, {
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
