<template>
  <div class="editInvoicedDetail">
    <input
      type="text"
      name="editInvoice"
      id="editInvoice"
      :value="value"
      @input="submitInvoice"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  name: "editInvoiceDetail",
  props: ["value", "type"],
  data() {
    return {
      editInvoice: ""
    };
  },
  methods: {
    submitInvoice(event) {
      this.editInvoice = event.target.value;
      if (this.editInvoice.length == 0) {
        this.editInvoice = this.value;
      }
      this.$emit("InvoiceDetail", {
        string: this.editInvoice,
        type: this.type
      });
      /**emitted a param for editing a invoice detail */

    }
  }
};
</script>

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 0px 5px;
  border: 1px solid  #8b5e4e;
  border-radius: 3px;
  font-size: 13px;
}
</style>