'use strict';
/* GLOBALS */
let pokemonNames = [];
let pokemonSpotted = [];
let wins = {
  fire: 0,
  ice: 0,
  electric: 0,
  ground: 0,
  grass: 0,
};

let losses = {
  fireL: 0,
  iceL: 0,
  electricL: 0,
  groundL: 0,
  grassL: 0,
};

/* REASSIGN GLOBALS IF LOCAL STORAGE EXISTS */

if (localStorage.pokemonSpotted) {
  pokemonSpotted = JSON.parse(localStorage.getItem('pokemonSpotted'));
}

if (localStorage.wins) {
  wins = JSON.parse(localStorage.getItem('wins'));
}

if (localStorage.losses) {
  losses = JSON.parse(localStorage.getItem('losses'));
}

/* These Arrays are used to reference the Pokemon images on pokemon.com */
const fire = ['004', '005', '006', '037', '038', '058', '069', '077'];
const ice = ['087', '091', '124', '131', '144', '215', '220', '221'];
const electric = ['025', '026', '081', '082', '100', '101', '125', '135'];
const ground = ['027', '028', '031', '034', '050', '051', '074', '075'];
const grass = ['001', '002', '003', '043', '044', '045', '046', '047'];
let computersType; // Type of the Pokemon that the computer is going to send to battle
/* This object is used to reference the globals above, and have a string name to
reference later in conditionals such. Example: if('fire' === types.keyName) */
const types = {
  fire: fire,
  ice: ice,
  electric: electric,
  ground: ground,
  grass: grass,
};

/* CONSTRUCTORS */

const PlayerDeck = function () {
  this.fire = ['004', 'Charmander'];
  this.ice = ['087', 'Dewgong'];
  this.electric = ['025', 'Pikachu'];
  this.ground = ['027', 'Sandshrew'];
  this.grass = ['001', 'Bulbasaur'];
};

/* CREATING NEW PLAYER HAND */
const playersHand = new PlayerDeck();

/* PROTOTYPE METHODS */

PlayerDeck.prototype.newHand = function () {
  let typesByElement = Object.keys(types); // referencing the object called types on line 44 for key names as a string
  for (let elementFromTypesObject of typesByElement) {
    pickRandomType(elementFromTypesObject); // insert the keyname (as a string) into the pickRandomType function
  }
};

/* DOM MANIPULATION */
let userchoice = document.querySelector('#user-choice');
let computer = document.querySelector('#computer');
let imgOne = document.querySelector('#imgOne');
let imgTwo = document.querySelector('#imgTwo');
let imgThree = document.querySelector('#imgThree');
let imgFour = document.querySelector('#imgFour');
let imgFive = document.querySelector('#imgFive');
let button = document.querySelector('button');
let messageBox = document.querySelector('#message-box>p');
let messageBoxParent = document.querySelector('#message-box');
let fireName = document.querySelector('#fire');
let groundName = document.querySelector('#ground');
let grassName = document.querySelector('#grass');
let electricName = document.querySelector('#electric');
let iceName = document.querySelector('#ice');
let opponentName = document.querySelector('#opponent-name');

/* UTILITY FUNCTIONS */

function randomPokemon(element) {
  // element is referring to the arrays on lines 36/40
  return Math.floor(Math.random() * element.length);
}
function storeToLocal() {
  let uniquePokemonNames = [];
  let uniquePokemonUrls = [];
  // the flat method grabs all arrays nested inside an array and turns them into 1 big array
  let uniquePokemonFlat = [...new Set(pokemonSpotted.flat())]; // remove duplicates from array
  for (let i = 1; i < uniquePokemonFlat.length; i += 2) {
    // starting at index 1, grab all odd indexs and push into names
    uniquePokemonNames.push(uniquePokemonFlat[i]);
  }

  for (let i = 0; i < uniquePokemonFlat.length; i += 2) {
    // start at index 0 and grab all even indexes
    uniquePokemonUrls.push(uniquePokemonFlat[i]);
  }

  /* Grab all data for the pokedex and place it in local storage */
  localStorage.setItem(
    'pokemonSpottedNames',
    JSON.stringify(uniquePokemonNames)
  );
  localStorage.setItem('pokemonSpottedUrls', JSON.stringify(uniquePokemonUrls));
  localStorage.setItem('wins', JSON.stringify(wins));
  localStorage.setItem('losses', JSON.stringify(losses));
}

