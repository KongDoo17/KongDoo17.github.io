import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

Vue.use(VueRouter);

// const routes = [{
//     path : '/',
//     component : App,
//     }
// ]

// const router = new VueRouter({
//     routes,
//     mode : 'history',
//     base : '/',
// })

// export default {
//     router
// }

export default new VueRouter({
    routes : [
        {
            path : '/',
            component : App,
        }
    ]
})