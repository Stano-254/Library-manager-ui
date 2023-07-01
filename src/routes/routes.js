import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
//members
import Members from 'src/pages/Members.vue'
import EditMember from 'src/pages/members/EditMemberForm.vue'
import AddMember from 'src/pages/members/AddMember.vue'
// books
import BookList from 'src/pages/Books.vue'
import AddBook from 'src/pages/Books/AddBook.vue'
import EditBook from 'src/pages/Books/EditBookForm.vue'
import BorrowBook from 'src/pages/Books/BorrowBook.vue'
import IssuedBook from 'src/pages/Books/IssuedBooks.vue'
// authors
import Authors from 'src/pages/Authors.vue'
import AddAuthor from 'src/pages/Authors/AddAuthor.vue'
import EditAuthor from 'src/pages/Authors/EditAuthor.vue'
//category
import Category from 'src/pages/Category.vue'
import AddCategory from 'src/pages/category/AddCategory.vue'
// user
import UserProfile from 'src/pages/UserProfile.vue'



const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'members',
        name: 'members',
        component: Members,
      },
      {
        path: 'members/edit-member',
        name: 'EditMember',
        component: EditMember
      },
      {
        path: 'members/add-member',
        name: 'AddMember',
        component: AddMember
      },
      
      {
        path: 'book-list',
        name: 'books',
        component: BookList
      },
      {
        path: 'books/add-book',
        name: 'add-book',
        component: AddBook
      },
      {
        path: 'books/edit-book',
        name: 'edit-book',
        component: EditBook
      },
      {
        path: 'books/borrow-book',
        name: 'borrow-book',
        component: BorrowBook
      },
      {
        path: 'books/issued-books',
        name: 'Issued-books',
        component: IssuedBook
      },
      {
        path: 'authors-list',
        name: 'authors',
        component: Authors
      },
      {
        path: 'authors/add-author',
        name: 'AddAuthor',
        component: AddAuthor
      },
      {
        path: 'authors/edit-author',
        name: 'EditAuthor',
        component: EditAuthor
      },
      {
        path: 'category',
        name: 'category',
        component: Category

      },
    
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
  
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
