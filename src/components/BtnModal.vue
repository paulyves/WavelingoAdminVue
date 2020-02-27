
<template>
  <div class="BntModal">
    <b-row>
      <b-col sm="12">
        <b-button @click="$bvModal.show('modal-call')" id="backColor">Add&nbsp;Device</b-button>
      </b-col>
    </b-row>

    <b-modal
      id="modal-call"
      @hidden="resetModal"
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']"
    >
      <template v-slot:modal-title>
        <h5>Add Device</h5>
      </template>

      <template>
        <b-row>
          <b-col>
            <b-form-group label="MAC Address">
              <b-form-input
                v-model="forMacaddress"
                type="text"
                required
                placeholder="Enter MAC address"
                maxlength="17"
                v-on:blur="valMacAddress"
              ></b-form-input>

              <!-- <p v-show="errorSerial" id="errorColor">The last character should be a number.</p> -->
              <p v-show="checkValidmac" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="SIP Server Host">
              <b-form-input
                v-model="hostValue"
                type="text"
                required
                placeholder="Enter SIP Server Host"
                v-on:blur="valHostValue"
              ></b-form-input>
              <p v-show="checkValidhost" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Device Name">
              <b-form-input
                v-model="deviceName"
                type="text"
                required
                placeholder="Enter Device Name"
                v-on:blur="valDevName"
              ></b-form-input>
              <p v-show="checkvalidDeviceName" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="SIP Server Port">
              <b-form-input type="text" v-model="sipPort" placeholder="Enter SIP Server Port"></b-form-input>
              <p v-show="checkValidsipPort" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />

        <b-row>
          <b-col>
            <b-form-group label="SIP Username">
              <b-form-input v-model="userName" type="text" required placeholder="Enter Username" v-on:blur="valSIPusername"></b-form-input>

              <p v-show="erRor" id="errorColor">The last character should be a number.</p>
              <p v-show="checkvalidSIPuser" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="SIP Password">
              <b-form-input
                v-model="passwordValue"
                type="password"
                required
                placeholder="Enter Password"
                v-on:blur="valSIPpassword"
              ></b-form-input>
              <p v-show="checkValidpass" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label="Telephone Number:">
              <b-form-input
                v-model="telNo"
                type="number"
                required
                placeholder=" Enter Telephone Number"
                v-on:blur="valTepNum"
              ></b-form-input>
              <p v-show="checkValidtelno" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Customer Name">
          <b-form-input
            v-model="customerName"
            type="text"
            required
            placeholder="Enter Customer Name"
            v-on:blur="valCustomerName"
          ></b-form-input>
          <p v-show="checkValidcustomer" id="errorColor">Required field</p>
        </b-form-group>

        <b-row>
          <b-col>
            <b-form-group label="Default Language:">
              <b-form-select
                v-model="chooseLanguage"
                :options="languageOptions"
                value-field="item"
                text-field="name"
                v-on:blur="valChoiseLanguage"
              >
                <!-- <option disabled value>Please select Language</option>
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
                <option value="Spanish">Spanish</option>-->
              </b-form-select>
              <p v-show="checkValchooseLanguage" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Translation">
              <b-form-select
                v-model="chooseTranslation"
                :options="TranslationOptions"
                value-field="item"
                text-field="name"
                v-on:blur="valTranslation"
              >
                <!-- <option disabled value>Please select Translation</option>
                <option value="Disable">Disable</option>-->
                <!-- <option value="Enable" label="hello">{{chooseTranslation}}</option> -->
              </b-form-select>
              <p v-show="checkValchooseTranslation" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label="Number Of Device">
              <b-form-input v-model="numOfdev" type="number" required placeholder="Enter Number"  v-on:blur="valNumDev"></b-form-input>

              <p v-show="checkValidnum" id="errorColor">Required field</p>
            </b-form-group>
          </b-col>
        </b-row>
      </template>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click=" resetModal">No</b-button>
        <b-button variant="success" @click="handleOk">Yes</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "btnModall",

  data() {
    return {
      // snValue: "",
      hostValue: "",
      sipPort: 5060,
      userName: "",
      passwordValue: "",
      deviceName: "",
      telNo: "",
      chooseLanguage: "English",
      chooseTranslation: "Disabled",
      numOfdev: "",
      accountId: "",
      forMacaddress: "",
      customerName: "",

      // num1Value: "",
      num2Value: "",

      // checkallvalidSerial: false,
      // errorSerial: false,
      checkValidmac: false,
      checkvalidSIPuser: false,
      erRor: false,
      checkValidhost: false,
      checkValidpass: false,
      checkvalidDeviceName: false,
      checkValchooseLanguage: false,
      checkValchooseTranslation: false,
      checkValidsipPort: false,
      checkValidnum: false,
      checkValidtelno: false,
      checkValidcustomer: false,

      languageOptions: [
        { item: "English", name: "English" },
        { item: "Chinese", name: "Chinese" },
        { item: "Japanese", name: "Japanese" },
        { item: "German", name: "German" },
        { item: "Spanish", name: "Spanish" },
        { item: "French", name: "French" },
        { item: "Italian", name: "Italian" },
        { item: "Korean", name: "Korean" },
        { item: "Russian", name: "Russian" },
        { item: "Portuguese", name: "Portuguese" },
        { item: "Hindi", name: "Hindi" },
        { item: "Arabic", name: "Arabic" },
        { item: "Thai", name: "Thai" },
        { item: "Vietnamese", name: "Vietnamese" }
      ],

      TranslationOptions: [
        { item: "Disabled", name: "Disabled" },
        { item: "English", name: "English" },
        { item: "Chinese", name: "Chinese" },
        { item: "Japanese", name: "Japanese" },
        { item: "German", name: "German" },
        { item: "Spanish", name: "Spanish" },
        { item: "French", name: "French" },
        { item: "Italian", name: "Italian" },
        { item: "Korean", name: "Korean" },
        { item: "Russian", name: "Russian" },
        { item: "Portuguese", name: "Portuguese" },
        { item: "Hindi", name: "Hindi" },
        { item: "Arabic", name: "Arabic" },
        { item: "Thai", name: "Thai" },
        { item: "Vietnamese", name: "Vietnamese" }
      ]
    };
  },

  props: ["AddDevice", "accoutId"],

  methods: {
    resetModal() {
      // (this.snValue = ""),
      (this.userName = ""),
        (this.hostValue = ""),
        (this.passwordValue = ""),
        (this.deviceName = ""),
        (this.chooseLanguage = "English"),
        (this.chooseTranslation = "Disabled"),
        (this.sipPort = "5060"),
        (this.numOfdev = ""),
        (this.telNo = ""),
        (this.customerName = ""),
        (this.forMacaddress = ""),
        (this.checkValidtelno = null);

      // (this.errorSerial = false),
      (this.checkValidmac = false),
        (this.checkvalidSIPuser = false),
        (this.erRor = false),
        (this.checkValidhost = false),
        (this.checkValidpass = false),
        (this.checkvalidDeviceName = false),
        (this.checkValchooseLanguage = false),
        (this.checkValchooseTranslation = false),
        (this.checkValidsipPort = false),
        (this.checkValidnum = false),
        (this.checkValidtelNo = false),
        (this.checkValidcustomer = false),
        this.$bvModal.hide("modal-call");
    },

    valMacAddress(){
      if (this.forMacaddress.length == 0) {
        this.checkValidmac = true;
      } else {
        this.checkValidmac = false;
        
      }
    },

    valHostValue(){
      if (this.hostValue.length == 0) {
        this.checkValidhost = true;
      } else {
        this.checkValidhost = false;
        
      }
    },

    valDevName(){
      if (this.deviceName.length == 0) {
        this.checkvalidDeviceName = true;
      } else {
        this.checkvalidDeviceName = false;
        
      }
    },
    valSIPusername(){
      let checkLastCharUser = this.userName.slice(-1);
      if (this.userName.length == 0) {
        this.checkvalidSIPuser = true;
        this.erRor = false;
      } else {
        this.checkvalidSIPuser = false;
         if (isNaN(checkLastCharUser)) {
          this.erRor = true;
          this.checkvalidSIPuser = false;
        } else {
          this.num2Value = checkLastCharUser;
          this.erRor = false;
          this.checkvalidSIPuser = false;

          // console.log(this.num2Value, "Username");
        }
      }
    },

    valSIPpassword(){
      if (this.passwordValue.length == 0) {
        this.checkValidpass = true;
      } else {
        this.checkValidpass = false;       
      }
    },

    valTepNum(){
      if (this.telNo.length == 0) {
        this.checkValidtelno = true;
      } else {
        this.checkValidtelno = false;
        
      }
    },
    valCustomerName(){
      if (this.customerName.length == 0) {
        this.checkValidcustomer = true;
      } else {
        this.checkValidcustomer = false;
        
      }
    },

    valChoiseLanguage(){
      if (this.chooseLanguage.length == 0) {
        this.checkValchooseLanguage = true;
      } else {
        this.checkValchooseLanguage = false;
        
      }
    },
    valTranslation(){
      if (this.TranslationOptions.length ==0) {
        this.checkValchooseTranslation = true;
      } else {
        this.checkValchooseTranslation = false;
        
      }
    },

    valNumDev(){
      if (this.numOfdev.length == 0) {
        this.checkValidnum = true;
      } else {
        this.checkValidnum = false;
        
      }
    },



    handleOk() {
      // let checkLastCharSerial = this.snValue.slice(-1);
      let checkLastCharUser = this.userName.slice(-1);

      this.$bvModal.show("modal-call");

      if (this.forMacaddress == "") {
        this.checkValidmac = true;
      } else {
        this.checkValidmac = false;
      }

      if (this.userName == "") {
        this.checkvalidSIPuser = true;
        this.erRor = false;
      }

      if (this.userName != "") {
        if (isNaN(checkLastCharUser)) {
          this.erRor = true;
          this.checkvalidSIPuser = false;
        } else {
          this.num2Value = checkLastCharUser;
          this.erRor = false;
          this.checkvalidSIPuser = false;

          // console.log(this.num2Value, "Username");
        }
      }

      if (this.hostValue == "") {
        this.checkValidhost = true;
      } else {
        this.checkValidhost = false;
      }

      if (this.passwordValue == "") {
        this.checkValidpass = true;
      } else {
        this.checkValidpass = false;
      }

      if (this.deviceName == "") {
        this.checkvalidDeviceName = true;
      } else {
        this.checkvalidDeviceName = false;
      }

      if (this.chooseLanguage == "") {
        this.checkValchooseLanguage = true;
      } else {
        this.checkValchooseLanguage = false;
      }

      if (this.chooseTranslation == "") {
        this.checkValchooseTranslation = true;
      } else {
        this.checkValchooseTranslation = false;
      }

      if (this.sipPort == "") {
        this.checkValidsipPort = true;
      } else {
        this.checkValidsipPort = false;
      }

      if (this.numOfdev == "") {
        this.checkValidnum = true;
        // console.log("see is 0")
      } else {
        this.checkValidnum = false;
      }

      if (this.telNo == "") {
        this.checkValidtelno = true;
      } else {
        // console.log(value ,"may laman")
        this.checkValidtelno = false;
      }

      if (this.customerName == "") {
        this.checkValidcustomer = true;
      } else {
        this.checkValidcustomer = false;
      }

      if (
        // this.num1Value != "" &&
        this.num2Value != "" &&
        this.hostValue != "" &&
        this.passwordValue != "" &&
        this.deviceName != "" &&
        this.chooseLanguage != "" &&
        this.chooseTranslation != "" &&
        this.sipPort != "" &&
        this.numOfdev != "" &&
        this.telNo != 0 &&
        this.forMacaddress != "" &&
        this.customerName != ""
      ) {
        let Add = {
          // SerialNumber: this.snValue,
          macAddress: this.forMacaddress,
          sipUserName: this.userName,
          Host: this.hostValue,
          SipPassword: this.passwordValue,
          DeviceName: this.deviceName,
          Language: this.chooseLanguage,
          Translation: this.chooseTranslation,
          SipPort: this.sipPort,
          NumberOfDevice: this.numOfdev,
          TelNumber: this.telNo,
          AccountId: this.accoutId,
          customerName: this.customerName
        };
        this.$emit("addDevice", Add);
        alert(this.numOfdev + " Add Sucessfull");
        this.$bvModal.hide("modal-call");
        this.resetModal();
      }
      //  else {
      //   alert("invalid Add Device");
      // }
    }
  }
};
</script>

<style >
select option[value="z"] {
  color: green;
}

#errorColor {
  font-size: 13px;
  color: red;
}
.backHeaderColor {
  background-color: #985b47;
}
.textColor {
  color: #fff8da;
}

.bodyBackcolor {
  background-color: #fff8da;
}
</style>