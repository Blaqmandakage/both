export let powerBankCart = JSON.parse(localStorage.getItem("powerBankCart"))

||


[
    {
    powerBankProductId : "69c2aaca88c3e",
    quantity: 2
    }, 
    {
    powerBankProductId : "8c4b66a259ef98",
    quantity: 1
    }


]





export function addTocart(powerBankProductId){
    let matchingPowerBank;

        powerBankCart.forEach((powerBankCartItem)=>{
            if(powerBankProductId === powerBankCartItem.powerBankProductId){
                matchingPowerBank = powerBankCartItem
            }
        })
        const quantity = Number(document.querySelector(`.js-power-bank-options-${powerBankProductId}`).value)

        if(matchingPowerBank){
            matchingPowerBank.quantity += quantity
        }else{
             powerBankCart.push({
            powerBankProductId,
            quantity
        })
        }
        saveToStorage()

}

 export  function removeFromCart(powerBankProductId){
                       const newPowerBankCart = [];
            powerBankCart.forEach((powerBankCartItem)=>{
                if(powerBankCartItem.powerBankProductId !== powerBankProductId){
                    newPowerBankCart.push(powerBankCartItem)
                }
                
            })
            powerBankCart = newPowerBankCart;
            saveToStorage()
            console.log(powerBankCart)
        }

function saveToStorage(){
    localStorage.setItem("powerBankCart", JSON.stringify(powerBankCart))
}