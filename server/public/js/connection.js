const socket = io();

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Serial"],
        datasets: [{
            label: "Serial Data from Arduino",
            backgroundColor: 'rgb(52, 73, 94)',
            borderColor: 'rgb(41, 128, 185)',
            data: [],
        }]
    },

    // Configuration options go here
    options: {}
});

let counter = 0 ;

socket.on('arduino:data', function (dataSerial) {
  // console.log(dataSerial);
  chart.data.labels.push(counter);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.value);
  });
  counter++;
  chart.update();
});
