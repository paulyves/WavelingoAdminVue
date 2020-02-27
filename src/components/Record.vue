<template>
<div class="records">
  <div>
    <b-table
      hover
      id="my-table"
      :items="records"
      :fields="fields"
      :per-page="0"
      borderhover
      class="table table-striped"
      responsive
    ></b-table>
  </div>
</div>
</template>

<script>
export default {
  name: "records",
  props: ["records"],
  data() {
    return {
      fields: [
        { label: "No.", key: "call_id" },
        { label: "Date", key: "call_started" },
        { label: "Call Duration", key: "call_duration" },
        { label: "Translation Duration", key: "translation_duration" },
        { label: "Language", key: "language" },
        { label: "Dialed Number", key: "dialed_number" }
      ]
    };
  }
};
</script>

<style scoped>
.table-striped{
  border: 1px solid #cead78;
}
.table thead th{
  color: #fbe0a5 !important;
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
.table {
  background: #985b47;
  color: #ffeab8;
}
.table-striped > tbody > tr:nth-child(even) > td,
.table-striped > tbody > tr:nth-child(even) > th {
  background-color: #fff8da;
}

.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #ffeab8;
}

.table-striped > thead {
  background-color: #985b47;
  color: #fff8da;
}
</style>