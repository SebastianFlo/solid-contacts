import Vue from 'vue';
import Router from 'vue-router';
import store from './state/store';

import Home from './modules/home/Home.view.vue';
import Profile from './modules/profile/Profile.view.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: Profile,
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: { requiresAuth: true }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                path: '/'
            });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;
