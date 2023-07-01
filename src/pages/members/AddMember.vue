<template>
    <div class="container my-2">
    <card >
      <h4 slot="header" class="card-title">Add Member</h4>
      <form class="justify-content-center">
        
       
  
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
          <div class="col-md-3">
            <base-input type="text"
                      label="Identification No"
                      placeholder="ID No"
                      v-model="member.national_id">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="text"
                      label="Phone Number"
                      placeholder="0734657724 or 254734657724"
                      v-model="member.mobile_no">
            </base-input>
          </div>
          
          <div class="col-md-3">
            <div>
              <p>Gender</p>
              <base-radio name="radio0" class="mb-3 " v-model="member.gender" label="Female">
                  Female
              </base-radio>
          
              <base-radio name="radio1" class="mb-3" v-model="member.gender" label="Male">
                  Male
              </base-radio>
          
          </div>
          </div>
        </div>
 
  
        <div class="text-center mx-5">
          <base-button  type="submit"
          class="mx-1 btn-info btn-fill float-right"@click="addMember()">Save</base-button>
          
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
          member:{
            national_id:'',
            mobile_no:'',
            first_name:'',
            last_name:'',
            gender:''
            
          },
          type: ['', 'info', 'success', 'warning', 'danger'],
          notifications: {
            topCenter: false
          }
        
        }
        
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
  
        addMember () {
          alert('Your data: ' + JSON.stringify(this.member))
          apiClient.post('members/create_member/',this.member)
        .then(response => {
          console.log("add member response ",response)
          if(response.data.code == "100.000.000"){
            this.notifyVue('top', 'right',"Add Member details Successfully", "success")
            this.$router.push({ name: 'members'})
          }else {
            this.notifyVue('top', 'center',"Failed to add member", "danger","nc-icon nc-alien-33") 
          }
        })
          
        // Handle successful login response
         .catch (error => {
          console.error('Error add member data:', error);
        });
        }
      }
    }
  
  </script>
  <style>
  
  </style>
  