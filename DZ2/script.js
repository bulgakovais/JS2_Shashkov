class GoodsItem {
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

class GoodsList {
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