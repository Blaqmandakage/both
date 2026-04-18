import { formatNaira } from "./utils/moneyf.js"
import { powerBankProducts } from "./data/products.js";

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
            <select name="" id="" class="power-bank-options">
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
            <div class="power-bank-add-to-cart-display">
            <button class="power-bank-add-to-cart">Add To Cart</button>
            </div>
        </div>
    `

    powerBankProductsHTML += html;

    document.querySelector(".js-powerbank-products-grid-display")
    .innerHTML = powerBankProductsHTML;
    console.log(powerBankProductsHTML);
    
})

