<template>
  <div class="Accounts">
    <div class="colorFil">
      <NewNavbar
        :fullName="getFullName"
        :accountName="getAccountName"
        :userType="getUserType"
        :userId="getUserId"
        :avatarPath="getAvatarPath"
        :navProfile="profile"
      />

      <br />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2">
          <addmodalAccount @sendAddaccount="addAccnt" v-show="showThis" />
        </b-col>
        <b-col cols="1"></b-col>

        <b-col cols="3">
          <inputSearch @searchSubmit="searchSubmit" :searchEmpty="emptyInput" />
        </b-col>
        <b-col cols="3">
          <div class="pagination justify-content-end">
            <b-pagination
              id="valBorder"
              v-model="accountCurrentPage"
              :total-rows="requestCheck?getRowstable:getRowsMain"
              :per-page="requestCheck?getperPage:getPerPageMain"
              v-show="showThis"
            ></b-pagination>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>

      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="9">
          <router-link
            class="links"
            to="/Accounts"
            v-show="backAccounts"
            @click.native="backData(readSearch)"
          >&lt;&lt;Back to Accounts</router-link>
          <b-table
            id="my-tableAccounts"
            :items="requestCheck?getAccounts:getfindAccountlist"
            :per-page="0"
            :fields="fields"
            small
            class="table table-bordered table-responsive-md table-striped text-center"
            v-show="showThis"
          >
            <template slot="[account_name]" slot-scope="data">
              <p class="textCol">{{data.item.account_name}}</p>
            </template>

            <template slot="[contact_number]" slot-scope="data">
              <p class="textCol">{{data.item.contact_number}}</p>
            </template>

            <template slot="[email]" slot-scope="data">
              <p class="textCol">{{data.item.email}}</p>
            </template>

            <template slot="[website]" slot-scope="data">
              <p class="textCol">{{data.item.website}}</p>
            </template>

            <template slot="[total_cap]" slot-scope="data">
              <p class="textCol">{{data.item.total_cap}}</p>
            </template>

            <template slot="[protect_cap]" slot-scope="data">
              <p class="textCol">{{data.item.protect_cap}}</p>
            </template>

            <template slot="[account_id]" slot-scope="data">
              <router-link
                :to="'/AccountProfile/'+ data.item.account_id"
                v-if="data.item.account_id != '1'"
              >
                {{data.item.account_id}}
                <!-- {{data.item.account_id}} -->
              </router-link>
            </template>
          </b-table>

          <b-row>
            <b-col sm="12">
              <div class="pagination justify-content-end">
                <b-pagination
                  id="valBorder"
                  v-model="accountCurrentPage"
                  :total-rows="requestCheck?getRowstable:getRowsMain"
                  :per-page="requestCheck?getperPage:getPerPageMain"
                  v-show="showThis"
                ></b-pagination>
              </div>
            </b-col>
          </b-row>

          <h4 v-show="showResult">Displaying Result For '{{readSearch}}'</h4>
          <b-row align-h="center">
            <b-col cols="4">
              <h4 v-show="showResult">No Match Found....</h4>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="1"></b-col>
      </b-row>

      <br />
      <br />
    </div>
  </div>
</template>
<script>
import NewNavbar from "../components/NewNavbar.vue";
import inputSearch from "../components/InputSearch.vue";
import addmodalAccount from "../components/AddModalAccount.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Accounts",
  data() {
    return {
      accountCurrentPage: this.getcurrentPageAccounts,

      emptyInput: "",
      backAccounts: false,
      requestCheck: true,
      readSearch: "",
      showThis: true,
      showResult: false,
      profile: "",

      fields: [
        { label: "Account ID", key: "account_id" },
        { label: "Account Name", key: "account_name" },
        { label: "Contact Number", key: "contact_number" },
        { label: "Email", key: "email" },
        { label: "Website", key: "website" },
        { label: "Total Capacity", key: "total_cap" },
        {
          label: "Protection Capacity",
          key: "protect_cap"
        },
        { label: "Update Frequency", key: "update_frequency" },
        { label: "Default Laguage", key: "default_language" }
      ]
    };
  },

  computed: {
    ...mapGetters([
      "getFullName",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getUserId",

      "getAccounts",
      "getcurrentPageAccounts",
      "getRowstable",
      "getperPage",
      "getfindAccountlist",
      "getToken",
      "getPerPageMain",
      "getRowsMain",

      "getcurrentPageMain"
    ])
  },

  methods: {
    ...mapActions([
      "callAccounts",
      "callAccountName",
      "callAddAccount",
      "nav",
      "loadProfile"
    ]),

    searchSubmit(value) {
      this.readSearch = value;

      if (this.readSearch == "") {
        this.requestCheck = true;
        this.showThis = true;
        this.showResult = false;
        this.backAccounts = false;
        this.callAccounts();
      } else {
        let objectSearch = {
          search: ""
        };
        objectSearch.search = value;

        this.callAccountName(objectSearch).then(response => {
          if (response.data.length == 0) {
            this.accountCurrentPage = 1;
            this.showResult = true;
            this.showThis = false;
            this.requestCheck = true;
            this.backAccounts = true;
          } else {
            this.accountCurrentPage = 1;
            this.readSearch == "";
            this.backAccounts = true;
            this.showResult = false;
            this.showThis = true;
            this.requestCheck = false;
          }
        });
      }
    },

    addAccnt(objData) {
      this.callAddAccount(objData).then(response => {
        if (response) {
          // alert("Add Successfull");
          this.callAccounts();
        }
        //  else {
        //   alert("Add Failed");
        // }
      });
    },

    backData(objValue) {
      this.accountCurrentPage = 1;
      this.emptyInput = objValue;
      this.readSearch = "";
      this.requestCheck = true;
      this.showThis = true;
      this.showResult = false;
      this.backAccounts = false;
      this.callAccounts();
    }
  },
  mounted() {
    if (this.getToken != 0) {
      this.nav();
      this.callAccounts();
      this.loadProfile().then(response => {
        this.profile = response;
      });
    } else {
      console.log("No token receive");
    }
  },

  watch: {
    accountCurrentPage: {
      handler: function(value) {
        if (this.readSearch != "") {
          let pageObj = {
            search: this.readSearch,
            page: 0
          };
          pageObj.page = value;
          this.callAccountName(pageObj);
        } else {
          if (value != null) {
            let pageObj = {
              url: null,
              page: 0
            };
            pageObj.page = value;
            this.callAccounts(pageObj);
            this.requestCheck = true;
          } else {
            this.accountCurrentPage = 1;
          }
        }
      }
    }
  },

  components: {
    NewNavbar,
    inputSearch,
    addmodalAccount
  }
};
</script>
<style scoped>
#my-tableAccounts {
  background-color: #fff8da;
}

.colorFil {
  background-color: #fff8da;
}
</style>