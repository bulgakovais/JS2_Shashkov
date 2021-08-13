const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: '#app',
    data: {
        text: "Что-то пошло не так, попробуйте еще раз :)"
        // userSearch: '',
        // img: 'image/shirt.jpg'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(response => response.json())
                .catch(error => {
                    this.$refs.err.catchError(error, this.text)
                })
        },
    },
    computed: {
    },
})
