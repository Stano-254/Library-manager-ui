<template>
  <div class="container my-2">
  <card >
    <h4 slot="header" class="card-title">Add Book</h4>
    <form class="justify-content-center px-5">
      
      <div class="row justify-content-between">
        <div class="col-md-5 my-2">
          <base-input type="text"
                    label="ISBN"
                    placeholder="354647888282737"
                    v-model="book.isbn">
          </base-input>
        </div>
        <div class="col-md-6">
          <div class="row m-0">
            <div class="col-md-10">
            <label for="authorDropdown">Author</label>
            <select v-model="book.author"class="form-control">
              <option  key="0" value="" selected disabled>select...</option>
              <option v-for="author in authors"  :value="author.id">{{ author.full_name }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <!-- <i class="nc-icon nc-simple-add font-weight-bold" ></i> -->
            <router-link :to="{ name: 'AddAuthor' }" class="my-3 py-3 float-left rounded  font-weight-bold h4" >
              <i class="nc-icon nc-simple-add font-weight-bold" ></i></router-link>
          </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-md-5 my-2">
          <base-input type="text"
                    label="title"
                    placeholder="the lillies of sundown"
                    v-model="book.title">
          </base-input>
        </div>
        <div class="col-md-6">
          <div class="row m-0">
            <div class="col-md-10">
            <label for="categoryDropdown">Category</label>
            <select v-model="book.category"class="form-control">
              <option  key="0" value="" selected disabled>select...</option>
              <option v-for="category in categories"  :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <!-- <i class="nc-icon nc-simple-add font-weight-bold" ></i> -->
            <router-link :to="{ name: 'category' }" class="my-3 py-3 float-left rounded  font-weight-bold h4" >
              <i class="nc-icon nc-simple-add font-weight-bold" ></i></router-link>
          </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-md-3">
          <base-input type="text"
                    label="edition"
                    placeholder="1st edition"
                    v-model="book.edition">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="date"
                    label="published date"
                    placeholder="21/12/2023"
                    v-model="book.published_date">
          </base-input>
        </div>
        
        <div class="col-md-3">
          <base-input type="text"
                    label="No of books"
                    placeholder="10"
                    v-model="book.no_of_books">
          </base-input>
        </div>
      </div>


      <div class="text-center mx-5">
        <base-button  type="submit"
        class="mx-1 btn-info btn-fill float-right"@click="addBook()">Add Book</base-button>
        
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
        authors:[], categories:[],
        book:{
          isbn:'',
          author:'',
          title:'',
          category:'',
          edition:'',
          published_date:'',
          no_of_books:''
          
        },
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
      
      }
      
    },
    mounted(){
      this.get_authors()
      this.fetchCategory()
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
      get_authors(){
        apiClient.post('books/fetch_authors/')
          .then(response => {
              this.authors=response.data.data;
              console.log(response.data.data)
             })
          
              // Handle successful login response
          .catch (error => {
              this.notifyVue(message='Data Fetch Failed',colors='danger')
            });

       },
      fetchCategory(){
        apiClient.post('books/get_categories/')
          .then(response => {
              this.categories=response.data.data;
              console.log(response.data.data)
             })
          
              // Handle successful login response
          .catch (error => {
              this.notifyVue(message='Data Fetch Failed',colors='danger')
            });
          },

      addBook () {
        alert('Your data: ' + JSON.stringify(this.book))
        apiClient.post('books/create_book/',this.book)
      .then(response => {
        console.log("add book response ",response)
        if(response.data.code == "100.000.000"){
          this.notifyVue('top', 'right',response.data.message, "success")
          this.$router.push({ name: 'books'})
        }else {
          this.notifyVue('top', 'center',response.data.message, "danger","nc-icon nc-alien-33") 
        }
      })
        
      // Handle successful login response
       .catch (error => {
        console.error('Error add book data:', error);
      });
      }
    }
  }

</script>
<style>

</style>
