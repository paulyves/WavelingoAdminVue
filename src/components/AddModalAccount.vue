<template>
  <div class="addAccount">
    <b-button @click="modalShow" id="backColor">Add Accounts</b-button>
    <b-modal
      id="modal-Show"
      title="Add Account"
      @ok="handleOk"
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']"
    >
      <b-row>
        <b-col>
          <b-form-group label="Acount name:">
            <b-form-input v-model="accountName" type="text" placeholder="Enter Full Name" v-on:blur="validateAName"></b-form-input>
            <p v-show="validAccountname" id="errorColor">Required field</p>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Contact Number:">
            <b-form-input v-model="contactNumber" type="number" placeholder="Enter Number" v-on:blur="validConNum"></b-form-input>
            <p v-show="validContactno" id="errorColor">Required field</p>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-group label=" Default Language:">
        <!-- <b-form-input v-model="defLanguage" type="text"></b-form-input> -->
        <b-form-select
          v-model="defLanguage"
          :options="languageOptions"
          value-field="item"
          text-field="name"
          v-on:blur="valDefLanguage"
        ></b-form-select>

        <p v-show="validDeflanguage" id="errorColor">Required field</p>
      </b-form-group>

      <b-form-group label=" Email:">
        <b-form-input v-model="eMail" type="email" placeholder="Enter Email" v-on:blur="valEmail(eMail)"></b-form-input>
        <p v-show="validEmail" id="errorColor">Required field</p>
        <p v-show="notValidEmail" id="errorColor">You have entered an invalid email address!</p>
      </b-form-group>

      <b-row>
        <b-col>
          <b-form-group label=" Website:">
            <b-form-input v-model="useURL" type="url" required placeholder="Enter URL" v-on:blur="valURL"></b-form-input>
            <p v-show="validURL" id="errorColor">Required field</p>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label=" Update Frequency:">
            <b-form-input
              v-model="updateFrequen"
              type="number"
              required
              placeholder="Enter Frequency"
              v-on:blur="valUpdateFrequen"
            ></b-form-input>
            <p v-show="validFreque" id="errorColor">Required field</p>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group label=" Protect Capacity:">
            <b-form-input
              v-model="protectCapacity"
              type="number"
              placeholder="Enter Protect Capacity"
              v-on:blur="valProCap"
            ></b-form-input>
            <p v-show="validProtectCap" id="errorColor">Required field</p>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label=" Total Capacity:">
            <b-form-input v-model="protectTotal" type="number" placeholder="Enter Total Capacity" v-on:blur="valProTotal"></b-form-input>
            <p v-show="validTotalCap" id="errorColor">Required field</p>
          </b-form-group>
        </b-col>
      </b-row>
      <br />
      <hr id="toLine" />

      <b-form-group label=" Email:">
        <b-form-input v-model="eMail" type="email" placeholder="Enter  Email" v-on:blur="valEmail(eMail)"></b-form-input>
        <p v-show="validEmail" id="errorColor">Required field</p>
      </b-form-group>

      <b-form-group label="Password:">
        <b-form-input v-model="password" type="password" placeholder="Enter Password" v-on:blur="valNewPass"></b-form-input>
        <!-- <p v-show="validShow" id="validColor">Password Not Match</p> -->
        <p v-show="validNewPass" id="errorColor">Required field</p>
      </b-form-group>

      <b-form-group label="Confirm Password:">
        <b-form-input
          v-model="Confirmpassword"
          type="password"
          placeholder="Enter Confirm Password"
          v-on:blur="valConPass"
        ></b-form-input>
        <p v-show="validConfirmpass" id="errorColor">Required field</p>
        <p v-show="validPassmatch" id="validColor">Password Not Match</p>
      </b-form-group>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="resetModal">No</b-button>
        <b-button variant="primary" @click="handleOk">Yes</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "addmodalAccount",

  data() {
    return {
      defLanguage: "English",
      accountName: "",
      eMail: "",
      contactNumber: "",
      useURL: "",
      protectCapacity: "",
      protectTotal: "",
      password: "",
      Confirmpassword: "",
      updateFrequen: "",

      validAccountname: false,
      validContactno: false,
      validEmail: false,
      validURL: false,
      validProtectCap: false,
      validTotalCap: false,

      validNewPass: false,
      validConfirmpass: false,

      validPassmatch: false,
      validFreque: false,
      validDeflanguage: false,
      notValidEmail: false,

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
      ]
    };
  },

  methods: {
    modalShow() {
      (this.accountName = ""),
        (this.eMail = ""),
        (this.contactNumber = ""),
        (this.useURL = ""),
        (this.protectCapacity = ""),
        (this.protectTotal = ""),
        (this.validPassmatch = false),
        (this.validAccountname = false);
      this.validContactno = false;
      this.validURL = false;
      this.validProtectCap = false;
      this.validTotalCap = false;
      this.validConfirmpass = false;
      this.validEmail = false;
      this.validNewPass = false;
      this.validFreque = false;
      this.defLanguage = "English";
      this.validDeflanguage = false;
      this.updateFrequen = "";
      this.notValidEmail = false,
      this.$bvModal.show("modal-Show");
    },

    modalHide() {
      this.$bvModal.hide("modal-Show");
    },
    resetModal() {
      (this.accountName = ""),
        (this.eMail = ""),
        (this.contactNumber = ""),
        (this.useURL = ""),
        (this.protectCapacity = ""),
        (this.protectTotal = ""),
        (this.validPassmatch = false),
        (this.validAccountname = false);
      this.validContactno = false;
      this.validURL = false;
      this.validProtectCap = false;
      this.validTotalCap = false;
      this.validConfirmpass = false;
      this.validEmail = false;
      this.validNewPass = false;
      this.validFreque = false;
      this.defLanguage = "English";
      this.validDeflanguage = false;
      this.updateFrequen = "";
      this.notValidEmail = false,
      this.$bvModal.hide("modal-Show");
    },

    validateAName(){
      if (this.accountName.length == 0) {
        this.validAccountname = true;
      } else {
        this.validAccountname = false;
      }
    },

    validConNum(){
      if (this.contactNumber.length == 0) {
        this.validContactno = true;
      } else {
        this.validContactno = false;
        
      }
    },

    valDefLanguage(){
      if (this.defLanguage.length == 0) {
        this.validDeflanguage = true;
      } else {
        this.validDeflanguage = false;
      }
    },

    valEmail(objVal){
      if (this.eMail.length == 0) {
        this.validEmail = true;
        this.notValidEmail = false;
      } else {
        this.validEmail = false;
        this.notValidEmail = false;
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objVal)){ 
         return (true)
        }
        this.notValidEmail = true;
        return (false)
      }
    },

    valURL(){
      if (this.useURL.length == 0) {
        this.validURL = true;
      } else {
        this.validURL = false;
        
      }
    },

    valUpdateFrequen(){
      if (this.updateFrequen.length == 0) {
        this.validFreque = true;
      } else {
        this.validFreque = false;
      }
    },

    valProCap(){
      if (this.protectCapacity.length == 0) {
        this.validProtectCap = true;
      } else {
        this.validProtectCap = false;
        
      }
    },

    valProTotal(){
      if (this.protectTotal.length == 0) {
        this.validTotalCap = true;
      } else {
        this.validTotalCap = false;
        
      }
    },
    
    valNewPass(){
      if (this.password.length == 0) {
        this.validNewPass = true;
      } else {
        this.validNewPass = false;
        
      }
    },

    valConPass(){
      if (this.Confirmpassword.length ==0) {
        this.validConfirmpass = true;
      } else {
        this.validConfirmpass = false;

        if (this.password != this.Confirmpassword) {
          this.validPassmatch = true;
        } else {
          this.validPassmatch = false;
          
        }
        
      }
    },


    handleOk() {
      if (this.accountName == "") {
        this.validAccountname = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validAccountname = false;
      }

      if (this.eMail == "") {
        this.validEmail = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validEmail = false;
      }

      if (this.contactNumber == "") {
        this.validContactno = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validContactno = false;
      }

      if (this.useURL == "") {
        this.validURL = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validURL = false;
      }

      if (this.protectCapacity == "") {
        this.validProtectCap = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validProtectCap = false;
      }

      if (this.protectTotal == "") {
        this.validTotalCap = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validTotalCap = false;
      }

      if (this.password == "") {
        this.validNewPass = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validNewPass = false;
      }

      if (this.Confirmpassword == "") {
        this.validConfirmpass = true;
        this.validPassmatch = false;
        this.$bvModal.show("modal-Show");
      } else {
        this.validConfirmpass = false;
        this.validPassmatch = false;
      }

      if (this.defLanguage == "") {
        this.validDeflanguage = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validDeflanguage = false;
      }

      if (this.updateFrequen == "") {
        this.validFreque = true;
        this.$bvModal.show("modal-Show");
      } else {
        this.validFreque = false;
      }

      if (this.password != "" && this.Confirmpassword == "") {
        this.validPassmatch = false;
        this.$bvModal.show("modal-Show");
        console.log("wewe")
      } else {
        this.validPassmatch = true;
        //  console.log("else")
        
      }

      if (this.password  != this.Confirmpassword ) {
        this.validPassmatch = true;
        // alert("hinid match")
        this.$bvModal.show("modal-Show");
      } else {
        this.validPassmatch = false;
        // console.log("okay Add Successfull")
      
        if (
          this.accountName != "" &&
          this.defLanguage != "" &&
          this.eMail != "" &&
          this.updateFrequen != "" &&
          this.contactNumber != "" &&
          this.useURL != "" &&
          this.protectCapacity != "" &&
          this.protectTotal != "" &&
          this.password != "" &&
          this.Confirmpassword != ""
        ) {
          let obj = {
            AccountName: this.accountName,
            ContactNumber: this.contactNumber,
            Email: this.eMail,
            URL: this.useURL,
            updateFrequency: this.updateFrequen,
            ProtectionCapacity: this.protectCapacity,
            ProtectionTotal: this.protectTotal,
            password: this.Confirmpassword,
            defaultLanguage: this.defLanguage
          };
          this.$emit("sendAddaccount", obj);
          this.resetModal();
            this.modalHide();
        }

      }
    }


  }
};
</script>

<style scoped>
#toLine {
  border: solid 1px;
}

#validColor {
  color: red;
}
#errorColor {
  color: red;
}

#backColor {
  background-color: #985b47;
}
</style>