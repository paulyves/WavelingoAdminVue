<template>
  <div class="AccountProfile">
    <newNavbar
      :fullName="getFullName"
      :accountName="getAccountName"
      :userType="getUserType"
      :userId="getUserId"
      :avatarPath="getAvatarPath"
      :accountId="getAccountId"
      :navProfile="profile"
      :userProfile="userProf"
      
    />

    <div class="container">
      
      <div class="">
      <div class="row mt-5">
        <div class="col-lg-2">
          <div class="float-left">
            <div class="avatar-wrapper">
              <img
                :src="clientProf || userProf || 'https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg'"
                alt="Avatar"
                class="profileImg"
              />
              <div class="upload-button"  v-if="this.getUserType == 'admin' ">
               
                <ChangeAvatar class="size" @addProf="newProfile" :invalidImage="invalidProf" />
                
              </div>
              <div class="upload-button" v-if="this.getUserType == 'super_admin' ">
                <ViewPicture class="size" :profilePic="clientProf || userProf" />
    
              </div>
              <div class="upload-button" v-if="this.getUserType == 'user' ">
                <ViewPicture class="size" :profilePic="clientProf || userProf" />
              </div>
            </div>
          </div>
        </div>
          <div class="col">
            <h4 class="float-left">Account Profile</h4>
            <br />
            <br />
            <div class="row mb-5">
              <div class="col-1 mr-5">
                <div v-show="profUpdate == false && getUserType != 'user'">
                  <b-button class="editButton float-right btn-sm" @click="profUpdate  = true">
                    <i class="material-icons">edit</i>
                  </b-button>
                </div>
                <b-button
                  class
                  pill
                  variant="success"
                  v-show="profUpdate  == true"
                  v-on:blur="profUpdate  == false"
                  :disabled="isDisabled"
                  @click="submit"
                >
                  <i class="material-icons">done</i>
                </b-button>
              </div>
              <div class="col-1">
                <b-button
                  pill
                  variant="danger"
                  @click="cancel"
                  v-show="profUpdate  == true"
                  v-on:blur="profUpdate  == false"
                >
                  <i class="material-icons">clear</i>
                </b-button>
              </div>
            </div>
            <b-table-simple responsive class="table">
              <b-thead class="color">
                <b-tr>
                  <b-th class="txt">Account Name</b-th>
                  <b-th class="txt">Contact No.</b-th>
                  <b-th class="txt">Email</b-th>
                  <b-th class="txt">Website</b-th>
                  <b-th class="txt">Total Capacity</b-th>
                  <b-th class="txt">Protection</b-th>
                  <b-th class="txt">Update Frequency</b-th>
                  <b-th>Default language</b-th>
                  <!-- <b-th></b-th> -->
                </b-tr>
              </b-thead>
              <b-tbody class="txt">
                <b-tr>
                  <b-td>{{getAccountName}}</b-td>
                  <b-td>
                    <div v-show="profUpdate == false">
                      <label>{{getContactNo}}</label>
                    </div>
                    <EditAccountProfile
                      v-show="profUpdate  == true"
                      v-on:blur="profUpdate  == false"
                      :value="getContactNo"
                      type="accountNo"
                      @submitText="editAccount"
                    />
                    <small class="error" v-show="error">too long</small>
                  </b-td>
                  <b-td>
                    <div v-show="profUpdate  == false">
                      <label>{{getEmailAccount}}</label>
                    </div>
                    <EditAccountProfile
                      v-show="profUpdate  == true"
                      v-on:blur="profUpdate  == false"
                      :value="getEmailAccount"
                      type="accountEmail"
                      @submitText="editAccount"
                    />
                    <small class="error" v-show="error">too long</small>
                  </b-td>
                  <b-td>
                    <div v-show="profUpdate  == false">
                      <label>{{getWebsite}}</label>
                    </div>
                    <EditAccountProfile
                      v-show="profUpdate  == true"
                      v-on:blur="profUpdate  == false"
                      :value="getWebsite"
                      type="accountWebsite"
                      @submitText="editAccount"
                    />
                    <small class="error" v-show="error">too long</small>
                  </b-td>
                  <b-td>{{ getTotalCap }}</b-td>
                  <b-td>{{ getProtectCap }}</b-td>
                  <b-td>
                    <div v-show="profUpdate  == false">
                      <label>{{getFrequency}}</label>
                    </div>
                    <EditAccountProfile
                      v-show="profUpdate  == true"
                      v-on:blur="profUpdate  == false"
                      :value="getFrequency"
                      type="accountFrequency"
                      @submitText="editAccount"
                    />
                    <small class="error" v-show="error">too long</small>
                  </b-td>
                  <b-td>
                    <div v-show="profUpdate  == false">
                      <label>{{getDefaultLanguage}}</label>
                    </div>
                    <EditAccountProfile
                      v-show="profUpdate  == true"
                      v-on:blur="profUpdate  == false"
                      :value="getDefaultLanguage"
                      type="accountDefaultLanguage"
                      @submitText="editAccount"
                    />
                    <small class="error" v-show="error">too long</small>
                  </b-td>
                  <!-- <b-td >
                    <UpgradeModal
                      :fname="getFirstName"
                      :lname="getLastName"
                      :job="getJobTitle"
                      :billingEmail="getBillingEmail"
                      :companyName="getCompanyName"
                      :taxId="getTaxId"
                      :street="getStreet"
                      :city="getCity"
                      :country="getCountry"
                      :state="getState"
                      :zipCode="getZipCode"
                      v-show="getUserType != 'user' "
                      class="float-right"
                    />
                  </b-td>-->
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
        <div class="mt-5">
          <h4 class="float-left">Invoicing Details</h4>
          <br />
          <br />
          <div class="row mb-5">
            <div class="col">
              <div v-show="invoiceUpdate == false && getUserType != 'user'">
                <b-button class="editButton btn-sm" @click="invoiceUpdate  = true">
                  <i class="material-icons">edit</i>
                </b-button>
              </div>
              <b-button
                pill
                variant="success"
                @click="updateInvoiceDetail"
                v-show="invoiceUpdate == true"
                v-on:blur="invoiceUpdate == false"
                :disabled="invoiceIsDisabled"
              >
                <i class="material-icons">done</i>
              </b-button>
            </div>
            <div class="col-10">
              <b-button
                pill
                variant="danger"
                @click="cancel"
                v-show="invoiceUpdate == true"
                v-on:blur="invoiceUpdate == false"
              >
                <i class="material-icons">clear</i>
              </b-button>
            </div>
          </div>

          <b-table-simple responsive class="mt-3 table">
            <b-thead class="color">
              <b-tr>
                <b-th class="txt">First Name</b-th>
                <b-th class="txt">Last Name</b-th>
                <b-th class="txt">Job Title</b-th>
                <b-th class="txt">Billing Email</b-th>
                <b-th class="txt">Company Name</b-th>
                <b-th class="txt">TAX ID</b-th>
              </b-tr>
            </b-thead>
            <b-tbody class="txt">
              <b-tr>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getFirstName }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceFname"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getFirstName"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidFirstName">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getLastName }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceLname"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getLastName"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidLastName">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getJobTitle }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceJob"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getJobTitle"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidJob">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getBillingEmail }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceEmail"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getBillingEmail"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidEmail">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getCompanyName }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceCompany"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getCompanyName"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidCompany">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getTaxId }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceTax"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getTaxId"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidTax">too long</small>
                </b-td>
              </b-tr>
            </b-tbody>
            <b-thead class="color">
              <b-tr>
                <b-th class="txt">Street</b-th>
                <b-th class="txt">City</b-th>
                <b-th class="txt">Country</b-th>
                <b-th class="txt">State</b-th>
                <b-th class="txt">Zip Code</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>
            <b-tbody class="txt">
              <b-tr>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getStreet }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceStreet"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getStreet"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidStreet">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getCity }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceCity"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getCity"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidCity">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getCountry }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceCountry"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getCountry"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidCountry">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getState }}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceState"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getState"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidState">too long</small>
                </b-td>
                <b-td>
                  <div v-show="invoiceUpdate == false">
                    <label>{{ getZipCode}}</label>
                  </div>
                  <EditInvoiceDetail
                    type="invoiceZip"
                    v-show="invoiceUpdate == true"
                    v-on:blur="invoiceUpdate == false"
                    :value="getZipCode"
                    @InvoiceDetail="editInvoice"
                  />
                  <small class="error" v-show="invalidZipCode">too long</small>
                </b-td>
                <b-td></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <div class="mt-5">
            <div class="row">
              <div class="col">
                <h4 class="float-left">Payment Details</h4>
              </div>
            </div>
            <b-table-simple responsive class="table">
              <b-thead class="color">
                <b-tr>
                  <b-th class="txt">Method</b-th>
                  <b-th class="txt">Payment Agreement</b-th>
                  <b-th class="txt">Monthly Fee</b-th>
                  <b-th class="txt">Billing Period</b-th>
                  <b-th>Next Due Date</b-th>
                  <b-th>Status</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>

              <b-tbody class="txt">
                <b-tr>
                  <b-td>
                    <b-form-select class="mb-3">
                      <option :value="null" disabled>Select Payment Method</option>
                      <option value="a">PayPal</option>
                      <option value="b">Google Pay</option>
                      <option value="c">WeChat Pay</option>
                    </b-form-select>
                  </b-td>
                  <b-td>
                    B-99887766554433U
                    <router-link to v-show="test == false">cancel</router-link>
                  </b-td>
                  <b-td class="txt1">1,000(USD)</b-td>
                  <b-td colspan="2" class="txt1">2019-Jul-24 to 2019-Aug-23</b-td>
                  <b-td class="txt1">2019-Aug-24</b-td>
                  <b-td class="txt2">Active</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
          <br />
          <Usertable :AccountIdUser="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newNavbar from "../components/NewNavbar.vue";
