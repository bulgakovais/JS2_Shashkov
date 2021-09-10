Vue.component('products', {
    data() {
        return {
            catalogUrl: '',
            products: [],
            filtered: [],

        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${URL}/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
                console.log(this.$root.$refs)
            });
    },
    template: `
        <div class="item_flex">
        <p v-if="!filtered.length" class="textColor textSize">Нет данных. И товаров нет.. Ээх...</p>
            <product ref="product" v-for="item of filtered" :key="item.id_product"  :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
                    <div class="item">
                        <a class="link item_link" href="single_page.html">
                            <img class="item_pic" alt="photo" :src ="getImage(product)">
                            <div class="text-box">
                                <p class="item_text">{{product.product_name}}</p>
                                <p class="colortext item_price">{{product.price}} . 00 $</p>
                            </div>
                        </a>
                        <div @click="$root.$refs.cart.addProduct(product)" class="add_box">
                                <img src="img/cart_white.png" alt="cart">
                                <p class="add_text">Add to Cart</p>
                        </div>
                    </div>
    `,
    methods: {
        getImage(product) {
            return product.img;
        }
    }
});
