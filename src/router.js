import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./components/Dashboard.vue"
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Profile from "@/components/Profile.vue";
import Pod from "@/components/Pod.vue";
import Template from "@/components/Template.vue";
import User from "@/components/User.vue";

Vue.use(VueRouter);

const original = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return original.call(this, location).catch(err => err)
}

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        redirect: "/pods",
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: Dashboard,
            },
            {
                path: "/users",
                name: "users",
                component: User,
            },
            {
                path: "/templates",
                name: "templates",
                component: Template,
            },
            {
                path: "/pods",
                name: "pods",
                component: Pod,
            },
            {
                path: "/profile",
                name: "profile",
                component: Profile,
            }
        ]
    },
    // {
    //     path: "/dashboard",
    //     name: "dashboard",
    //     component: Dashboard,
    // },
    // {
    //     path: "/sync",
    //     name: "sync",
    //     component: Sync,
    // },
    // {
    //     path: "/control",
    //     name: "control",
    //     component: Control,
    // }

];

const router = new VueRouter({
    mode: "history",
    routes,
    base: '/'
});


router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("token")
    if (token == null || token === '') {
        if (to.path === '/' || to.path === '/passwordreset') {
            next();
        } else {
            next({name: 'login'});
        }
    } else {
        if (to.path === '/') {
            next({name: 'home'});
        } else {
            next();
        }
    }
})

export default router;
