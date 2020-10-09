import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home//首页
  }, {
    path: '/center',
    name: 'center',
    component: () => import('../views/Center.vue')//关于我们
  }, {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')//关于我们
  }, {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue')//新闻资讯页面
  }, {
    path: '/newdetail',
    name: 'newdetail',
    component: () => import('../views/NewsDetail.vue')//新闻资讯详情页面
  }, {
    path: '/server',
    name: 'server',
    component: () => import('../views/ServeWorld.vue')//服务全球页面
  }, {
    path: '/productdetail',
    name: 'productdetail',
    component: () => import('../views/ProductDetail.vue')//产品详情页面
  }, {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactUs.vue')//联系我们页面
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
