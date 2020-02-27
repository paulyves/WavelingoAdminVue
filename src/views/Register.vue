<template>
<div class="Register">
  <div class="container">
  <div class="row">
    <div class="col"></div>
     
<form id="form" method="post" class="border shadow shadow-sm">
      <div class="container">
       
        <div class="row">
          <div class="col">
            <div class="avatar-wrapper">
              <div v-show="browseImage">
              <img
                :src=" profile || 'https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg' "
                class="img-responsive mt-4"
                alt
                height="150px"
                width="150px"
              />
              
            </div>
              <div class="upload-button">
                <ChangeAvatar class="file-upload size" @addProf="newProfile" :invalidImage="invalidProf"/>
              </div>
            </div>
            
          </div></div>
            <div>
<div class="row">
          <div class="col">
            
            <center><b-alert variant="danger" v-show="invalidImg" show>Invalid file</b-alert></center>
          </div>
        </div>
            <!-- <small>{{invalidImg}}</small> -->
            </div>
            <!-- <div v-show="chosenImage">
              <div class="row">
                <div class="col">
                <img :src="image" class="imgImg" height="150px"
                width="150px"/>
                
                </div>
              </div>
            </div>
            
            <div class="row ml-5 mr-5">
              <div class="col">
                 <b-form-file
            class="custom-file-label"
            id="imageFile"
            @change="onFileChange"
            accept="image/jpeg, image/png, image/gif"
            placeholder="Choose an image"
          ></b-form-file>
              </div>
            </div> -->
            
        


        <div class="row mt-5 violet">
          <div class="col-6 color">
            <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingName }">
              
              <input class="form-control" placeholder="First name" v-model="fname" />
              
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingName">First Name is required.</p>
                <p class="text ml-4" v-show="jobLength == false">too long.</p>
              </small>
            </div>
          </div>

          <div class="col-6 color">
            <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingLname }">
              
              <input class="form-control" placeholder="Last name" v-model="lname" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingLname">Last Name is required.</p>
              </small>
            </div>
          </div>
        </div>

        <div class="row violet">
          <div class="col-6 color">
            <div
              class="form-group"
              v-bind:class="{ 'has-warning': attemptSubmit && missingJobTitle }"
            >
            
              <input class="form-control" placeholder="Job Title" v-model="jobTitle" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingJobTitle">Job Title is required.</p>
              </small>
            </div>
          </div>

          <div class="col-6 color">
            <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingEmail }">
            
              <input
                type="email"
                class="form-control"
                placeholder="Billing Email"
                v-model="billingEmail"
              />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingEmail">Billing Email is required.</p>
              </small>
            </div>
          </div>
        </div>

        <div class="row violet">
          <div class="col-6 color">
            <div
              class="form-group"
              v-bind:class="{ 'has-warning': attemptSubmit && missingCompany }"
            >
             
              <input class="form-control" placeholder="Company name" v-model="companyName" />
              <small>
                <p
                  class="text ml-4"
                  v-if="attemptSubmit && missingCompany"
                >Company Name is required.</p>
              </small>
            </div>
          </div>

          <div class="col-6 color">
            <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingTax }">
             
              <input class="form-control" placeholder="Tax ID" v-model="taxId" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingTax">Tax ID is required.</p>
              </small>
            </div>
          </div>
        </div>

        <div class="row violet">
          <div class="col-6 color">
            <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingCity }">
          
              <input class="form-control" placeholder="City" v-model="city" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingCity">City is required.</p>
              </small>
            </div>
          </div>

          <div class="col-6 color">
            <div
              class="form-group"
              v-bind:class="{ 'has-warning': attemptSubmit && missingStreet }"
            >
              
              <input class="form-control" placeholder="Street" v-model="street" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingStreet">Street is required.</p>
              </small>
            </div>
          </div>
        </div>

        <div class="row violet">
          <div class="col-6 color">
            <div
              class="form-group"
              v-bind:class="{ 'has-warning': attemptSubmit && missingCountry }"
            >
            
              <input class="form-control" placeholder="Country" v-model="country" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingCountry">Country is required.</p>
              </small>
            </div>
          </div>

          <div class="col-6 color">
            <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingState }">
              
              <input class="form-control" placeholder="State" v-model="state" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingState">State is required.</p>
              </small>
            </div>
          </div>
        </div>

        <div class="row violet">
          <div class="col-6 color">
            <div
              class="form-group"
              v-bind:class="{ 'has-warning': attemptSubmit && missingZipCode }"
            >
            
              <input type="number" class="form-control" placeholder="ZipCode" v-model="zipCode" />
              <small>
                <p class="text ml-4" v-if="attemptSubmit && missingZipCode">ZipCode is required.</p>
              </small>
            </div>
          </div>
        </div>

        <div id="formFooter">
       
            <div class="row mb-3">
              <div class="col">
              <b-button @click="back" class="registerButton float-right" type="submit">Back to login</b-button>
              </div>
              <div class="col">
              <b-button class="registerButton float-left" @click="validateForm">Submit</b-button>
              </div>
          </div>
        </div>
      </div>

    </form>
    </div>
  </div>
   
  </div>
