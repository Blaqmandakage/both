import { updateCartQuantitySummary, powerBankCart } from "../carts.js";
import { powerBankGet } from "../../../../backend/data/products.js";
import { formatNaira } from "../../utils/moneyf.js";


export function renderingSummary(){
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
             <h3 class="order-summary-font">Order Summary</h3>
                <div class="flex item">
                <p>item (<a href="index.html" class="summary-show-item js-summary-show-item"></a>)</p>
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

updateCartQuantitySummary()

 }

 