/* GAME FUNCTIONS */

/* This function uses the random number function (named nandomPokemon)
it grabs a random number based on Array size, and returns the number
that matches a pokemon on pokemon.com and adds it to the players hand object */
function pickRandomType(typeOfElement = 'all') {
  let elementNames = Object.keys(types);
  if (typeOfElement === 'all') {
    let pickAnElement = elementNames[randomPokemon(elementNames)];
    let pickApokemon = types[pickAnElement][randomPokemon(pickAnElement)];
    return [pickApokemon, pickAnElement];
    // if no element is specified, the function runs lines 106-110

    /* The rest of this function creates the players
pokemon using a random pokemon of each type */
  } else if (typeOfElement === 'fire') {
    playersHand.fire[0] = types['fire'][randomPokemon(fire)];
    return [playersHand.fire[0], 'fire']; //add fire type pokemon to playersHand
  } else if (typeOfElement === 'ice') {
    playersHand.ice[0] = types['ice'][randomPokemon(ice)];
    return [playersHand.ice[0], 'ice']; //add ice type pokemon to playersHand
  } else if (typeOfElement === 'electric') {
    playersHand.electric[0] = types['electric'][randomPokemon(electric)];
    return [playersHand.electric[0], 'electric']; //add electric type pokemon to playersHand
  } else if (typeOfElement === 'ground') {
    playersHand.ground[0] = types['ground'][randomPokemon(ground)];
    return [playersHand.ground[0], 'ground']; //add ground type pokemon to playersHand
  } else if (typeOfElement === 'grass') {
    playersHand.grass[0] = types['grass'][randomPokemon(grass)];
    return [playersHand.grass[0], 'grass']; //add grass type pokemon to playersHand
  }
}