</template>

<script>
import ChangeAvatar from "../components/ChangeAvatarModal.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ChangeAvatar
  },
  data() {
    return {
      // btn:false,
      image: "",
      browseImage: true,
      chosenImage: false,
      fname: "",
      lname: "",
      billingEmail: "",
      country: "",
      city: "",
      zipCode: "",
      state: "",
      street: "",
      companyName: "",
      jobTitle: "",
      taxId: "",
      attemptSubmit: false,
      jobLength: true,
      invalidImg: false,
      invalidProf:false,
      profile: '',

    };
  },
  computed: {
    ...mapGetters([
      "getAccountId",
      "getUserType",
      "getFirstTime",
      "getAccountNo"
    ]),

    missingName: function() {
      return this.fname === "";
    },
    missingLname: function() {
      return this.lname === "";
    },
    missingJobTitle: function() {
      return this.jobTitle === "";
    },
    missingEmail: function() {
      return this.billingEmail === "";
    },
    missingTax: function() {
      return this.taxId === "";
    },
    missingCountry: function() {
      return this.country === "";
    },
    missingCity: function() {
      return this.city === "";
    },
    missingZipCode: function() {
      return this.zipCode === "";
    },
    missingState: function() {
      return this.state === "";
    },
    missingStreet: function() {
      return this.street === "";
    },
    missingCompany: function() {
      return this.companyName === "";
    }
  },
  methods: {
    ...mapActions(["addInvoiceDetail", "changeProfile", "nav","loadProfile"]),
    //  uploadProf(){
    //   let formData = new FormData();
    //   let file = document.querySelector("#imageFile");
    //   formData.append("id", this.getAccountId);
    //   formData.append("profilePicture", file.files[0]);

    //   this.changeProfile(formData).then(response =>{
    //     if(response.profilePicture == "uploaded"){
    //      console.log(response)
    //     }
    //   })
    // },
    newProfile(formData) {
      let fileElement = document.getElementById("imageFile");
      let fileExtension = "";
      if(fileElement.value.lastIndexOf(".") > 0){
          fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.lenght);
        }
        if(fileExtension.toLowerCase() == "jpg" || fileExtension.toLowerCase() == "jpeg" || fileExtension.toLowerCase() == "png" ){
          this.changeProfile(formData).then(response => {
        if (response.profilePicture == "uploaded") {

          this.loadProfile().then(response => {
            this.profile = response
            this.invalidImg = false
          });
        }
      });
          console.log(formData)
          return true;
        }else{
          console.log("invalidImg")
          this.invalidImg = true
          return false;
        }
        
      
    },
    // onFileChange(e) {
    //   var fileReader = new FileReader();
    //   console.log(e.target.files[0]);
    //   fileReader.readAsDataURL(e.target.files[0]);
    //   fileReader.onload = e => {
    //     this.image = e.target.result;
    //     this.chosenImage = true;
    //   };
    //   this.createImage(e.target.files[0]);
    //   this.chosenImage = true;
    //   this.browseImage = false;
    //   this.btn = true;
    //   this.invalidImg = false;
    // },

    // createImage(file) {
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = e => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },

    validateForm: function() {
      if (this.fname.length > 32) {
        console.log("tuLong");
      }
      if (this.lname.length > 32) {
        console.log("tuLong");
      }
      if (this.jobTitle.length > 32) {
        console.log("tuLong");
      }
      if (this.companyName.length > 32) {
        console.log("tuLong");
      }
      if (this.country.length > 32) {
        console.log("tuLong");
      }
      if (this.street.length > 32) {
        console.log("tuLong");
      }
      if (this.city.length > 32) {
        console.log("tuLong");
      }
      if (this.state.length > 32) {
        console.log("tuLong");
      }
      if (this.billingEmail.length > 32) {
        console.log("tuLong");
      }
      if (this.zipCode.length > 32) {
        console.log("tuLong");
      }
      if (this.taxId.length > 32) {
        console.log("tuLong");
      }
      this.attemptSubmit = true;
      if (
        this.missingName ||
        this.missingLname ||
        this.missingJobTitle ||
        this.missingEmail ||
        this.missingTax ||
        this.missingCountry ||
        this.missingCity ||
        this.missingZipCode ||
        this.missingState ||
        this.missingStreet ||
        this.missingCompany
      )
        event.preventDefault();
      else {
        const detail = {
          accountId: this.getAccountId,
          firstName: this.fname,
          lastName: this.lname,
          jobTitle: this.jobTitle,
          billingEmail: this.billingEmail,
          companyName: this.companyName,
          taxId: this.taxId,
          street: this.street,
          city: this.city,
          country: this.country,
          state: this.state,
          zipcode: this.zipCode
        };
        let invalidError = this.invalidImg
        if(invalidError == true){
          console.log('dont save')
        }else{
          this.addInvoiceDetail(detail).then(response => {
          if (response.add == "Success") {
            console.log()
            this.$router.push({ path: "/home" });
          }
          }); 
          console.log(detail)
        }
         
        
         
        // let formData = new FormData();
        // let file = document.querySelector("#imageFile");
        // let fileElement = document.getElementById("imageFile");
        // let fileExtension = "";
          
        //  formData.append("id", this.getAccountId);
        // formData.append("profilePicture", file.files[0]);
        // if(fileElement.value.lastIndexOf(".") > 0){
        //   fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.lenght);
        // }
        // if(fileExtension.toLowerCase() == "jpg" || fileExtension.toLowerCase() == "jpeg" || fileExtension.toLowerCase() == "png" ){
        //   this.addInvoiceDetail(detail).then(response => {
        //   if (response.add == "Success") {
        //     console.log()
        //     this.$router.push({ path: "/home" });
        //   }
        //   }); 
        //   this.changeProfile(formData)
        //   console.log(formData)
        //   return true;
        // }
//         else if(detail){
//  this.addInvoiceDetail(detail).then(response => {
//           if (response.add == "Success") {
//             console.log()
//             this.$router.push({ path: "/home" });
//           }
//           }); 
//           console.log(detail)
//         }

        // else{
        //  this.invalidImg = true
        //  this.chosenImage = false
        //    console.log("invalidImg")
        //   return false;
        // }
        



        // formData.append("id", this.getAccountId);
        // formData.append("profilePicture", file.files[0]);

       
        // this.addInvoiceDetail(detail).then(response => {
        //   if (response.add == "success") {
        //     this.$router.push({ path: "/home" });
        //   }
        //   console.log(response);
        //     if (this.getUserType === "super_admin") {
        //       this.$router.push({
        //         path: "/HomeSuperUser"
        //       });
        //     } else {
          
        //     }
        //   });
        // });
      }
    },
    back() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: "/login" });
    })
    }
  },
  mounted() {
    this.nav();
    // this.loadProfile().then(response => {
    //   this.profile = response;
    // });
  }
};
</script>

