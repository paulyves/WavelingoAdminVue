<template>
  <div class="ConvoInbox">
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
      <div class="col-auto ">
        <div class="row"></div>
        <b-card class="mt-5" header-class="border" body-class="bcard">
          <div class="row">
            <div class="col mb-3" v-if="this.getPrevPage !== null">
              <b-button class="addCommentBtn" @click="toggleMessage"
                >See older Messages</b-button
              >
            </div>
          </div>

          <div
            v-for="(comment, key) in getComment"
            :key="comment.id"
            :class="{ color: comment.user_to !== 'super_admin' }"
            class="mt-5"
          >
            <div class="col" v-if="key != 'account_name'">
              <div class="row">
                <div class="col">
                  <strong class="text ">{{ comment.full_name }}</strong>
                </div>
                <div
                  class="col"
                  v-if="comment.comment != null || comment.file_path != null"
                >
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
                    v-if="comment.file_path == null && comment.comment != null"
                  >
                    <div
                      v-bind:class="{
                        blue: comment.user_to == 'super_admin'
                      }"
                    >
                      <p>{{ comment.comment }}</p>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      v-bind:class="{
                        blue: comment.user_to == 'super_admin'
                      }"
                    >
                      <p v-if="comment.comment">{{ comment.comment }}</p>
                    </div>
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
                        class="btn-sm submitButton downloadButton addCommentBtn mt-0"
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
              <hr
                v-if="comment.comment != null || comment.file_path != null"
                color="#d0b380"
                class="mt-5"
              />
            </div>
          </div>
          <b-modal ref="my-modal" hide-footer id="modal" header-class="color">
            <div>
              <img
                :src="commentImg"
                class="mt-4"
                height="500px"
                width="465px"
              />
            </div>
          </b-modal>

          <div class="row mt-5">
            <div class="col-md-12 col-h">
              <b><label class="text float-left">Comment:</label></b>
              <textarea
                class="innershadow form-control"
                rows="5"
                v-model="comments.newComment"
              ></textarea>
              <br />
            </div>
          </div>
          <div class="row">
            <div class="col-5 mb-4 ml-3">
              <b-form-file
                class="custom-file-label"
                id="uploadFile"
                v-model="file"
                placeholder="Choose a file"
              >
              </b-form-file>
            </div>
            <div class="col">
              <b-button class="ml-3 addCommentBtn" size="sm" @click="addComment"
                >Add comment</b-button
              >
            </div>
          </div>
          <template v-slot:header>
            <div class="ml-3">
              <div class="row">
                <p class="mb-0 from">From:</p>
              </div>
              <div class="row">
                <div>
                  <h4>{{ getCommentAccName }}</h4>
                </div>
              </div>
            </div>
          </template>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import newNavbar from "../components/NewNavbar.vue";
import moment from "moment";
import ViewImageFile from "../components/ViewImageFile.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ConvoInbox",
  components: {
    newNavbar,
    ViewImageFile
  },
  props: ["id"],
  data() {
    return {
      hamburgify: false,
      profile: "",
      isUnderlined: false,
      comments: [],
      file: null,
      image: "",
      loadComment: "",
      commentImg: "",
      commentPage: this.getComment
    };
  },
  computed: {
    ...mapGetters([
      "getInbox",
      "getFullName",
      "getCommentAccName",
      "getComment",
      "getUserId",
      "getAccountName",
      "getAvatarPath",
      "getUserType",
      "getAccountId",
      "getPrevPage"
    ])
  },
  methods: {
    ...mapActions([
      "showAllComments",
      "submitReply",
      "readComments",
      "sendFile",
      "nav",
      "loadProfile",
      "downloadFile",
      "fileDownload",
      "showPrevData"
    ]),
    toggleMessage() {
      /**click event for viewing previous messages */
      this.showPrevData();
    },
    viewImage(comment) {
      /**click event modal for viewing images */
      this.fileDownload(comment).then(response => {
        let reader = new window.FileReader();
        reader.readAsDataURL(response);
        reader.onload = () => {
          let imageDataUrl = reader.result;
          this.commentImg = imageDataUrl;
          /**@param commentImg = for displaying image in modal*/
        };
      });
    },
    isPhoto(string) {
      /**displayed if upload file is equal to jpg/jpeg/png. */
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
      /**click event for downloading a file */
      this.fileDownload(comment).then(response => {
        let fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement("a");
        let filePath = comment.file_path;
        let fileExt = filePath.split(".")[1];
        fileLink.href = fileUrl;
        fileLink.setAttribute("download", "file." + fileExt);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    addComment() {
      /**click event of submmiting a comment and uploading a file.*/
      let formData = new FormData();
      let file = document.querySelector("#uploadFile");
      let fileElement = document.getElementById("uploadFile");
      let fileExtension = "";

      formData.append("userId", this.getUserId);
      formData.append("comment", this.comments.newComment);
      formData.append("commentFile", file.files[0]);
      formData.append("accountTo", this.id);

      if (fileElement.value.lastIndexOf(".") > 0) {
        fileExtension = fileElement.value.substring(
          fileElement.value.lastIndexOf(".") + 1,
          fileElement.value.lenght
        );
      }
      if (!this.comments.newComment && !this.file) {
        /**checks if inside the condition is empty */
        console.log();
      } else if (
        fileExtension.toLowerCase() == "jpg" ||
        fileExtension.toLowerCase() == "jpeg" ||
        fileExtension.toLowerCase() == "png" ||
        fileExtension.toLowerCase() == "zip" ||
        fileExtension.toLowerCase() == "pdf" ||
        fileExtension.toLowerCase() == "rar" ||
        fileExtension.toLowerCase() == ""
      ) {
        /**else if condtion checks if the uploaded file is equal to jpg/jpeg/png/zip/pdf/rar */
        this.sendFile(formData).then(response => {
          if (response.comment == "added") {
            /**if successfully added the data will refresh and will post the new comment or a uploaded file. */
            this.showAllComments(this.id);
          }
        });
        this.file = null;
        this.comments.newComment = "";
        /**clears text fields after adding comment. */
        return true;
      } else {
        return false;
      }
    }
  },

  mounted() {
    this.nav().then(() => {
      this.loadProfile().then(response => {
        this.profile = response;
      });
      this.showAllComments(this.id);
      /**@param this.id = get the account id of user/admin. */
    });
  },
  filters: {
    /**formatData = display the date if when the comment/file is uploaded */
    formatDate: function(value) {
      return moment(value).calendar();
    }
  }
};
</script>
<style scoped>
.material-icons {
  color: #ffe5a9;
  background: #985b47;
}
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
.ConvoInbox {
  background-color: #fff8da;
  min-height: 100vh;
  margin: 0%;
}
textarea,
textarea:focus {
  background-color: #fff8da;
  border: 1px solid #e5d4b8;
}
.addCommentBtn:hover {
  color: #ffe5a9;
  background: brown;
}
.downloadButton {
  height: 30px;
  width: 45px;
}
.sidenav-position {
  position: absolute;
  z-index: 1;
}
button {
  position: absolute;
  z-index: 2;
}
.border {
  background: #ffecc3;
}
.from {
  color: #804f3f;
  font-weight: 560;
}
.text {
  float: left;
  color: #814e3d;
}
p {
  text-align: justify;
  margin-right: 5%;
  margin-right: 25%;
}
h3,
h4 {
  float: left;
  color: #804f3f;
  font-weight: 600;
}
.form-file {
  float: left;
}
.addCommentBtn {
  float: left;
  color: #ffe5a9;
  background: #985b47;
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
  font-size: 12px;
}
</style>
