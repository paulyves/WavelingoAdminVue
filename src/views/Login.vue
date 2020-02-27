<template>
  <div class="Login">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="border shadow shadow-sm">
          <form class="container">
            <center><img src="https://via.placeholder.com/150" class="mt-4" width="130px"/></center>
            
            <div class="container mt-4">
              <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingEMAIL }">
              
              <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Email"
                />
              
              <small>
                <p class="txtError mt-2" v-if="attemptSubmit && missingEMAIL">Email is required.</p>
              </small>
            </div>

              <div class="form-group">
                <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingPassword }">
              
              <PasswordToggle
                  v-model="password"
                  aria-describedby="passwdHelp"
                  :maxlength="19"
                />
              
              <small>
                <p class="txtError mt-2" v-if="attemptSubmit && missingPassword">Password is required.</p>
                
              </small>
            </div>
              </div>

              <div>
                <!-- <div v-if="attemptSubmit && missingEMAIL">
                  <b-alert variant="danger"  fade show>Email is Required</b-alert>
                </div>
                <div v-if="attemptSubmit && missingPassword">
                  <b-alert variant="danger"  fade show>Password is Required</b-alert>
                </div> -->
                <div v-show="invalid">
                  <b-alert variant="danger"  fade show>Invalid Email/Password!</b-alert>
                </div>
              </div>
              <center>
              <img v-show="loading" src="https://cdn-us-east.velaro.com/Content/Images/loading.gif" height="50px" width="70px" class="mb-3"/>
              </center>
              <b-button @click.prevent="login" class="loginButton" type="submit" :disabled="loading">Login</b-button>
              
            </div>
          </form>

          <div>
            <center>
            <router-link class="forgotButton" to="/forgot"><small>Forgot Password?</small></router-link>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import PasswordToggle from "../components/PasswordToggle";
export default {
  name: "login",
  components: {
    PasswordToggle
  },
  data() {
    return {
      errors: [],
      users: [],
      email:"",
      password:"",
      attemptSubmit: false,
      invalid:false,
      loading : false,
      longInputEmail: false
    };
  },
  computed: {
    ...mapGetters(["getUserType", "getFirstTime", "getAccountId", "getToken"]),
    missingEMAIL: function() {
      return this.email === "";
    },
    missingPassword: function(){
      return this.password === "";
    }
  },

  methods: {
    ...mapActions(["auth"]),
    login() {
      /**click event in logging in */
      this.attemptSubmit = true;
       
      if(this.missingEMAIL || this.missingPassword)
      
      event.preventDefault();

      else {
         const data = {
        email: this.email,
        password: this.password,
        firstTime: this.getFirstTime,
      };
      this.loading = true
      if(this.loading == true){
        this.invalid =false
      }
      this.auth(data)
        .then(() => {
          if(this.getUserType == "super_admin"){
            /**is user type is super admin they will direct to 'HomeSuperUser' */
            this.$router.push({
              name: "HomeSuperUser"
            });
          }else if(this.getFirstTime == true){
            /**if users login for the first time they will be directed to Regisration of invoice details. */
                 this.$router.push({ path: "/register" });
          }else{
              this.$router.push({
              path: "/home"
            });
          }
        })
        .catch(error => {
          this.loading = false
          if(error.error == "Invalid credentials"){
            this.invalid = true
          }
        this.errors.push(error)
      
      
         
        });
      }
     
    }
  }
};
</script>
<style scoped>
.forgotButton{
  color: #e9e0c6;
}
.loginButton{
  color: #edcc97;
background: #995b46;
width: 100%;
}
.loginButton:hover{
  color: #edcc97;
background: #995b46;
}
.txtError{
  color: red;
}
.border {
  width: 50%;
  margin-right: 25%;
  margin-top: 10%;
  border-radius: 10px;
}
.txt {
  float: left;
}
.form-control::placeholder{
  color: #8b5e4e;
}
.Login{
  background: #aba18d;
  height:100vh;
}
</style>