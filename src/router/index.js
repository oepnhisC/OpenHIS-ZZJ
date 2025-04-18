import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PayDetails from '@/views/PayDetails.vue'
import DanJu from '@/views/DanJu.vue'
import WeiXinPay from '@/views/WeiXinPay.vue';
import PrintView from '@/views/PrintView.vue'
import XuanGongNeng from '@/views/XuanGongNeng.vue'
import JieZhangDanJu from '@/views/JieZhangDanJu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {      path: '/',      name: 'home',      component: HomeView    },
    {      path: '/paydetails',      name: 'paydetails',      component: PayDetails    },
    {      path: '/danju',      name: 'danju',      component: DanJu    },
    {      path: '/weixinpay',      name: 'weixinpay',      component: WeiXinPay    },
    {      path: '/printview',      name: 'printview',      component: PrintView    },
    {      path: '/xuangongneng',      name: 'xuangongneng',      component: XuanGongNeng    },
    {      path: '/jiezhangdanju',      name: 'jiezhangdanju',      component: JieZhangDanJu    },
  ]
})

export default router
