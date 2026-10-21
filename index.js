const players = [
    { cards: [], sum: 0, isAlive: false, isStanding: false },
    { cards: [], sum: 0, isAlive: false, isStanding: false }
]

let currentPlayer = 0
let roundInProgress = false
let player1Wins = 0
let player2Wins = 0
let draws = 0

const messageEl = document.getElementById("message-el")
const player1CardsEl = document.getElementById("player-1-cards-el")
const player1SumEl = document.getElementById("player-1-sum-el")
const player2CardsEl = document.getElementById("player-2-cards-el")
const player2SumEl = document.getElementById("player-2-sum-el")
const player1StatusEl = document.getElementById("player-1-status-el")
const player2StatusEl = document.getElementById("player-2-status-el")
const player1WinsEl = document.getElementById("player-1-wins-el")
const player2WinsEl = document.getElementById("player-2-wins-el")
const drawsEl = document.getElementById("draws-el")
const startButton = document.getElementById("b1")
const hitButton = document.getElementById("b2")
const standButton = document.getElementById("b3")

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

function calculateSum(cards) {
    let total = cards.reduce((cardTotal, card) => cardTotal + getCardValue(card), 0)
    let aces = cards.filter(card => card === 1).length

    while (total > 21 && aces > 0) {
        total -= 10
        aces -= 1
    }

    return total
}

function startGame() {
    players.forEach(player => {
        player.cards = [getRandomCard(), getRandomCard()]
        player.sum = calculateSum(player.cards)
        player.isAlive = player.sum <= 21
        player.isStanding = player.sum >= 21
    })

    currentPlayer = 0
    roundInProgress = true
    advanceToAvailablePlayer()
    renderGame()
}

function hit() {
    if (!roundInProgress) return

    const player = players[currentPlayer]
    if (player.isStanding || !player.isAlive) return

    player.cards.push(getRandomCard())
    player.sum = calculateSum(player.cards)

    if (player.sum > 21) {
        player.isAlive = false
        player.isStanding = true
    } else if (player.sum === 21) {
        player.isStanding = true
    }

    advanceToAvailablePlayer()
    renderGame()
}

function stand() {
    if (!roundInProgress) return

    const player = players[currentPlayer]
    if (player.isStanding || !player.isAlive) return

    player.isStanding = true
    advanceToAvailablePlayer()
    renderGame()
}

function advanceToAvailablePlayer() {
    if (players.every(player => player.isStanding || !player.isAlive)) {
        finishRound()
        return
    }

    if (players[currentPlayer].isStanding || !players[currentPlayer].isAlive) {
        currentPlayer = currentPlayer === 0 ? 1 : 0
    }
}

function finishRound() {
    if (!roundInProgress) return

    roundInProgress = false
    const [player1, player2] = players
    const player1Alive = player1.isAlive && player1.sum <= 21
    const player2Alive = player2.isAlive && player2.sum <= 21

    if (player1Alive && player2Alive) {
        const player1Distance = 21 - player1.sum
        const player2Distance = 21 - player2.sum

        if (player1Distance < player2Distance) {
            player1Wins += 1
            messageEl.textContent = "Player 1 wins!"
        } else if (player2Distance < player1Distance) {
            player2Wins += 1
            messageEl.textContent = "Player 2 wins!"
        } else {
            draws += 1
            messageEl.textContent = "Draw! Both players are equally close to 21."
        }
    } else if (player1Alive) {
        player1Wins += 1
        messageEl.textContent = "Player 1 wins! Player 2 busted."
    } else if (player2Alive) {
        player2Wins += 1
        messageEl.textContent = "Player 2 wins! Player 1 busted."
    } else {
        draws += 1
        messageEl.textContent = "Draw! Both players busted."
    }
}

function renderPlayer(player, cardsEl, sumEl, statusEl, playerNumber) {
    player.sum = calculateSum(player.cards)
    cardsEl.textContent = "Cards: " + player.cards.map(getCardLabel).join(" ")
    sumEl.textContent = "Sum: " + player.sum

    if (player.sum > 21) {
        statusEl.textContent = "Busted"
    } else if (player.isStanding) {
        statusEl.textContent = "Standing"
    } else if (roundInProgress && currentPlayer === playerNumber) {
        statusEl.textContent = "Your turn"
    } else {
        statusEl.textContent = "Waiting"
    }
}

function renderGame() {
    renderPlayer(players[0], player1CardsEl, player1SumEl, player1StatusEl, 0)
    renderPlayer(players[1], player2CardsEl, player2SumEl, player2StatusEl, 1)

    player1WinsEl.textContent = player1Wins
    player2WinsEl.textContent = player2Wins
    drawsEl.textContent = draws

    startButton.disabled = roundInProgress
    hitButton.disabled = !roundInProgress || players[currentPlayer].isStanding ||
        !players[currentPlayer].isAlive
    standButton.disabled = hitButton.disabled
}

renderGame()
