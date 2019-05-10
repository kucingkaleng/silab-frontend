import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://silab.agus-hermanto.com/api/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    host: 'http://project.agus-hermanto.com',
    user: null,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('token')}`
    },
		drawer: true
  },
  getters: {
    loggedIn (state) {
      return state.token != null
    }
  },
  mutations: {
    getToken(state, todos) {
      state.token = localStorage.getItem('token')
      state.user = JSON.parse(localStorage.getItem('user'))
      state.headers.Authorization = `bearer ${localStorage.getItem('token')}`
    },
    destroyToken(state) {
      state.token = null
      state.user = null
    }
  },
  actions: { 
    getToken(context, credentials) {
      return new Promise((resolve,reject) => {
        axios.post(`login`, {
          username: credentials.username,
          password: credentials.password
        })
        .then(responses => {
          const token = responses.data.access_token
          const user = responses.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          context.commit('getToken', token)
          resolve(responses)
          // console.log(responses)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    destroyToken(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post(`logout`)
          .then(responses => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            context.commit('destroyToken')
            resolve(responses)
            // console.log(responses)
          })
          .catch(error => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            context.commit('destroyToken')
            reject(error)
          })
        })
      }
    },
    getUsers(context,api) {
      return new Promise((resolve, reject) => {
        axios.get(api, {
          headers: this.state.headers
        })
        .then(responses => {
          resolve(responses.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
})
