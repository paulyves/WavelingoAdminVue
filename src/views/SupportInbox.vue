<template>
  <div class="SupportInbox">
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
      <div class="col-auto">
      <div class="row">
      </div>
      <div class="row mt-4">
        <div class="col">
          <b-pagination
            class="float-right"
            :value="getCommentCurrentPage"
            :per-page="getCommentPerPage"
            :total-rows="getCommentRows"
          ></b-pagination>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <Inbox
            :inbox="getInbox"
            @viewInbox="viewMessage"
            @mark="markAsRead"
            @markAs="markAsUnread"
          />
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <b-pagination
            class="float-right"
            :value="getCommentCurrentPage"
            :per-page="getCommentPerPage"
            :total-rows="getCommentRows"
          >
          </b-pagination>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import newNavbar from "../components/NewNavbar.vue";
import Inbox from "../components/Inbox";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    newNavbar,
    Inbox
  },
  data() {
    return {
      hamburgify: false,
      profile:"",
      attemptLogin: false
    };
  },
  computed: {
    ...mapGetters([
      "getInbox",
      "getCommentPerPage",
      "getCommentCurrentPage",
      "getCommentRows",
      "getFullName",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getUserId",
      "getAccountId"
    ])
  },
  mounted() {
    this.nav();
    this.supportInbox();
    this.loadProfile().then(response =>{
      this.profile = response
    })
  },
  methods: {
    ...mapActions([
      "supportInbox",
      "readComment",
      "nav",
      "markAllAsRead",
      "loadProfile",
    ]),

    viewMessage(readId) {
      /** 
       * click event to view the messages of the selected account id.
      */
      this.readComment(readId);
    },
    markAsRead(id2) {
      /**@param id2 = users account id
       * click event for marking as read
       */
      this.markAllAsRead(id2).then(response => {
        if (response.comment == "read") {
          this.supportInbox();
        }
      });
    },
    markAsUnread(id) {
      /**@param id = users account id
       * click event for marking as unread
       */
      this.markAllAsRead(id).then(response => {
        if (response.comment == "unread") {
          this.supportInbox();
        }
      });
    }
  },
  watch: {
    currentPage: {
      handler: function(value) {
        const pageObj = {
          url: null,
          page: value
        };
        this.supportInbox(pageObj);
      }
    }
  }
};
</script>
<style scoped>
.sidenav-position {
  position: absolute;
  z-index: 1;
}
button {
  position: absolute;
  z-index: 2;
}
.SupportInbox {
  background-color: #fff8da;
  height: 100vh;
  margin:0%;
}
h3 {
  float: left;
  color: #804f3f;
  font-weight: 600;
  margin-top: 10%;
}
</style>