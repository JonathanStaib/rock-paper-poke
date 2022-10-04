/* GLOBALS */

/* These Arrays are used to reference the Pokemon images on pokemon.com */
const fire = ['004', '005', '006', '037', '038', '058', '069', '077'];
const ice = ['087', '091', '124', '131', '144', '215', '220', '221'];
const electric = ['025', '026', '081', '082', '100', '101', '125', '135'];
const ground = ['027', '028', '031', '034', '050', '051', '074', '075'];
const grass = ['001', '002', '003', '043', '044', '045', '046', '047'];
let computersName; // Name of the Pokemon that the computer is going to send to battle
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
  /* This function creates new data for the PlayerDeck object by assigning each element
  name to an array, the first index is the number that represents a Pokemon, 
  the second number is the name of the Pokemon (as seen above in the constructor) */
  const elementsAll = [];
  let fire = pickRandomType('fire');
  let ice = pickRandomType('ice');
  let electric = pickRandomType('electric');
  let ground = pickRandomType('ground');
  let grass = pickRandomType('grass');
  elementsAll.push(fire, ice, electric, ground, grass);
  /* The for loop iterates over each element above, then checks the pokedex.json for the name of the pokemon by
   subtracting 1 from the pokemons number to grab its index locations, it then 
   checks the .name property, and .english to grab its english name and assign it to the PlayerDeck Object  */
  for (let i = 0; i < elementsAll.length; i++) {
    fetch('pokedex.json')
      .then((response) => response.json())
      .then(
        (data) =>
          (this[elementsAll[i][1]][1] =
            data[+elementsAll[i][0] - 1].name.english)
      );
  }
};

/* DOM MANIPULATION */
let opponents = document.querySelector('#opponents');
let computer = document.querySelector('#computer');
let imgOne = document.querySelector('#imgOne');
let imgTwo = document.querySelector('#imgTwo');
let imgThree = document.querySelector('#imgThree');
let imgFour = document.querySelector('#imgFour');
let imgFive = document.querySelector('#imgFive');
/* UTILITY FUNCTIONS */

function randomPokemon(element) {
  return Math.floor(Math.random() * element.length);
}
function storeToLocal() {
  //TODO WINS AND LOSS SAVE TO LOCAL STORAGE
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
  } else if (typeOfElement === 'fire') {
    playersHand.fire[0] = types['fire'][randomPokemon(fire)];
    return [playersHand.fire[0], 'fire'];
  } else if (typeOfElement === 'ice') {
    playersHand.ice[0] = types['ice'][randomPokemon(ice)];
    return [playersHand.ice[0], 'ice'];
  } else if (typeOfElement === 'electric') {
    playersHand.electric[0] = types['electric'][randomPokemon(electric)];
    return [playersHand.electric[0], 'electric'];
  } else if (typeOfElement === 'ground') {
    playersHand.ground[0] = types['ground'][randomPokemon(ground)];
    return [playersHand.ground[0], 'ground'];
  } else if (typeOfElement === 'grass') {
    playersHand.grass[0] = types['grass'][randomPokemon(grass)];
    return [playersHand.grass[0], 'grass'];
  }
}

/* This function renders a random image for the computer to battle
agaisnt the player*/
function renderRandom() {
  let pokemon = pickRandomType();
  computer.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon[0]}.png`;
  computer.alt = pokemon[0];
  return pokemon[1];
}
/* This function will search the pokedex file for the opponents pokemon's name
It will store the name in a varable called computersName */
function getOpponentName() {
  fetch('pokedex.json')
    .then((response) => response.json())
    .then((data) => (computersName = data[+computer.alt - 1].name.english));
}
/* This Function renders 5 images based on numbers stored in PlayerHand Object */
function renderPlayerRandom() {
  playersHand.newHand(); // grab data from the playerHand object to render images
  imgOne.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.fire[0]}.png`;
  imgTwo.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.ice[0]}.png`;
  imgThree.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.electric[0]}.png`;
  imgFour.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.ground[0]}.png`;
  imgFive.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${playersHand.grass[0]}.png`;
}

function showOrHideCard() {
  /* This function will display the back of a card, or hide the image of the back of a card
  if its already being displayed, like a toggle. */
  let cardBack = document.querySelector('#opponents>figure>img');
  if (cardBack.src.endsWith('.jpg')) {
    cardBack.src = '';
  } else {
    cardBack.src = '../assets/tcg-card-back.jpg';
  }
}

function winChecker(usersChoice) {
  //TODO THIS IS WHERE THE SWITCH STATEMENT LOGIC WILL LIVE
}

/* EVENT HANDLER FUNCTIONS */
function playersChoice() {
  //TODO THIS IS WHERE THE LOGIC FOR THE PLAYERS CHOICE WILL LIVE
}

/* EVENT LISTENER METHODS */
// div.addEventListener('click', playersChoice); //! div NEEDS UPDATED VARIABLE NAME FOR ACTUAL HTML ELEMENT

renderPlayerRandom();
