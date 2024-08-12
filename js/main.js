/*
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
*/
// Shopping list

const shoppingFormEl = $("#shopping-form");

const shoppingListEl = $("#shopping-list");

// function to handle form submit using jQurey

function handleFormSubmit(event) {
  event.preventDefault();

  const shoppingItem = $('input[name = "shopping-input"]').val();
  //to write in vanilla JS
  // const shoppintItem = document.queryselector('input[name="shopping-input"]').value;
  if (!shoppingItem) {
    alert("No shopping item filled out in the form");
    return;
  }

  const shoppingListItemElement = $(
    '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark"></li>'
  );

  shoppingListItemElement.text(shoppingItem);

  // add delete button to remove shopping list item
  shoppingListEl.append(
    '<button class ="btn btn-danger btn-small delete-item-btn">Remove</button>'
  );

  //print to the page
  shoppingListEl.append(shoppingListItemElement);

  // clear the form input element
  $('input[name="shopping-input"]').val("");
}

shoppingFormEl.on("submit", handleFormSubmit);

// adding event listener to the created button remove

function handleRemoveBtn(event) {
  const button = $(event.target);
  const parentElement = button.parent(); // to get the parent element
  parentElement.remove();
}

shoppingListEl.on("click", ".delete-item-btn", handleRemoveBtn);

// countdown
setInterval(() => {
  const currentDay = dayjs().format("D-MMM-YYYY HH:mm:ss");
  const countdownElement = document.querySelector("#countdown");
  countdownElement.textContent = currentDay;
  countdownElement.classList('btn');


  
}, 1000);

