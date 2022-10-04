'use strict';

let canvasElem = document.getElementById('my-chart').getContext('2d');

function renderChart() {

  let types = [];
  let wins = [];
  let losses = [];

  let myChartObj = {
    type: 'bar',
    data: {

      labels: types,
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
        data: losses,
        label: '# of Losses',
        backgroundColor: [
          'gray',
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
  new Chart(canvasElem, myChartObj);
}
renderChart();

let retreivedPokemon = localStorage.getItem('pokemon');

let parsedPokemon = JSON.parse(retreivedPokemon);
