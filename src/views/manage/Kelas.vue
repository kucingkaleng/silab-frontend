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
              Kelas
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="datas"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.praktikum }}</td>
                <td>{{ props.item.kelas }}</td>
                <td>{{ props.item.tahun_pelajaran }}</td>
                <td>{{ props.item.semester }}</td>
                <td>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" outline small v-on="on" >
                        Detail
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-tile v-for="(item, index) in opsi" :key="index" :to="item.uri+props.item.id" >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
                <td>
                  <edit-dialog-kelas :form="props.item" :id="props.item.id" :patcher="options.patcher"></edit-dialog-kelas>
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
import EditDialogKelas from '../../components/manage/EditDialogKelas'

export default {
  name:'kelas',
  components: {
    EditDialogKelas
  },
  data () {
    return {
      state: this.$store.state,
      alert: false,
      message: '',
      search: '',
      headers: [
        { text: 'Praktikum', value: 'praktikum' },
        { text: 'Kelas', value: 'kelas' },
        { text: 'Tahun Pelajaran', value: 'tahun_pelajaran' },
        { text: 'Semester', value: 'semester' },
        { text: '', value: 'nilai'},
        { text: '', value: ''}
      ],
      datas: [

      ],
      form: {
        id_praktikum: null,
        kelas: '',
        tahun_pelajaran: '',
        semester: ''
      },
      options: {
        patcher: 'kelas'
      },
      opsi: [
        { title: 'Nilai', uri: '/nilai/'},
        { title: 'Absensi', uri: '/absensi/'},
        { title: 'Tugas', uri: '/tugas/'}
      ]
    }
  },
  methods: {
    getData() {
      this.$Progress.start()
      this.axios.get(this.options.patcher, {
        headers: this.state.headers
      })
      .then(responses => {
        this.datas = responses.data.data
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
