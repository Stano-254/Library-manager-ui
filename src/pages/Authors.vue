<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Authors</h4>
              <p class="card-category">Board of amazing bestsellers</p>
              <router-link :to="{ name: 'AddAuthor' }" class="m-2 p-2 btn-info btn-fill float-right rounded">Add Author</router-link>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="Authors.columns"
                     :data="Authors.data"
                     :item-actions="Authors.actions"
                     @action-clicked="handleAuthorTableAction">
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
  const tableColumns = ['salutation', 'first_name', 'last_name', 'description', 'state_name','actions']
  const tableData = []
  const tableActions=[
        { label: 'edit',color:'primary' },
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
        Authors: {
          columns: [...tableColumns],
          data: [...tableData],
          actions:[... tableActions]
        },
        
      }
    },
    mounted(){
      this.fetchAuthors()
    },
    methods:{
      notifyVue (verticalAlign, horizontalAlign,message,colors, icon='nc-icon nc-bulb-63') {
        this.$notifications.notify(
          {
            message: message, icon: icon,
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: colors
          })
      },

      fetchAuthors(){
        apiClient.post('books/fetch_authors/')
          .then(response => {
              this.Authors.data=response.data.data;
              console.log(response.data.data)
             })
          
              // Handle successful login response
          .catch (error => {
              this.notifyVue(message='Data Fetch Failed',colors='danger')
            });

      },
      handleAuthorTableAction(action, author_data) {
          // console.log(action.label, item)
          if (action.label === 'edit') {
              console.log("call action for edit",author_data)
            
              this.$router.push({ name: 'EditAuthor', params: { author: author_data} });
          } else if (action.label === 'delete') {
          
              if (confirm('Are you sure you want to delete this item?')) {
                this.delete_author(author_data);
              }
          } 
        },
        delete_author(author_data) {
        // Send request to API for deleting the item
        
        apiClient.post('books/delete_author/',author_data)
            .then(response => {
              console.log(response)
             if(response.data.code == "100.000.000"){
               // Handle successful delete response
               this.fetchAuthors()
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
