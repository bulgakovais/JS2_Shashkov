const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// API запрос через Рromise

const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = null;
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status != 200) {
                    reject('Error');
                }
                else {
                    resolve(cb(xhr.responseText));
                }
            }
        };
        xhr.send();
    })
}

class List {
    constructor(url, container, list = listContext) {
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

    render() {
        const block = document.querySelector(this.container)
        for (let product of this.goods) {
            console.log(this.constructor.name)
            // const productObj = new this.list[this.constructor.name](product)

            let productObj = null;
            if (this.constructor.name === 'ProductsList') {
                productObj = new ProductItem(product)
            }
            if (this.constructor.name === 'Cart') {
                productObj = new CartItem(product)
            }

            this.allproducts.push(productObj)
            block.insertAdjacentHTML('beforeend', productObj.render())
        }

    }

    // Метод поиска товаров
    filter() {

    }
}

const listContext = {
    ProductList: ProductItem,
    Cart: CartItem
}

class Item {
    constructor()
}


class ProductsItem extends Item {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
                    <img class="productImage" src="image/shirt.jpg" alt="">
                    <div class="description">
                        <h3 class="textColor">${this.title}</h3>
                        <p class="productPrice">${this.price} $</p>
                    </div>
                    <button class="addToCart" >Добавить в корзину</button>
                </div>`;
    }
}

class ProductsList extends List {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price)
            listHtml += goodItem.render()
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    sum() {
        let initionValue = 0;
        let sum = this.goods.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            initionValue
        );
        return sum;
    }
}

// class BasketItem extends GoodsItem {
//     constructor(title, price, quantity) {
//         super(title, price);
//         this.quantity = quantity;
//     }
//     renderBasketItem() {

//     }
// }

// class Basket {
//     constructor()
//     Метод добавления товара в корзину
//     Метод удаления товара из корзины
//     Метод рендера товаров в корзине
//     ... и еще какие-нибудь методы)
// }

const list = new GoodsList;
list.fetchGoods();
list.render();
list.sum();