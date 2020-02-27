<template>
  <div class="Tablemain">
    <div class="fiCol">
      <b-row class="filCol">
        <b-col cols="4" class="filCol">
          <h2>
            <b>Wave Lingo Admin</b>
          </h2>
        </b-col>
      </b-row>
      <br />
      <div>
        <b-col sm="4"></b-col>

        <b-container>
          <b-row>
            <b-col sm="3" style="padding-left: 0px;" >
              <b-input-group-append>
                <!-- <h3 class="textCol">Account</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                <b-form-input
                  id="valBorder"
                  v-model="searchAccount"
                  type="search"
                  required
                  placeholder="Enter Account"
                  @keyup.enter="findAccount(searchAccount)"
                ></b-form-input>
              </b-input-group-append>

              <br />

              <b-col cols="12" class="text-left">
                <router-link
                  class="links"
                  to="/homeSuperUser"
                  v-show="showHome"
                  @click.native="backAccount(searchKey)"
                >&lt;&lt;Back to Home</router-link>
                <router-link
                  class="links"
                  to="/homeSuperUser"
                  v-show="backId"
                  @click.native="backAccountId(searchKey)"
                >&lt;Back to {{searchAccount}}</router-link>
              </b-col>

              <h4
                v-show="showDisplay"
                class="text-left"
              >Displaying Result For '{{searchKey || inputVal}} '</h4>
            </b-col>
            <b-col sm="5">
              <InputSearch @searchSubmit="searchSubmit" :searchEmpty="MakeBlank" />
            </b-col>
            <b-col sm="4" style="padding-right: 0px;">
              <div class="pagination justify-content-end">
                <b-pagination
                  id="valBorder"
                  v-model="currentPageall"
                  :total-rows="rowsMain"
                  :per-page="perpageMain"
                  v-show="showtable"
                ></b-pagination>
                 </div>
             
            </b-col>
          </b-row>

          <b-row align-h="between">
            <b-col sm="1">
              <Btnmodal
                @addDevice="callSuperparent"
                :sendtomodal="accountId"
                :accoutId="accntId"
                v-show="showFind"
              />
            </b-col>
          </b-row>
        </b-container>

        <center>
          <h3 v-show="noDataFound">No data Existing</h3>
        </center>

        <b-table
          id="my-table"
          :items="searchFlag?vuexAccount:devicesAll"
          :per-page="0"
          :fields="searchFlag?fieldsFindAccount:fieldsAllDevice"
          small
          class="table table-bordered table-responsive-md table-striped text-center"
          v-show="showtable"
        >
          <template slot="[mac_address]" slot-scope="data">
            <p class="textCol">{{data.item.mac_address}}</p>
          </template>

          <template slot="[device_name]" slot-scope="data">
            <p class="textCol">{{data.item.device_name}}</p>
          </template>
          <template slot="[tel_number]" slot-scope="data">
            <p class="textCol">{{data.item.tel_number}}</p>
          </template>
          <template slot="[language]" slot-scope="data">
            <p class="textCol">{{data.item.language}}</p>
          </template>
          <template slot="[translation]" slot-scope="data">
            <p class="textCol">{{data.item.translation}}</p>
          </template>
          <template slot="[remarks]" slot-scope="data">
            <p class="textCol">{{data.item.remarks}}</p>
          </template>

          <template slot="[customer_name]" slot-scope="data">
            <p class="textCol">{{data.item.customer_name}}</p>
          </template>

          <template slot="[Actions]" slot-scope="data">
            <b-row class="justify-content-md-center forSize">
              <b-col cols="4" offset-md="3">
                <EditTblMain :device="data.item" @selectModal="selectModal" />
              </b-col>
              <b-col cols="5">
                <b-button
                  size="sm"
                  class="material-icons sizingOne"
                  @click="deleteDevice(data.item)"
                  variant="danger"
                >delete</b-button>
              </b-col>
            </b-row>
          </template>

          <template slot="[device_id]" slot-scope="data">
            <router-link :to="'/callrecords/'+data.item.device_id">{{data.item.device_id}}</router-link>
          </template>
        </b-table>

        <b-row>
          <b-col>
            <div class="pagination justify-content-end">
              <b-pagination
                id="valBorder"
                v-model="currentPageall"
                :total-rows="rowsMain"
                :per-page="perpageMain"
                v-show="showtable"
              ></b-pagination>
            </div>
          </b-col>
        </b-row>
        <br />
        <br />
        <center>
          <h4 v-show="NoMatchFound">No Match Found . . .</h4>
        </center>

        <b-modal
          id="modal-Delete"
          centered
          :header-class="['backHeaderColor', 'textColor']"
          :body-class="'bodyBackcolor'"
          :footer-class="['backHeaderColor', 'textColor']"
        >
          <template>
            <h5>Please Confirm!</h5>
          </template>

          <template>
            <p>Are you sure you want to Delete ? "{{selectedDevice.device_name}}" "{{this.selectedDevice.mac_address}}"</p>
          </template>

          <template v-slot:modal-footer>
            <b-button variant="danger" @click="confirmYes()">Yes</b-button>

            <b-button variant="secondary" @click="$bvModal.hide('modal-Delete')">No</b-button>
          </template>
        </b-modal>

        <b-modal
          id="modal-Device"
          title="Edit Device "
          @hidden="reset"
          @ok="handleOk"
          :header-class="['backHeaderColor', 'textColor']"
          :body-class="'bodyBackcolor'"
          :footer-class="['backHeaderColor', 'textColor']"
        >
          <b-form-group label="MAC Address:">
            <b-form-input
              v-model="selectedDevice.mac_address"
              type="text"
              placeholder="Enter MAC Address"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Customer Name:">
            <b-form-input
              v-model="selectedDevice.customer_name"
              type="text"
              placeholder="Enter Customer Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Device Name:">
            <b-form-input
              v-model="selectedDevice.device_name"
              type="text"
              placeholder="Enter Device Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Telephone Number:">
            <b-form-input
              v-model="selectedDevice.tel_number"
              type="number"
              placeholder="Enter Telephone Number"
            ></b-form-input>
          </b-form-group>


          <b-row>
            <b-col>
              <b-form-group label="language:">
                <b-form-select
                  v-model="selectedDevice.language"
                  placeholder="Enter Language"
                  :options="optionsLanguage"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Translation:">
                <b-form-select v-model="selectedDevice.translation" :options="TranslateOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Remarks:">
            <b-form-textarea
              id="textarea"
              v-model="selectedDevice.remarks"
              placeholder="Enter Remarks..."
              rows="2"
              max-rows="2"
            ></b-form-textarea>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group label="SIP Host">
                <b-form-input
                  v-model="selectedDevice.sip_host"
                  placeholder="Enter Host"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="SIP Port">
                <b-form-input
                  v-model="selectedDevice.sip_port"
                  placeholder="Enter port"
                  type="number"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group label="SIP Username">
                <b-form-input
                  v-model="selectedDevice.sip_username"
                  placeholder="Enter Username"
                  type="text"
                ></b-form-input>
                <p
                  v-show="checkValidusername"
                  id="errorColor"
                >The last character should be a number.</p>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group label="SIP Password">
                <b-form-input
                  v-model="selectedDevice.sip_password"
                  placeholder="Enter Password"
                  type="password"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import InputSearch from "../components/InputSearch.vue";
