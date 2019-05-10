<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12>
        <v-container>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="mb-3" ></v-text-field>
          <v-alert :value="alert" outline type="success" transition="scale-transition" class="mb-3" @click="alert = !alert" >
            {{message}}
          </v-alert>
          <v-card>
            <v-card-title>
              Praktikum
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
                <td>
                  <a :href="hostname+`/uploads/`+props.item.file.file_name" target="_blank" v-if="props.item.file.file_name != null">
                    Download
                  </a>
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
export default {
  name:'praktikum',
  data () {
    return {
      state: this.$store.state,
      hostname: this.$store.state.host,
      alert: false,
      message: '',
      search: '',
      headers: [
        { text: 'NBI', value: 'mahasiswa.nomor_induk' },
        { text: 'Mahasiswa', value: 'mahasiswa.nama_mahasiswa' },
        { text: 'File', value: 'file' }
      ],
      datas: [

      ],
      form: {
        id_praktikum: null,
        nama_praktikum: ''
      },
      options: {
        patcher: 'tugas'
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
        this.datas = responses.data
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
