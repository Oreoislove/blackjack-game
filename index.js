let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let wins = 0
let losses = 0

const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const winsEl = document.getElementById("wins-el")
const lossesEl = document.getElementById("losses-el")
const newCardButton = document.getElementById("b2")

function getRandomCard() {
    return Math.floor(Math.random() * 13) + 1
}

function getCardValue(card) {
    if (card === 1) return 11
    if (card > 10) return 10
    return card
}

function getCardLabel(card) {
    if (card === 1) return "Ace"
    if (card === 11) return "Jack"
    if (card === 12) return "Queen"
    if (card === 13) return "King"
    return card
}

function calculateSum() {
    let total = cards.reduce((cardTotal, card) => cardTotal + getCardValue(card), 0)
    let aces = cards.filter(card => card === 1).length

    while (total > 21 && aces > 0) {
        total -= 10
        aces -= 1
    }

    return total
}

function startGame() {
    cards = [getRandomCard(), getRandomCard()]
    isAlive = true
    hasBlackJack = false
    renderGame()
}

function renderGame() {
    sum = calculateSum()
    cardsEl.textContent = "Cards: " + cards.map(getCardLabel).join(" ")
    sumEl.textContent = "Sum: " + sum

    if (sum < 21) {
        messageEl.textContent = "Do you want to draw a new card?"
    } else if (sum === 21) {
        messageEl.textContent = "Blackjack! You win!"
        hasBlackJack = true
        isAlive = false
        wins += 1
    } else {
        messageEl.textContent = "You are out of the game. You lose."
        isAlive = false
        losses += 1
    }

    winsEl.textContent = wins
    lossesEl.textContent = losses
    newCardButton.disabled = !isAlive || hasBlackJack
}

function newCard() {
    if (!isAlive || hasBlackJack) return

    cards.push(getRandomCard())
    renderGame()
}
