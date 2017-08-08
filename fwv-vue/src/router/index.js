import Vue from 'vue'
import Router from 'vue-router'
import components from './components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sandbox',
      component: components.sandbox,
    },
    {
      path: '/',
      component: components.main,
      children: [
        {
          path: 'press/:page',
          name: 'Press',
          component: components.press_page,
          props: true,
          meta: {
            footer_redirect: '/press/'
          }
        },
        {
          path: 'about/:page',
          name: 'About',
          component: components.about_page,
          props: true
        },
        {
          path: 'closer-look/:page',
          name: 'Closer Look',
          component: components.closer_look_page,
          props: true,
          meta: {
            footer_redirect: '/closer-look/'
          }
        },
        {
          path: 'individual-home/:category/:page', //add another parameter here for parent category
          name: 'Individual Home',
          component: components.individual_page,
          props: true,
          meta: {
            footer_redirect: '/individual-home/'
          }
        },
        {
          path: 'portfolio/:page',
          name: 'Portfolio',
          component: components.portfolio_page,
          props: true
        },
        {
          path: 'blog/:page',
          name: 'Blog',
          component: components.blog_page,
          props: true
        },
        {
          path: '*',
          name: 'landing',
          component: components.landing_page
        },
      ]
    },
    // {
    //   path: '/',
    //   component: components.main,
    //   children: [
    //     {
    //       path: '*',
    //       name: 'landing',
    //       component: components.landing_page
    //     },
    //   ]
    // },
    {
      path: '/style_guide',
      component: components.style_guide,
      children: [
        {
          path: '/',
          component: components.main_page
        },
        {
          path: 'fonts',
          component: components.fonts_page
        },
        {
          path: 'atoms',
          component: components.atoms_page
        },
        {
          path: 'molecules',
          component: components.molecules_page
        },
        {
          path: 'organisms',
          component: components.organisms_page
        }
      ]
    }
  ]
})
