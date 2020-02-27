<template>
  <div class="inbox">
    <div class="">
    <div class="row mb-1">
      <div class="col-mb-3 ml-3" v-show="btn1">
        <b-button class="markBtn" @click.prevent="unread(selected)">
          <i class="material-icons">markunread</i>
        </b-button>
      </div>
      <div class="col-mb-3" v-show="btn2">
        <b-button class="markBtn" @click.prevent="read(selected)">
          <i class="material-icons">drafts</i>
        </b-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-table-simple responsive class="table-striped table" >
          <b-thead class="color">
            <b-tr>
              <b-th>
                <b-form-checkbox v-on:change="selectAll(selected)" v-model="allSelected"></b-form-checkbox>
              </b-th>
              <b-th>From</b-th>
              <b-th>Message</b-th>
              <b-th>Date/Time</b-th>
            </b-tr>
          </b-thead>

          <b-tbody class="table-row">
            <b-tr v-for="i in inbox" :key="i.index" :class="{'rowClass': i.is_read == 0}">
              <b-td>
                <b-form-checkbox
                  v-model="selected"
                  @change="selectedMssg(i)"
                  :value="i.account_id"
                />
              </b-td>
              <b-td @click="viewMessage(i)">{{i.account_name}}</b-td>
              <b-td @click="viewMessage(i)">{{i.comment || "Sent a File." | truncate}}</b-td>
              <b-td @click="viewMessage(i)">{{i.created_at | formatDate}}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "inbox",
  props: ["inbox", "id"],
  data() {
    return {
      file: null,
      selected: [],
      allSelected: false,
      btn1: false,
      btn2: false,
      select: false
    };
  },
  computed: {
    ...mapGetters(["getInbox", "getToken"])
  },
  methods: {
    ...mapActions(["markAllAsRead"]),
    selectedMssg(i) {
      /**click event for checking and unchecking a box.
       * @param i = objects for users 
       */
      console.log(i)
      if (i.is_read == 0) {
        /**
         * @param i.is_read = if it's equal to 0 btn2 will show.
         * @param this.btn2 = click event for mark as read.
         */
        this.btn2 = true;
        this.btn1 = false;
      }
      if (i.is_read == 1) {
        /**
         * @param i.is_read = if it's equal to 1 btn1 will show.
         * @param this.btn1 = click event for mark as unread.
         */
        this.btn1 = true;
        this.btn2 = false;
      }
    },
    selectAll(i) {
      /**
       * click event for checking all the select boxes.
       */
      this.selected = [];

      if (!this.allSelected) {
        for (i in this.inbox) {
          this.selected.push(this.inbox[i].account_id);
        }
      }
      if (this.allSelected == false) {
        /**
         * @param this.allSelected = if equals to false the btn1 and btn2 will show.
         */
        this.btn1 = true;
        this.btn2 = true;
      } else if (this.allSelected == true) {
        /**
         * @param this.allSelected = if equals to true the btn1 and btn2 will hide.
         */
        this.btn1 = false;
        this.btn2 = false;
      }
    },
    viewMessage(i) {
      /**
       * click event of viewing the selected message.
       */
      let readId = {
        id: i.account_id
      };
      this.$emit("viewInbox", readId);
      /**@param readId = account ID of the Selected Message.
       * emitted 'viewInbox' to Support inbox
       * will direct to convoinbox
       */
      this.$router.push({ path: "/convoInbox/" + i.account_id });
    },

    read(i) {
      /**
       * click event for mark as read
       */
      console.log(i)
      let id2 = {
        marks: i,
        type: "read"
      };
      this.selected = [];
      this.$emit('mark', id2);
      /**emitted 'mark' to Support Inbox */
      this.allSelected = false;
    },

    unread(i) {
      /**
       * click event for mark as unread
       */
      let id = {
        marks: i,
        type: "unread"
      };
      this.selected = [];
      this.$emit('markAs', id);
      /**emitted 'mark' to Support Inbox */

      this.allSelected = false;
    }
  },
  filters: {
    /**
     * truncate = function for messages you recieved is more than 30.
     * formatDate = the date when the comment was created.
     */
    
    truncate: function(value) {
      if (value.length > 30) {
        value = value.substring(0, 65) + "...";
      }
      return value;
    },
    formatDate: function(value) {
      return moment(value).calendar();
    }
  }
};
</script>


<style scoped>
.table{
  border: 1px solid #cead78;
}
.table > tbody > tr > td {
   background-color:#ffeab8;
  color: #985b47;
}
.table > thead{
  background: #985b47;
  color:#ffeab8;
}

.markBtn{
  color: #ffe5a9;
  background: #985b47;
}
.markBtn:hover{
  color: black;
   background: #985b47;

}

.head {
  background: #eee;
  border-top: 1px solid #bbb;
  text-align: left;
}
.table-row {
  cursor: pointer;
}
.weight {
  font-style: italic;
}
.rowClass {
  font-weight: bold;
}
.table-striped{
  border: 1px solid #cead78;
}
.table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
   background-color:#ffeab8;
   
}
.table-striped > thead{
  background: #985b47;
  color: #fbe0a5;
 
} 
td:nth-child(1n+1){
  border-color: #e0cb9e;
  color: #985b47;
}

</style>