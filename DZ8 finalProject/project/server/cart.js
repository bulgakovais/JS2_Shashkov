const add = (cart, req) => {
  cart.contents.push(req.body);
  return newCart = JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return newCart = JSON.stringify(cart, null, 4);
};
const remove = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find.quantity > 1) {
    find.quantity -= 1;
  } else {
    cart.contents.splice(cart.contents.indexOf(find), 1)
  };

  if (req.params.cnt == 0) {
    cart.contents.splice(cart.contents.indexOf(find), 1)
  }

  return newCart = JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
};
