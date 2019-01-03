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
        }
    ]
});

var app = new Vue({
    router: router
}).$mount('#app');