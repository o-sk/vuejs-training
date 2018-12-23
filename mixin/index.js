var myMixin = {
    created: function () {
        this.hello()
    },
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        }
    }
}
  
var Component = Vue.extend({
  mixins: [myMixin]
})
  
var component = new Component() 

var mixin = {
    created: function () {
        console.log('mixin hook called')
    },
    data: function () {
        return {
            message: 'hello',
            foo: 'abc'
        }
    }
}
  
new Vue({
    mixins: [mixin],
    data: function () {
        return {
            message: 'goodbye',
            bar: 'def'
        }
    },
    created: function () {
        console.log('component hook called')
        console.log(this.$data)
    }
})