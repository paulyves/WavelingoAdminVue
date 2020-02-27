<template>
  <div class="editAccountProfile">
    <input
      type="text"
      name="editAccount"
      id="editAccount"
      :value="value"
      @input="submit"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  name: "editAccountProfile",
  props: ["value", "type"],
  data() {
    return {
      editAccount: ""
    };
  },
  methods: {
    submit(event) {
      this.editAccount = event.target.value;
      if (this.editAccount.length == 0) {
        this.editAccount = this.value;
      }
      this.$emit("submitText", { string: this.editAccount, type: this.type });
      /**emitted a params for editing a account profile*/
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
.form-control{
  height: 30px;
  padding:0%;
}
</style>