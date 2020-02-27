import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";
import Support from "./views/Support.vue";
import Home from "./views/Home.vue";
import AccountProfile from "./views/AccountProfile.vue";
import CallRecords from "./views/CallRecords.vue";
import Accounts from "./views/Accounts.vue";
import HomeSuperUser from "./views/HomeSuperUser.vue";
import AuditLog from "./views/AuditLog.vue";
import SupportInbox from "./views/SupportInbox.vue";
import Register from "./views/Register.vue";
import ConvoInbox from "./views/ConvoInbox.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "/login",
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/support",
      name: "support",
      component: Support,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/AccountProfile/:id?",
      name: "AccountProfile",
      component: AccountProfile,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/callRecords/:id",
      name: "CallRecords",
      component: CallRecords,
      props: true,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/accounts",
      name: "Accounts",
      component: Accounts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/homeSuperUser",
      name: "HomeSuperUser",
      component: HomeSuperUser,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/auditLog",
      name: "AuditLog",
      component: AuditLog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/supportInbox",
      name: "SupportInbox",
      component: SupportInbox,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/convoInbox/:id",
      name: "convoInbox",
      component: ConvoInbox,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: true
      }
    },

  ]
});
