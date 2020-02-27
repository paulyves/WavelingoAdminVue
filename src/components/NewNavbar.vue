<template>
  <div class="newNavbar">
    <div class="s-layout__sidebar">
      <div class="sideBarToggle">
        <i class="material-icons">
          reorder
        </i>
      </div>

      <nav class="sideBar-nav">
        <ul>
          <li>
            <center>
              <div></div>
              <div>
                <img
                  :src="
                    navProfile ||
                      'https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg'
                  "
                  width="100px"
                  height="100px"
                  class="rounded mt-5"
                  v-if="this.userType == 'super_admin'"
                />
                <img
                  :src="
                    userProfile ||
                      'https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg'
                  "
                  width="100px"
                  height="100px"
                  class="rounded mt-5"
                  v-if="this.userType !== 'super_admin'"
                />
              </div>
            </center>
          </li>
          <li>
            <center>{{ fullName }}</center>
          </li>
          <li>
            <router-link to="/homeSuperUser" class="btn py-3 mt-5" v-if="this.userType == 'super_admin'">
              <i class="material-icons">
                devices
              </i>
              <span>Devices</span>
            </router-link>
            <router-link class="btn py-3 mt-5" to="/home" v-if="this.userType !== 'super_admin'">
              <i class="material-icons">
                devices
              </i>
              <span>Devices</span>
            </router-link>
          </li>
          <li>
            <div v-if="this.userType !== 'super_admin' ">
              <router-link to="/accountProfile" class="btn py-3">
                <i class="material-icons">account_circle</i>
                <span>{{ fullName }}</span>
              </router-link>
            </div>
            
            <div v-if="this.userType == 'super_admin'">
              <router-link to="/Accounts" class="btn py-3">
                <i class="material-icons">account_circle</i>
                <span>Accounts</span>
              </router-link>
            </div>
          </li>
          <li>
            <div v-if="this.userType !== 'super_admin' ">
              <router-link to="/Support" class="btn py-3">
                <i class="material-icons">contact_support</i>
                <span>Support</span>
              </router-link>
            </div>
            <div v-if="this.userType == 'super_admin' ">
              <router-link to="/SupportInbox" class="btn py-3">
                <i class="material-icons">contact_support</i>
                <span>Support Inbox</span>
              </router-link>
            </div>
          </li>
          <li>
            <div v-if="this.userType == 'super_admin' ">
              <router-link to="/Auditlog" class="btn py-3">
                <i class="material-icons">
                  list_alt
                </i>
                <span>Audit log</span>
              </router-link>
            </div>
            <b-button class="btnLogout py-3" @click="logout">
              <i class="material-icons">exit_to_app</i>
              <span>Logout</span>
            </b-button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "navBar",
  props: [
    "fullName",
    "accountName",
    "userType",
    "avatarPath",
    "accountId",
    "userProfile"
  
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
      navProfile: ""
    };
  },
computed:{
 ...mapGetters(["getUserId"]),
},
  mounted() {
    if(this.userType == 'super_admin'){
      this.nav().then(()=>{
      this.loadProfile().then(response =>{
      this.navProfile = response
    })
    })
    }
    // else{
    //   this.nav().then(()=>{
    //   this.loadProfile().then(response =>{
    //   this.userProfile = response
    // })
    // })
    // }
    
  },
  methods: {
    ...mapActions(["loadProfile","nav"]),
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>
<style scoped>
/* Sidebar */
.sideBar-nav {
  position: fixed;
  top: 0;
  left: -15em;
  overflow: auto;
  transition: all 0.3s ease-in;
  width: 15em;
  height: 100%;
  z-index: 5;
  background: #985b47;
  color: rgba(255, 255, 255, 0.7);
}

.sideBar-nav:hover,
.sideBar-nav:focus .sideBarToggle:focus + .sideBar-nav,
.sideBarToggle:hover + .sideBar-nav {
  left: 0;
}
.sideBar-nav ul {
  position: absolute;
  top: 4em;
  left: 0;
  margin: 0;
  padding: 0;
  width: 15em;
}

.sideBar-nav ul li {
  width: 100%;
}

span {
  position: relative;
  top: 50%;
  left: 10px;
}

.sideBarToggle {
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  clear: both;
}

.sideBarToggle > i {
  margin: 5px;
  color: grey;
}
@media (min-width: 42em) {

  .sideBarToggle {
    width: 4em;
  }

  .sideBar-nav {
    width: 3em;
    left: 0;
  }

  .sideBar-nav:hover,
  .sideBar-nav:focus,
  .sideBarToggle:hover + .sideBar-nav,
  .sideBarToggle:focus + .sideBar-nav {
    width: 15em;
  }
}

@media (min-width: 1595px) {
  .sideBarToggle {
    display: none;
  }
  .sideBar-nav {
    width: 15em;
  }
  .sideBar-nav ul {
    top: 1.3em;
  }
}
.btnLogout {
  border: #ffe5a9;
  text-align: left;
  width: 100%;
  background: #985b47;
}
.btnLogout:hover {
  color: #ffe5a9;
  background: #663c30;
}
.router-link-active {
  color: #ffe5a9;
  background: #663c30;
  text-decoration: none;
}
.router-link-active:hover {
  color: #ffffff;
}
.material-icons {
  margin-right: 20px;
}
.btn {
  color: white;
  border: #ffe5a9;
  text-align: left;
  width: 100%;
  border-radius: 0;
}
.btn:hover {
  color: #ffe5a9;
  background: #663c30;
}
</style>
