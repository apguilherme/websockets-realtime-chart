import React, { useEffect, useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const ChartRealTime = () => {

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('current-items', (data) => {
      generateChart(data.list.items);
    })
    return () => socket.off('current-items')
  }, [socket])

  const generateChart = (items = []) => {
    let chartStatus = Chart.getChart("chart"); // <canvas> id
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    const ctx = document.getElementById('chart');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: items.map(item => item.name),
        datasets: [{
          label: 'value',
          data: items.map(item => item.value),
          borderWidth: 1
        }]
      },
      options: {
        animations: false,
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  return (
    <canvas id='chart' height="50px"></canvas>
  )
}
