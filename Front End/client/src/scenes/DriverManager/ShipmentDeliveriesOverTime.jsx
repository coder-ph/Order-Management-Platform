import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Labels: From June (last year) to May (this year)
const months = [
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
  'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'
];

const shipmentData = {
  labels: months,
  datasets: [
    {
      label: 'Shipments Created',
      data: [90, 100, 95, 105, 120, 115, 130, 125, 110, 140, 135, 145],
      backgroundColor: '#2196F3',
      datalabels: {
        color: 'white',
        anchor: 'end',
        align: 'top',
        font: {
          weight: 'bold',
          size: 14
        }
      }
    },
    {
      label: 'Shipments Delivered',
      data: [85, 95, 90, 100, 115, 110, 125, 120, 100, 130, 125, 140],
      backgroundColor: '#4CAF50',
      datalabels: {
        color: 'white',
        anchor: 'end',
        align: 'top',
        font: {
          weight: 'bold',
          size: 14
        }
      }
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      text: 'Shipments Created vs Delivered (Last 12 Months)',
      font: {
        size: 22,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    datalabels: {
      display: true
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 14
        }
      }
    },
    y: {
      ticks: {
        font: {
          size: 14
        },
        beginAtZero: true
      }
    }
  }
};

const ShipmentChart = () => {
  return (
    <div style={{ maxWidth: '1820px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '28px' }}>
        Shipment Performance Overview
      </h2>
      <Bar data={shipmentData} options={options} />
    </div>
  );
};

export default ShipmentChart;
