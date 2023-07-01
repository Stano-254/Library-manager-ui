<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Book Store Return</h4>
              <p class="card-category">Home to the best books</p>
              <router-link :to="{ name: 'borrow-book' }" class="m-2 p-2 btn-info btn-fill float-right rounded">Issue book</router-link>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="issued_books.columns"
                     :data="issued_books.data"
                     :item-actions="issued_books.actions"
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
  const tableColumns = ['book_title','author', 'member_name', 'membership_no','issue_date','returned_date','return_fee','book_returned','is_fee_paid','total_fee']
  const tableData = []
  const actionItems=[
        { label: 'return',color:'info' },
        // { label: 'edit',color:'primary' },
        // { label: 'delete', color:'danger' },
  ]
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        issued_books: {
          columns: [...tableColumns],
          data: [...tableData],
          actions:[...actionItems]
          
        },
        
      }
    },
    mounted(){
      this.fetchIssuedBookData()
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

      fetchIssuedBookData(){
        apiClient.post('books/issued_books/')
          .then(response => {
            if(response.data.code == "100.000.000"){
              this.issued_books.data=response.data.data;
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
          if (action.label === 'return') {
              console.log("call action for edit",book_data)
              this.return_book(book_data);
              // this.$router.push({ name: 'edit-book', params: { book: book_data} });
          } 
          
          //     if (confirm('Are you sure you want to delete this item?')) {
          //       this.delete_book(book_data);
          //     }
          // } else if (action.label === 'borrow'){
          //   this.$router.push({ name: 'borrow-book', params: { book: book_data} });
          // }
        },
        return_book(book_data) {
        // Send request to API for deleting the item
        const data = {member_id:book_data.member_id,book_id:book_data.book_id}
        console.log(data)
        apiClient.post('books/return_book/',data)
            .then(response => {
              console.log(response)
             if(response.data.code == "100.000.000"){
               // Handle successful delete response
               this.fetchIssuedBookData()
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
