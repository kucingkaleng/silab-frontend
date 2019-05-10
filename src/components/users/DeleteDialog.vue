<template>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-icon
        slot="activator"
        small
      >
        mdi-delete
      </v-icon>
      <v-card>
        <v-card-title class="headline">Delete</v-card-title>
        <v-card-text>Are you sure want to delete this data?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary white--text" @click="dialog = false">No</v-btn>
          <v-btn color="error white--text" @click="destroy(id,patcher)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    id: '',
    patcher: ''
  },
  data() {
    return {
      state: this.$store.state,
      dialog: false
    }
  },
  methods: {
    refresh (){
      this.$root.$emit('refresh','Data deleted successfully.')
    },
    destroy(id,patcher) {
      this.$Progress.start()
      this.axios.delete(`${patcher}/${id}`,{
        headers:this.state.headers
      })
      .then(responses => {
        this.dialog = false
        this.$Progress.finish()
        this.refresh()
      })
    }
  }
}
</script>
