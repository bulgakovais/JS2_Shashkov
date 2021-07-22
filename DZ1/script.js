const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = "NO Name", price = "NO Price") => {
    return `<div class="goods-item">
                <img class="productImage" src="image/shirt.jpg" alt="">
                <div class="description">
                    <h3 class="textColor">${title}</h3>
                    <p class="productPrice">${price} $</p>
                </div>
                <button class="addToCart" >Добавить в корзину</button>
            </div>`
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
}

renderGoodsList(goods);

