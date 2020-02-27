<template>
  <div class="Home">
   
      <NewNavbar
        :fullName="getFullName"
        :accountName="getAccountName"
        :userType="getUserType"
        :userId="getUserId"
        :avatarPath="getAvatarPath"
        :AccountID="getAccountId"
        :navProfile="profile"
        :userProfile="userProf"
      />
    <div class="offset-md-2">

    <b-container>
      
      <TableMainDevice
        :userType="getUserType"
        :eachAccount="getAccountId"
        :vuexAccount="getAccount"
        :notShow="notShowtable"
        @emitAccount="vuexgetAccnt"
        @emitEditDev="editDev"
        :currentPage="getcurrentPageMain"
        :rowMain="getRowsMain"
        :perPage="getPerPageMain"
        :showNoResult="checkAlways"
        :showThis="showBack"
        @emitBackAccount="backAccounts"
      />
    </b-container>
    </div>
  </div>
</template>

<script>
// import Navbar from "../components/Navbar.vue";
import NewNavbar from "../components/NewNavbar.vue";

import TableMainDevice from "../components/TableMainDevice.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",

  data() {
    return {
      userProf:"",
      inbox: false,
      showpath: false,
      showpathUA: false,
      showNoResult: false,
      notShowtable: true,
      checkAlways: false,
      showBack: false,
      profile:""
    };
  },

  components: {
    NewNavbar,

    TableMainDevice
  },
  computed: {
    ...mapGetters([
      "getFullName",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getUserId",
      "getAccountId",
      "getAccount",
      "getcurrentPageMain",
      "getRowsMain",
      "getPerPageMain",
      "getDevices"
    ])
  },

  methods: {
    ...mapActions(["nav", "callAccnt", "callEditdevice","loadProfile"]),

    backAccounts(objVal){
       this.callAccnt(objVal)
       .then(response => {
        if (response.data.length == 0) {
          this.checkAlways = true;
          this.notShowtable = false;
          this.showBack = true;
        } else {
           this.showBack = false;
          this.checkAlways = false;
          this.notShowtable = true;
        }
      });
    },

    editDev(receiveObj) {
      this.callEditdevice(receiveObj);
      let requestObj = {
        thisId: this.getAccountId,
        page: receiveObj.currentPage
      };
      this.callAccnt(requestObj);
    },

    vuexgetAccnt(objVal) {
      this.callAccnt(objVal).then(response => {
        if (response.data.length == 0) {
          this.checkAlways = true;
          this.notShowtable = false;
          this.showBack = true;
        } else {
           this.showBack = true;
          this.checkAlways = false;
          this.notShowtable = true;
        }
      });
    }
  },

  mounted() {
    this.nav().then(() => {
       this.loadProfile().then(response => {
           this.userProf = response
        
    });
        let requestObj = {
          thisId: this.getAccountId
        };
        this.callAccnt(requestObj);
      })
     
  }
};
</script>


<style scoped>
.co {
  border: solid 2px;
}
</style>