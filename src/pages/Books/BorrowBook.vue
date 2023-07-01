<template>
  <div class="container my-2">
  <card >
    <h4 slot="header" class="card-title">Borrow Book</h4>
    <form class="justify-content-center px-5">
      
      <div class="row justify-content-between">
        <div class="col-md-5 my-2">
            <label for="BookDropdown">Book</label>
            <input type="text" class="form-control" v-model="searchBookQuery" placeholder="Search by title | author">
            <select v-model="borrow_book.book_id"class="form-control my-3">
              <option  key="0" value="" selected disabled>select...</option>
              <option v-for="book in bookfilteredOptions"  :value="book.id">{{ book.title }}</option>
            </select>
        </div>
        <div class="col-md-5 form-group" >
            <label for="memberDropdown">Member</label>
            <input type="text" class="form-control" v-model="searchMemberQuery" placeholder="Search by membership_no | name">
            <select v-model="borrow_book.member_id"class="form-control my-3">
              <option  key="0" value="" selected disabled>select...</option>
              <option v-for="member in memberfilteredOptions"  :value="member.id">{{ member.first_name }} {{ member.last_name }}</option>
            </select>
        </div> 
        
      </div>
      <div class="row justify-content-between">
        <div class="col-md-4">
          <base-input type="Number"
                    label="Duration (days)"
                    placeholder="10"
                    v-model="borrow_book.borrow_duration">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="Number"
                    label="Borrow Fee (KES)"
                    placeholder="10"
                    v-model="fees.borrow_fee">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="Number"
                    label="Late return penalty (%) of borrow fee"
                    placeholder="10"
                    v-model="fees.late_return_rate">
          </base-input>
        </div>
      </div>

      

      <div class="text-center mx-5">
        <base-button  type="submit"
        class="mx-1 btn-info btn-fill float-right"@click="issueBook()">Issue Book</base-button>
        
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
      // ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
      return {
        members_data:[],
        books:[],
        searchBookQuery: '',
        searchMemberQuery: '',
        selectedOption: '',
        borrow_book:{
            book_id:'',
            member_id:'',
            borrow_duration:''
        },
        fees:[],
        
      
      }
      
    },
    
    mounted(){
      if(this.$route.params.book!= undefined) {
        this.borrow_book.book_id = this.$route.params.book.id 
      }
      this.fetchBookData()
      this.fetchMemberData()
      this.borrowFee()
     
    },
    computed:{
      memberfilteredOptions() {
      const query = this.searchMemberQuery.toLowerCase();
      return this.members_data.filter(
        option => option.first_name.toLowerCase().includes(query) || option.last_name.toLowerCase().includes(query) ||
        option.membership_no.toLowerCase().includes(query) );
    },
    bookfilteredOptions() {
      const query = this.searchBookQuery.toLowerCase();
      return this.books.filter(option => option.title.toLowerCase().includes(query));
    },
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
     
        fetchMemberData(){
        apiClient.post('members/get_members/')
          .then(response => {
              this.members_data=response.data.data;
             })
          
              // Handle successful login response
          .catch (error => {
            console.log(error)
              // this.notifyVue(message='Data Fetch Failed',colors='danger')
            });
        },
        fetchBookData(){
        apiClient.post('books/get_books/')
          .then(response => {
            if(response.data.code == "100.000.000"){
              this.books=response.data.data;
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
        borrowFee(){
        apiClient.post('books/borrow_fee_lookup/')
          .then(response => {
            if(response.data.code == "100.000.000"){
              this.fees=response.data.data;
              console.log(response)
            }else{
              console.log(response)
              this.notifyVue('top', 'right',response.data.message,'danger')
            }
             })
          
              // Handle successful login response
          .catch (error => {
              console.log(error)
              this.notifyVue('top', 'right','Error fetching fee','danger')
            });
        },

      issueBook(){
        console.log(this.borrow_book)
        apiClient.post('books/borrow_book/',this.borrow_book)
          .then(response => {
            if(response.data.code == "100.000.000"){
              this.books=response.data.data;        

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


      
    }
  }

</script>
<style>

</style>
