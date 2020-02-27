<template>
<div class="CallRecords">
  <div>
    <newNavbar
      :fullName="getFullName"
      :accountName="getAccountName"
      :userType="getUserType"
      :userId="getUserId"
      :avatarPath="getAvatarPath"
      :accountId="getAccountId"
      :navProfile="profile"
    />
    <div class="container">
      <div class="offset-md-2">
      <div class="row">
        <div class="col-5">
          <h3 class="mt-5">Call Records</h3>
        </div>
      </div>
      <div>
        <div class="row mt-4">
          <div class="col-md-3 violet-col">
            <p><b>Device Name:</b>&nbsp;&nbsp;{{getDevice.deviceName}}</p>
          </div>
          <!-- <div class="col-9 violet-col">
            <small class="float-right">Total Cap: 1,000 hours</small>
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-3 violet-col">
            <p><b>Tel. Number:</b>&nbsp;&nbsp; {{getDevice.telNum}}</p>
          </div>
          <!-- <div class="col-9 violet-col">
            <small class="float-right">Used hours: 649 hours</small>
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-3 violet-col">
            <p><b>Language:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{getDevice.language}}</p>
          </div>
          <!-- <div class="col-8 violet-col">
            <a class="float-right" href>Export</a>
          </div>
          <div class="col-1 violet-col">
            <a class="float-left" href>Print</a>
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-3 violet-col">
            <p><b>Translation:</b> &nbsp;&nbsp;&nbsp;{{getDevice.translation}}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 violet-col">
            <p><b>Remarks:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{getDevice.remarks}}</p>
          </div>
        </div>
        <div class="row">
   <div class="col-12">
            <small class="float-right">Total Cap: 1,000 hours</small>
          </div>
</div>
<div class="row mb-3">
   <div class="col-12">
            <small class="float-right">Used hours: 649 hours</small>
          </div>
</div>
      </div>
      <div class="row">
        <div class="col-md-8 violet-col">
          <p class="float-right">[ ]include untranslated calls</p>
        </div>
        <div class="col-md-2 violet-col">
          <input type="text" placeholder="Start date" class="form-control" />
        </div>
        <div class="col-md-2 violet-col">
          <input type="text" placeholder="End date" class="form-control" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 violet-col">
          <div class="mt-3 pagination justify-content-end">
            <b-pagination v-model="recordCurrentPage" :per-page="getPerPage" :total-rows="getRows"></b-pagination>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 violet-col">
          <Record :records="getRecords" />
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
</template>
<script>
//import Navbar from "../components/Navbar.vue";
import Record from "../components/Record.vue";
import newNavbar from "../components/NewNavbar";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CallRecords",
  components: {
    newNavbar,
    Record
  },
  data() {
    return {
      hamburgify: false,
      profile: "",
      recordCurrentPage: this.getRecordsCurrentPage
    };
  },
  props: ["id"],

  computed: {
    ...mapGetters([
      "getDevice",
      "getPerPage",
      "getRecordsCurrentPage",
      "getRows",
      "getRecords",
     "getFullName",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getUserId",
      "getAccountId"
    ])
  },
  methods: {
    ...mapActions(["fetchPage", "nav","loadProfile"])
  },

  mounted() {

    this.nav().then(() => {
        this.loadProfile().then(response => {
      this.profile = response;
    });
    this.fetchPage({ deviceId: this.id, page: null });
      });
  },
  watch: {
    recordCurrentPage: {
      handler: function(value) {
        this.fetchPage({ deviceId: this.id, page: value });
      }
    }
  }
};
</script>
<style scoped>
p {
  margin-bottom: 0%;
  float: left;
  color: #985b47;
}
small{
  color: #985b47;
}
.col-h {
  height: 150px;
}
h3 {
  float: left;
  color: #985b47;
}
.form-control {
  width: 100%;
  height: 100%;
  border: solid 1px#8b5e4e;
}
.form-control::placeholder{
  color: #8b5e4e;
  width: 100%;
  height: 100%;
}
.CallRecords{
  background: #fff8da;
  height:100vh;
  margin:0%;
}
</style>