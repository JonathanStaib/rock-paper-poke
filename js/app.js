/* GLOBALS */

const fire = ['004', '005', '006', '037', '038', '058', '069', '077'];
const ice = ['087', '091', '124', '131', '144', '215', '220', '221'];
const electric = ['025', '026', '081', '082', '100', '101', '125', '135'];
const ground = ['027', '028', '031', '034', '050', '051', '074', '075'];
const grass = ['001', '002', '003', '043', '044', '045', '046', '047'];
let playersPokemon = [];

const types = {
  fire: fire,
  ice: ice,
  electric: electric,
  ground: ground,
  grass: grass,
};

/* CONSTRUCTORS */

const PlayerDeck = function () {
  this.fire = '004';
  this.ice = '087';
  this.electric = '025';
  this.ground = '027';
  this.grass = '001';
};

/* PROTOTYPE METHODS */

PlayerDeck.prototype.newHand = {
  //TODO THIS WILL CREATE 5 RANDOM POKEMON IN THE PLAYERS HAND
};

PlayerDeck.prototype.getName = function () {
  //TODO THIS WILL GET THE NAME OF THE POKEMON FOR THE ACCOICATED IMAGE
};

/* DOM MANIPULATION */
let div = document.querySelector('#opponents');
div = document.querySelector('div'); //! THIS NEEDS THE VARIABLE NAME UPDATED AND SELECTOR CHANGED TO THE CORRECT ONE
const parentPlayerImgs = document.querySelectorAll('li>figure>img');
/* UTILITY FUNCTIONS */

function randomPokemon(element) {
  return Math.floor(Math.random() * element.length);
}
function storeToLocal() {
  //TODO WINS AND LOSS SAVE TO LOCAL STORAGE
}

/* GAME FUNCTIONS */

function pickRandomType(typeOfElement = 'all') {
  let elementNames = Object.keys(types);
  if (typeOfElement === 'all') {
    let pickAnElement = elementNames[randomPokemon(elementNames)];
    let pickApokemon = types[pickAnElement][randomPokemon(pickAnElement)];
    return [pickApokemon, pickAnElement];
  } else if (typeOfElement === 'fire') {
    let pickApokemon = types['fire'][randomPokemon(fire)];
    return [pickApokemon, 'fire'];
  } else if (typeOfElement === 'ice') {
    let pickApokemon = types['ice'][randomPokemon(ice)];
    return [pickApokemon, 'ice'];
  } else if (typeOfElement === 'electric') {
    let pickApokemon = types['electric'][randomPokemon(electric)];
    return [pickApokemon, 'electric'];
  } else if (typeOfElement === 'ground') {
    let pickApokemon = types['ground'][randomPokemon(ground)];
    return [pickApokemon, 'ground'];
  } else if (typeOfElement === 'grass') {
    let pickApokemon = types['grass'][randomPokemon(grass)];
    return [pickApokemon, 'grass'];
  }
}

function renderRandom() {
  let img = document.createElement('img');
  let pokemon = pickRandomType();
  img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon[0]}.png`;
  img.className = 'exists';
  opponentDiv.appendChild(img);
  return pokemon[1];
}

function renderPlayerRandom() {
  let imgOne = document.querySelector('#imgOne');
  let imgTwo = document.querySelector('#imgTwo');
  let imgThree = document.querySelector('#imgThree');
  let imgFour = document.querySelector('#imgFour');
  let imgFive = document.querySelector('#imgFive');
  let randomFire = pickRandomType('fire');
  let randomIce = pickRandomType('ice');
  let randomElectric = pickRandomType('electric');
  let randomGround = pickRandomType('ground');
  let randomGrass = pickRandomType('grass');

  playersPokemon.push(
    randomFire,
    randomIce,
    randomElectric,
    randomGround,
    randomGrass
  );
  imgOne.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomFire[0]}.png`;
  imgTwo.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomIce[0]}.png`;
  imgThree.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomElectric[0]}.png`;
  imgFour.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomGround[0]}.png`;
  imgFive.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${randomGrass[0]}.png`;
}

function removePreviousImg() {
  let checkForImage = document.querySelector('.exists');
  if (checkForImage?.src) {
    // The ? is to check for null first, otherwise it will break.
    checkForImage.remove();
    playersPokemon = []; // reset playersPokemon to empty array for next game.
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
