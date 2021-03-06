/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Views - Components
import Dashboard from '@/views/Dashboard'
import Full from '@/views/Full'
import Icons from '@/views/Icons'
import Login from '@/views/Login'
import Confirmation from '@/components/helper/Confirmation'
import Register from '@/views/Register'
import Inauthenticated from '@/views/Inauthenticated'
import Maps from '@/views/Maps'
import Notifications from '@/views/Notifications'
import TableList from '@/views/TableList'
import Typography from '@/views/Typography'
import Upgrade from '@/views/Upgrade'
import UserProfile from '@/views/UserProfile'
import Payment from '@/views/Payment'
import Charts from '@/views/Charts'

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      redirect: '/login',
      component: Inauthenticated,
      meta: {
        guest: true
      },
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '/confirmation',
          name: 'Confirmation',
          component: Confirmation
        }
      ]
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: Full,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          // Relative to /src/views
          component: Dashboard
        },
        {
          path: '/payment',
          name: 'Make a Donation',
          component: Payment
        },
        {
          path: '/user-profile',
          name: 'Sample User Profile',
          component: UserProfile
        },
        {
          path: '/charts',
          name: 'Sample Charts',
          component: Charts
        },
        {
          path: '/table-list',
          name: 'Table List',
          component: TableList
        },
        {
          path: '/typography',
          component: Typography
        },
        {
          path: '/icons',
          component: Icons
        },
        {
          path: '/maps',
          component: Maps
        },
        {
          path: '/notifications',
          component: Notifications
        },
        {
          path: '/upgrade',
          name: 'Upgrade to PRO',
          component: Upgrade
        }
      ]
    },
    { path: '*', redirect: '/dashboard' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

// prevent access to authenticated pages if the user is not logged in
// adapted from https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.currentUser == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.currentUser)
      if(to.matched.some(record => record.meta.admin)) {
        if(user.admin == 1){
          next()
        }
        else{
          next({ name: 'Dashboard'})
        }
      }else {
        next()
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.currentUser == null){
      next()
    }
    else{
      next({ name: 'Dashboard'})
    }
  }else {
    next()
  }
})

export default router
