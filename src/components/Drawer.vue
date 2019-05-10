<template>
  <v-navigation-drawer
    app
    v-model="state.drawer"
  >
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://alghazitour.co.id/wp-content/uploads/admin-user-icon.gif">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{state.user.nama}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider light></v-divider>

      <v-list-tile
        :to="{name:'home'}"
      >
        <v-list-tile-action>
          <v-icon>mdi-speedometer</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Dashboard</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        v-if="[3,6,1].includes(state.user.id_roles)"
        prepend-icon="mdi-account-circle"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="(crud,i) in users"
          :key="i"
          :to="crud.link"
        >
          <v-list-tile-action>
            <v-icon>{{crud.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{crud.title}}</v-list-tile-title>
        </v-list-tile>

      </v-list-group>

      <v-list-group
        v-if="[3,6,1].includes(state.user.id_roles)"
        prepend-icon="mdi-google-classroom"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Kelas</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="(crud,i) in kelas"
          :key="i"
          :to="crud.link"
        >
          <v-list-tile-action>
            <v-icon>{{crud.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{crud.title}}</v-list-tile-title>
        </v-list-tile>

      </v-list-group>

      <v-list-group
        v-if="[3,6,1].includes(state.user.id_roles)"
        prepend-icon="mdi-file-document-box-multiple"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Manajemen</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="(crud,i) in manage"
          :key="i"
          :to="crud.link"
        >
          <v-list-tile-action>
            <v-icon>{{crud.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{crud.title}}</v-list-tile-title>
        </v-list-tile>

      </v-list-group>

      <v-list-tile
        v-if="[5].includes(state.user.id_roles)"
        :to="{name:'uploads'}"
      >
        <v-list-tile-action>
          <v-icon>mdi-file-upload</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Upload Tugas</v-list-tile-title>
      </v-list-tile>

      <v-list-tile
        :to="{name:'logout'}"
      >
        <v-list-tile-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      admins: [
        { title: 'Users', icon: 'account_circle', link:'/logout'}
      ],
      users: [
        { title: 'Kalab', icon: 'mdi-briefcase-account', link:'/kalab'},
        { title: 'Laboran', icon: 'mdi-account', link:'/laboran'},
        { title: 'Dosen', icon: 'mdi-account-tie', link:'/dosen'},
        { title: 'Aslab', icon: 'mdi-teach', link:'/aslab'},
        { title: 'Mahasiswa', icon: 'mdi-account-group', link:'/mahasiswa'}
      ],
      kelas: [
        { title: 'Daftar Kelas', icon: 'mdi-door', link:'/kelas'},
        { title: 'Praktikum', icon: 'mdi-view-list', link:'/praktikum'}
      ],
      manage: [
        { title: 'Dosen Bimbingan', icon: 'mdi-account-supervisor', link:'/dosbim'}
      ],
      options: {
        mini:false,
        permanent: false,
        fixed: false,
        clipped: false
      },
      state: this.$store.state
    }
  }
}
</script>
