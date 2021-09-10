Vue.component("shopping-list", {
    data() {
        return {
            cartItems: [],
            showMenu: true,
            amount: 0,
            quantity: 0,
        }
    },
    mounted() {
        this.$parent.getJson(`${URL}/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },

    methods: {
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.deleteJson(`${URL}/api/cart/${item.id_product}/0`, item)
                    .then(data => {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    })
            }

        },
    },

    computed: {

        sumPrice() {
            this.amount = 0;
            amount = this.cartItems.forEach(element => {
                this.amount += (element.price * element.quantity)
            });
        }
    },

    template: `<div>
                <div v-if="cartItems.length" class="cart__heading text_color-black text_uppercase text_size-13 text_weight-700 bd_bottom" >
                    <div class="cart__heading-left">
                        <p>Product Details</p>
                    </div>
                    <div class="cart__heading-right">
                        <div class="cart__heading-right_text">unite Price</div>
                        <div class="cart__heading-right_text">Quantity</div>
                        <div class="cart__heading-right_text">shipping</div>
                        <div class="cart__heading-right_text">Subtotal</div>
                        <div class="cart__heading-right_text">ACTION</div>
                    </div>
                </div>
                    <p v-if="!cartItems.length" class="default-cart-text colortext">Ваша корзина абсолютно и совершенно точно пуста... :(</p>
                    <shopping-item ref ="shopping-item"  v-for="product of cartItems" :cartItem = "product" :key="product.id_product"></shopping-item>
                
                <div class="shopping-button container">
                <button class="button_reset hover_color_gray" type="reset">
                    <div class="shopping-button__left text_uppercase text_size-14 text_weight-700 text-color-gray2">
                        CLEAR SHOPPING CART</div>
                </button>

                <a class="link" href="index.html">
                    <div
                        class="shopping-button__right hover_color_gray text_uppercase text_size-14 text_weight-700 text-color-gray2">
                        СONTINUE SHOPPING</div>
                </a>
            </div>

            <div class="forms container">

                <form class="forms__shipping" action="">
                    <div
                        class="forms__shipping-header text_uppercase text_size-16 text_weight-700 text_color-black margin_bottom">
                        Shipping
                        Adress</div>
                    <input class="margin_bottom forms__shipping_input text_color-sl-gray text_weight-300 text_size-13"
                        type="text" placeholder="Bangladesh">
                    <input class="margin_bottom forms__shipping_input text_color-sl-gray text_weight-300 text_size-13"
                        type="text" placeholder="State">
                    <input class="margin_bottom forms__shipping_input text_color-sl-gray text_weight-300 text_size-13"
                        type="text" placeholder="Postcode / Zip">
                    <button
                        class="margin_bottom forms__shipping_input button_size text-color-gray2 text_uppercase text_size-11 text_weight-700 hover_color_gray"
                        type="submit">get a quote</button>

                </form>

                <form class="forms__shipping" action="">
                    <div
                        class="forms__shipping-header text_uppercase text_size-16 text_weight-700 text_color-black margin_bottom">
                        coupon discount</div>
                    <p class="text_size-14 text_weight-300 text_color-dark-black margin_bottom">Enter your coupon code
                        if
                        you
                        have one</p>
                    <input
                        class="margin_bottom forms__shipping_input margin_bottom text_color-sl-gray text_weight-300 text_size-13"
                        type="text" placeholder="State">
                    <button
                        class="margin_bottom forms__shipping_input button_size text-color-gray2 text_uppercase text_size-11 text_weight-700 hover_color_gray"
                        type="submit">Apply coupon</button>

                </form>

                <div class="check">
                    <p class="text_size-11 text_weight-400 text-color-gray2 text_uppercase" :value = "sumPrice">Sub
                        total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{amount}}
                    </p>
                    <p class="text_color-black text_size-16 text_weight-700 text_uppercase margin-top">GRAND TOTAL
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="colortext" :value = "sumPrice">$ {{amount}}</span></p>
                    <hr class="hr_color">
                    <a class="link check__button" href="checkout.html">
                        <p class="text_size-16 text_weight-700 text_uppercase">proceed to checkout</p>
                    </a>
                </div>
            </div>
            </div>
    `,

})


Vue.component('shopping-item', {
    props: ['cartItem', 'quantity'],
    methods: {
        getImage(cartItem) {
            return cartItem.img;
        },
        getQuantity(cartItem) {
            return cartItem.quantity
        },
    },
    template: `
         <div class="cart__product text_size-13 bd_bottom">
            <a class="link width_link" href="single_page.html">
                <div class="cart__product-left">
                    <img class="hover_translate width_img" :src ="getImage(cartItem)" alt="photo">
                    <div class="parameters">
                        <p class="text_color-black text_uppercase hover_color parameters_margin_bottom">
                        {{cartItem.product_name}}</p>
                        <p class="text_color-gray">Color:  {{cartItem.color}}</p>
                        <p class="text_color-gray">Size:  {{cartItem.size}}</p>
                    </div>
                </div>
            </a>
            <div class="cart__product-right text_color-gray">
                <p class="margin_left hover_color">$ {{cartItem.price}}</p>
                <div class = "button_quantity">
                    <button class ="button_quantity_rl" @click="$root.$refs.cart.remove(cartItem)">-</button>
                    <p class ="quantity" :value="getQuantity(cartItem)">{{cartItem.quantity}}</p>
                    <button class ="button_quantity_rl" @click="$root.$refs.cart.addProduct(cartItem)">+</button>
                </div>
                <p>FREE</p> 
                <p class="hover_color">$ {{cartItem.price * cartItem.quantity}}</p>
                <button class="button_bd" type="reset" @click="$parent.remove(cartItem)">
                    <i class="fas fa-minus-circle fa-minus-circle-margin hover_color"></i>
                </button>
            </div>
        </div>

    `,
})
