<template>
  <div>
    <b-button variant="none" v-b-modal.modal size="lg" class="size">
      <i class="material-icons mt-1"></i>
    </b-button>
    <b-modal ref="my-modal" hide-footer id="modal" title="Change Account Picture" header-class="color">
      <div class="container">
        <div v-show="chooseImage">
          <img src="https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg" class="img-responsive mt-4" height="150px" width="150px" alt />
        </div>
       <div class="row mb-5">
         <div class="col">
          <b-form-file
            class="custom-file-label"
            id="imageFile"
            @change="onFileChange"
            accept="image/jpeg, image/png, image/gif"
            placeholder="Choose an image"
          ></b-form-file>
         </div>
       </div>
        <div v-show="uploadedImage">
          <div class="row">
            <img :src="image" class="imgImg" width="150px" height="150px"/>
          </div>
        </div>
        <div class="row">
          <div class="col" v-show="invalidImage">
            <center><b-alert variant="danger" show>Invalid file!</b-alert></center>
          </div>
        </div>
        <div class="mt-3">
         
          <div v-show="uploadButton">
            <b-button @click="uploadProf" variant="primary">Change Profile</b-button>
          </div>
        </div>
     
      </div>
      
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "changeAvatarModal",
  props:["invalidImage"],
  data() {
    return {
      image: "",
      chooseImage: true,
      uploadedImage: false,
      uploadButton: false,
    };
  },
  computed: {
    ...mapGetters(["getAccountId"])
  },
  mounted() {
    this.loadProfile().then(response => {
      this.profile = response;
    });
  },
  methods: {
    ...mapActions(["loadProfile"]),

    uploadProf() {
      let formData = new FormData();
      let file = document.querySelector("#imageFile");
      // let fileElement = document.getElementById("imageFile");
      // let fileExtension = "";
      formData.append("id", this.getAccountId);
      formData.append("profilePicture", file.files[0]);
      this.$emit("addProf", formData);
      this.$refs['my-modal'].hide();
 this.chooseImage = true;
 this.uploadedImage = false;
 this.uploadButton = false;
 this.invalidImage = false;
      
      
      
     
    },

    onFileChange(e) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = e => {
        this.image = e.target.result;
      };
      this.createImage(e.target.files[0]);
      this.uploadedImage = true;
      this.chooseImage = false;
      this.uploadButton = true;
       this.invalidImage = false;
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
p{
  color: red;
}
.color{
  background: #875846;
}
.size {
  width: 100%;
  height: 50%;
}
img {
  /* width: 100%; */
  margin: auto;
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
}
.file {
  width: 100%;
  margin-bottom: 3%;
}
.imgImg {
  height: 100%;
  width: 100%;
  /* margin: auto; */
}
.custom-file-label::after{
  color: #875846;
  background: #ffecc2;
  border-color: #ffecc2;
  font-weight: bold;

}
.custom-file-label{
  color: #beaa98;
  border-color: #e2c997;

}
.file{
  width: 50%;
}
</style>