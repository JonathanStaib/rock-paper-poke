'use strict';

/* GLOBALS */
let positionInPokemon = 0;
let wins = [];
let loss = [];
/* DOM SELECTORS */
let canvasElem = document.getElementById('my-chart').getContext('2d');
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let pokemonName = document.querySelector('h4');
let pokemonImg = document.querySelector('#display');

/* GRAB LOCAL STORAGE */
let retrievedPokemonName = JSON.parse(
  localStorage.getItem('pokemonSpottedNames')
);
let retrievedPokemonUrl = JSON.parse(
  localStorage.getItem('pokemonSpottedUrls')
);
if (localStorage.wins) {
  let { fire, ice, electric, ground, grass } = JSON.parse(
    localStorage.getItem('wins')
  );
  wins.push(fire, ice, electric, ground, grass);
}
if (localStorage.wins) {
  let { fireL, iceL, electricL, groundL, grassL } = JSON.parse(
    localStorage.getItem('loss')
  );
  loss.push(fireL, iceL, electricL, groundL, grassL);
}
/* CHART.JS LOGIC */

let wins = [];
wins.push(fire, ice, electric, ground, grass);
let loss = [];
loss.push(fireL, iceL, electricL, groundL, grassL);


function renderChart() {
  Chart.defaults.font.size = 13;
  Chart.defaults.color = '#000000';

  let myChartObj = {
    type: 'bar',
    data: {
      labels: ['fire', 'ice', 'electric', 'grass', 'ground'],
      datasets: [
        {
          data: wins,
          label: '# of Wins',
          backgroundColor: ['blue'],
          borderColor: ['navy'],
          borderWidth: 1,
        },
        {
          data: loss,
          label: '# of Losses',
          backgroundColor: ['red'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: 0,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(canvasElem, myChartObj, wins, loss);
}
renderChart();

/* EVENT HANDLERS */
function goNextPokemon() {
  if (positionInPokemon < retrievedPokemonName.length - 1) {
    positionInPokemon++;
  } else {
    positionInPokemon = 0;
  }
  pokemonName.innerText = retrievedPokemonName[positionInPokemon];
  pokemonImg.src = retrievedPokemonUrl[positionInPokemon];
}

function goPreviousPokemon() {
  if (positionInPokemon > 0) {
    positionInPokemon--;
  } else {
    positionInPokemon = retrievedPokemon.length - 1;
  }
  pokemonName.innerText = retrievedPokemonName[positionInPokemon];
  pokemonImg.src = retrievedPokemonUrl[positionInPokemon];
}

function loadFirstPokemon() {
  if (retrievedPokemonName?.length > 1) {
    pokemonName.innerText = retrievedPokemonName[positionInPokemon];
    pokemonImg.src = retrievedPokemonUrl[positionInPokemon];
    pokemonName.classList.remove('no-local');
    pokemonImg.classList.remove('no-local');
  }
}
/* EVENT LISTENERS */

next.addEventListener('click', () => {
  if (retrievedPokemonName) {
    goNextPokemon();
  }
});
previous.addEventListener('click', () => {
  if (retrievedPokemonName) {
    goPreviousPokemon();
  }
});

loadFirstPokemon();
