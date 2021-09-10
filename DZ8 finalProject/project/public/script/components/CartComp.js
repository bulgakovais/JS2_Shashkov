Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            // showCart: false,
            amount: 0,
            countGoods: 0,
            quantity: 0,
        }
    },
    methods: {
        // Добавление товара в корзину
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`${URL}/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            // увеличиваем количество продукта на странице корзины
                            product.quantity++;

                            // увеличиваем количество продукта на выпадающем меню корзины (dropCart)
                            find.quantity++;
                        }
                    })
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
        // Удаление товара из корзины
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.deleteJson(`${URL}/api/cart/${item.id_product}/1`, item)
                    .then(data => {
                        if (data.result === 1) {
                            if (item.quantity > 1) {
                                item.quantity--;
                            } else {
                                this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            }
                        }
                    })

            }
        }
    },
    mounted() {
        // Загружаем корзину
        this.$parent.getJson(`${URL}/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                };
            })
    },
    computed: {
        // Высчитываем общее количество товаров в корзине
        sumCount() {
            this.countGoods = 0;
            countGoods = this.cartItems.forEach(item => {
                this.countGoods += item.quantity
            })
        },

        // Высчитываем общую сумму всех товаров в корзине
        sumPrice() {
            this.amount = 0;
            amount = this.cartItems.forEach(element => {
                this.amount += (element.price * element.quantity)
            });
        }
    },

    template: `
        <div class="top_service_right">
            
            <a class="link" href="shopping_cart.html">
                <img class="shop_box" src="img/Forma_1.svg" alt="Корзина">
            </a>
            <span :value = "sumCount"> {{countGoods}} </span>
            <div class="drop-cart"> 
                <a class="link colortext" href="shopping_cart.html">
                    <p v-if="!cartItems.length" class="textColor">Ваша корзина совсем пуста.. :(</p>
                </a>
                <cart-item ref ="cart-item"  v-for="product of cartItems" :cart-item = "product" :key="product.id_product"></cart-item>
                <p v-if="cartItems.length" :value = "sumPrice">Итого: {{ amount}} $ </p>
                </div> 
         
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="drop-cart__item">
        <a class="link" href="shopping_cart.html">
              <img class="drop-cart-img" :src ="getImage(cartItem)" alt="photo"> 
        </a>
        <div class="item-param">
            <a class="link" href="shopping_cart.html">
                <p
                    class="text_color-black text_size-12 text_weight-700 text_uppercase hover_color">
                    {{cartItem.product_name}}
                </p>
            </a>
            <a class="link" href="shopping_cart.html">
                <p class="pad-small"><i class="fas fa-star"></i><i
                        class="fas fa-star"></i><i class="fas fa-star"></i><i
                        class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
            </a>
            <a class="link" href="shopping_cart.html">
                <p class="pad-small colortext text_size-12 text_weight-400">{{cartItem.quantity}} x $ {{cartItem.price}}</p>
            </a>
        </div>

        <button class="drop-cart__button"  @click="$parent.remove(cartItem)"><i
                class="fas fa-minus-circle hover_color  text_size-16"></i></button>
    </div>
    `,
    methods: {
        // Подтягиваем картинку
        getImage(cartItem) {
            return cartItem.img;
        }
    }
});
