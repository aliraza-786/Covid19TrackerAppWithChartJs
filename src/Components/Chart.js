import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function Chart({GData}) {
    // console.log("G",GData);
   const  data = {
        labels: ['TotalConfirmed', 'TotalRecovered', 'TotalDeaths',],
        datasets: [{
            label: '# of Votes',
            data: [GData.TotalConfirmed,GData.TotalRecovered,GData.TotalDeaths],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };
   const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    
  return (
    <>
    <Doughnut data={data}/>
    </>
  );
}
