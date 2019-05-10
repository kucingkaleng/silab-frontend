import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import Logout from './views/Logout.vue'

import multiguard from 'vue-router-multiguard';

Vue.use(Router)

const guest = (to, from, next) => {
  if (localStorage.getItem('token')) {
    router.push('/home')
  }
  next()
}

const auth = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    router.push('/')
  }
  next()
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
      beforeEnter: multiguard([guest])
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/mahasiswa',
      name: 'mahasiswa',
      component: () => import('./views/users/Mahasiswa.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/aslab',
      name: 'aslab',
      component: () => import('./views/users/Aslab.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/dosen',
      name: 'dosen',
      component: () => import('./views/users/Dosen.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/kalab',
      name: 'kalab',
      component: () => import('./views/users/Kalab.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/laboran',
      name: 'laboran',
      component: () => import('./views/users/Laboran.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/dosbim',
      name: 'dosbim',
      component: () => import('./views/manage/Dosbim.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/kelas',
      name: 'kelas',
      component: () => import('./views/manage/Kelas.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/praktikum',
      name: 'praktikum',
      component: () => import('./views/manage/Praktikum.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/absensi/:kelas',
      name: 'absensi',
      component: () => import('./views/manage/Absensi.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/nilai/:kelas',
      name: 'nilai',
      component: () => import('./views/manage/Nilai.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/tugas/:kelas',
      name: 'tugas',
      component: () => import('./views/manage/Tugas.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/uploads',
      name: 'uploads',
      component: () => import('./views/manage/Uploads.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/upload/:kelas',
      name: 'upload',
      component: () => import('./views/manage/Uploads.vue'),
      beforeEnter: multiguard([auth])
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

export default router