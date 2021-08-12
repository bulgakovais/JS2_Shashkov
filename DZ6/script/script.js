const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        // img: 'image/shirt.jpg'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
    },
    computed: {
    },
    mounted() {
        console.log(this);
    }
})
