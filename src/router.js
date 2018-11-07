import Vue from 'vue';
import Router from 'vue-router';
import store from './state/store';

import HomeView from './modules/home/Home.view.vue';
import ProfileView from './modules/profile/Profile.view.vue';
import RdflibView from './modules/rdflib/Rdflib.view.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true }
        },
        {
            path: '/rdflib',
            name: 'rdflib',
            component: RdflibView,
            meta: { requiresAuth: false }
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
