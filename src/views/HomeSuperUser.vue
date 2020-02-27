<template>
  <div class="HomeSuperUser">
    <div class="testThis">
      <NewNavbar
        :fullName="getFullName"
        :accountName="getAccountName"
        :userType="getUserType"
        :userId="getUserId"
        :avatarPath="getAvatarPath"
        :accountId="getAccountId"
        :navProfile="profile"
      />

      <div class="container">
        <br />

        <tableMain
          @emitFindAccount="findAccount"
          @findDev="vuexgetAllDevice"
          @emitAlldevice="backAllDevices"
          @findaddDeviceparent="vuexAddDevice"
          @emitYes="deleteDeviceId"
          @emitEditdev="editDev"
          @requestPage="updateSearchNamepage"
          @emitCanseledit="updateCanceledit"
          @findDeviceaccnt="findThisDevice"
          @backDev="returnAlldevice"
          :noDataFound="setNodata"
          :devicesAll="getDevices"
          :searchFlag="searchFlag"
          :NoMatchFound="NoMatchFound"
          :accountId="getAccountId"
          :vuexAccount="getAccount"
          :accntId="getFindAccountId"
          :userId="getUserId"
          :showFind="showFind"
          :showtable="showtable"
          :currentpageDeviceall="getcurrentPageMain"
          :rowsMain="getRowsMain"
          :perpageMain="getPerPageMain"
          :showDisplay="checkAlways"
          :backId="currentId"
          :showHome="backHome"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NewNavbar from "../components/NewNavbar.vue";
