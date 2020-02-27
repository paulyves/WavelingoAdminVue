<template>
  <div>
    <b-row>
      <b-col>
        <b-button
          v-b-modal.modal-prevent-closing
          class="material-icons"
          variant="primary"
        >person_add</b-button>
      </b-col>
    </b-row>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Users"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']">
    
      <form>
        <b-form-group label="Full Name:">
         
          <b-form-input v-model="fullName" type="text" placeholder="Enter Full Name" v-on:blur="validFullName"></b-form-input>
          <p v-show="valid" class="val">"Required field"</p>
        </b-form-group>

        <b-form-group label="UserType:">
          
          <!-- User Type-->
          <b-form-select v-model="userTypee" type="text" :options="UserTypes" v-on:change="validUserTypee"></b-form-select>

          <p v-show="validuser" class="val">"Required field"</p>
        </b-form-group>

        <b-form-group label-for="check" label="Email:">
          
          <b-form-input
            id="check"
            v-model="emaill"
            type="email"
            required
            placeholder="example@.com"
            v-on:blur="validEmaill(emaill)"
          ></b-form-input>
          <p v-show="validEm" class="val">"Required field"</p>
          <p v-show="validNotEm" class="val">"You have entered an invalid email address!"</p>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input v-model="inputPassword" type="password" placeholder="Enter Password" v-on:blur="validInputPassword"></b-form-input>
          <p v-show="validPass" class="val">"Required field"</p>
        </b-form-group>
        
        <b-form-group label="Confirm Password:">
          <b-form-input v-model="inputPasswordConfirm" type="password" placeholder="Confirm Password" v-on:blur="validPassConfirmPass"></b-form-input>
          <p v-show="validPassConfirm" class="val">"Required field"</p>
          <p v-show="validPassConfirmMatch" class="val">"Password not Match"</p>
         
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalAddUser",

  data() {
    return {
      // came case
      name: "",
      nameState: null,
      submittedNames: [],
      UserTypes: [
        { value: "admin", text: "admin" },
        { value: "user", text: "user" }
      ],

      valid: false,
      validuser: false,
      validEm: false,
      validPass: false,
      validPassConfirm: false,
      validPassConfirmMatch: false,
      validNotEm:false,

      selectedL: "null",
      selectedT: "null",

      headerBgVariant: "primary",
      footerBgVariant: "secondary",

      fullName: "",
      userTypee: "",
      emaill: "",
      inputPassword: "",
      inputPasswordConfirm: ""
    };
  },

  props: ["AccountId", "AddAccount", "CurrentPage"],

  methods: {
    // ...mapActions(["CallAddUser", "callUsers" ]),

    validFullName(){
      if (this.fullName.length == 0) {  
       this.valid = true;
      }else{
        this.valid = false;
      }
    },
    validUserTypee(){
        if (this.userTypee.length == 0) {
        this.validuser = true;
      
      }else{
         this.validuser = false;
      } 
    },

    validEmaill(objVal){
       if (this.emaill.length == 0) {
        this.validEm = true;
        this.validNotEm = false;
      }else{
        this.validEm = false;
        this.validNotEm = false;
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objVal)){ 
         return (true)
        }
         this.validNotEm = true;
        return (false)
        }
        
      
    },

    validInputPassword(){
       if (this.inputPassword.length == 0) {
         this.validPass = true;
      }else{
        this.validPass = false;
      }

    },
    validPassConfirmPass(){
       if (this.inputPasswordConfirm.length == 0) {
         this.validPassConfirm = true;
         this.validPassConfirmMatch = false;
      }else{
        this.validPassConfirm = false;
        this.validPassConfirmMatch = false;
      }
      
      if (this.inputPassword != this.inputPasswordConfirm ) {
        this.validPassConfirmMatch = true
      } else {
        this.validPassConfirmMatch = false
      }

    },

    resetModal() {
      (this.fullName = ""),
        (this.userTypee = ""),
        (this.emaill = ""),
        (this.inputPassword = ""),
        this.inputPasswordConfirm = "",
        this.validuser = false,
        this.validEm = false,
        (this.valid = false),
        (this.validPass = false),
       this.validPassConfirm = false,
      this.validPassConfirmMatch = false;
      
    },

    handleOk(valuee) {
      if (this.fullName.length == 0) {
        this.valid = true;
        valuee.preventDefault();
      }else{
        this.valid = false;
      }

       if (this.userTypee.length == 0) {
        this.validuser = true;
        valuee.preventDefault();
      }else{
         this.validuser = false;
      } 

      if (this.emaill.length == 0) {
        this.validEm = true;
        valuee.preventDefault();
      }else{
        this.validEm = false;
      }

       if (this.inputPassword.length == 0) {
         this.validPass = true;
        valuee.preventDefault();
      }else{
        this.validPass = false;
      }

       if (this.inputPasswordConfirm.length == 0) {
         this.validPassConfirm = true;
        valuee.preventDefault();
      }else{
        this.validPassConfirm = false;
      }

      if (this.inputPassword != this.inputPasswordConfirm) {
        this.validPassConfirmMatch = true
        valuee.preventDefault();
      }else{
        this.validPassConfirmMatch = false;
      }

      if (
        this.valid == false &&
        this.validuser == false &&
        this.validEm == false &&
        this.validPass == false &&
        this.validPassConfirm == false &&
        this.validPassConfirmMatch == false
      ) {
          let objVal = {
          aCcountId: this.AccountId,
          fullName: this.fullName,
          userType: this.userTypee,
          eMail: this.emaill,
          pasSword: this.inputPassword
        };
         this.$emit("addAccount", objVal);
        this.resetModal()
      }
    }
  },

  watch:{
  
  }
};
</script>

<style scoped>
.val {
  color: red;
}
</style>