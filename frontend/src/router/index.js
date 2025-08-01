import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Dashboard from '../views/DashboardView.vue'
import Customer from '../views/CustomerView.vue'
import Product from '../views/ProductView.vue'
import Quotation from '../views/QuotationView.vue'
import QuotationPdf from '../views/QuotationPdfView.vue'
import NotFound from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { requiresAuth: false }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { requiresAuth: false }
  },
  {
    path: '/quotation',
    name: 'Quotation',
    component: Quotation,
    meta: { requiresAuth: false }
  },
  {
    path: '/quotation/pdf/:id',
    name: 'QuotationPdf',
    component: QuotationPdf,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