import Btnmodal from "../components/BtnModal.vue";
import EditTblMain from "../components/EditTblMain.vue";
export default {
  name: "Tablemain",
  data() {
    return {
      testThis: "Disabled",
      // camel casing for variables!
      currentPageall: this.currentpageDeviceall,
      headerBgVariant: "primary",
      footerBgVariant: "secondary",
      searchAccount: "",
      inputVal: "",
      selectedDevice: {},
      searchKey: "",
      MakeBlank: "",
      showColumn: false,
      checkValidusername: false,
      emptyInput: "",

      enableThis: true,
      disableThis: false,

      fieldsAllDevice: [
        { isActive: false, label: "Device ID", key: "device_id" },
        { isActive: false, label: "MAC Address", key: "mac_address" },
        { isActive: false, label: "Device Name", key: "device_name" },
        { isActive: false, label: "Telephone Number", key: "tel_number" },
        { isActive: false, label: "Language", key: "language" },
        { isActive: false, label: "Translation", key: "translation" },
        { isActive: false, label: "Remarks", key: "remarks" },
        { isActive: false, label: "Cutomer Name", key: "customer_name" },
        { label: "Action", key: "Actions" }
      ],

      fieldsFindAccount: [
        { label: "Device ID", key: "device_id" },
        { label: "MAC Address", key: "mac_address" },

        { label: "Device Name", key: "device_name" },
        { label: "Telephone Number", key: "tel_number" },
        { label: "Language", key: "language" },
        { label: "Translation", key: "translation" },
        { label: "Remarks", key: "remarks" },
        { label: "Cutomer Name", key: "customer_name" },
        { label: "Action", key: "Actions" }
      ],

      // options: [
      //   { value: "Enable", text: "Enable" },
      //   { value: "Disable", text: "Disable" }
      // ],

      optionsLanguage: [
        { value: "English", text: "English" },
        { value: "Chinese", text: "Chinese" },
        { value: "Japanese", text: "Japanese" },
        { value: "German", text: "German" },
        { value: "Spanish", text: "Spanish" },
        { value: "French", text: "French" },
        { value: "Italian", text: "Italian" },
        { value: "Korean", text: "Korean" },
        { value: "Russian", text: "Russian" },
        { value: "Portuguese", text: "Portuguese" },
        { value: "Hindi", text: "Hindi" },
        { value: "Arabic", text: "Arabic" },
        { value: "Thai", text: "Thai" },
        { value: "Vietnamese", text: "Vietnamese" }
      ],


      TranslateOptions: [
        { value: "Disabled", text: "Disabled" },
        { value: "English", text: "English" },
        { value: "Chinese", text: "Chinese" },
        { value: "Japanese", text: "Japanese" },
        { value: "German", text: "German" },
        { value: "Spanish", text: "Spanish" },
        { value: "French", text: "French" },
        { value: "Italian", text: "Italian" },
        { value: "Korean", text: "Korean" },
        { value: "Russian", name: "Russian" },
        { value: "Portuguese", text: "Portuguese" },
        { value: "Hindi", text: "Hindi" },
        { value: "Arabic", text: "Arabic" },
        { value: "Thai", text: "Thai" },
        { value: "Vietnamese", text: "Vietnamese" }
      ]
    }; //closing return
  },

  props: [
    "devicesAll",

    "searchFlag",
    "vuexAccount",

    "NoMatchFound",

    "accountId",
    "accntId",
    "userId",
    "showFind",
    "showtable",

    "currentpageDeviceall",
    "rowsMain",
    "perpageMain",
    "showDisplay",
    "noDataFound",
    "backId",
    "showHome",
    "backDev"
  ],

  methods: {
    searchSubmit(stringVal) {
      this.searchKey = stringVal;

      if (this.accntId != 0) {
        this.currentPageall = 1;
        let findSearchDevice = {
          thisId: this.accntId,
          search: this.searchKey,
          page: 1
        };
        this.$emit("findDeviceaccnt", findSearchDevice);
      } else {
        this.currentPageall = 1;
        let requestSearch = {
          search: this.searchKey,
          page: 0
        };

        this.$emit("backDev", requestSearch);
      }
    },
    findAccount(objVal) {
      if (this.searchAccount != 0) {
        this.inputVal = objVal
        let requestObj = {
          name: this.searchAccount
        };
        this.$emit("emitFindAccount", requestObj);
      } else {
        this.currentPageall = 1;
        this.$emit("emitAlldevice");
      }
    },

    backAccountId(objVal) {
      if (this.searchAccount != 0) {
        this.searchKey = "";
        this.MakeBlank = "";
        this.MakeBlank = objVal;
        let requestObj = {
          name: this.searchAccount
        };
        this.$emit("emitFindAccount", requestObj);
      } else {
        this.$emit("emitAlldevice");
      }
    },

    backAccount(objVal) {
      this.MakeBlank = objVal;
      if (this.accntId != 0) {
        this.currentPageall = 1;
        this.searchAccount = "";
        this.searchKey = "";
        let requestObj = {
          url: null,
          page: 1
        };
        this.$emit("findDev", requestObj);
      } else {
        this.searchAccount = "";
        this.searchKey = "";

        let requestObj = {
          url: null,
          page: 1
        };
        this.currentPageall = 1;
        this.$emit("findDev", requestObj);
      }
    },

    selectModal(receiceDevice) {
      this.$bvModal.show("modal-Device");
      this.selectedDevice = receiceDevice;
    },

    callSuperparent(receiceObj) {
      this.$emit("findaddDeviceparent", receiceObj);
    },

    deleteDevice(receiveDevice) {
      this.selectedDevice = receiveDevice;
      this.$bvModal.show("modal-Delete");
    },

    confirmYes() {
      let requestObj = {
        DevId: this.selectedDevice.device_id,
        UserId: this.userId
      };
      this.$emit("emitYes", requestObj);
      this.$bvModal.hide("modal-Delete");
    },

    reset() {
      let obj = {
        thisId: this.accntId,
        page: this.currentPageall
      };
      this.$emit("emitCanseledit", obj);
    },

    handleOk(value) {
      let checkLastCharuser = this.selectedDevice.sip_username.slice(-1);

      if (isNaN(checkLastCharuser)) {
        (this.checkValidusername = true), value.preventDefault();
      } else {
        this.checkValidusername = false;

        let updateObj = {
          id: this.selectedDevice.device_id,
          macAddress: this.selectedDevice.mac_address,
          customerName: this.selectedDevice.customer_name,
          deviceName: this.selectedDevice.device_name,
          telNumber: this.selectedDevice.tel_number,
          language: this.selectedDevice.language,
          translation: this.selectedDevice.translation,
          remarks: this.selectedDevice.remarks,
          host: this.selectedDevice.sip_host,
          port: this.selectedDevice.sip_port,
          username: this.selectedDevice.sip_username,
          password: this.selectedDevice.sip_password
        };

        this.$emit("emitEditdev", updateObj);
      }
    }
  },

  watch: {
    currentPageall: {
      handler: function(valueObj) {
        if (valueObj == null) {
          this.currentPageall = 1;
        } else {
        
           if (this.accntId != 0 && this.searchKey.length ==0) {
            let requestSearch = {
              thisId: this.accntId,
              search: this.searchKey,
              page: 0
            };
            requestSearch.page = valueObj;
            this.$emit("findDeviceaccnt", requestSearch);
          }
           else if (this.searchKey != 0 && this.searchAccount == "") {
            let requestSearch = {
              search: this.searchKey,
              page: 0
            };
            requestSearch.page = valueObj;
            this.$emit("backDev", requestSearch);
          }
           else if (
            this.searchAccount != 0 &&
            this.searchKey != 0 &&
            this.accntId != 0
          ) {
            let requestSearch = {
              thisId: this.accntId,
              search: this.searchKey,
              page: 0
            };
            requestSearch.page = valueObj;
            this.$emit("findDeviceaccnt", requestSearch);
          } else {
            let requestObj = {
              url: null,
              page: 0
            };
            requestObj.page = valueObj;
            this.$emit("findDev", requestObj);
          }
        }
      }
    }
  }, //End of watch

  components: {
    Btnmodal,
    EditTblMain,
    InputSearch
  }
};
</script>
<style>
.table-striped > tbody > tr:nth-child(even) > td,
.table-striped > tbody > tr:nth-child(even) > th {
  background-color: #fff8da;
}

.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #ffeab8;
}

.table-striped > thead {
  background-color: #985b47;
  color: #fff8da;
}

.textCol {
  color: #985b47;
}

#valBorder {
  border-radius: 5px;
  border: 1px solid #985b47;
}

.pagination .page-item.active .page-link {
  z-index: 1;
  color: #fff8da;
  background-color: #985b47;
  border-color: #985b47;
}
.pagination > li > a {
  color: #985b47;
}

.pagination > li > a:hover {
  color: #985b47;
  background-color: white;
}

td:nth-child(1n + 1) {
  border-color: #985b47;
}

.table-bordered > td:nth-child(1n + 1) {
  border: solid 2px red;
}

.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > td {
  border: solid 1px #985b47;
}

#valBorder::placeholder {
  color: #985b47;
}

.filCol {
  color: #985b47;
  text-align: left;
}

.forSize {
  width: 150px;
}

.forColor {
  border: solid 2px red;
}

#backColor {
  background-color: #985b47;
}
#errorColor {
  font-size: 13px;
  color: red;
}

.sizingOne{
  height: 40px;
  width: 40px;
}


</style>