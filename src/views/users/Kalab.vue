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
              Kalab
              <v-spacer></v-spacer>
              <create-dialog :form="form" :patcher="options.patcher"></create-dialog>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="mahasiswa"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.nomor_induk }}</td>
                <td>{{ props.item.nama }}</td>
                <td>
                  <edit-dialog :form="props.item" :id="props.item.id" :patcher="options.patcher"></edit-dialog>
                  ||
                  <delete-dialog :id="props.item.id" :patcher="options.patcher"></delete-dialog>
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
import CreateDialog from '../../components/users/CreateDialog'
import DeleteDialog from '../../components/users/DeleteDialog'
import EditDialog from '../../components/users/EditDialog'

export default {
  name:'kalab',
  components: {
    CreateDialog,
    DeleteDialog,
    EditDialog
  },
  data () {
    return {
      alert: false,
      message: '',
      search: '',
      headers: [
        { text: 'Nomor Induk', sortable: false, value: 'nomor_induk' },
        { text: 'Nama', value: 'nama' },
        { text: 'Options', value: ''}
      ],
      mahasiswa: [ ],
      form: {
        nomor_induk: '',
        nama: '',
        email: '',
        nomor_whatsapp: ''
      },
      options: {
        patcher: 'datakalab'
      }
    }
  },
  methods: {
    getData() {
      this.$Progress.start()
      this.$store.dispatch('getUsers', this.options.patcher)
      .then (responses => {
        this.mahasiswa = responses
        this.$Progress.finish()
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
