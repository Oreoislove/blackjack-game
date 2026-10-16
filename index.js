let firstCard=4
let secondCard=12
let cards=[firstCard,secondCard]
let sum=firstCard+secondCard
let message=""
let messageEl=document.getElementById("message-el")
let hasBlackJack=true;
let isAlive=true
let sumEl=document.getElementById("sum-el")
let cardsEl=document.getElementById("cards-el")
function startGame(){
    renderGame()
}
function renderGame(){
    cardsEl.textContent="Cards: "
    for(let i=0;i<cards.length;i++){
        cardsEl.textContent+=cards[i]+" "
    }
    sumEl.textContent="Sum: "+sum
   
    if(sum<=20){
        message="Do you want to draw a new card?"
    }
    else if(sum==21){
        message="You have got blackjack!!!"
        hasBlackJack=true
    }
    else{
        message="You are out of the game"
        isAlive=false
    }
    messageEl.textContent=message
}
function newCard(){
    console.log("Drawing a new card!")
    let card=5
    sum+=card
    cards.push(card)
    startGame()
}
/* if(sum<=20){
    console.log("Do you want to draw a new card")
}
else if(sum==21){
    console.log("You have   got blackjack")
    hasBlackJack=true
}
else{
    console.log("You are out of the game")
    isAlive=false
}
console.log(isAlive) */
