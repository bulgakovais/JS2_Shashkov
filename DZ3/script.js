const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// API запрос через Рromise

// const getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = null;
//         xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status != 200) {
//                     reject('Error');
//                 }
//                 else {
//                     resolve(cb(xhr.responseText));
//                 }
//             }
//         };
//         xhr.send();
//     })
// }

class List {
    constructor(url, container, list) {
        this.url = url;
        this.container = container;
        this.list = list;
        this.goods = [];
        this.allproducts = [];
        this.filtered = [];
        this._init();
    }
    // Метод получения данных с сервера
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(response => response.json())
            .catch(error => console.log(error))
    }
    // Обработка данных, полученных с сервера
    handleData(data) {
        this.goods = data;
        this.render();
    }
    calcSum() {
        return this.allproducts.reduce((accum, item) => {
            accum += item.price, 0
        })
    }
    render() {
        const block = document.querySelector(this.container)
        for (let product of this.goods) {
            console.log(this.constructor.name)
            // const productObj = new this.list[this.constructor.name](product)

            let productObj = null;
            if (this.constructor.name === 'ProductsList') {
                productObj = new ProductsItem(product)
            }
            if (this.constructor.name === 'Cart') {
                productObj = new CartItem(product)
            }

            this.allproducts.push(productObj)
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
        // const listContext = {
        //     ProductList: ProductItem,
        //     Cart: CartItem
        // }
    }

    // Метод поиска товаров
    filter(value) {
        const regexp = new RegExp(value)
        this.filtered = this.allproducts.filter(product => regexp.test(product.product_name.toLowerCase()))
        this.allproducts.forEach(el => {
            let div = document.querySelector(`.goods-item[data-id = "${el.id_product}"]`)
            if (!this.filtered.includes(el)) {
                div.classList.add('hidden')
            } else {
                div.classList.remove('hidden')
            }
        })
    }
    _init() {
        return false
    }
}

class Item {
    constructor(el) {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
    }
    render() {
        return ``
    }
}


class ProductsItem extends Item {
    render() {
        return `<div class="goods-item" data-id="${this.id_product}">
                    <img class="productImage" src="image/shirt.jpg" alt="">
                    <div class="description">
                        <h3 class="textColor">${this.product_name}</h3>
                        <p class="productPrice">${this.price} p.</p>
                    </div>
                    <button class="addToCart" 
                    data-id="${this.id_product}" 
                    data-name="${this.product_name}" 
                    data-price="${this.price}">Добавить в корзину</button>
                </div>`;
    }
}

class ProductsList extends List {
    constructor(cart, url = '/catalogData.json', container = '.goods-list') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data))
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', element => {
            if (element.target.classList.contains('addToCart')) {
                this.cart.addProduct(element.target)
            }
        })
        document.querySelector(".search-form").addEventListener('submit', element => {
            element.preventDefault()
            this.filter(document.querySelector('.search-field').value)
        })
    }
}

class Cart extends List {
    constructor(url = "/getBasket.json", container = ".cart-block") {
        super(url, container)
        this.getJson()
            .then(data => {
                this.handleData(data.contents)
            })
    }
    addProduct(element) {
        this.getJson(`${API}//addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id']
                    let find = this.allproducts.find(product => product.id_product === productId)
                    if (find) {
                        find.quantity++;
                        this._updateCart(find)
                    }
                    else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1,
                        }
                        let newProduct = new CartItem(product)
                        this.allproducts.push(product)
                        let block = document.querySelector('.cart-block')
                        block.insertAdjacentHTML("beforeend", newProduct.render())

                    }
                    this.checkCart()
                } else {
                    alert('Error')
                }
            })
    }
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id']
                    let find = this.allproducts.find(product => product.id_product === productId)
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find)
                    } else {
                        this.allproducts.splice(this.allproducts.indexOf(find), 1)
                        document.querySelector(`.cart-item[data-id ="${productId}"]`).remove()
                        this.checkCart()
                    }
                } else {
                    alert('error')
                }
            })
    }

    checkCart() {
        let block = document.querySelector('.cart-block > p')
        if (this.allproducts.length === 0) {
            block.classList.remove('hidden')
        } else (block.classList.add('hidden'))

    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id = "${product.id_product}"]`)
        block.querySelector('.product-quantity').textContent = `Кол-во ${product.quantity}`
        block.querySelector('.product-price').textContent = `Итого ${product.price * product.quantity}p.`
    }
    init() {
        document.querySelector('.button-cart').addEventListener('click', element => {
            document.querySelector(this.container).classList.toggle('hidden')
        })
        document.querySelector(this.container).addEventListener('click', element => {
            if (element.target.classList.contains('fa-trash-alt')) {
                this.removeProduct(element.target)
            }
        })
    }
}


class CartItem extends Item {
    constructor(el) {
        super(el);
        this.quantity = el.quantity;
    }
    render() {
        return `
        
            <div class="cart-item" data-id="${this.id_product}">
                <div class="cart_product">
                <img class ="image-cart-product"src="image/shirt.jpg" alt="image">
                    <div class="description">
                        <p class="product-title paragraf">${this.product_name}</p>
                        <p class="product-quantity paragraf">Кол-во: ${this.quantity}</p>
                        <p class="product-single-price paragraf">${this.price}&nbspp.</p>
                    </div>
                </div>
           
                <div class="right-block">
                    <p class="product-price">Итого: ${this.quantity * this.price}&nbspp.</p>
                    <button class = "delete-button"><i class="fas fa-trash-alt" data-id = "${this.id_product}"></i></button>
                </div>
            </div>
        `
    }
}
let cart = new Cart()
cart.init()
let products = new ProductsList(cart)

