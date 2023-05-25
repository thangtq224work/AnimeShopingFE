// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/layouts/dashboard/Dashboard.vue'
import Home from '@/layouts/home/App.vue'
import Product from '@/views/product/Product.vue'


const routes = [
  {
    path: '/',
    // component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
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
      {
        path: '/product/:id',
        name: 'product-detail',
        component: () => import('@/views/product/ProductDetail.vue')
      },
      {
        alias:"/hoa-don",
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
