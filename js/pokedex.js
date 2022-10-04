'use strict';

let canvasElem = document.getElementById('my-chart').getContext('2d');

let retrievedPokemon = JSON.parse(localStorage.getItem('pokemonSpotted'));

let retrievedWins = JSON.parse(localStorage.getItem('wins'));

let retrievedLosses = JSON.parse(localStorage.getItem('loss'));

let wins = [];
wins.push(retrievedWins);
let loss = [];
loss.push(retrievedLosses);

function renderChart() {

  // let types = [];

  Chart.defaults.font.size = 16;
  Chart.defaults.size= 10;

  let myChartObj = {
    type: 'bar',
    data: {

      labels: 'Wins and Losses',
      datasets: [{
        data: wins,
        label: '# of Wins',
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'navy'
        ],
        borderWidth: 1

      },
      {
        data: loss,
        label: '# of Losses',
        backgroundColor: [
          'red',
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvasElem, myChartObj, wins, loss);
}
renderChart();
