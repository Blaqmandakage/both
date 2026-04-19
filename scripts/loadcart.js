import { powerBankCart, removeFromCart } from "./data/carts.js";
import { powerBankGet} from "./data/products.js";
import { formatNaira } from "./utils/moneyf.js";



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
                renderingSummary()         // re-render summary when items remain
            }
           
         
        })

    })
     updateCartQuantity()

     function updateCartQuantity(){
  let powerBankCartQuantity = 0;
     powerBankCart.forEach((powerBankCartItem)=>{
      powerBankCartQuantity += powerBankCartItem.quantity
     })
 document.querySelector(".js-check-out-return")
 .innerHTML = `${powerBankCartQuantity} items`

 }


 //summary
 renderingSummary()
 function renderingSummary(){
  let powerBankProductNaira = 0
    powerBankCart.forEach((powerBankCartItem)=>{  
    const product = powerBankGet(powerBankCartItem.powerBankProductId)
    powerBankProductNaira += product.priceNaira * powerBankCartItem.quantity;
   
 }); 

    const totalBeforeTax = powerBankProductNaira
    const taxNaira =  totalBeforeTax * 0.05;
    const totalNaira = totalBeforeTax - taxNaira;

    const summaryHTML = `

             <h2  class="review-order">Review Your Order</h2>
             <div class="order-summary">
            <div class="both">
             <h3 class="order-summary-font js-summary">Order Summary</h3>
                <div class="flex item">
                <p>item (2)</p>
                <p class="cart-summary-price">${formatNaira(powerBankProductNaira)}</p>
                </div>
                <div class="flex item">
                <p>Delivery fee</p>
                <p class="cart-summary-price">${formatNaira(0)}</p>
                </div>
               
                
                <hr>
                
                 <div class="flex item">
                <p>Total before Discount</p>
                <p class="cart-summary-price">${formatNaira(totalBeforeTax)}</p>
                </div>
                
                <div class="flex item">
                <p>Discount(5%)</p>
                <p class="cart-summary-price">${formatNaira(taxNaira)}</p>
                </div>

                <hr>
                <div class="flex item">
                <p class="order-total">Order total:</p>
                <p class="order-total-price">${formatNaira(totalNaira)}</p>
                </div>
                <button class="place-your-order">Place your order</button>
            </div>
            </div>
    `
 document.querySelector(".js-summary")
.innerHTML = summaryHTML;

 }
     

function renderEmptyCart() {
  document.querySelector(".js-total-container-for-cart").innerHTML = `
    <div class="empty-cart">
      <p>Your cart is empty 🛒</p>
    </div>
  `;

  document.querySelector(".js-summary").innerHTML = "";
}

if (powerBankCart.length === 0) {
  renderEmptyCart();
} else {
  renderingSummary();
}