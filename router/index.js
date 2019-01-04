var router = new VueRouter({
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページ</div>'
            }
        },
        {
            path: '/users',
            component: {
                template: '<div>ユーザー一覧</div>'
            }
        },
        {
            path: '/users/:userId',
            name: 'user',
            beforeEnter: function (to, from, next) {
                if (to.params.userId == 999) {
                    next('/top');
                } else {
                    next();
                }
            },
            component: {
                template: '<div>ユーザーID: {{ $route.params.userId }}</div>'
            }
        }
    ]
});

var app = new Vue({
    router: router
}).$mount('#app');