<template>
  <div class="Support">
    <div class="s-layout">
      <newNavbar
        :fullName="getFullName"
        :accountName="getAccountName"
        :userType="getUserType"
        :userId="getUserId"
        :avatarPath="getAvatarPath"
        :accountId="getAccountId"
        :userProfile="userProf"
      />
      <div class="container">
        <div class="col-auto offset-md-2">
          <div class="row">
            <div class="col mt-5">
              <h4 class="text">Technical Support</h4>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="text">Email: support@bluewave-global.com</div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text">Tel No. +65 1111 2222</div>
            </div>
          </div>
          <b-card class="bCard mt-5">
            <div class="row">
              <div class="col" v-if="this.getPrevPage !== null">
                 <b-button class="submitButton" @click="toggleMessage" >
              See older Messages  
            </b-button>
              </div>
            </div>
            
            <div v-for="(comment, key) in getComment" :key="comment.id" class="mt-5">
              <div class="col" v-if="key != 'account_name'">
                <div class="row">

                  <div class="col">
                    <strong class="text ">{{ comment.full_name }}</strong>
                  </div>
                  
                  <div class="col" v-if="comment.comment != null || comment.file_path != null">
                    <span class="text-muted ml-3">
                      <small class="text-muted float-right">{{
                        comment.created_at | formatDate
                      }}</small>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div
                      v-if="
                        comment.file_path == null && comment.comment != null
                      "
                    >
                      <div
                        v-bind:class="{
                          blue: comment.user_to == 'super_admin'
                        }"
                        v-if="comment.file_path !== null">
                        <p>{{ comment.comment }}</p>
                      </div>
                    </div>
                    <div >
                      
                        <p v-if="comment.comment">{{ comment.comment }}</p>
                      
                      <span v-if="isPhoto(comment.file_path)">
                        <div class="avatar-wrapper">
                          <i class="material-icons">
                            image
                          </i>
                          <div class="upload-button">
                            <ViewImageFile
                            :imageComment="comment.file_path"
                            @loadImage="viewImage"
                            :comments="comment"
                            
                            />
                          </div>
                         
                        </div>
                         
                      </span>
                      <span v-else-if="comment.file_path != null">
                        <b-button
                          class="btn-sm submitButton downloadButton mt-0"
                          :value="comment.file_path"
                          @click="clickDownload(comment)"
                        >
                          <i class="material-icons">
                            cloud_download
                          </i></b-button
                        >
                      </span>
                    </div>
                  </div>
                </div>
               <hr v-if="comment.comment != null || comment.file_path != null" color="#d0b380" class="mt-5" />
              </div>
            </div>
            <div class="row mb-4" >
            <div class="col-md-12 col-h">
              <label class="text mt-3">Comment:</label>
              <textarea
                :class="{textError: 'errorTExt'}"
                class="innershadow form-control"
                rows="5"
                v-model="comments"
                required></textarea>
              <br />
            </div>
            <div class="col">
              <b-form-file
                class="label custom-file-label form-size"
                id="fileUpload"
                placeholder="Choose a file"
                v-model="commentFile"
              ></b-form-file>
            </div>
            <div class="col">
              <b-button
                class="submitButton btn-sm float-right"
                @click="fileComment"
                >Add comment</b-button
              >
            </div>
          </div>
      
          </b-card>

          
        </div>
      </div>
    </div>
    <b-modal ref="my-modal" hide-footer id="modal" header-class="color">
          
       <div>
         <img :src="commentImg"  class="mt-4" height="500px" width="465px"/>
       </div>
      
    </b-modal>
    
  </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import ViewImageFile from '../components/ViewImageFile.vue';
