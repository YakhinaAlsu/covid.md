let dayStart = document.querySelector('#dayStart');
let dayEnd = document.querySelector('#dayEnd');
let button = document.querySelector('.btn');


button.addEventListener('click', function() {
fetch('https://api.covid19tracking.narrativa.com/api/country/russia?&date_from='+dayStart.value+'&date_to='+dayEnd.value+'').then(r => r.json()).then( object => {
  console.log(object);

  let labels = Object.keys(object.dates); /// дни
  let data = [];     // заболевшие
  let death = [];     // умершие  
  let recover = [];   //выздоровевшие


  for (label of labels) {
    data.push(object.dates[label].countries['Russia'].today_new_confirmed)
  }
  for (label of labels) {
    death.push(object.dates[label].countries['Russia'].today_new_deaths)
  }
  for (label of labels) {
    recover.push(object.dates[label].countries['Russia'].today_new_recovered)
  }

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels, /*дни */
        datasets: [{
            label: 'Cтатистика по заболевшим',
            data: data,/* [5,6,7,8,9,1,5,6,4,9], /* стат днные */
            backgroundColor: [
                'white',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 2
        },{   
            label: 'Cтатистика по умершим',
            data:  death,  /* [5,6,7,8,9,1,5,6,4,9], /* стат днные */
            backgroundColor: [
                'white',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2
        },{   
            label: 'Cтатистика по выздоровевшим',
        data:  recover,  /* [5,6,7,8,9,1,5,6,4,9], /* стат днные */
        backgroundColor: [
            'white',
        ],
        borderColor: [
            'rgba(0, 255, 51, 1)',
        ],
        borderWidth: 2
    }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
})
.catch (err => alert ("Wrong data!"));
})
