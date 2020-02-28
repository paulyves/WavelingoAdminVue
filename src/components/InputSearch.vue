<template>
  <div class="InputSearch">
    <b-form @submit.prevent="onSubmit">
      <b-input-group-append>
        <b-form-input id="colorFil" v-model="pick" type="search" placeholder="Search"></b-form-input>
        <!-- <b-form-input class="material-icons" type="button"></b-form-input> -->
        <b-button class="material-icons" type="submit">search</b-button>
        <!-- <b-button class="material-icons" type="submit">search</b-button> -->
      </b-input-group-append>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "InputSearch",
  props: ["tab", "searchEmpty", "emptyInput", "searchKey"],

  data() {
    return {
      pick: "",
      searchPick: []
    };
  },

  methods: {
    onSubmit() {
      this.$emit("searchSubmit", this.pick);
    }
  },

  watch: {
    searchEmpty: {
      handler: function(valueObj) {
        if (valueObj != null) {
          this.pick = "";
        } else {
          this.pick = "";
        }
      }
    },

    emptyInput: {
      handler: function(valueObj) {
        if (valueObj != null) {
          this.pick = "";
        } else {
          this.pick = "";
        }
      }
    },

    searchKey:{
      handler: function (value) {
        if (value !="") {
          value = "";
        }
      }
    }
    
  }
};
</script>

<style scoped>
.material-icons {
  color: #985b47;
  background-color: white;
  border-radius: 2px;
  border: 1px solid #985b47;
  border-left: none;
}
.material-icons:hover {
  background-color: white;
  color: #985b47;
  border: 1px solid #985b47;
  border-left: none;
}

#colorFil {
  border-radius: 2px;
  border: 1px solid #985b47;
  border-right: none;
}

#colorFil::placeholder {
  color: #985b47;
}
</style>