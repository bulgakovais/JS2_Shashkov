Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`${URL}/api/cart/${find.id_product}`, { quantity: 1 })
                find.quantity++
            } else {
                let prod = Object.assign({ quantity: 1 }, product)
                this.$parent.postJson(`${URL}/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product)
            this.$parent.deleteJson(`${URL}/api/cart/${find.id_product}`, item)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${URL}/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
    <div>
    
    <button class="button-cart button textColor" type="button" @click="showCart = !showCart">
    <i class="fas fa-shopping-cart"></i>
    </button>

    <div class="cart-block" v-show="showCart">
        <p v-if="!cartItems.length" class="textColor">Ваша корзина совсем пуста.. :(</p>
        <cart-item class ="cart-item" v-for="item of cartItems" :cart-item = "item" :key="item.id_product"></cart-item>
    </div>
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
         <div class="cart_product">
            <img class="image-cart-product" src="image/shirt.jpg" alt="image">
            <div class="description">
                <p class="product-title paragraf">{{cartItem.product_name}}</p>
                <p class="product-quantity paragraf">Кол-во: {{cartItem.quantity}}</p>
                <p class="product-single-price paragraf">{{cartItem.price}}&nbspp.</p>
            </div>
            <div class="right-block">
            <p class="product-price">Итого: {{cartItem.quantity * cartItem.price}}&nbspp.</p>
            <button class="delete-button" @click="$parent.remove(cartItem)">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>

        </div>
    </div>
    `
})