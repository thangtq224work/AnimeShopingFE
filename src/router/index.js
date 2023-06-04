// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/layouts/dashboard/Dashboard.vue'
import HomeLayout from '@/layouts/home/App.vue'
import Product from '@/views/product/Product.vue'
import HomePage from '@/views/home/HomePage.vue'
import Cart from '@/views/home/Cart.vue'
import Login from '@/views/home/Login.vue'

const routes = [
  {
    path: '/',
    name:'parent',
    // component: () => import('@/layouts/default/Default.vue'),
    component:HomeLayout,
    children: [
      {
        path: '/home',
        alias:['/trang-chu','/'],
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/cart',
        alias:'/gio-hang',
        name: 'cart',
        component: Cart,
      },
      {
        path: '/contact',
        alias:'/lien-he',
        name: 'contact',
        component: HomePage,
      },
      {
        path: '/about-me',
        alias:'/thong-tin',
        name: 'contact',
        component: HomePage,
      },
      {
        path: '/product/:id',
        alias:'/san-pham/:id',
        name: 'productDetail',
        component: HomePage,
      },
    ],
  },
  {
    path: '/manager',
    name: 'dashboard',
    component: Dashboard,
    children: [
      // {
      //   path: '/property',
      //   alias:"/thuoc-tinh",
      //   name: 'property',
      //   component: () => import('@/views/property/Property.vue'),
      // },
      {
        alias:"/chat-lieu",
        path: '/material',
        name: 'material',
        component: () => import('@/views/property/Material.vue'),
      },
      {
        alias:"/danh-muc",
        path: '/category',
        name: 'category',
        component: () => import('@/views/property/Category.vue'),
      },
      {
        path: '/supplier',
        alias:"/nha-cung-cap",
        name: 'supplier',
        component: () => import('@/views/property/Supplier.vue'),
      },
      {
        alias:"/loai-san-pham",
        path: '/type-product',
        name: 'typeproduct',
        component: () => import('@/views/property/TypeProduct.vue'),
      },
      {
        path: '/product',
        name: 'product',
        alias:["/san-pham","/san-phams"],
        // alias: '/product/',
        component: Product,
        // children:[

        // ]
      },
      // {
      //   path: '/product/:id',
      //   name: 'product-detail',
      //   component: () => import('@/views/product/ProductDetail.vue')
      // },
      {
        alias:"/hoa-don",
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order.vue'),
      },
    ],
  },
  {
    alias:"/dang-xuat",
    path: '/logout',
    name: 'logout',
    component: Login,
  },
  {
    alias:"/dang-nhap",
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
