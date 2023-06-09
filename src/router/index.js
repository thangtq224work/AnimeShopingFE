// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/layouts/dashboard/Dashboard.vue'
import HomeLayout from '@/layouts/home/App.vue'
import Product from '@/views/product/Product.vue'
import HomePage from '@/views/home/HomePage.vue'
import CartPage from '@/views/home/CartPage.vue'
import Login from '@/views/home/Login.vue'
import Forbiden from '@/views/Forbiden.vue'
import getcurrentLanguge from '@/util/locale'
import authStore from '@/stores/auth'
import roles from '@/stores/roles'
// let auth = authStore();  // have error
const routes = [
  {
    path: '/',
    name: 'parent',
    // component: () => import('@/layouts/default/Default.vue'),
    component: HomeLayout,
    children: [
      {
        path: '/home',
        alias: ['/trang-chu', '/'],
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/cart',
        alias: '/gio-hang',
        name: 'cart',
        component: CartPage,
      },
      {
        path: '/contact',
        alias: '/lien-he',
        name: 'contact',
        component: HomePage,
      },
      {
        path: '/about-me',
        alias: '/thong-tin',
        meta: { requiresAuth: true },
        name: 'contact',
        component: HomePage,
      },
      {
        path: '/product/:id',
        alias: '/san-pham/:id',
        name: 'productDetail',
        meta: { requiresAuth: true },
        component: HomePage,
      },
    ],
  },
  {
    path: '/manager',
    alias: '/quan-ly',
    name: 'dashboard',
    meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
    component: Dashboard,
    children: [
      // {
      //   path: '/property',
      //   alias:"/thuoc-tinh",
      //   name: 'property',
      //   component: () => import('@/views/property/Property.vue'),
      // },
      {
        alias: "/chat-lieu",
        path: '/material',
        name: 'material',
        meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
        component: () => import('@/views/property/Material.vue'),
      },
      {
        alias: "/danh-muc",
        path: '/category',
        name: 'category',
        meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
        component: () => import('@/views/property/Category.vue'),
      },
      {
        path: '/supplier',
        alias: "/nha-cung-cap",
        name: 'supplier',
        meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
        component: () => import('@/views/property/Supplier.vue'),
      },
      {
        alias: "/loai-san-pham",
        path: '/type-product',
        name: 'typeproduct',
        meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
        component: () => import('@/views/property/TypeProduct.vue'),
      },
      {
        path: '/product',
        name: 'product',
        alias: ["/san-pham", "/san-phams"],
        // alias: '/product/',
        component: Product,
        meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
        // children:[

        // ]
      },
      // {
      //   path: '/product/:id',
      //   name: 'product-detail',
      //   component: () => import('@/views/product/ProductDetail.vue')
      // },
      {
        alias: "/hoa-don",
        path: '/order',
        name: 'order',
        meta: { authorire: [roles.USER, roles.ADMIN], requiresAuth: true },
        component: () => import('@/views/Order.vue'),
      },
    ],
  },
  {
    alias: "/dang-xuat",
    path: '/logout',
    name: 'logout',
    beforeEnter: () => {
      authStore().logout();
      return { name: "login" };
    }
  },
  {
    alias: "/dang-nhap",
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    alias: "/khong-co-quyen-truy-cap",
    path: '/forbiden',
    name: 'forbiden',
    component: Forbiden,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!authStore().isLogin) {
    await authStore().init();
  }
  if (to.name !== 'login' && to.meta.requiresAuth && !authStore().isLogin) {
    next({ path: getcurrentLanguge() == 'en' ? '/login' : '/dang-nhap', query: { 'returnUrl': to.name } });
  }
  const roleRequire = to.meta.authorire;
  const currentUser = await authStore().getUserRole();
  if (roleRequire) {
    const checkRole = to.meta.authorire.some((val) => {
      return currentUser.some((cur) => {
        return val == cur;
      })
    });
    if (checkRole) {
      next();
    }
    else {
      return next(getcurrentLanguge() == 'en' ? '/forbiden' : '/khong-co-quyen-truy-cap');
    }
  }
  else {
    next();
  }

})

export default router