import { mapGetters, mapActions } from "vuex";
import tableMain from "../components/Tablemain.vue";
export default {
  name: "HomeSuperUser",

  data() {
    return {
      rows: 100,
      perPage: 10,
      NoMatchFound: false,
      searchFlag: false,
      showFind: false,
      showtable: true,
      checkAlways: false,
      setNodata: false,
      currentId: false,
      backHome: false,
      getVal: "",

      profile: ""
    };
  },

  components: {
    NewNavbar,
    tableMain
  },
  computed: {
    ...mapGetters([
      "getFullName",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getUserId",

      "getDevices",
      "getcurrentPageMain",
      "getRowsMain",
      "getPerPageMain",
      "getFindAccountId",
      "getAccount",

      "getAccountId",

      "getToken"
    ])
  },

  methods: {
    ...mapActions([
      "nav",
      "callAllDevice",
      "callAccnt",
      "callEditdevice",
      "callAccountName",
      "callAddDevice",
      "callDelDevice",
      "loadProfile"
    ]),

    returnAlldevice(objVal) {
      this.callAllDevice(objVal).then(response => {
        if (response.length == 0) {
          this.checkAlways = true;
          this.NoMatchFound = true;
          this.showtable = false;
          this.showFind = false;
          this.backHome = true;
        } else {
          this.backHome = true;
          this.checkAlways = false;
          this.NoMatchFound = false;
          this.searchFlag = false;
          this.showtable = true;
          this.currentId = false;
          this.showFind = false;
        }
      });
    },

    vuexgetAllDevice(obj) {
      this.callAllDevice(obj)
        .then(response => {
          if (response.length == 0) {
            this.checkAlways = true;
            this.NoMatchFound = true;
            this.showtable = false;
            this.showFind = false;
            this.backHome = true;
          } else {
            this.backHome = false;
            this.checkAlways = false;
            this.NoMatchFound = false;
            this.searchFlag = false;
            this.showtable = true;
            this.currentId = false;
            this.showFind = false;
          }
        })
        .catch(error => {
          if (error) {
            this.showtable = false;
          } else {
            this.showtable = true;
          }
        });
    },

    findThisDevice(objVal) {
      this.callAccnt(objVal)
        .then(response => {
          if (response.data.length == 0) {
            this.showtable = false;
            this.checkAlways = true;
            this.NoMatchFound = true;
            this.showFind = false;

            if (this.getFindAccountId != 0) {
              this.currentId = true;
            } else {
              this.currentId = false;
            }
          } else {
            if (objVal.page != 0 && objVal.search == "" && objVal.thisId != 0) {
              this.currentId = false;
              this.searchFlag = true;
              this.showtable = true;
              this.showFind = true;
              this.checkAlways = false;
              this.NoMatchFound = false;
            } else {
              this.currentId = true;
              this.searchFlag = true;
              this.showtable = true;
              this.showFind = true;
              this.checkAlways = false;
              this.NoMatchFound = false;
            }

            if (objVal.page != 0 && objVal.search != "" && objVal.thisId != 0) {
              this.currentId = true;
              this.searchFlag = true;
              this.showtable = true;
              this.showFind = true;
              this.checkAlways = false;
              this.NoMatchFound = false;
            } else {
              this.currentId = false;
              this.searchFlag = true;
              this.showtable = true;
              this.showFind = true;
              this.checkAlways = false;
              this.NoMatchFound = false;
            }
          }
        })
        .catch(error => {
          if (error) {
            console.log(error);
          }
        });
    },

    backAllDevices() {
      if (this.getToken != 0) {
        if (this.getDevices.length == 0) {
          this.searchFlag = false;
          this.showtable = false;
          this.checkAlways = false;
          this.showFind = false;
          this.NoMatchFound = false;
        } else {
          this.callAllDevice();

          this.searchFlag = false;
          this.showtable = true;
          this.checkAlways = false;
          this.showFind = false;
          this.NoMatchFound = false;
          this.backHome = false;
        }
      }
    },

    findAccount(obj) {
      this.callAccountName(obj)
        .then(response => {
          if (response) {
            let requestObj = {
              thisId: this.getFindAccountId,
              page: this.getcurrentPageMain
            };
            this.callAccnt(requestObj);
            this.backHome = true;
            this.searchFlag = true;
            this.showtable = true;
            this.showFind = true;
            this.checkAlways = false;
            this.NoMatchFound = false;
            this.setNodata = false;

            this.currentId = false;
          } else {
            this.backHome = true;
            this.showtable = false;
            this.checkAlways = true;
          }
        })
        .catch(error => {
          if (error.response.data) {
            this.showtable = false;
            this.checkAlways = true;
            this.NoMatchFound = true;
            this.showFind = false;
            this.backHome = true;
          }
        });
    },

    updateSearchNamepage(obj) {
      this.callAccnt(obj);
      this.searchFlag = true;
      this.showtable = true;
    },

    vuexAddDevice(obj) {
      this.callAddDevice(obj)
      .then(response => {
        if (response) {
        let requestObj = {
        thisId: this.getFindAccountId,
        page: this.getcurrentPageMain
      };

      this.callAccnt(requestObj);
       this.searchFlag = true;
      this.showtable = true;
      this.showFind = true;
        }
      })

    },

    deleteDeviceId(obj) {
      this.callDelDevice(obj);

      if (this.getFindAccountId != 0) {
        let requestRefreshDel = {
          thisId: this.getFindAccountId,
          page: this.getcurrentPageMain
        };
        this.callAccnt(requestRefreshDel);
        this.searchFlag = true;
        this.showtable = true;
        this.showFind = true;

        alert("Delete SuccessFul");
      } else {

        this.callAllDevice();
        this.searchFlag = false;
        this.showtable = true;
        this.showFind = true;

        alert("Delete SuccessFul");
      }
    },

    editDev(obj) {
      this.callEditdevice(obj);

      if (this.getFindAccountId != 0) {
        let requestRefreshEdit = {
          thisId: this.getFindAccountId,
          page: this.getcurrentPageMain
        };
        this.callAccnt(requestRefreshEdit);

        this.searchFlag = true;
        this.showtable = true;
        this.showFind = true;
      } else {
        this.callAllDevice();
        this.searchFlag = false;
        this.showtable = true;
        this.showFind = true;
      }
    },

    updateCanceledit(obj) {
      this.callAccnt(obj);
    }
  },

  mounted() {
    if (this.getToken != 0) {
      this.nav();
      this.callAllDevice();
      this.loadProfile().then(response => {
        this.profile = response;
      });
    } else {
      console.log("No token receive");
    }
  }
};
</script>


<style>
.HomeSuperUser {
  background-color: #fff8da;
  height: 100vmin;
}

.testThis {
  background-color: #fff8da;
}

/* .Home {
  background-color: #fff8da;
  height: 100vh;
}

.TableMainDevice {
  background-color: #fff8da;
  height: 100vh;
} */

.Accounts {
  background-color: #fff8da;
  height: 100vmin;
}

.sideBar {
  position: fixed;
  /* background-color: #985b47; */
}
</style>