<template>
  
</template>

<script>
export default {
  created() {
    this.$Progress.start()
    this.$store.dispatch('destroyToken')
    .then (responses => {
      this.$router.push('/')
      this.$Progress.finish()
    })
  }
}
</script>
