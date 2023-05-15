import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/loginbypw',
        name: 'loginbypw',
        component: () =>
            import ('@/views/loginbypw')
    },
    {
        path: '/regest',
        name: 'regest',
        component: () =>
            import ('@/views/regest/index.vue')
    },
    {
        path: '/',
        redirect: '/home',
        component: () =>
            import ('@/views/layout'),

        children: [{
            path: '/home', //默认子路由 
            name: 'home',
            meta: { keepAlive: true },
            component: () =>
                import ('@/views/home')
        }, {
            path: '/my',
            name: 'my',
            component: () =>
                import ('@/views/my')
        }, ]
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/article'),
        props: true, //路由传参直接用props接收articleId
    },
    {
        path: '/user/profile',
        name: 'userProfile',
        component: () =>
            import ('@/views/user-profile'),
    },
    {
        path: '/collected',
        name: 'Collected',
        component: () =>
            import ('@/views/collected'),
    },
    {
        path: '/history',
        name: 'History',
        component: () =>
            import ('@/views/history'),
    },
    {
        path: '/followed',
        name: 'Followed',
        component: () =>
            import ('@/views/follow'),
    },
    {
        path: '/fans',
        name: 'Fans',
        component: () =>
            import ('@/views/fans'),
    },
    {
        path: '/myArticles',
        name: 'MyArticles',
        component: () =>
            import ('@/views/myArticles'),
    },
    {
        path: '/release',
        name: 'Release',
        component: () =>
            import ('@/views/release'),
    },
]

const router = new VueRouter({
    routes
})

export default router