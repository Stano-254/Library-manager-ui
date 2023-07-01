<template>
  <div class="container my-2">
  <card >
    <h4 slot="header" class="card-title">Edit Member Details</h4>
    <form class="justify-content-center">
      
      <div class="row justify-content-center">
        <div class="col-md-0">
          <base-input type="text"
                    :hidden="true"
                    placeholder="001"
                    v-model="member.id">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="text"
                    label="Membership No"
                    :disabled="true"
                    placeholder="001"
                    v-model="member.membership_no">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="text"
                    label="Identification No"
                    placeholder="ID No"
                    v-model="member.national_id">
          </base-input>
        </div>
        
      </div>

      <div class="row justify-content-center">
        <div class="col-md-5">
          <base-input type="text"
                    label="First Name"
                    placeholder="First Name"
                    v-model="member.first_name">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="member.last_name">
          </base-input>
        </div>
      </div>


      <div class="row justify-content-center">
        <div class="col-md-5">
          <base-input type="text"
                    label="Phone Number"
                    placeholder="0734657724 or 254734657724"
                    v-model="member.mobile_no">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="text"
                    label="Gender"
                    placeholder="Female or Male"
                    v-model="member.gender">
          </base-input>
        </div>
        
      </div>

      <div class="text-center">
        <base-button  type="submit"
        class="mx-1 btn-info btn-fill float-right"@click.prevent="updateProfile">Update profile</base-button>
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Profile
        </button>
      </div>
      <div class="clearfix"></div>
    
    </form>
  </card>
</div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import apiClient from 'src/directives/apiclient.js';

  export default {
    components: {
      Card
    },
    data () {
      return {
        member:null,
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
      
      }
      
    },
    
    created(){
      this.member = this.$route.params.member;
      console.log("we need to edit",this.$route.params.member.first_name)
      console.log("we let ",this.member.id)
    },
    
    methods: {
      notifyVue (verticalAlign, horizontalAlign, message,colors,icon='nc-icon nc-bulb-63') {
        this.$notifications.notify(
          {
            message: message, icon: icon,
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: colors
          })
      },

      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.member))
        apiClient.post('members/update_member/',this.member)
      .then(response => {
        console.log("update response ",response)
        if(response.data.code == "100.000.000"){
          this.notifyVue('top', 'right',"Updated Member details Successfully", "success")
          this.$router.push({ name: 'members'})
        }else {
          this.notifyVue('top', 'right',"Failed to update member details", "danger","nc-icon nc-alien-33") 
        }
      })
        
      // Handle successful login response
       .catch (error => {
        console.error('Error updating data:', error);
      });
      }
    }
  }

</script>
<style>

</style>
