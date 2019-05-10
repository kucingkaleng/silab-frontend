<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-icon
      slot="activator"
      small
    >
      mdi-pencil
    </v-icon>
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
                v-model="form.dosen"
                :items="items"
                item-text="nama"
                item-value="id"
                :rules="[v => !!v || 'Item is required']"
                label="Dosen"
                required
              ></v-select>
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
      dosen: null
    }
  },
  data () {
    return {
      state: this.$store.state,
      dialog: false,
      valid: true,
      select: null,
      items: [ ]
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
          this.$Progress.start()
					this.axios.put(`${this.patcher}/${this.id}`, {
            id_dosbim: this.form.dosen
          }, {
            headers: this.state.headers
          })
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
    },
    dataDosen() {
      this.axios.get(`datadosen`, {
        headers: this.state.headers
      })
      .then(responses => {
        this.items = responses.data
      })
    },
    alert(item) {
      alert(item)
    }
  },
  created() {
    this.dataDosen()
  }
}
</script>
