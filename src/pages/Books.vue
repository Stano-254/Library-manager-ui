<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Book Store</h4>
              <p class="card-category">Home to the best books</p>
              <router-link :to="{ name: 'add-book' }" class="m-2 p-2 btn-info btn-fill float-right rounded">Add Book</router-link>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="books.columns"
                     :data="books.data"
                     :item-actions="books.actions"
                     @action-clicked="handleBooksTableAction">
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
  const tableColumns = ['isbn', 'title', 'author_name', 'category_name','no_of_books','status_name','Actions']
  const tableData = []
  const actionItems=[
        { label: 'borrow',color:'info' },
        { label: 'edit',color:'primary' },
        { label: 'delete', color:'danger' },
  ]
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        books: {
          columns: [...tableColumns],
          data: [...tableData],
          actions:[...actionItems]
        },
        
      }
    },
    mounted(){
      this.fetchBookData()
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

      fetchBookData(){
        apiClient.post('books/get_books/')
          .then(response => {
            if(response.data.code == "100.000.000"){
              this.books.data=response.data.data;
              console.log(response.data)
            }else{
              console.log(response)
              this.notifyVue('top', 'right',response.data.message,'danger')
            }
             })
          
              // Handle successful login response
          .catch (error => {
              console.log(error)
              this.notifyVue('top', 'right','Error displaying books','danger')
            });
        },
      
      handleBooksTableAction(action, book_data) {
          // console.log(action.label, item)
          if (action.label === 'edit') {
              console.log("call action for edit",book_data)
            
              this.$router.push({ name: 'edit-book', params: { book: book_data} });
          } else if (action.label === 'delete') {
          
              if (confirm('Are you sure you want to delete this item?')) {
                this.delete_book(book_data);
              }
          } else if (action.label === 'borrow'){
            this.$router.push({ name: 'borrow-book', params: { book: book_data} });
          }
        },
        delete_book(book_data) {
        // Send request to API for deleting the item
        const data = {}
        console.log(book_data)
        apiClient.post('books/delete_book/',{id:book_data.id})
            .then(response => {
              console.log(response)
             if(response.data.code == "100.000.000"){
               // Handle successful delete response
               this.fetchBookData()
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
