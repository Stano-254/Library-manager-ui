<template>
  <card>
    <h4 slot="header" class="card-title">Add Category</h4>
    <form class="justify-content-center">
      <div class="row">
        
        <div class="col-md-9">
          <base-input type="text"
                    label="name"
                    placeholder="Category name"
                    v-model="category.name">
          </base-input>
        </div>
        <div class="col-md-5">
          
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
        <base-button  type="submit"
          class="mx-1 btn-info btn-fill float-right"@click="addCategory()">Add Category</base-button>
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
       
        category: {
          name: 'Mike',
          description: 'Melbourne, Australia',
        }
      }
    },
    mounted(){
      // this.fetchSalutations();
      this.category = this.$route.params.category;
      console.log(this.$route.params)
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
     
      addCategory () {
        alert('Your data: ' + JSON.stringify(this.category))
        apiClient.post('books/create_category/',this.category)
        .then(response => {
          console.log("add member response ",response)
          if(response.data.code == "100.000.000"){
            this.notifyVue('top', 'right',response.data.message, "success")
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
