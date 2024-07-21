const cart = [];

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const product = {
      id: productId,
      name: "Product " + productId,
      price: 10.0,
    };
    cart.push(product);
    updateCart();
  });
});

function updateCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.innerText = `${item.name} - $${item.price}`;
    cartItemsContainer.appendChild(cartItem);
    total += item.price;
  });
  document.getElementById("cart-total").innerText = total.toFixed(2);
}

document.getElementById("checkout-button").addEventListener("click", () => {
  document.querySelector(".checkout").style.display = "block";
});

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order placed!");
});
