import { formatNaira } from "./utils/moneyf.js"
import { powerBankProducts } from "./data/products.js";
import { powerBankCart, addTocart } from "./data/carts.js";  
import { backDrop } from "./utils/backdrop.js";
import { darkmode } from "./utils/darkmode.js";
import { showlogged} from "./utils/show.js";
backDrop();
darkmode();  
showlogged()


async function loadProducts() {
  const res = await fetch("https://wiremind.onrender.com/api/products");
  const products = await res.json();

  renderProducts(products);
}


function renderProducts(powerBankProducts) {
    let powerBankProductsHTML = "";
         powerBankProducts.forEach((productbank)=>{

        const html = `
         <div class="power-bank-product">
            <div class="power-bank-images">
                <img src=${productbank.image} class="power-bank-image">
            </div>
            <div class="power-bank-name-product">
                ${productbank.name}
            </div>
            <div class="power-bank-rating">
                <img src="/images/ratings/rating-${productbank.ratings.stars * 10}.png" alt="" class="power-bank-rating-icon">
                <p class="power-bank-points">${productbank.ratings.count}</p>
            </div>
            <div class="power-bank-prices">
                <p class="power-bank-price">${formatNaira(productbank.priceNaira)}</p>
            </div>
            <div class="power-bank-option">
            <select name="" id="" class="js-power-bank-options-${productbank.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>    
        </div>

            <div class="added-to-cart js-added-to-cart-${productbank.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

            <div class="power-bank-add-to-cart-display">
            <button class="power-bank-add-to-cart js-power-bank-cart" data-power-bank-product-id="${productbank.id}">Add To Cart</button>
            </div>
        </div>
    `

    powerBankProductsHTML += html;

  
    
})

  document.querySelector(".js-powerbank-products-grid-display")
    .innerHTML = powerBankProductsHTML;
}
loadProducts();

function updateCartQuantity(){
     let powerBankCartQuantity = 0;
       powerBankCart.forEach((powerBankCartItem)=>{
            powerBankCartQuantity += powerBankCartItem.quantity;
       })
      document.querySelector(".js-cart-number")
      .innerHTML = powerBankCartQuantity;

}

function addVisible(powerBankProductId){
    const addedMessage = document.querySelector(`.js-added-to-cart-${powerBankProductId}`)
        addedMessage.classList.add("added-to-cart-visible")

        setTimeout(()=>{
            addedMessage.classList.remove("added-to-cart-visible")

        },2000)
    
}

 updateCartQuantity();


document.querySelectorAll(".js-power-bank-cart")
.forEach((button)=>{
    button.addEventListener("click", ()=>{
        const {powerBankProductId} = button.dataset;
        addTocart(powerBankProductId);
        updateCartQuantity();
        addVisible(powerBankProductId)
               
    })
   
})

