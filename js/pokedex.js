'use strict';

/* GLOBALS */
let positionInPokemon = 0;

/* DOM SELECTORS */
let canvasElem = document.getElementById('my-chart').getContext('2d');
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let pokemonName = document.querySelector('h4');
let pokemonImg = document.querySelector('img');

/* GRAB LOCAL STORAGE */
let retrievedPokemon = JSON.parse(localStorage.getItem('pokemonSpotted'));

let {fire,ice,electric,ground,grass} = JSON.parse(localStorage.getItem('wins'));

let {fireL,iceL,electricL,groundL,grassL} = JSON.parse(localStorage.getItem('loss'));

/* CHART.JS LOGIC */
let wins = [];
wins.push(fire,ice,electric,ground,grass);
let loss = [];
loss.push(fireL,iceL,electricL,groundL,grassL);

function renderChart() {
  let testWins = [1,2,3,4,5]
  let testLosses = [1,2,3,4,5]


  Chart.defaults.font.size = 14;
  Chart.defaults.color = "#000000";


  let myChartObj = {
    type: 'bar',
    data: {

      labels: 'Wins and Losses',

      datasets: [
        {
          data: testWins,
          label: '# of Wins',
          backgroundColor: ['blue'],
          borderColor: ['navy'],
          borderWidth: 1,
        },
        {
          data: testLosses,
          label: '# of Losses',
          backgroundColor: ['red'],
          borderColor: ['black'],
          borderWidth: 1,
        },
      ],

    },
    options: {
      layout: {
        padding: 10,
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
  if (positionInPokemon < retrievedPokemon.length - 1) {
    positionInPokemon++;
  } else {
    positionInPokemon = 0;
  }
  pokemonName.innerText = retrievedPokemon[positionInPokemon][1];
  pokemonImg.src = retrievedPokemon[positionInPokemon][0];
}

function goPreviousPokemon() {
  if (positionInPokemon > 0) {
    positionInPokemon--;
  } else {
    positionInPokemon = retrievedPokemon.length - 1;
  }
  pokemonName.innerText = retrievedPokemon[positionInPokemon][1];
  pokemonImg.src = retrievedPokemon[positionInPokemon][0];
}

function loadFirstPokemon() {
  if (retrievedPokemon?.length > 1) {
    pokemonName.innerText = retrievedPokemon[positionInPokemon][1];
    pokemonImg.src = retrievedPokemon[positionInPokemon][0];
    pokemonName.classList.remove('no-local');
    pokemonImg.classList.remove('no-local');
  }
}

/* EVENT LISTENERS */

next.addEventListener('click', () => {
  if (retrievedPokemon) {
    goNextPokemon();
  }
});
previous.addEventListener('click', () => {
  if (retrievedPokemon) {
    goPreviousPokemon();
  }
});

loadFirstPokemon();
