"use strict";
let $ = document;
const tabPanes = $.querySelectorAll(".tab-pane");
const menuNavBtns = $.querySelectorAll(".nav-pills .nav-link");
const menuModalTitle = $.querySelector("#menuModal .modal-title");
const menuModalSubTitle = $.querySelector("#menuModal .modal-subtitle");
const menuModalImg = $.querySelector("#menuModal .modal-img");
const menuModalDescript = $.querySelector("#menuModal .modal-descript");
const menuModalText = $.querySelector("#menuModal .modal-text");
const menuModalRating = $.querySelector("#menuModal .modal-rating");
const menuModalPrice = $.querySelector("#menuModal .modal-price");
const menuModalTotalPrice = $.querySelector("#menuModal .modal-total-price");
const menuModalSelectInput = $.querySelector("#menuModal .modal-select");
const menuModalQty = $.querySelector("#menuModal .modal-qty");
const modalShopBtn = $.querySelector(".modal-addCart-btn");

const cartIconNumber = $.querySelector(".cart-icon-number");
const likeBtn = $.querySelectorAll(".fa-heart");

const toastImg = $.querySelector(".toast .add-toast-img");
const removedToastImg = $.querySelector("#removeCartToast .remove-toast-img");
const toastTitle = $.querySelector(".toast .toast-title");
const removedToastTitle = $.querySelector("#removeCartToast .remove-toast-title ");
const toastTotalPrice = $.querySelector(".toast .toast-totalPrice");
const removedToastTotalPrice = $.querySelector("#removeCartToast .remove-toast-totalPrice");

const shopCartBody = $.querySelector("#shopCartCanvas .offcanvas-body");
const shopCartFooter = $.querySelector("#shopCartCanvas .offcanvas-footer");
const shopCartTotalPrice = $.querySelector("#shopCartCanvas .cart__total-price");
const shopCartCheckoutBtn = $.querySelector("#shopCartCanvas .cart__checkout");

let menuData;
let shoppingCart = [];

function createMenuModal(data) {
  tabPanes.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      menuModalSelectInput.value = 1;
      if (e.target.classList.contains("modal-trigger")) {
        const targetDataset = Number(e.target.dataset.id);
        const tabIndex = tab.getAttribute("tabindex");
        data[tabIndex].group_details.forEach((item) => {
          if (targetDataset === item.food_id) {
            menuModalImg.src = item.food_img;
            menuModalImg.alt = item.food_title;
            menuModalTitle.innerHTML = item.food_title;
            menuModalDescript.innerHTML = item.food_description;
            menuModalText.innerHTML = item.food_text;
            menuModalSubTitle.innerHTML = item.food_calories;
            menuModalPrice.innerHTML = "$" + item.food_price;
            menuModalTotalPrice.innerHTML = item.food_price;
            menuModalQty.innerHTML = menuModalSelectInput.value;
            modalShopBtn.dataset.id = item.food_id;
          }
        });
      }
      if (e.target.classList.contains("fa-heart")) {
        e.target.classList.toggle("fa-solid");
      }
      if (e.target.classList.contains("fa-bookmark")) {
        e.target.classList.toggle("fa-solid");
      }
    });
  });
}

function dynamicRating(data) {
  let wrapper = document.createElement("div");
  for (let i = 1; i <= 5; i++) {
    let span = document.createElement("span");
    span.style.paddingRight = "3px";
    span.innerHTML = i <= data.food_rating ? `<i class="fa-solid fa-star fa-fw text-secondary fs-5"></i>` : `<i class="fa-light fa-star fw-medium fa-fw text-secondary fs-5"></i>`;

    wrapper.appendChild(span);
  }

  return wrapper.innerHTML;
}

