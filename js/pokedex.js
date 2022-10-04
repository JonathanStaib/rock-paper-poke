'use strict';

let canvasElem = document.getElementById('my-chart').getContext('2d');

function renderChart() {

  let types = [2];
  let wins = [5];
  let losses = [5];

  Chart.defaults.font.size = 16;
  Chart.defaults.color = "#000000";

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
          'red',
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      layout: {
        padding: 10
      },
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

let retrievedPokemon = localStorage.getItem('pokemon');

let parsedPokemon = JSON.parse(retrievedPokemon);
