const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
const values = {
  'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6, 'Seven': 7, 'Eight': 8, 'Nine': 9,
  'Ten': 10, 'Jack': 10, 'Queen': 10, 'King': 10, 'Ace': 11
};

let deck = [];
let player 0;
let dealerScore = 0;
let gameOver = false;

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCard(hand) {
  const card = deck.pop();
  hand.push(card);
  return card;
}

function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    score += values[card.rank];
    if (card.rank === 'Ace') aces += 1;
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }
  return score;
}

function displayHands() {
  document.getElementById('player-cards').innerText = playerHand.map(c => `${c.rank} of ${c.suit}`).join(', ');
  document.getElementById('dealer-cards').innerText = dealerHand.map(c => `${c.rank} of ${c.suit}`).join(', ');
  document.getElementById('player-score').innerText = `Score: ${playerScore}`;
  document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;
}

function startGame() {
  createDeck();
  shuffleDeck();
  playerHand = [dealCard(deck), dealCard(deck)];
  dealerHand = [dealCard(deck), dealCard(deck)];
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  gameOver = false;
  document.getElementById('message').innerText = '';
  displayHands();
}

function hit() {
  if (gameOver) return;
  dealCard(playerHand);
  playerScore = calculateScore(playerHand);
  displayHands();
  if (playerScore > 21) {
    document.getElementById('message').innerText = 'You busted!';
    gameOver = true;
  }
}

function stand() {
  if (gameOver) return;
  while (dealerScore < 17) {
    dealCard(dealerHand);
    dealerScore = calculateScore(dealerHand);
  }
  displayHands();
  if (dealerScore > 21 || playerScore > dealerScore) {
    document.getElementById('message').innerText = 'You win!';
  } else if (dealerScore > playerScore) {
    document.getElementById('message').innerText = 'Dealer wins!';
  } else {
    document.getElementById('message').innerText = 'Push!';
  }
  gameOver = true;
}
