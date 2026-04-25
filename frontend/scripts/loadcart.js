import { powerBankCart, removeFromCart, updateCartQuantity } from "./data/carts.js";
import { powerBankGet} from "./data/products.js";
import { formatNaira } from "./utils/moneyf.js";
import { backDrop } from "./utils/backdrop.js";
import { darkmode } from "./utils/darkmode.js";
import { renderingSummary } from "./data/loadcart/loadrender.js";
import { showlogged } from "./utils/show.js";
backDrop();
darkmode()
showlogged();


     let cartSummaryHTML = "";

    powerBankCart.forEach((powerBankCartItem)=>{
    const powerBankProductId = powerBankCartItem.powerBankProductId
   
    const matchingPowerBankProduct = powerBankGet(powerBankProductId);

    console.log(matchingPowerBankProduct);
    cartSummaryHTML += `
             <div class="cart-flex js-cart-flex-remove-${matchingPowerBankProduct.id}">
                    <div class="cart-image-desc">
                        <img src="${matchingPowerBankProduct.image}" alt="" class="cart-image">
                    <div class="cart-desc">
                        <p class="cart-price-desc">${matchingPowerBankProduct.name}</p>
                        <p cart-price>${formatNaira(matchingPowerBankProduct.priceNaira)}</p>
                        </div>
                        
                    </div>
                        <div class="cart-quantity-delete">
                            <p class="delete-button js-delete-button" data-power-bank-product-id="${matchingPowerBankProduct.id}">Delete</p>
                            <p  class="quantity-number">Quantity: <span class="quantity-number">${powerBankCartItem.quantity}</span> </p>
                        
                        </div>
                </div>
        
        `

   

})
 document.querySelector(".js-total-container-for-cart")
    .innerHTML = cartSummaryHTML

    document.querySelectorAll(".js-delete-button")
    .forEach((link)=>{
        link.addEventListener("click", ()=>{
            const powerBankProductId = link.dataset.powerBankProductId;
             removeFromCart(powerBankProductId);
        const removeContainer = document.querySelector(`.js-cart-flex-remove-${powerBankProductId}`)
        removeContainer.remove();
            updateCartQuantity()

             if (powerBankCart.length === 0) {
            renderEmptyCart();
            } else {
                renderingSummary()   
                     // re-render summary when items remain
            }
           
         
        })

    })
     updateCartQuantity()



 //summary
 renderingSummary()


     

function renderEmptyCart() {
  document.querySelector(".js-total-container-for-cart").innerHTML = `
    <div class="empty-cart">
      <p class="empty-cart-file">Your cart is empty 🛒</p>
    </div>
  `;

  document.querySelector(".js-summary").innerHTML = "";
}

if (powerBankCart.length === 0) {
  renderEmptyCart();
} else {
  renderingSummary();
}