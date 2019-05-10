<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn small color="primary" slot="activator">Import <v-icon right>mdi-cloud-upload</v-icon></v-btn>
    <v-card>
      <v-card-title>
        <h5 class="text-xs-center headline">Import Data</h5>
      </v-card-title>
      <v-divider light></v-divider>
      <v-form
        ref="form"
        v-model="valid"
        enctype="multipart/form-data"
        @submit.prevent="validate"
      >
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="filename" class="pl-2 pr-2" readonly></v-text-field>
              <upload-btn :fileChangedCallback="fileChanged" title="Browse" name="file" small class="pl-0" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                <template slot="icon">
                  <v-icon right color="white">mdi-open-in-app</v-icon>
                </template>
              </upload-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = !dialog">Cancel</v-btn>
        <v-btn color="primary" type="submit">Upload</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadButton from 'vuetify-upload-button'
let formData = new FormData()

export default {
  components: {
    'upload-btn': UploadButton
  },
  props:{
    id: '',
    patcher: '',
  },
  data () {
    return {
      state: this.$store.state,
      dialog: false,
      valid: true,
      files: null,
      filename: '',
      nomorIndukRules: [
	      v => !!v || 'Nomor Induk is required',
	      v => (v && v.length <= 20) || 'Nomor Induk must be less than 20 characters'
      ]
    }
  },
  methods: {
    refresh (){
      this.$root.$emit('refresh','Data imported successfully.')
    },
    fileChanged(file) {
      formData.append('file', file)
      this.files = formData
      this.filename = file.name
    },
    validate () {
      if (this.files != null) {
        this.$Progress.start()
        this.axios.post(`${this.patcher}/import`,
          this.files, {
            headers: {
              'Authorization': this.state.headers.Authorization,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(responses => {
          this.dialog = false
          this.$Progress.finish()
          this.refresh()
        })
        .catch(error => {
          console.log(error)
          this.$Progress.fail()
        })
      }
    }
	}
}
</script>
