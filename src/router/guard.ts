import type { Router } from "vue-router";
import { useUserStore } from "../store/user"

export function setupPageGuard(router: Router) {
  router.beforeEach(to => {
    const userStore = useUserStore()
    if (!userStore.isAuth && to.meta.needLogin) {
      return { name: 'user-login' }
    }
  })
}