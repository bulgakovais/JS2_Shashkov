const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cartItems: [],
        showCart: false,
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url ? url : `${API + this.url}`)
                .then(response => response.json())
                .catch(error => console.log(error))
        },
        addProduct(product) {
            console.log(product)
        },
        filter() {
            const regexp = new RegExp(this.userSearch)
            this.filtered = this.products.filter(product => regexp.test(product.product_name.toLowerCase()))
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        }
    },

    computed: {

    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el)
                    this.filtered.push(el)
                }
            })

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            })
    }
})
