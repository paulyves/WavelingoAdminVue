<template>
  <div class="Mainscreen">
    <h1>helloWorld</h1>

    <b-table
      id="my-table"
      :items="getdevices"
      :per-page="0"
      :fields="fields"
      small
      class="table table-bordered table-responsive-md table-striped text-center"
      selectable
    ></b-table>
    <div class="pagination justify-content-end">
      <b-pagination
        v-model="currentPageMain"
        :total-rows="getRows"
        :per-page="getPerPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      currentPageMain: this.getcurrentPageMain,

      fields: [
        { label: "Device ID", key: "device_id" },
        { label: "Serial Number", key: "serial_number" },
        { label: "Device Name", key: "device_name" },
        { label: "Telephone Number", key: "tel_number" },
        { label: "Language", key: "language" },
        { label: "Translation", key: "translation" },
        { label: "Remarks", key: "remarks" },
        { label: "Actions", key: "Action" }
      ]
    }; //closing return
  },
  methods: {
    ...mapActions(["getAllDevice"])
  },

  created() {
    this.getAllDevice();
  },

  computed: {
    ...mapGetters(["getdevices", "getcurrentPageMain", "getRows", "getPerPage"])
  },
  watch: {
    currentPageMain: {
      handler: function(value) {
        let requestObj = {
          url: null,
          page: 0
        };
        requestObj.page = value;
        this.getAllDevice(requestObj);
      }
    }
  }
};
</script>
<style scoped>
</style>