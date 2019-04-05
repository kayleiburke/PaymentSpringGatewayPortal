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
import VuexFlash from 'vuex-flash'

// Views - Components
import Dashboard from '@/views/Dashboard'
import Full from '@/views/Full'
import Icons from '@/views/Icons'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Maps from '@/views/Maps'
import Notifications from '@/views/Notifications'
import TableList from '@/views/TableList'
import Typography from '@/views/Typography'
import Upgrade from '@/views/Upgrade'
import UserProfile from '@/views/UserProfile'

Vue.use(Router)
Vue.use(VuexFlash, { mixin: true })

// Create a new router
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: Full,
      children: [
        {
          path: 'dashboard',
          // Relative to /src/views
          component: Dashboard
        },
        {
          path: '/user-profile',
          name: 'User Profile',
          component: UserProfile
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

export default router
