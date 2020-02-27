<template>
  <div class="viewImageFile">
      <b-button @click="viewImage" variant="none" v-b-modal.modal size="lg" class="size">
      <i class="material-icons mt-1"></i>
    </b-button>

  </div>
</template>

<script>
export default {
props: ['imageComment','commentId','comments'],

data(){
return{
  selectedCommentID: {},  
}
},
methods:{
    viewImage(){
      /**click event to view image */
        this.$emit('loadImage', this.comments);
         /**emitted 'loadImage' to account profile*/
    },
    
}
}

</script>

<style scoped>
.size {
  width:10px;
  height:10px;
}
</style>