import Usertable from "../components/UserTable.vue";
import ViewPicture from "../components/ViewPicture.vue";
import EditAccountProfile from "../components/EditAccountProfile.vue";
import EditInvoiceDetail from "../components/EditInvoiceDetail.vue";
import { mapGetters, mapActions } from "vuex";
import ChangeAvatar from "../components/ChangeAvatarModal";
export default {
  name: "AccountProfile",
  components: {
    newNavbar,
    Usertable,
    ChangeAvatar,
    EditAccountProfile,
    EditInvoiceDetail,
    ViewPicture
  },
  props: ["id"],
  data() {
    return {
      profile:"",
      userProf: "",
      clientProf: "",
      current: this.getContactNo,
      selectedFile: null,
      test: true,
      contactName: "",
      email: "",
      website: "",
      updateFrequency: "",
      defaultLanguage: "",
      fname: "",
      lastName: "",
      jobTitle: "",
      billingEmail: "",
      companyName: "",
      taxId: "",
      street: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
      profUpdate: false,
      invoiceUpdate: false,
      error: false,
      invalidCompany: false,
      invalidCountry: false,
      invalidEmail: false,
      invalidFirstName: false,
      invalidJob: false,
      invalidLastName: false,
      invalidState: false,
      invalidStreet: false,
      invalidTax: false,
      invalidZipCode: false,
      invalidCity: false,
      invalidProf: false,
      pro: ""
    };
  },
  computed: {
    ...mapGetters([
      "getAccountId",
      "getAccountName",
      "getContactNo",
      "getEmailAccount",
      "getWebsite",
      "getTotalCap",
      "getProtectCap",
      "getAvatarPath",
      "getUserType",
      "getInvoiceId",
      "getFirstName",
      "getLastName",
      "getJobTitle",
      "getBillingEmail",
      "getCompanyName",
      "getTaxId",
      "getStreet",
      "getCity",
      "getCountry",
      "getState",
      "getZipCode",
      "getJobTitle",
      "getFrequency",
      "getDefaultLanguage",
      "getFullName",
      "getUserId"
    ]),
    isDisabled() {
      return (
        !this.contactName &&
        !this.email &&
        !this.website &&
        !this.updateFrequency &&
        !this.defaultLanguage
      );
    },
    invoiceIsDisabled() {
      return (
        !this.fname &&
        !this.lastName &&
        !this.jobTitle &&
        !this.billingEmail &&
        !this.companyName &&
        !this.taxId &&
        !this.street &&
        !this.city &&
        !this.country &&
        !this.state &&
        !this.zipCode
      );
    }
  },
  mounted() {
    this.nav();
    if (this.id) {
      /**@param this.id = selected account id of user in account page. */
      this.nav(this.id).then(() => {
    this.allAccount(this.id);
    this.userInvoiceDetails(this.id);
    this.loadClientProfile(this.id).then(response =>{
     this.clientProf = response 
     /**@param this.clientProf = display users profile in accounts page. */
    });
      
      })
    } else {
      this.nav().then(() => {
        this.account();
        this.invoiceDetails();
        this.loadProfile().then(response =>{
        if(this.getUserType == 'super_admin'){
            this.profile = response
          }else{
            this.userProf = response
          }
    });
        
      });
    }
  },
  methods: {
    ...mapActions([
      "account",
      "updateAccount",
      "invoiceDetails",
      "updateInvoice",
      "allAccount",
      "userInvoiceDetails",
      "nav",
      "loadProfile",
      "changeProfile",
      "loadClientProfile"
    ]),

    newProfile(formData) {
      /**event click for uploading/updating a profile */
      let fileElement = document.getElementById("imageFile");
      let fileExtension = "";
      if (fileElement.value.lastIndexOf(".") > 0) {
        fileExtension = fileElement.value.substring(
          fileElement.value.lastIndexOf(".") + 1,
          fileElement.value.lenght
        );
      }
      /**
       * created a condition if a selected file is equals only to jpg/jpeg/png  and it will uploaded successfully.
       */
      if (
        fileExtension.toLowerCase() == "jpg" ||
        fileExtension.toLowerCase() == "jpeg" ||
        fileExtension.toLowerCase() == "png"
      ) {
        this.changeProfile(formData).then(response => {
          if (response.profilePicture == "uploaded") {
            /**condition if the response is successfully uploaded
             * the displayed profile will changed in account profile and in the navbar.
             */
            this.nav().then(() => {
              this.loadProfile().then(response => {
                this.userProf = response;
                /**@param this.userprof = for displaying a profile pic */
              });
            });
          }
        });
        return true;
      } else {
        this.invalidProf = true;
        return false;
      }
    },
    editInvoice(data) {
      switch (data.type) {
        case "invoiceFname":
          this.fname = data.string;
          break;
        case "invoiceLname":
          this.lastName = data.string;
          break;
        case "invoiceJob":
          this.jobTitle = data.string;
          break;
        case "invoiceEmail":
          this.billingEmail = data.string;
          break;
        case "invoiceCompany":
          this.companyName = data.string;
          break;
        case "invoiceTax":
          this.taxId = data.string;
          break;
        case "invoiceStreet":
          this.street = data.string;
          break;
        case "invoiceCity":
          this.city = data.string;
          break;
        case "invoiceCountry":
          this.country = data.string;
          break;
        case "invoiceState":
          this.state = data.string;
          break;
        case "invoiceZip":
          this.zipCode = data.int;
          break;
      }
    },
    editAccount(data) {
      switch (data.type) {
        case "accountNo":
          this.contactName = data.string;
          break;
        case "accountEmail":
          this.email = data.string;
          break;
        case "accountWebsite":
          this.website = data.string;
          break;
        case "accountFrequency":
          this.updateFrequency = data.string;
          break;
        case "accountDefaultLanguage":
          this.defaultLanguage = data.string;
          break;

        default:
          break;
      }
    },
    submit() {
      /**click event for submitting/updating account profile
       */
      const updateAccnt = {
        id: this.getAccountId
      };
       /*  created a condition in every params if only one params is being edited or has been updated.
       */
      if (this.contactName) {
        updateAccnt.contactNo = this.contactName;
      }
      if (this.email) {
        updateAccnt.email = this.email;
      }
      if (this.website) {
        updateAccnt.website = this.website;
      }
      if (this.updateFrequency) {
        updateAccnt.updateFrequency = this.updateFrequency;
      }
      if (this.defaultLanguage) {
        updateAccnt.defaultLanguage = this.defaultLanguage;
      }
      this.updateAccount(updateAccnt).then(response => {
        if (response.update == "Success") {
          this.profUpdate = false;
        }
        this.contactName = "";
        this.email = "";
        this.website = "";
      });
    },
    cancel() {
      this.profUpdate = false;
      this.invoiceUpdate = false;
    },
    updateInvoiceDetail() {
      /**click event for submitting/updating invoice detail
       */
      const updateDetails = {
        id: this.getInvoiceId
      };
       /*  created a condition in every params if only one params is being edited or has been updated.
       */
      if (this.fname) {
        updateDetails.firstName = this.fname;
      }
      if (this.lastName) {
        updateDetails.lastName = this.lastName;
      }
      if (this.jobTitle) {
        updateDetails.jobTitle = this.jobTitle;
      }
      if (this.billingEmail) {
        updateDetails.billingEmail = this.billingEmail;
      }
      if (this.companyName) {
        updateDetails.companyName = this.companyName;
      }
      if (this.taxId) {
        updateDetails.taxId = this.taxId;
      }
      if (this.street) {
        updateDetails.street = this.street;
      }
      if (this.city) {
        updateDetails.city = this.city;
      }
      if (this.zipCode) {
        updateDetails.zipCode = this.zipCode;
      }
      if (this.state) {
        updateDetails.state = this.state;
      }
      if (this.country) {
        updateDetails.country = this.country;
      }
      this.updateInvoice(updateDetails).then(response => {
        if (response.update == "Success") {
          this.invoiceUpdate = false;
        }
        this.fname = "";
        this.lastName = "";
        this.jobTitle = "";
        this.billingEmail = "";
        this.companyName = "";
        this.taxId = "";
        this.street = "";
        this.city = "";
        this.country = "";
        this.state = "";
        this.zipCode = "";
      });
    }
  }
};
</script>

