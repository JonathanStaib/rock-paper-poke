/* GLOBALS */

const fire = ['004', '005', '006', '037', '038', '058', '069', '077'];
const ice = ['087', '091', '124', '131', '144', '215', '220', '221'];
const electric = ['025', '026', '081', '082', '100', '101', '125', '135'];
const ground = ['027', '028', '031', '034', '050', '051', '074', '075'];
const grass = ['001', '002', '003', '043', '044', '045', '046', '047'];

const types = {
  fire: fire,
  ice: ice,
  electric: electric,
  ground: ground,
  grass: grass,
};

/* CONSTRUCTORS */

/* DOM MANIPULATION */
let div = document.querySelector('#opponents');

/* UTILITY FUNCTIONS */

function randomPokemon(element) {
  return Math.floor(Math.random() * element.length);
}

/* GAME FUNCTIONS */

function pickRandomType() {
  let elementNames = Object.keys(types);
  let pickAnElement = elementNames[randomPokemon(elementNames)];
  let pickApokemon = types[pickAnElement][randomPokemon(pickAnElement)];
  return [pickApokemon, pickAnElement];
}

function renderRandom() {
  let img = document.createElement('img');
  let pokemon = pickRandomType();
  img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon[0]}.png`;
  img.className = 'exists';
  div.appendChild(img);
  return pokemon[1];
}

function removePreviousImg() {
  let checkForImage = document.querySelector('.exists');
  if (checkForImage?.src) {
    checkForImage.remove();
  }
}
