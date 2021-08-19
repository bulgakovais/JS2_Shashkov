Vue.component('products', {
    data() {
        return {
            catalogUrl: '/api/products',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${URL + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
         <div class="products">
            <p v-if="!filtered.length" class="textColor textSize">Нет данных. И товаров нет.. Ээх...</p>
             <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product'],

    template: `
    <div class="product-item">
    <img class="productImage" src="image/shirt.jpg" alt="image">
        <div class="description">
            <h3 class="textColor">{{product.product_name}}</h3>
            <p class="productPrice">{{product.price}} ₽</p>
        </div>
        <button @click="$root.$refs.cart.addProduct(product)" class="addToCart">Добавить в корзину</button>
    </div>
    `
})