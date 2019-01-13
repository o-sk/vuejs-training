import SaBoardView from '@/components/templates/SaBoardView.vue'
import SaLoginView from '@/components/templates/SaLoginView.vue'
import SaTaskDetailModal from '@/components/templates/SaTaskDetailModal.vue'

export default [{
  path: '/',
  component: SaBoardView,
  meta: {requiresAuth: true}
}, {
  path: '/login',
  component: SaLoginView
}, {
  path: '/task/:id',
  component: SaTaskDetailModal,
  meta: {requiresAuth: true}
}, {
  path: '*',
  redirect: '/'
}
]
