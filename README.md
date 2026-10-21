Blackjack Game

A browser-based game of Blackjack built with plain HTML, CSS and JavaScript. Try to get as close to 21 as you can without going over.

Play it live: https://Oreoislove.github.io/blackjack-game/

Features
  --Two-player pass-and-play rounds
  --Start a new round and draw cards one at a time
  --Face cards (Jack, Queen, King) count as 10
  --Smart Ace handling: an Ace counts as 11, and drops to 1 automatically if you would otherwise bust
  --Separate Player 1 and Player 2 win counters, plus draws
  --The "New Card" button disables itself when the round is over

How to Play
  --Click Start Game to deal two cards to each player.
  --The active player clicks Hit to draw or Stand to end their turn.
  --When both players finish, the player closest to 21 wins.
  --A player who goes over 21 busts; if both players bust, the round is a draw.
  --If both players are equally close to 21, the round is a draw.
  --Start a new game any time to play again. Your wins and losses are kept until you refresh the page.

Built With
  --HTML
  --CSS
  --JavaScript (no libraries or frameworks)

How the Code Works
  --getRandomCard() picks a rank from 1 to 13.
  --getCardValue() converts a rank into blackjack points (Ace = 11, face cards = 10).
  --calculateSum() adds up the hand and downgrades Aces from 11 to 1 only when needed to avoid busting.
  --renderGame() updates both hands and shows whose turn it is.

Future Improvements
  --Add a dealer that plays against you
  --Add a Stand button
  --Use a real shuffled deck instead of random draws
  --Add card images and animations
  --Save wins and losses between visits


Author
Made by Meowy(Kartik). Feel free to open an issue or suggest improvements.
