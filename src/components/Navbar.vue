<template>
  <div class="Navbar">
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <router-link class="links" to="/home" v-show="showPathUA">Billing System</router-link>
      <router-link class="links" to="/homeSuperUser" v-show="showPath">Billing System</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-show="Auditlog">
            <router-link class="links" to="/AuditLog">Audit Log</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <img  :src="profile || 'https://via.placeholder.com/150'" width="50px" height="50px" class="rounded" />
          <div class="container">
            <div class="row">
              <div class="col col-auto">
                <div class="row">
                  <div class="col col-auto links">{{fullName}}</div>
                </div>
                <div class="row">
                  <div class="col col-auto" v-show="this.userType !== 'super_admin'">
                    <router-link class="links" to="/Accountprofile">{{accountName}}</router-link>
                  </div>
                </div>
                <div class="row">
                  <div class="col col-auto" v-show="Accounts">
                    <router-link class="links" to="/Accounts">Accounts</router-link>
                  </div>
                </div>
              </div>
              <div class="col col-auto">
                <div class="row">
                  <div class="col col-auto" v-show="support">
                    <router-link class="links" to="/Support">Contact Us</router-link>
                  </div>
                </div>
                <div class="row">
                  <div class="col col-auto" v-show="supportInbox">
                    <router-link class="links" to="/SupportInbox">Support Inbox</router-link>
                  </div>
                </div>
                <div class="row">
                  <div class="col col-auto">
                    <b-button class="sm" variant="primary" @click="logout">Logout</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  </div>
</template>


<script>
import {mapActions} from 'vuex';
export default {
  name: "navBar",
  props: [
    "fullName",
    "accountName",
    "userType",
    "userId",
    "avatarPath",
    "token",
    "accountId"
  ],
  data() {
    return {
      Auditlog: false,
      inbox: false,
      Accounts: false,
      showPath: false,
      showPathUA: false,
      support: true,
      supportInbox: true,
      profile: ''
    };
  },

  mounted() {
    this.loadProfile()
    .then((response) =>{
      this.profile = response;
    })
    if (this.userType == "super_admin") {
      this.Auditlog = true;
      this.inbox = true;
      this.showPath = true;
      this.showPathUA = false;
      this.Accounts = true;
      this.support = false;
    } else {
      this.userType == "admin" || "user";
      this.showPathUA = true;
      this.showPath = false;
      this.supportInbox = false;
    }
  },
  methods: {
    ...mapActions(['loadProfile']),
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>

<style scoped>
.links {
  color: white;
}
</style>