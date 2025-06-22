const emojis = ['😀', '🐱', '🍕', '🎮', '🚀', '⚽', '🎲', '🌟'];
let cards = [...emojis, ...emojis]; // 8 pairs
cards = cards.sort(() => 0.5 - Math.random());

const board = document.getElementById('gameBoard');
let flippedCards = [];
let matched = [];

cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.innerText = '';
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

function flipCard(e) {
  const card = e.target;

  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matched.includes(card)) {
    card.innerText = card.dataset.emoji;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    matched.push(card1, card2);
    if (matched.length === cards.length) {
      document.getElementById('status').innerText = "🎉 You won! All pairs matched!";
    }
  } else {
    card1.innerText = '';
    card2.innerText = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}