<template>
  <div class="UserTable">
    <div>
      <br />
      <br />
      <b-col sm="2"></b-col>
      <b-table
        id="my-table"
        :items="dataTable?getAllUserOwnbyadmin:getUsers"
        :per-page="0"
        :fields="fields"
        small
        class="table table-bordered table-responsive-md table-striped text-center"
        v-show="seeThis"
      >
        <template v-slot:thead-top="data">
          <b-tr>
            <br />

            <h2>Users</h2>
            <ModalAddUser
              @addAccount="addAccount"
              @resetcall="allUser"
              :AccountId="getAccountId"
              v-show="addUsers || getUserType == 'super_admin' || getUserType == 'admin' "
              @showtable="refreh"
              :CurrentPage="getcurrentPage"
            />
            <b-th colspan="12" class="le">
              <div class="pagination justify-content-end">
                <b-pagination
                  v-model="getcurrentPage"
                  :total-rows="getROws"
                  :per-page="getPerpagee"
                  aria-controls="my-table"
                ></b-pagination>
              </div>
            </b-th>
          </b-tr>
        </template>

        <template slot="[Action]" slot-scope="data">
          <b-row>
            <b-col cols="12">
              <b-button
                size="sm"
                variant="info"
                v-show="getUserType == 'user' && data.item.user_id == getUserId
              ||getUserType == 'admin' || getUserType == 'super_admin'"
                @click="clickMe(data.item)"
              >Edit Password</b-button>&nbsp;
              <b-button
                size="sm"
                v-show="getUserType == 'admin' && data.item.user_id != getUserId || getUserType == 'user' && hideAll
                || getUserType == 'super_admin' && data.item.user_id != getUserId "
                @click="toDel(data.item)"
                class="material-icons"
                variant="danger"
              >delete</b-button>
            </b-col>
          </b-row>
        </template>
      </b-table>
    </div>

    <b-modal
      id="modal-changePass"
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']"
    >
      <template v-slot:modal-title>
        <h5>Change Password</h5>
      </template>

      <template>
        <b-form-group
          label="Old Password"
          v-show="getUserType == 'user' && userPassword.user_id == getUserId || getUserType == 'admin' && checkthis"
        >
          <b-form-input v-model="oldPassword" type="password" placeholder="Enter Old Password"></b-form-input>
          <p v-show="validOldpass" id="textCol">Invalid Old Password</p>
          <p v-show="checkvalidOldpass" id="textCol">Required field</p>
        </b-form-group>

        <b-form-group label="New Password">
          <b-form-input v-model="newPass" type="password" placeholder="Enter New Password"></b-form-input>
          <p v-show="validPass" id="textCol">Password not Match</p>
          <p v-show="checkvalidPass" id="textCol">Required field</p>
        </b-form-group>

        <b-form-group label="Confirm Password">
          <b-form-input v-model="confirmPass" type="password" placeholder="Confirm New Password"></b-form-input>
          <p v-show="validPass" id="textCol">Password not Match</p>
          <p v-show="checkConfirmpass" id="textCol">Required field</p>
        </b-form-group>

        <b-button size="sm" @click="resetPass()">reset pasword</b-button>
      </template>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="ConfirmSave(userPassword)">Confirm</b-button>
        <b-button variant="secondary" @hidden="resetModalChange()">Cancel</b-button>
      </template>
    </b-modal>

    <b-modal
      id="modal-change2nd"
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']"
    >
      <template>
        <h5>Please Confirm!</h5>
      </template>

      <template>
        <p>Are You Sure You want to Save this!</p>
      </template>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="ConfirmYes(savePass)">Yes</b-button>
        <b-button variant="secondary" @click="resetModalChange()">No</b-button>
      </template>
    </b-modal>

    <b-modal
      id="modal-delUser"
      centered
      :header-class="['backHeaderColor', 'textColor']"
      :body-class="'bodyBackcolor'"
      :footer-class="['backHeaderColor', 'textColor']"
    >
      <template v-slot:modal-header>
        <h5>Warning!</h5>
      </template>

      <template>
        <p>Are You Sure You want to Delete?"{{usersObject.full_name}}"</p>
      </template>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="Confirmdel(usersObject)">Yes</b-button>
        <b-button variant="secondary" @click="$bvModal.hide('modal-delUser')">No</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalAddUser from "../components/ModalAddUser.vue";

