const data = [
  {
    word: "instagram",
    hint: "It's a popular social media platform where you can post photos.",
  },
  { word: "apple", hint: "A type of fruit that is also a phone brand." },
  {
    word: "harry",
    hint: "A famous wizard with a lightning bolt scar on his forehead.",
  },
  { word: "russia", hint: "The largest country in the world by area." },
  { word: "blue", hint: "A color of the sky on a clear day." },
  {
    word: "basketball",
    hint: "A sport involving a ball that is played with hands, often in a gym.",
  },
  { word: "lake", hint: "A large body of water, smaller than an ocean." },
  { word: "rabbit", hint: "A type of animal that hops and has long ears." },
  { word: "fall", hint: "A season between summer and winter." },
  {
    word: "bagel",
    hint: "A type of bread that is often toasted for breakfast.",
  },
  {
    word: "python",
    hint: "A popular programming language known for its simplicity.",
  },
  {
    word: "amazon",
    hint: "A large online marketplace and a river in South America.",
  },
  {
    word: "guitar",
    hint: "A string instrument often used in rock and pop music.",
  },
  { word: "lion", hint: "The king of the jungle." },
  { word: "carrot", hint: "A crunchy orange vegetable." },
  { word: "desert", hint: "A hot, dry place with lots of sand." },
  { word: "pizza", hint: "A popular Italian dish with cheese and toppings." },
  { word: "monkey", hint: "An animal that loves bananas and climbs trees." },
  { word: "chess", hint: "A board game of strategy with kings and queens." },
  { word: "earth", hint: "The planet we live on." },
  { word: "pencil", hint: "A tool used for writing or drawing." },
  { word: "ocean", hint: "A vast body of saltwater covering most of Earth." },
  { word: "paris", hint: "The capital of France, known for the Eiffel Tower." },
  {
    word: "coffee",
    hint: "A popular beverage that wakes you up in the morning.",
  },
  {
    word: "sunflower",
    hint: "A tall plant with yellow petals and edible seeds.",
  },
  { word: "train", hint: "A form of transportation that runs on tracks." },
  { word: "spider", hint: "An eight-legged creature that spins webs." },
  {
    word: "castle",
    hint: "A large, historic building often associated with royalty.",
  },
  { word: "jupiter", hint: "The largest planet in our solar system." },
  { word: "wallet", hint: "A small case used to carry money and cards." },
  { word: "mountain", hint: "A large natural elevation of Earth's surface." },
  { word: "tiger", hint: "A big cat with orange and black stripes." },
  { word: "butterfly", hint: "An insect with colorful wings that flutters." },
  { word: "cloud", hint: "A fluffy white formation in the sky." },
  { word: "laptop", hint: "A portable computer." },
  { word: "garden", hint: "A place where plants and flowers are grown." },
  { word: "rocket", hint: "A vehicle used for space travel." },
  { word: "banana", hint: "A yellow fruit that monkeys love." },
  { word: "volcano", hint: "A mountain that erupts with lava." },
  { word: "bridge", hint: "A structure built to span a gap or river." },
  { word: "forest", hint: "A large area covered with trees." },
  { word: "peacock", hint: "A bird with vibrant, colorful feathers." },
  { word: "clock", hint: "A device used to tell time." },
  { word: "camel", hint: "A desert animal with a hump on its back." },
  { word: "island", hint: "A piece of land surrounded by water." },
  { word: "glasses", hint: "An accessory used to improve vision." },
  { word: "chocolate", hint: "A sweet treat made from cocoa." },
  { word: "flower", hint: "A colorful part of a plant, often fragrant." },
  { word: "robot", hint: "A machine designed to perform tasks." },
  { word: "snow", hint: "Frozen water that falls in winter." },
];
const gameModal = document.querySelector(".game-modal");
const theHint = document.querySelector("#hint-span");
const next = document.querySelector("#next");
const answer = document.querySelector(".answer");
const guessTotal = document.querySelector(".guesses #total");
const guessNumber = document.querySelector(".guesses #left");
const keyboard = document.querySelector(".keyboard");
const allButtons = document.querySelectorAll(".keyboard .key");
const scoreContainer = document.querySelector("#score");
let imageIndex = 0;
let guessCounter = 6;
let guessedCorrectly = 0;
let currentWord = "";
let currentHint = "";
let score = 0;

function handleDisplayWords() {
  const randomIndex = Math.floor(Math.random() * data.length);
  currentWord = data[randomIndex].word;
  currentHint = `Hint: ${data[randomIndex].hint}`;
  guessCounter = 6;
  guessedCorrectly = 0;
  imageIndex = 0;
  guessNumber.innerText = guessCounter;
  guessTotal.innerText = 6;
  theHint.innerText = currentHint;
  console.log(currentWord);
  handleAnswer(currentWord);
  updateHangmanImage();
}

function handleAnswer(word) {
  answer.innerHTML = "";
  word.split("").forEach((letter) => {
    let wordDiv = document.createElement("div");
    wordDiv.classList.add("answer-item");
    wordDiv.dataset.letter = letter;
    wordDiv.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    answer.appendChild(wordDiv);
  });

  allButtons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("disabled");
    btn.removeEventListener("click", handleKeyPress);
    btn.addEventListener("click", handleKeyPress);
  });
}

function handleKeyPress(e) {
  const btn = e.target;
  const letter = btn.value;
  btn.disabled = true;
  btn.classList.add("disabled");
  let correctGuess = false;
  document.querySelectorAll(".answer-item").forEach((wordDiv) => {
    if (wordDiv.dataset.letter === letter) {
      wordDiv.innerHTML = letter;
      guessedCorrectly++;
      correctGuess = true;
    }
  });

  if (!correctGuess) {
    guessCounter--;
    imageIndex++;
    guessNumber.innerText = guessCounter;
    updateHangmanImage();
  }
  if (guessedCorrectly === currentWord.length) {
    score += 10;
    scoreContainer.innerText = score;
    setTimeout(() => {
      handleDisplayWords();
    }, 1000);
  } else if (guessCounter === 0) {
    guessCounter = 6;
    gameOver();
  }
}

function updateHangmanImage() {
  const hangmanContainer = document.getElementById("hangmanSvg");
  hangmanContainer.innerHTML = `<img src="./images/hangman-${imageIndex}.svg">`;
}

function gameOver() {
  setTimeout(() => {
    const modalText = "The correct word was:";
    gameModal.querySelector("img").src = "images/lost.gif";
    gameModal.querySelector("h4").innerText = "Game Over!";
    gameModal.querySelector("#score").innerText = `You score was : ${score}`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
}

const playAgain = document
  .querySelector(".play-again")
  .addEventListener("click", () => {
    location.reload();
  });

handleDisplayWords();

// disable right click
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
