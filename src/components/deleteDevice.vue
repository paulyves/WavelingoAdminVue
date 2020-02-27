<template>
  <div class="DeleteBtn">
        <b-button :device="data.item" @DeleteDevice="selectedDevice" variant="danger" >Delete</b-button>



         <b-modal id="modal-device-delete" 
        title= 'Please Confirm'
         
          okVariant= 'danger'
          okTitle= 'YES'
          cancelTitle= 'NO'     
          centered
        >
        <!-- <p class="my-4">Hello from delete!</p> -->
        <!-- <p>{{data.item.device_id}}</p>+ -->
        

        <b-form-group label="Your Device ID:">
        <b-form-input
          v-model="selectedDevice.device_id"
          type="number"
          placeholder="Enter your Device"
          
        ></b-form-input>
      </b-form-group>
        
        

        </b-modal>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>