export default {
  name: "userTable",

  data() {
    return {
      callHideModal: false,
      dataTable: true,

      adminOwner: [this.getUsers],
      // usersOwnByAdmin: this.getUsers,
      currentPageMain: this.getcurrentPage,

      addUsers: true,
      hideDel: true,
      newPass: "",
      confirmPass: "",
      usersObject: {},
      userPassword: {},
      seeThis: true,
      oldPassword: "",

      hideAll: true,
      savePass: {},
      checkvalidOldpass: false,
      checkvalidPass: false,
      checkConfirmpass: false,

      checkthis: false,

      checkFalse: false,
      validPass: false,
      validOldpass: false,

      headerBgVariant: "primary",
      footerBgVariant: "secondary",

      fields: [
        { label: "Full Name", key: "full_name" },
        { label: "Email", key: "email" },
        { label: "User Type", key: "user_type" },
        { label: "Status", key: "active" },
        { label: "Created", key: "created_at" },
        { label: "Updated", key: "updated_at" },
        { label: "Actions", key: "Action" }
      ],

      options: [
        { value: "Enable", text: "Enable" },
        { value: "Disable", text: "Disable" }
      ]
    };
  },

  props: ["AccountIdUser"],

  components: {
    ModalAddUser
  },

  methods: {
    ...mapActions([
      "adminOwnerAllUsers",
      "callUsers",
      "CallAdduser",
      "callUserdel",
      "changePassword"
    ]),

    resetModalChange(){
      this.$bvModal.hide("modal-changePass");
      this.$bvModal.hide("modal-change2nd");
      
      this.oldPassword = "",
      this.newPass = "",
      this.confirmPass = ""

    },

    addAccount(objectVal) {
      this.CallAdduser(objectVal).then(() => {
        // alert("add SuccessFull");

        let requestCall = {
          userId: this.getAccountId,
          page: this.getcurrentPage
        };

        this.callUsers(requestCall);
        this.dataTable = false;
        console.log("requestCall", requestCall)
      });
    },

    allUser() {
      let requestcall = {
        userId: this.getAccountId,
        page: this.getcurrentPage
      };

      this.callUsers(requestcall);
    },

    refreh(receiveObj) {
      this.callUsers(receiveObj);
    },

    clickMe(receiveData) {
      this.oldPassword = "",
      this.newPass = "",
      this.confirmPass = "",
      this.$bvModal.show("modal-changePass");
      this.userPassword = receiveData;
    },

    ConfirmSave(dataUser) {
      if (
        this.getUserType == "user" &&
        this.userPassword.user_id == this.getUserId
      ) {
        if (this.oldPassword == "") {
          this.$bvModal.show("modal-changePass");
          this.checkvalidOldpass = true;
        } else {
          this.checkvalidOldpass = false;
        }
        if (this.newPass == "") {
          this.$bvModal.show("modal-changePass");
          this.checkvalidPass = true;
        } else {
          this.checkvalidPass = false;
        }
        if (this.confirmPass == "") {
          this.$bvModal.show("modal-changePass");
          this.checkConfirmpass = true;
        } else {
          this.checkConfirmpass = false;
        }

        if (
          this.oldPassword != "" &&
          this.newPass != "" &&
          this.confirmPass != ""
        ) {
          if (this.confirmPass != this.newPass) {
            alert("New Password Not Match");
            this.$bvModal.show("modal-changePass");
            this.validPass = true;
          } else {
            this.$bvModal.hide("modal-changePass");
            this.$bvModal.show("modal-change2nd");
            let obj = {
              newPassword: this.confirmPass,
              oldPassword: this.oldPassword,
              cpUserId: dataUser.user_id
            };

            this.savePass = obj;
          }
        } else {
          alert("invalid Change Password");
        }
      } else {
        if (this.newPass == "") {
          this.$bvModal.show("modal-changePass");
          this.checkvalidPass = true;
        } else {
          this.checkvalidPass = false;
        }
        if (this.confirmPass == "") {
          this.$bvModal.show("modal-changePass");
          this.checkConfirmpass = true;
        } else {
          this.checkConfirmpass = false;
        }

        if (this.newPass != "" && this.confirmPass != "") {
          if (this.confirmPass != this.newPass) {
            alert("New Password Not Match");
            this.$bvModal.show("modal-changePass");
            this.validPass = true;
          } else {
            this.$bvModal.hide("modal-changePass");
            this.$bvModal.show("modal-change2nd");
            let obj = {
              newPassword: this.confirmPass,
              oldPassword: this.oldPassword,
              cpUserId: dataUser.user_id
            };

            this.savePass = obj;
          }
        } else {
          alert("invalid Change Password");
        }
      }
    },

    ConfirmYes(savePass) {
      this.$bvModal.hide("modal-change2nd");

      this.changePassword(savePass)
        .then(() => {
          (this.newPass = ""),
            (this.confirmPass = ""),
            (this.oldPassword = "")

            if (savePass.cpUserId == this.getUserId) {
            this.$router.push({ path: "/login" });
            }
        })
        .catch(error => {
          if (error.response.data.error == "Invalid input") {
            // alert("invalid Old Password");
            this.$bvModal.show("modal-changePass");
            this.validOldpass = true;
            this.validPass = false;

           
          }
        });
    },

    toDel(receiveUser) {
      this.$bvModal.show("modal-delUser");
      this.usersObject = receiveUser;
    },

    Confirmdel(receiveUsers) {
      let userId = this.getUserId;
      let requestObj = {
        deleteUserId: receiveUsers.user_id,
        userId: userId
      };

      this.callUserdel(requestObj).then(() => {
        // alert("delete SuccessFul");
        let requestObj = {
          userId: this.getAccountId,
          page: this.getcurrentPage
        };

        this.callUsers(requestObj);
        this.dataTable = false;
        console.log(requestObj, "test")
      });
      this.$bvModal.hide("modal-delUser");
    },

    resetPass() {}
  },

  watch: {
    currentPageMain: {
      handler: function(value) {
        let requestObj = {
          userId: this.getAccountId,
          page: 0
        };
        requestObj.page = value;
        this.callUsers(requestObj);
        console.log(value, "watch");
      }
    },
    userPassword:{
      handler:function(){

        if (this.hidden) {
         this.callHideModal = true 
        }

        // if (this.$bvModal.hide("modal-change2nd")){
        //   this.callHideModal = true 
        // }
      }
    }
  },

  mounted() {
    if (this.getUserType == "admin") {
      if (this.getToken != 0) {
        let requestObj = {
          userId: this.getAccountId,
          page: this.getcurrentPage
        };
         this.dataTable = false
        this.callUsers(requestObj);
      } else {
        console.log("No token receive");
      }
      this.addUsers = true;
    }
    if (this.getUserType == "super_admin") {
      this.dataTable = true;
      this.addUsers = true;
      let objVal = {
        usersAdmin: this.AccountIdUser
      };
      this.adminOwnerAllUsers(objVal);
    } else {
      if (this.getToken != 0) {
         this.dataTable = false
        let requestObj = {
          userId: this.getAccountId,
          page: this.getcurrentPage
        };

        this.callUsers(requestObj);
      } else {
        console.log("No token receive");
      }
      this.addUsers = false;
      this.hideAll = false;
    }
  },

  computed: {
    ...mapGetters([
      "getAllUserOwnbyadmin",
      "getUsers",
      "getAccountId",
      "getUserId",
      "getUserType",
      "getcurrentPage",
      "getROws",
      "getPerpagee",
      "getCurrentPass",
      "getToken"
    ])
  }
};
</script>


<style scoped>
.le {
  text-align: end;
}

#textCol {
  color: red;
}
</style>