/* This function renders a random image for the computer to battle
agaisnt the player*/
function renderRandom(usersChoice) {
  let pokemon = pickRandomType();
  /* The while loop ensures there is never a draw by generating a new pokemon until
  its not of the same type that the player is using. */
  while (pokemon[1] === usersChoice) {
    pokemon = pickRandomType(); // This is where the computer grabs a random pokemon
  }
  /* Lines 143 - 145 will manipulate the img element that contains the computers pokemon */
  opponentName.classList.add('invisable');
  computer.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon[0]}.png`;
  computer.alt = pokemon[1]; // used to compair agaisnt the users choice (stores the element)
  computer.value = pokemon[0]; // used to reference to name in the pokedex file later (stores the number)
  fetch('pokedex.json')
    .then((response) => response.json())
    .then(
      (data) =>
        (opponentName.innerText = data[+computer.value - 1].name.english) // setting name of opponent to DOM
    );
  return pokemon[1]; // returns the element (fire, ice ect..) the computers pokemon is using to compair agaisnt the player
}
/* This function will search the pokedex file for the opponents pokemon's name
It will store the name in a varable called computersName */
function getOpponentName() {
  let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${computer.value}.png`;
  fetch('pokedex.json')
    .then((response) => response.json())
    .then(
      (data) =>
        pokemonSpotted.push([url, data[+computer.value - 1].name.english]) // pushing the name into an array for local storage later
    );
}
/* This Function renders 5 images based on numbers stored in PlayerHand Object */
function renderPlayerRandom() {
  // playersHand.newHand(); // grab data from the playerHand object to render images
  imgOne.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.fire[0]}.png`;
  imgOne.alt = Object.keys(types)[0];
  imgTwo.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.ice[0]}.png`;
  imgTwo.alt = Object.keys(types)[1];

  imgThree.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.electric[0]}.png`;
  imgThree.alt = Object.keys(types)[2];

  imgFour.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.ground[0]}.png`;
  imgFour.alt = Object.keys(types)[3];

  imgFive.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.grass[0]}.png`;
  imgFive.alt = Object.keys(types)[4];
}
function updateNames() {
  if (pokemonNames.length > 1) {
    fireName.innerText = pokemonNames[0]; // change name of pokemon under image
    iceName.innerText = pokemonNames[1]; // change name of pokemon under image
    electricName.innerText = pokemonNames[2]; // change name of pokemon under image
    groundName.innerText = pokemonNames[3]; // change name of pokemon under image
    grassName.innerText = pokemonNames[4]; // change name of pokemon under image
    pokemonNames = [];
  }
}

function showOrHideCard() {
  /* This function will display the back of a card, or hide the image of the back of a card
  if its already being displayed, like a toggle. */
  let cardBack = document.querySelector('.opponents-inner>figure>img');
  if (!cardBack.classList.contains('hidden')) {
    cardBack.classList.add('hidden');
    computer.classList.remove('hidden');
    opponentName.classList.remove('invisable');
    messageBoxParent.classList.remove('invisable');
  } else {
    computer.classList.add('hidden');
    opponentName.classList.add('invisable');
    messageBoxParent.classList.add('invisable');

    cardBack.classList.remove('hidden');
  }
}

function playerWins(usersChoice) {
  messageBox.innerHTML = `You won with ${usersChoice} type!`;
  wins[usersChoice]++;
}

function playerLoss(usersChoice) {
  messageBox.innerHTML = `You lost with ${usersChoice} type!`;
  losses[usersChoice + 'L']++;
}
/* This function compairs the players choice of pokemon to the computers to
see which element will win, reference the flowchart in the README.md to see
which element beats which */
function winChecker(usersChoice) {
  computersType = computer.alt; //set computer type to whats stored in the pokemon img alt
  switch (computersType) {
    case 'fire':
      if (usersChoice === 'ground' || usersChoice === 'electric') {
        playerWins(usersChoice);
      } else {
        playerLoss(usersChoice);
      }
      break;

    case 'ground':
      if (usersChoice === 'ice' || usersChoice === 'grass') {
        playerWins(usersChoice);
      } else {
        playerLoss(usersChoice);
      }
      break;
    case 'grass':
      if (usersChoice === 'fire' || usersChoice === 'ice') {
        playerWins(usersChoice);
      } else {
        playerLoss(usersChoice);
      }
      break;

    case 'electric':
      if (usersChoice === 'grass' || usersChoice === 'ground') {
        playerWins(usersChoice);
      } else {
        playerLoss(usersChoice);
      }
      break;
    case 'ice':
      if (usersChoice === 'electric' || usersChoice === 'fire') {
        playerWins(usersChoice);
      } else {
        playerLoss(usersChoice);
      }
      break;
    default:
      console.log('error');
  }
}

function updateNamesInObject() {
  let elementsAll = Object.keys(playersHand);
  for (let i = 0; i < elementsAll.length; i++) {
    fetch('pokedex.json')
      .then((response) => response.json())
      .then(
        (data) =>
          pokemonNames.push(
            data[+playersHand[elementsAll[i]][0] - 1].name.english
          ),
        updateNames()
      );
  }
}

/* EVENT HANDLER FUNCTIONS */

/* This function will fire after a click event on the play again button
it will push to localStorage, hide the pokemon from previous round, give the player 5 new
pokemon, turn the button invisable, and remove the event listener from button
It will add the event listener back on the 5 user pokemon */
function newGameButton() {
  storeToLocal();
  showOrHideCard();
  renderPlayerRandom();
  messageBox.innerText = '';
  button.classList.add('invisable');
  button.removeEventListener('click', newGameButton);
  userchoice.addEventListener('click', playersChoice);
  updateNames();
}

/* This event handler will fire when a player chooses a pokemon and clicks
It will render the computers pokemon, and hide the pokeball image
It will remove the event listener from the users pokemon, the user cant
click another pokemon until they reset with the new game button
The new game button becomes visable and gains an event listener */
function playersChoice(e) {
  renderRandom(e.target.alt);
  showOrHideCard();

  winChecker(e.target.alt);
  getOpponentName();
  playersHand.newHand();
  userchoice.removeEventListener('click', playersChoice);
  button.classList.remove('invisable');
  button.addEventListener('click', newGameButton);
  updateNamesInObject();
}

/* EVENT LISTENER METHODS */
userchoice.addEventListener('click', playersChoice);
/* Renders 5 random pokemon for the user on load. */
renderPlayerRandom();
updateNames();