<style scoped>
b-alert{
  width: 20px;
}
.border {
  width: 50%;
  margin-right: 25%;
  margin-top: 10%;
  border-radius: 10px;
}
.form-control::placeholder{
  color: #8b5e4e;
}

.txt {
  float: left;
  margin-left: 5px;
}
.text {
  color: red;
  float: left;
}

img {
  /* width: 100%; */
  margin: auto;
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
}
.custom-file-label::after{
  color: #875846;
  background: #ffecc2;
  border-color: #ffecc2;
  font-weight: bold;

}
.custom-file-label{
  color: #beaa98;
  border-color: #e2c997;
  font-size: 15px;
  float: left;

}

.registerButton{
  color: #edcc97;
  background: #875846;

}
.registerButton:hover{
  background: #875846;
  color: #edcc97;
}
.Register{
  background-color:#aba18d;
  height: 100vh;
}
/* .container{
  padding: 0px;
} */
/* .avatar-wrapper {
  position: relative;
  /* height: 150px;
  width: 150px; */
  /* box-shadow: 1px 1px 10px -5px black;
  transition: all 0.3s ease;
} */ 
.avatar-wrapper:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.avatar-wrapper:hover .profile-pic {
  opacity: 0.5;
}
.avatar-wrapper .profile-pic {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
}
.avatar-wrapper .upload-button {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.avatar-wrapper .upload-button .circle {
  position: absolute;
  font-size: 234px;
  top: -17px;
  left: 0;
  text-align: center;
  opacity: 0;
  transition: all 0.3s ease;
  color: #34495e;
}
.avatar-wrapper .upload-button:hover {
  opacity: 0.9;
}
.size{
  height: 200%;

}
</style>