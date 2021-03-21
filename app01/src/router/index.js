import Vue from 'vue'
import Router from 'vue-router'
import home from "@/page/home"
import accountlist from '@/page/accountlist'
import accountadd from '@/page/accountadd'
import accountupdate from '@/page/accountupdate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      title: '홈', //표시할 이름
      isAdd: true //사이드바에 표시할지여부
    },
    {
      path: "/accountlist",
      name: "accountlist",
      component: accountlist,
      title: '리스트',
      isAdd: true
    },
    {
      path: "/accountadd",
      name: "accountadd",
      component: accountadd,
      title: '등록',
      isAdd: true
    },
    {
      path: "/accountupdate",
      name: "accountupdate",
      component: accountupdate,
      title: '수정',
      isAdd: false
    },
  ],
  mode: 'history'
})
