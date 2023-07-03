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
            <div class="row justify-content-between">
              <div class="col-md-5 my-2 mx-2">
                <label for="bookSearch">
                  <i class="fa fa-search position-absolute mt-4 ml-2 text-success" aria-hidden="true"></i></label>
                  <input type="text" id="bookSearch" class="form-control pl-5" v-model="searchQuery"  @input="handleDelaySearchInput" placeholder="Search by title | author" >
                 
              </div>
              </div>
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
        searchQuery: '',
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
    computed:{
      filteredOptions(event) {
      const query = this.searchQuery.toLowerCase();
      console.log("query",query)
      // return this.members_data.filter(
      //   option => option.first_name.toLowerCase().includes(query) || option.last_name.toLowerCase().includes(query) ||
      //   option.membership_no.toLowerCase().includes(query) );
      }
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
        handleDelaySearchInput() {
             clearTimeout(this.delayTimer);
             this.delayTimer = setTimeout(this.search, 300); // Set the delay time (e.g., 300 milliseconds)
         },
      search() {
      // Make API request to fetch search results based on searchQuery
      // Replace 'apiEndpoint' with your actual API endpoint URL

      // Assuming you're using Axios library for HTTP requests
      apiClient.post('books/filtered_books/', { params: { query: this.searchQuery } })
          .then(response => {
            console.log(this.searchQuery, "response seacrh",response.data.data)
          this.books.data = response.data.data;
        })
          .catch(error => {
          console.error(error);
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