function createMenuCards(data) {
  tabPanes.forEach((tab) => {
    const tabIndex = tab.getAttribute("tabindex");
    const cardContainer = tab.querySelector(".card-container");
    cardContainer.innerHTML = "";
    let badgeHtml = `<img src="./images/Badge Discount.svg" alt="badge discount" class="img-fluid card__sale-badge" />`;

    data[tabIndex].group_details.forEach((item) => {
      const wrapperEl = dynamicRating(item);

      const html =
        //html
        `
        <div class="col-xl-4 col-lg-5 col-md-6 col-8 px-sm-3">
          <div class="card border-secondary p-3 rounded-3">
            <div class="card__img-content  mb-2 text-center">
              ${item.hasOffer ? badgeHtml : ""}
              <img
                src="${item.food_img}"
                alt="${item.food_title} image"
                class="card__img modal-trigger"
                data-bs-toggle="modal"
                data-bs-target="#menuModal"
                data-id="${item.food_id}"
              />
              <div class="card__feature">
                <span class="text-dark-gray card__feature-icon">
                  <i class="fa-regular fa-heart fs-4 mb-2"></i>
                </span>
                <span class="text-dark-gray card__feature-icon">
                  <i class="fa-regular fa-bookmark fs-4"></i>
                </span>
              </div>
            </div>
            <div class="card-body p-0">
              <h4
                class="card__title modal-trigger lh-base fw-semibold text-dark mb-1 d-inline-block"
                data-bs-toggle="modal"
                data-bs-target="#menuModal"
                data-id="${item.food_id}"> ${item.food_title}
              </h4>
              <p class="card__text fs-5 fw-normal mb-1">${item.food_text}</p>
              <div class="card__rating d-flex align-items-center">
                <div class="card__rating-star">
                ${wrapperEl}
                </div>
                <span class="fw-medium fs-6"> (${item.food_rating})</span>
              </div>
              <div class="card__price-container d-flex align-items-center mt-2">
                <p class="card__price fs-3 fw-semibold text-dark mb-0">
                  $ ${item.food_price}
                </p>
                <button
                  class="modal-trigger btn btn-sm btn-primary ms-auto p-2 rounded-2"
                  data-bs-toggle="modal"
                  data-bs-target="#menuModal"
                  data-id="${item.food_id}"
                >
                  <i class="fa-solid fa-basket-shopping fs-4 fa-fw modal-trigger" data-id="${item.food_id}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      cardContainer.insertAdjacentHTML("beforeend", html);
    });
  });

  createMenuModal(data);
}

function createShopCartModal(shoppingCartArr) {
  shopCartBody.innerHTML = "";
  shoppingCartArr.forEach((item) => {
    const html =
      //html
      `
            <div class="shop-cart__item d-flex gap-3 p-3">
              <div class="image-container flex-shrink-0">
                <img
                  src="${item.foodImg}"
                  alt="${item.foodTitle}"
                  class="img-fluid shop-cart__img"
                />
              </div>
              <div class="text-container">
                <div class="d-flex justify-content-between align-items-center mb-1 gap-2">
                  <h5 class="shop-cart__title fw-semibold text-dark mb-0">${item.foodTitle}</h5>
                  <button class="btn p-0  shop-cart__delete" data-id="${item.foodId}">
                    <i class="fa-solid fa-trash-can text-primary"></i>
                  </button>
                </div>
                <p class="shop-cart__text mb-2 pe-sm-6 pe-3">${item.foodText}</p>
                <div class="input-container d-flex align-items-center gap-3">
                  <div class="shop-cart__qty btn-group p-1 border rounded-2 border-secondary" role="group">
                    <button class="btn p-0 me-1 shop-cart__add" data-id="${item.foodId}">
                      <i class="fa-regular fa-plus text-primary"></i>
                    </button>
                    <div class="fs-5 text-primary border-end border-start p-0 px-1">
                      <span class="fw-bold shop-cart__order-num ">${item.foodQty}</span>
                    </div>
                    <button class="btn p-0 ms-1 shop-cart__subtract" data-id="${item.foodId}">
                      <i class="fa-solid fa-minus text-primary"></i>
                    </button>
                  </div>
                  <p class="fw-medium fs-4 text-dark mb-0">$ <span class="shop-cart__price">${parseFloat((item.foodPrice * item.foodQty).toFixed(2))}</span></p>
                </div>
              </div>
            </div>
      `;
    shopCartBody.insertAdjacentHTML("beforeend", html);
  });
  const shopCartTotalOrder = document.querySelector("#shopCartCanvas .shop-cart__total-order");
  if (shoppingCartArr.length === 1) {
    shopCartTotalOrder.innerHTML = `( ${shoppingCartArr.length} order )`;
  } else if (shoppingCartArr.length > 1) {
    shopCartTotalOrder.innerHTML = `( ${shoppingCartArr.length} orders )`;
  } else shopCartTotalOrder.innerHTML = "";

  const shopCartDeleteBtn = document.querySelectorAll("#shopCartCanvas .shop-cart__delete");
  shopCartDeleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFood(btn.dataset.id);
    });
  });

  const shopCartAddBtn = document.querySelectorAll("#shopCartCanvas .shop-cart__add");
  shopCartAddBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      increaseQty(btn.dataset.id);
    });
  });

  const shopCartSubtractBtn = document.querySelectorAll("#shopCartCanvas .shop-cart__subtract");
  shopCartSubtractBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      decreaseQty(btn.dataset.id);
    });
  });
}

function changeTotalPrice() {
  shopCartTotalPrice.innerHTML = "";
  let cartTotalPrice = 0;
  const shopTotalprice = document.querySelectorAll(".shop-cart__price");
  const heroTotalPrice = document.querySelector(".hero__order-total-price");
  shopTotalprice.forEach((price) => {
    cartTotalPrice += Number(price.innerHTML);
  });
  shopCartTotalPrice.innerHTML = "$ " + parseFloat(cartTotalPrice.toFixed(2));
  heroTotalPrice.innerHTML = "$ " + parseFloat(cartTotalPrice.toFixed(2));
}

modalShopBtn.addEventListener("click", () => {
  AddCartToast();
  shopCartFooter.hidden = false;
  shopCartFooter.classList.add("d-flex");
  const selectedFood = {
    foodId: modalShopBtn.dataset.id,
    foodTitle: menuModalTitle.innerHTML,
    foodQty: Number(menuModalQty.innerHTML),
    foodImg: menuModalImg.src,
    foodText: menuModalText.innerHTML,
    foodPrice: Number(menuModalPrice.innerHTML.slice(1)),
    foodTotalPrice: Number(menuModalTotalPrice.innerHTML),
  };

  const hasCart = shoppingCart.some((cart) => cart.foodId === selectedFood.foodId);
  if (!hasCart) {
    shoppingCart.push(selectedFood);
  } else {
    shoppingCart.map((cart) => {
      if (cart.foodId === selectedFood.foodId) {
        cart.foodQty += Number(menuModalQty.innerHTML);
      }
    });
  }
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
  createShopCartModal(shoppingCart);
  changeTotalPrice();
  cartIconNumber.innerHTML = shoppingCart.length;
});

menuModalSelectInput.addEventListener("change", (e) => {
  let newQty = e.target.value;
  if (e.target.value <= 0 || e.target.value > 10) {
    e.target.value = 1;
    newQty = 1;
  }
  let foodprice = Number(menuModalPrice.innerHTML.slice(1));
  menuModalQty.innerHTML = newQty;
  menuModalTotalPrice.innerHTML = parseFloat((newQty * foodprice).toFixed(2));
});

function updateShopCart(shoppingCart) {
  createShopCartModal(shoppingCart);
  cartIconNumber.innerHTML = shoppingCart.length;
  changeTotalPrice();
  if (shoppingCart.length === 0) {
    const html = `
    <div class="text-center mt-8">
          <i class="fa-light fa-cart-circle-exclamation fs-1 me-1 text-primary fw-medium"></i>
          <h5 class="fw-semibold mt-3 mb-0">Your Shopping Cart is empty!</h5>
    </div>
    `;
    shopCartBody.insertAdjacentHTML("beforeend", html);
    shopCartFooter.classList.remove("d-flex");
    shopCartFooter.hidden = true;
  }
}

function removeFood(id) {
  removeCartToast(id);
  shoppingCart = shoppingCart.filter((cart) => cart.foodId !== id);
  updateShopCart(shoppingCart);
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
}

function increaseQty(id) {
  shoppingCart.map((cart) => {
    if (cart.foodId === id && cart.foodQty < 10) {
      cart.foodQty += 1;
    }
  });

  createShopCartModal(shoppingCart);
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
  changeTotalPrice();
}

function decreaseQty(id) {
  shoppingCart.map((cart) => {
    if (cart.foodId === id) {
      if (cart.foodQty > 1) cart.foodQty -= 1;
    }
  });
  createShopCartModal(shoppingCart);
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
  changeTotalPrice();
}

shopCartCheckoutBtn.addEventListener("click", () => {
  shoppingCart = [];
  updateShopCart(shoppingCart);
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
});

function AddCartToast() {
  const myToast = new bootstrap.Toast("#addCartToast");
  myToast.show();
  toastImg.setAttribute("src", menuModalImg.src);
  toastTitle.innerHTML = `${menuModalQty.innerHTML} x ${menuModalTitle.innerHTML}`;
  toastTotalPrice.innerHTML = "$" + menuModalTotalPrice.innerHTML;
}

function removeCartToast(id) {
  const myToast = new bootstrap.Toast("#removeCartToast");
  myToast.show();
  const choosenCart = shoppingCart.find((cart) => cart.foodId === id);

  removedToastImg.setAttribute("src", choosenCart.foodImg);
  removedToastTitle.innerHTML = `${choosenCart.foodQty} x ${choosenCart.foodTitle}`;
  removedToastTotalPrice.innerHTML = "$" + parseFloat((choosenCart.foodQty * choosenCart.foodPrice).toFixed(2));
}

window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const getData = async () => {
      const res = await fetch("../menu-data.json");
      const data = await res.json();
      menuData = data;
      return data;
    };

    await getData();
    createMenuCards(menuData.menu_groups);
  })();

  const localStorageCart = JSON.parse(localStorage.getItem("cart"));
  if (localStorageCart.length) {
    shoppingCart = localStorageCart;
    createShopCartModal(shoppingCart);
    shopCartFooter.hidden = false;
    updateShopCart(shoppingCart);
  }
});
