<template>
  <div class="AuditLogs">
    <NewNavbar
      :fullName="getFullName"
      :accountName="getAccountName"
      :userType="getUserType"
      :userId="getUserId"
      :avatarPath="getAvatarPath"
    />

    <div class="container">
      <br />

      <b-row>
        <b-col cols="4">
          <InputSearch @searchSubmit="searchSubmit" :searchEmpty="emptyInput" />
        </b-col>
        <br />

        <b-col>
          <div class="pagination justify-content-end">
            <b-pagination
              id="valBorder"
              v-model="currentPageAudit"
              :total-rows="getRowsAudit"
              :per-page="getPerPageAudit"
              aria-controls="my-table"
              v-show="ShowTable"
            ></b-pagination>
          </div>
        </b-col>
      </b-row>
      <br />
      <router-link
        class="links"
        to="/Auditlog"
        v-show="backAudits"
        @click.native="bacAuditsAll(pickInput)"
      >&lt;&lt;Back to AuditLogs</router-link>

      <b-table
        id="my-table"
        :items="getAuditLogs"
        :per-page="0"
        :fields="fields"
        small
        class="table table-bordered table-responsive-md table-striped text-center"
        v-show="ShowTable"
      >
        <template slot="[Audit Id]" slot-scope="data">{{data.audit_id}}</template>
        <template slot="[User Id]" slot-scope="data">{{data.user_id}}</template>

        <template slot="[Date/time]" slot-scope="data">{{data.created_at}}</template>
        <template slot="[Transaction type]" slot-scope="data">{{data.transaction_type}}</template>

        <template slot="[IP address]" slot-scope="data">{{data.ip_address}}</template>

        <template slot="[Browser]" slot-scope="data">{{data.browser}}</template>

        <template slot="[Status]" slot-scope="data">{{data.status}}</template>

        <template slot="[Info]" slot-scope="data">{{data.info}}</template>
      </b-table>
      <b-row>
        <b-col sm="5">
          <br />
          <h4 v-show="NoMatch">Displaying Result for '{{this.pickInput}}'</h4>
        </b-col>
      </b-row>
      <div class="pagination justify-content-end">
        <b-pagination
          id="valBorder"
          v-model="currentPageAudit"
          :total-rows="getRowsAudit"
          :per-page="getPerPageAudit"
          aria-controls="my-table"
          v-show="ShowTable"
        ></b-pagination>
      </div>
      <b-row align-h="center">
        <b-col cols="4">
          <h4 v-show="NoMatch">No Match Found....</h4>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import NewNavbar from "../components/NewNavbar";

import InputSearch from "../components/InputSearch.vue";

export default {
  name: "AuditLogs",
  data() {
    return {
      currentPageAudit: this.getCurrentPageAudit,
      emptyInput: "",
      pickInput: "",
      ShowTable: true,
      NoMatch: false,
      backAudits: false,
      fields: [
        { label: "Audit ID", key: "audit_id" },
        { label: "User ID", key: "user_id" },
        { label: "Date/time", key: "created_at" },
        { label: "Transaction type", key: "transaction_type" },
        { label: "IP address", key: "ip_address" },
        { label: "Browser", key: "browser" },
        { label: "Status", key: "status" },
        { label: "Info", key: "info" }
      ]
    };
  },

  methods: {
    ...mapActions(["CallAllLogs", "nav"]),

    bacAuditsAll(objVal) {
      this.emptyInput = objVal;
      this.pickInput = "";

      let requestObj = {
        url: null,
        page: 1
      };

      this.CallAllLogs(requestObj)
        .then(response => {
          if (response.length == 0) {
            this.ShowTable = false;
            this.NoMatch = true;
            this.backAudits = true;
          } else {
            this.backAudits = false;
            this.ShowTable = true;
            this.NoMatch = false;
            this.currentPageAudit = 1;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    searchSubmit(string) {
      this.pickInput = string;

      if (this.pickInput.length == 0) {
        let requestObjSearch = {
          search: ""
        };
        requestObjSearch.search = string;
        this.CallAllLogs(requestObjSearch)
          .then(response => {
            if (response.length == 0) {
              this.ShowTable = false;
              this.NoMatch = true;
              this.backAudits = true;
            } else {
              this.backAudits = false;
              this.ShowTable = true;
              this.NoMatch = false;
              this.currentPageAudit = 1;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let requestObjSearch = {
          search: ""
        };
        requestObjSearch.search = string;
        this.CallAllLogs(requestObjSearch)
          .then(response => {
            if (response.length == 0) {
              this.ShowTable = false;
              this.NoMatch = true;
              this.backAudits = true;
            } else {
              this.backAudits = true;
              this.ShowTable = true;
              this.NoMatch = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },

  computed: {
    ...mapGetters([
      "getAuditLogs",
      "getCurrentPageAudit",
      "getPerPageAudit",
      "getRowsAudit",

      "getFullName",
      "getAccountName",
      "getUserType",
      "getUserId",
      "getAvatarPath",
      "getToken"
    ])
  },

  mounted() {
    if (this.getToken != null) {
      this.nav();
      this.CallAllLogs();
    }
  },


  watch: {
    currentPageAudit: {
      handler: function(valueObj) {
        if (valueObj == null) {
          this.currentPageAudit = 1;
        } else {
          if (this.pickInput != "") {
            let requestSearch = {
              url: null,
              search: this.pickInput,
              page: 0
            };
            requestSearch.page = valueObj;
            this.CallAllLogs(requestSearch);
          } else {
            let requestObj = {
              url: null,
              page: this.currentPageAudit,
              search: ""
            };
            // requestObj.page = valueObj;
            this.CallAllLogs(requestObj);
          }
        }
      }
    }
  }, //End of watch

  components: {
    NewNavbar,
    InputSearch
  }
};
</script>
<style scoped>
.mar {
  margin-top: 50px;
  margin-right: 20px;
  margin-left: 20px;
}

.AuditLogs {
  background-color: #fff8da;
  height: 100vh;
}
</style>