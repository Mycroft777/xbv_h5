import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'main',
    component: () => import('./view/main'),
    meta: {
      title: '仙桃数据谷'
    }
  },
  {
    name: 'evaluate',
    component: () => import('./view/evaluate'),
    meta: {
      title: '仙桃智驾体验评价'
    }
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
