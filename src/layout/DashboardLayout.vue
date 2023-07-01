<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
     
      <sidebar-link to="/admin/members">
        <i class="nc-icon nc-badge" ></i>
        <p>Members</p>
      </sidebar-link>
      <sidebar-link to="/admin/book-list">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Book list</p>
      </sidebar-link>
      <sidebar-link to="/admin/books/issued-books">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Issued Books</p>
      </sidebar-link>
      <sidebar-link to="/admin/category">
        <i class="nc-icon nc-grid-45"></i>
        <p>Category</p>
      </sidebar-link>
      <sidebar-link to="/admin/authors-list">
        <i class="nc-icon nc-single-02"></i>
        <p>Authors</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      
      <template slot="bottom-links">
        
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
