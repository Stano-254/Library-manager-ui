<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Library Members</h4>
              <!-- <p class="card-category">All members details</p> -->
              <router-link :to="{ name: 'AddMember' }" class="m-2 p-2 btn-info btn-fill float-right rounded">Add Member</router-link>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="member_table.columns"
                     :data="member_table.data"
                     :item-actions="member_table.actions"
                     @action-clicked="handleTableAction">
                     
            </l-table>
          </card>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import apiClient from 'src/directives/apiclient.js';
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  const tableColumns = ['Membership_No', 'First_Name', 'Last_name','Gender','National_id', 'mobile_no','State_name','Actions']
  const tableData = []
  const tableActions=[
        { label: 'edit',color:'primary' },
        { label: 'disable', color:'warning' },
        { label: 'enable', color:'info' },
        { label: 'delete', color:'danger' },
        // Add more actions as needed
      ]
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        member_table: {
          columns: [...tableColumns],
          data: [...tableData],
          actions:[... tableActions]
        },
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        },
      }
    },
    mounted() {
     this.fetchMemberData();
    },
    methods: {

      notifyVue (verticalAlign, horizontalAlign,message,colors, icon='nc-icon nc-bulb-63') {
        this.$notifications.notify(
          {
            message: message, icon: icon,
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: colors
          })
      },

      fetchMemberData(){
        apiClient.post('members/get_members/')
          .then(response => {
              this.member_table.data=response.data.data;
              console.log(response.data.data)
             })
          
              // Handle successful login response
          .catch (error => {
              this.notifyVue(message='Data Fetch Failed',colors='danger')
            });
        },
      

      handleTableAction(action, member_data) {
          // console.log(action.label, item)
          if (action.label === 'edit') {
              console.log("call action for edit",member_data)
            
              this.$router.push({ name: 'EditMember', params: { member: member_data} });
          } else if (action.label === 'delete') {
          
              if (confirm('Are you sure you want to delete this item?')) {
                member_data['action'] = 'delete'
                this.delete_or_disable(member_data);
              }
          } else if (action.label === 'disable'){
            member_data['action'] = 'disable'
            this.delete_or_disable(member_data);

          }else if(action.label === 'enable'){
            member_data['action'] = 'enable'
            this.delete_or_disable(member_data);
          }
        },

        delete_or_disable(member_data) {
        // Send request to API for deleting the item
        
        apiClient.post('members/change-member-status/',member_data)
            .then(response => {
              console.log(response)
             if(response.data.code == "100.000.000"){
               // Handle successful delete response
               this.fetchMemberData()
               this.notifyVue('top', 'right',response.data.message, "success")
             }else {
              
              this.notifyVue('top', 'right',response.data.message, "warning")
             }
            
            })
          
        .catch (error => {
          console.error('Error deleting data:', error);
          });
      },
  
      
    }
  }
  
</script>
<style>
</style>
