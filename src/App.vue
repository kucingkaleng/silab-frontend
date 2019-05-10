<template>
  <v-app>
    <div v-if="loggedIn">
      <drawer />
      <toolbar />
    </div>
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view/>
    </transition>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
import drawer from './components/Drawer'
import toolbar from './components/Toolbar'
import {mapGetters} from 'vuex'
import qs from 'qs'

export default {
  name: 'App',
  components: {
    drawer,
    toolbar
  },
  data () {
    return {
      prevHeight: 0
    }
  },
  methods: {
    expired () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(destroyToken)
          }
          throw err
        })
      })
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter(element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      });
    },
    afterEnter(element) {
      element.style.height = 'auto'
    },
  },
  computed: {
    ...mapGetters(['loggedIn'])
  },
  created() {
    if (localStorage.getItem('user') || localStorage.getItem('user') != 'undefined') {
      this.$store.state.user = JSON.parse(localStorage.getItem('user'))
    }
    this.expired()
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>