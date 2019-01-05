var Sharable = {
    data: function() {
        return {
            _isProcessing: false
        }
    },
    methods: {
        share: function() {
            if (this._isProcessing) {
                return
            }
            if (!window.confirm("share?")) {
                return
            }
            this._isProcessing = true
            setTimeout(() => {
                window.alert("shared")
                this._isProcessing = false
            }, 300)
        }
    }
}
var IconShareButton = {
    mixins: [Sharable],
    template: `
        <button @click="share"><i class="fas fa-share-square"></i></button>
    `
}

var TextShareButton = {
    mixins: [Sharable],
    template: `
        <button @click="share">{{ buttonLabel }}</button>
    `,
    data: function() {
        return {
            buttonLabel: "share",
        }
    }
}

new Vue({
    el: '#app',
    components: {
        IconShareButton,
        TextShareButton
    }
})