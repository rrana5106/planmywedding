let iconCart = document.querySelector(".icon-cart");
let biCart = document.querySelector(".bi-cart");

let closeCart = document.querySelector(".close");

let body = document.querySelector("body");

let listProductsHTML = document.querySelector(".listProduct");

let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");

let listProducts = [];
let carts = [];

// adding event
iconCart.addEventListener("click", function () {
  body.classList.toggle("showCart");
});

biCart.addEventListener("click", function () {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", function () {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  listProductsHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = ` <img src="${product.image}" alt="" />
        <h3>${product.name}</h3>
        <div class="price">£${product.price}</div>
        <button class="addCart">Add To Cart</button>`;
      listProductsHTML.appendChild(newProduct);
    });
  }
};

listProductsHTML.addEventListener("click", function (event) {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let productId = positionClick.parentElement.dataset.id;
    addToCart(productId);
    // alert(productId);
  }
});
const addToCart = (productId) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }

  addCartToHTML();
  addCartToMemory();
};

// storing the cart data to the localStorage
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.productId;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProducts[positionProduct];

      newCart.innerHTML = `<div class="image">
            <img src="${info.image}" alt="" />
          </div>
          <div class="name">${info.name}</div>
          <div class="totalPrice">£${info.price * cart.quantity}</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${cart.quantity}</span>
            <span class="plus">></span>
          </div>`;
      listCartHTML.appendChild(newCart);
    });
  }
  iconCartSpan.textContent = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let productId = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(productId, type);
  }
});
const changeQuantity = (productId, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;

      default:
        let changeValue = carts[positionItemInCart].quantity - 1;
        if (changeValue > 0) {
          carts[positionItemInCart].quantity = changeValue;
        } else {
          carts.splice(positionItemInCart, 1);
        }

        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const initApp = () => {
  // getting data from json
  fetch("../assets/products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      //   console.log(listProducts);
      addDataToHTML();

      // getting the cart from the memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
