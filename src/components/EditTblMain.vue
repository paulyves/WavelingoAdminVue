<template>
  <div>
    <b-button class="material-icons sizing" @click="selectModal" variant="info">edit</b-button>
  </div>
</template>
<script>
export default {
  name: "EditTblMain",
  props: ["device"],

  data() {
    return {};
  },

  methods: {
    selectModal() {
      this.$emit("selectModal", this.device);
    }
  }
};
</script>

<style scoped>
.sizing{
  padding: 1px;
  height: 40px;
  width: 40px;
}
</style>