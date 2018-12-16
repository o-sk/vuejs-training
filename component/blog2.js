Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div class="blog-post">
        <h3>{{ post.title }}</h3>
        <div v-html="post.content"></div>
      </div>
    `
})
new Vue({
    el: '#blog-post-demo',
    data: {
        posts: [
            { id: 1, title: 'My journey with Vue', content: 'content' },
            { id: 2, title: 'Blogging with Vue', content: 'content' },
            { id: 3, title: 'Why Vue is so fun', content: 'content' }
        ]
    }
})