import newNavbar from "../components/NewNavbar.vue";
export default {
  name: "Support",
  components: {
    
    newNavbar,
    ViewImageFile
  },
  data() {
    return {
      hamburgify: false,
      userProf: "",
      commentFile: null,
      comments: "",
      loadComment: "",
      commentImg: "",
      commentsArray: [],

      

    };
  },
  computed: {
    ...mapGetters([
      "getComment",
      "getUserId",
      "getFullName",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getAccountId",
      "getCommentID",
      "getCommentRows",
      "getPerPageSupp",
      "getCommentPage",
      "getNextPage",
      "getPrevPage",
      "getFirstPage",
      "getLastPage",
      "getPath",
      "getAll"
    ]),
   },
  mounted() {
    this.nav().then(()=>{
      this.loadProfile().then(response =>{
        this.userProf = response
      });
      this.showAllComments();
    })
  },

  methods: {
    ...mapActions([
      "showAllComments",
      "addComment",
      "sendFile",
      "nav",
      "loadProfile",
      "downloadFile",
      "fileDownload",
      "showPrevData"
    ]),

    
    toggleMessage(){
      /**click event for viewing previous messages. */
         this.showPrevData();
    },
    viewImage(comment){ 
      /**
       * click event modal in viewing the uploaded image. */  
     this.fileDownload(comment).then(response =>{
       let reader = new window.FileReader();
          reader.readAsDataURL(response);
          reader.onload = () => {
            let imageDataUrl = reader.result;
            this.commentImg = imageDataUrl;
            /**
             * @param this.commentImg = display photo.
             */
          };

          
     });

    },
    isPhoto(string) {
      /**
       * isPhoto = display if uploaded file extension is jpg/jpeg/png.
       */
      let fileExtension = "";
      if (string) {
        if (string.lastIndexOf(".") > 0) {
          fileExtension = string.substring(
            string.lastIndexOf(".") + 1,
            string.lenght
          );
        }
      }

      return (
        fileExtension.toLowerCase() == "jpg" ||
        fileExtension.toLowerCase() == "jpeg" ||
        fileExtension.toLowerCase() == "png"
      );
    },
    clickDownload(comment) {
      /**
       * click event for downloading  a file.
       */
      this.fileDownload(comment).then(response => {
         let fileUrl = window.URL.createObjectURL(new Blob([response]));
          let fileLink = document.createElement("a");
          let filePath = comment.file_path;
          let fileExt = filePath.split(".")[1]; 
          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "file."+fileExt);
          document.body.appendChild(fileLink);
          fileLink.click();
      });
           
           
    },

    fileComment() {
      /**
       * click event for submitting
       */
      let formData = new FormData();
      let file = document.querySelector("#fileUpload");
      let fileElement = document.getElementById("fileUpload");
      let fileExtension = "";

      formData.append("userId", this.getUserId);
      formData.append("comment", this.comments);
      formData.append("commentFile", file.files[0]);
     
     if (fileElement.value.lastIndexOf(".") > 0) {
        fileExtension = fileElement.value.substring(
          fileElement.value.lastIndexOf(".") + 1,
          fileElement.value.lenght
        );
      }
      if(!this.comments && !this.commentFile){
        /**checks if empty */
          console.log();
        }
     else if (
        fileExtension.toLowerCase() == "jpg" ||
        fileExtension.toLowerCase() == "jpeg" ||
        fileExtension.toLowerCase() == "png" ||
        fileExtension.toLowerCase() == ""
      ) {
        this.sendFile(formData).then(response => {
          if(response.comment == "added"){
            this.showAllComments();
          }
        });
        this.commentFile = null;
        this.comments = "";
        return true;
      }
       else if (
        fileExtension.toLowerCase() == "zip" ||
        fileExtension.toLowerCase() == "pdf" ||
        fileExtension.toLowerCase() == "rar" ||
        fileExtension.toLowerCase() == ""
      )
       {
        this.sendFile(formData).then(response =>{
        if(response.comment == "added"){
            this.showAllComments();
        }
          });
        this.commentFile = null;
        this.comments = "";
        return true;
      }
    
       
      else {
        return false;
      }
    },
    onFileChange(e) {
      /**click event for selecting a image/file. */
      let fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);

      
    },

  },
  filters: {
    /**formData = display when is the comment or a file been uploaded. */
    formatDate: function(value) {
      return moment(value).calendar();
    }
  },
  

};
</script>
<style scoped>
.avatar-wrapper {
  position: relative;
  height: 10px;
  width: 10px;
  box-shadow: 1px 1px 10px -5px black;
  transition: all 0.3s ease;
}
.avatar-wrapper:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.avatar-wrapper .upload-button {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0%;
}
.avatar-wrapper .upload-button .circle {
  position: absolute;
  text-align: center;
  opacity: 0;
  transition: all 0.3s ease;
  color: #34495e;
  padding: 0%;
}
.avatar-wrapper .upload-button:hover {
  opacity: 0.9;
}
.downloadButton {
  height: 30px;
  width: 45px;
}
.Support {
  min-height: 100vh;
  background: #fff8da;
  margin: 0%;
}
.container {
  background: #fff8da;
}
.sidenav-position {
  position: fixed;
  z-index: 1;
}
button {
  position: absolute;
  z-index: 2;
}
/* .form-size{
  width: 50%;
} */
.blue{
  color: darkblue;
}
textarea,
textarea:focus {
  /* background-color: #fff8da; */
  border: 2px solid #e5d4b8;
}
.submitButton {
  color: #ffe5a9;
  background: #985b47;
}
.material-icons {
  color: #ffe5a9;
  background: #985b47;
}
.submitButton:hover {
  color: #ffe5a9;
  background: brown;
}
p {
  text-align: justify;
  margin-right: 5%;
}

.text {
  color: #814e3d;
  float: left;
}
.blue {
  margin-top: 10px;
  color: #814e3d;
}
.bCard {
  border-color: #ddc99a;
}
.custom-file-label::after {
  color: #875846;
  background: #ffecc2;
  border-color: #ffecc2;
  font-weight: bold;
}
.custom-file-label {
  color: #beaa98;
  border-color: #e2c997;
}
</style>
