<template>
  <v-layout>
    <v-toolbar
        app
        :fixed="true"
        :clipped-left="false"
        dark
        class="primary"
      >
      <v-toolbar-side-icon 
        @click.stop="$store.state.drawer = !$store.state.drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>SILAB<span class="font-weight-light">MIKRO</span></v-toolbar-title>
    </v-toolbar>
  </v-layout>
</template>