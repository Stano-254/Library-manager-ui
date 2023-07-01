<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div  class="col-4">
          <card>
            <h4 slot="header" class="card-title">Add Category</h4>
            <form class="justify-content-center">
              <div class="row justify-content-center">
                
                <div class="col-md-12">
                  <base-input type="text"
                            label="name"
                            placeholder="Category name"
                            v-model="category.name">
                  </base-input>
                </div>
                
              </div>
        
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>A Brief description</label>
                    <textarea rows="5" class="form-control border-input"
                              placeholder="Here can be your description"
                              v-model="category.description">
                      </textarea>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div v-if="editCategory">
                  <base-button  type="submit"
                  class="mx-1 btn-info btn-fill float-right"@click="updateCategory()">Update Category</base-button>
                </div>
                <div v-else>
                <base-button  type="submit"
                  class="mx-1 btn-info btn-fill float-right"@click="addCategory()">Add Category</base-button>
                </div>
                </div>
              <div class="clearfix"></div>
            </form>
          </card>
          </div>
        <div class="col-8">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Category List</h4>
              <!-- <router-link :to="{ name: 'AddCategory' }" class="m-2 p-2 btn-info btn-fill float-right rounded">Add Author</router-link> -->
            </template>
            <l-table class="table-hover table-striped"
                     :columns="Authors.columns"
                     :data="Authors.data"
                     :item-actions="Authors.actions"
                     @action-clicked="handleCategoryTableAction">
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
  import AddCategory from 'src/pages/category/AddCategory.vue'
  const tableColumns = ['name', 'description', 'state_name','actions']
  const tableData = []
  const tableActions=[
        { label: 'edit',color:'primary' },
        { label: 'delete', color:'danger' },
        // Add more actions as needed
      ]
  export default {
    components: {
      LTable,
      Card,
      AddCategory,
    },
    data () {
      return {
        Authors: {
          columns: [...tableColumns],
          data: [...tableData],
          actions:[... tableActions]
        },
        editCategory:false,
        category:{name:'',description:''}
        
      }
    },
    mounted(){
      this.fetchCategory()
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

      fetchCategory(){
        apiClient.post('books/get_categories/')
          .then(response => {
              this.Authors.data=response.data.data;
              console.log(response.data.data)
             })
          
              // Handle successful login response
          .catch (error => {
              this.notifyVue(message='Data Fetch Failed',colors='danger')
            });

      },
      handleCategoryTableAction(action, category_data) {
          // console.log(action.label, item)
          if (action.label === 'edit') {
              console.log("call action for edit",category_data)
              this.editCategory=true
              this.category={...category_data};
            
              // this.$router.push({ name: 'edit-category', params: { category: category_data} });
          } else if (action.label === 'delete') {
          
              if (confirm('Are you sure you want to delete this item?')) {
                this.delete_category(category_data);
              }
          } 
        },
      addCategory () {
        alert('Your data: ' + JSON.stringify(this.category))
        apiClient.post('books/create_category/',this.category)
        .then(response => {
          console.log("add member response ",response)
          if(response.data.code == "100.000.000"){
            this.fetchCategory()
            this.notifyVue('top', 'right',response.data.message, "success")
          }else {
            this.notifyVue('top', 'center',response.data.message, "danger","nc-icon nc-alien-33") 
          }
        })
          
        // Handle error on add category
         .catch (error => {
          console.error('Error creating Category:', error);
        });
      },
      updateCategory () {
        alert('Your data: ' + JSON.stringify(this.category))
        apiClient.post('books/update_category/',this.category)
        .then(response => {
          console.log("add member response ",response)
          if(response.data.code == "100.000.000"){
            this.notifyVue('top', 'right',response.data.message, "success")
            this.editCategory=false
            this.category={name:'',description:''}
            this.fetchCategory()

          }else {
            this.notifyVue('top', 'center',response.data.message, "danger","nc-icon nc-alien-33") 
          }
        })
          
        // Handle successful login response
         .catch (error => {
          console.error('Error creating Category', error);
        });
      },
      delete_category(category_data) {
        // Send request to API for deleting the item
        
        apiClient.post('books/delete_category/',category_data)
            .then(response => {
              console.log(response)
             if(response.data.code == "100.000.000"){
               // Handle successful delete response
               this.fetchCategory()
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
