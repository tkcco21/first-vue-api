import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@Admin/Pages/Home';
// -- Auth ---
import Signin from '@Admin/Pages/Signin';
// -- Books ---
import Books from '@Admin/Pages/Books';
import BooksList from '@Admin/Pages/Books/List';
import BookForm from '@Admin/Pages/Books/Form';
import BookDetail from '@Admin/Pages/Books/Detail';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/admin',
      component: Home,
    },
    {
      name: 'signin',
      path: '/admin/signin',
      component: Signin,
      meta: { isPublic: true },
    },
    {
      path: '/admin/books',
      component: Books,
      children: [
        {
          name: 'booksList',
          path: '',
          component: BooksList,
        },
        {
          name: 'bookForm',
          path: 'post',
          component: BookForm,
        },
        {
          name: 'bookDetail',
          path: ':id',
          component: BookDetail,
        },
      ],
    },
  ],
});
