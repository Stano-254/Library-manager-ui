<template>
  <card>
    <h4 slot="header" class="card-title">Edit Author Details</h4>
    <form class="justify-content-center">
      <div class="row justify-content-center">
        <div class="col-md-3">
          <div>
            <label for="salutationDropdown">Salutation:</label>
            <select v-model="author.salutation"class="form-control">
              <option  key="0" value="" selected disabled>select...</option>
              <option v-for="salutation in salutations" :key="salutations[salutation]" :value="salutation">{{ salutation }}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="First Name"
                    placeholder="First Name"
                    v-model="author.first_name">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="author.last_name">
          </base-input>
        </div>
      </div>

      

      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="form-group">
            <label>A Brief Introduction</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="Here can be your description"
                      v-model="author.description">
              </textarea>
          </div>
        </div>
      </div>
      <div class="text-center">
        <base-button  type="submit"
          class="mx-1 btn-info btn-fill float-right"@click="editAuthor()">Update Author</base-button>
        </div>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
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
        salutations: [('Professor','Prof.'), ('Doctor','Dr.'), ('Mr', 'Mr.'), ('Mrs', 'Mrs'), ('Miss', 'Miss'), ('Ms', 'Ms')], // Array to store the salutation options
        selectedSalutation: '', // Selected salutation option
        author: null,
      }
    },
    created(){
      this.author = this.$route.params.author;
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
     
      editAuthor () {
        alert('Your data: ' + JSON.stringify(this.author))
        apiClient.post('books/update_author/',this.author)
        .then(response => {
          console.log("add member response ",response)
          if(response.data.code == "100.000.000"){
            this.notifyVue('top', 'right',response.data.message, "success")
            this.$router.push({ name: 'authors'})
          }else {
            this.notifyVue('top', 'center',response.data.message, "danger","nc-icon nc-alien-33") 
          }
        })
          
        // Handle successful login response
         .catch (error => {
          console.error('Error creating Author:', error);
        });
      }
    }
  }

</script>
<style>

</style>
