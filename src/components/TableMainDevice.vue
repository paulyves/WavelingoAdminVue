<template>
  <div class="TableMainDevice">
    <b-container>
      <br />
      <b-row>
        <b-col class="filCol mt-3">
          <h2>
            <b>Wave Lingo Admin</b>
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
         
        </b-col>
        <b-col sm="4">
          <InputSearch @searchSubmit="searchSubmit" :searchEmpty="inputValString" />
        </b-col>
        <b-col sm="4">
          <div class="pagination justify-content-end mt-5">
            <b-pagination
              id="valBorder"
              v-model="currentMainPage"
              :total-rows="rowMain"
              :per-page="perPage"
              v-show="notShow"
            ></b-pagination>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <router-link
      class="links"
      to="/home"
      v-show="showThis"
      @click.native="backMyaccount(searchKey)"
    >
      <p>&lt;&lt; Back to Home</p>
    </router-link>

    <h4 v-show="showNoResult">Displaying Result For '{{inputValString}}'</h4>
    <b-table
      id="my-table"
      :items="vuexAccount"
      :per-page="0"
      :fields="fields"
      small
      class="table table-bordered table-responsive-md table-striped text-center"
      v-show="notShow"
    >
      <template slot-scope="data">{{data.item.device_id}}</template>

      <template slot-scope="data">{{data.item.serial_number}}</template>

      <template slot="[device_name]" slot-scope="data">{{data.item.device_name}}</template>

      <template slot-scope="data">{{data.item.tel_number}}</template>

      <template slot-scope="data">{{data.item.language}}</template>

      <template slot-scope="data" slot="[translation]">{{data.item.translation}}</template>

      <template slot-scope="data">{{data.item.remarks}}</template>

      <template slot="[Action]" slot-scope="data">
        <EditTblMain :device="data.item" @selectModal="selectModal" />
      </template>

      <template slot="[device_id]" slot-scope="data">
        <router-link :to="'/callrecords/'+data.item.device_id">
          <p class="textCol">{{data.item.device_id}}</p>
          <!-- {{data.item.device_id}} -->
        </router-link>
      </template>
    </b-table>

    <div class="pagination justify-content-end">
      <b-pagination
        id="valBorder"
        v-model="currentMainPage"
        :total-rows="rowMain"
        :per-page="perPage"
        v-show="notShow"
      ></b-pagination>
    </div>

    <br />
    <br />
    <h4 v-show="showNoResult">No Match Found . . .</h4>

    <b-modal
      id="modal-device"
      title="Edit Device "
      @cancel="reset"
      @ok="handleOk"
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']"
    >
      >
      <b-form-group label="Serial Number:" v-show="hideifUser">
        <b-form-input
          v-model="selectedDevice.serial_number"
          type="text"
          placeholder="Enter Serial Number"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Device Name:" v-show="hideifUser">
        <b-form-input
          v-model="selectedDevice.device_name"
          type="text"
          placeholder="Enter Device Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Telephone Number:" v-show="hideifUser">
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
            <b-form-select v-model="selectedDevice.translation" :options="TranslationOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group label="Remarks:">
        <b-form-textarea
          id="textarea"
          v-model="selectedDevice.remarks"
          placeholder="Remarks..."
          rows="2"
          max-rows="2"
        ></b-form-textarea>
      </b-form-group>

      <b-row>
        <b-col>
          <b-form-group label="SIP Host" v-show="hideifUser">
            <b-form-input v-model="selectedDevice.sip_host" placeholder="Enter Host" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="SIP Port" v-show="hideifUser">
            <b-form-input v-model="selectedDevice.sip_port" placeholder="Enter port" type="number"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group label="SIP Username" v-show="hideifUser">
            <b-form-input
              v-model="selectedDevice.sip_username"
              placeholder="Enter Username"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label="SIP Password" v-show="hideifUser">
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
</template>
<script>
import EditTblMain from "../components/EditTblMain.vue";
import InputSearch from "../components/InputSearch.vue";
export default {
  name: "TableMainDevice",
  data() {
    return {
      currentMainPage: this.currentPage,
      headerBgVariant: "primary",
      footerBgVariant: "secondary",
      inputValString: "",
      selectedDevice: {
        device_id: "",
        serial_number: "",
        device_name: "",
        tel_number: "",
        language: "",
        translation: "",
        remarks: "",
        sip_host: "",
        sip_port: "",
        sip_username: ""
      },
      searchKey: "",

      hideifUser: true,

      fields: [
        { label: "Device ID", key: "device_id" },
        { label: "Serial Number", key: "serial_number" },
        { label: "Device Name", key: "device_name" },
        { label: "Telephone Number", key: "tel_number" },
        { label: "Language", key: "language" },
        { label: "Translation", key: "translation" },
        { label: "Remarks", key: "remarks" },
        { label: "SIP Host", key: "sip_host" },
        { label: "SIP Port", key: "sip_port" },
        { label: "SIP Username", key: "sip_username" },
        { label: "Actions", key: "Action" }
      ],
      

      TranslationOptions: [
        // { value: "Enable", text: "Enable" },
        // { value: "Disable", text: "Disable" }
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
      ],

      optionsLanguage: [
        { value: "Tagalog", text: "Tagalog" },
        { value: "English", text: "Filipino" },
        { value: "chinese", text: "chinese" },
        { value: "spanish", text: "spanish" }
      ]
    }; //closing return
  },

  props: [
    "eachAccount",
    "vuexAccount",
    "emitAccount",
    "notShow",
    "userType",
    "currentPage",
    "rowMain",
    "perPage",
    "showNoResult",
    "showThis"
  ],

  methods: {
    backMyaccount(objVal) {
      this.inputValString = objVal;
      this.searchKey = "";
      this.currentMainPage = 1;
      let requestObj = {
        thisId: this.eachAccount,
        page: 1
      };

      
      this.$emit("emitBackAccount", requestObj);
    },

    searchSubmit(string) {
      this.searchKey = string;
      if (this.searchKey == "") {
        let requestObj = {
          thisId: this.eachAccount,
          page: this.currentMainPage
        };
        

        this.$emit("emitAccount", requestObj);
      } else {
        let obj = {
          thisId: this.eachAccount,
          search: this.searchKey,
          page: 1
        };
        this.$emit("emitAccount", obj);
      }
    },

    selectModal(device) {
      this.$bvModal.show("modal-device");
      this.selectedDevice = device;
    },

    reset() {
      let resett = {
        thisId: this.eachAccount,
        page: this.currentMainPage
      };
      this.$emit("emitAccount", resett);
    },

    handleOk() {
      let updateObj = {
        currentPage: this.currentMainPage,
        id: this.selectedDevice.device_id,
        serial_number: this.selectedDevice.serial_number,
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
      this.$emit("emitEditDev", updateObj);
    }
  },

  watch: {
    currentMainPage: {
      handler: function(value) {
        if (this.searchKey != 0) {
          let obj = {
            thisId: this.eachAccount,
            search: this.searchKey,
            page: this.currentMainPage
          };
          this.$emit("emitAccount", obj);
        } else {
          let requestObj = {
            thisId: this.eachAccount,
            page: 0
          };
          requestObj.page = value;

          this.$emit("emitBackAccount", requestObj);
        }
      }
    }
  }, //End of watch

  mounted() {
    if (this.userType == "admin") {
      this.hideifUser = true;
    } else {
      this.validated = false;
      this.hideifUser = false;
    }
  },

  components: {
    EditTblMain,
    InputSearch
  }
};
</script>
<style>
.TableMainDevice {
  height: 100%;
  background-color: #985b47;
}
</style>