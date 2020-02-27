
<template>
  <div>
      <b-button variant="none" v-b-modal.modal-picture size="lg" class="btn-size">
      <i class="material-icons mt-1"></i>
    </b-button>
    <b-modal ref="my-profilePicture" hide-footer id="modal-picture"  header-class="color">
      <div class="container">
          <img :src="profilePic || 'https://thelightingagency.com/wp-content/uploads/2017/01/person-placeholder.jpg' " height="500px" width="450px">
      </div>
      
    </b-modal>
  </div>
</template>

<script>
export default {
    name: 'viewPicture',
    props:['profilePic']
        
    
}
</script>

<style scoped>
.btn-size {
  width: 100%;
  height: 50%;
}
</style>