<style scoped>
.col-color {
  border: black solid;
}
.col-done {
  border: #814e3d solid;
}
.AccountProfile {
  height: 100vh;
  background: #fff8da;
  margin: 0;
  overflow: auto;
}
.sidenav-position {
  position: absolute;
  z-index: 1;
}
button {
  position: absolute;
  z-index: 2;
}
.editButton {
  color: #ffe5a9;
  background: #985b47;
}
.editButton:hover {
  color: #ffe5a9;
  background: brown;
}
.color {
  background: #985b47;
  color: #fbe0a5;
}
.table {
  border: 1px solid #cead78;
}
.table > tbody > tr > td {
  background-color: #ffeab8;
  color: #985b47;
  font-size: 15px;
  padding: 3px;
}
h4 {
  color: #814e3d;
}
.size {
  height: 200%;
}
.error {
  color: red;
}
.image {
  display: block;
  width: 130px;
  height: auto;
  margin-left: 200%;
}
.txt {
  text-align: left;
  font-size: 15px;
}
.avatar-wrapper {
  position: relative;
  /* height: 150px;
  width: 150px; */
  box-shadow: 1px 1px 10px -5px black;
  transition: all 0.3s ease;
}
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
.profileImg {
  /* position:inherit; */
  height: 150px;
  width: 150px;
}
</style>


