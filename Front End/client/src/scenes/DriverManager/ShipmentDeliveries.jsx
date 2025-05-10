import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ShipmentsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Generate 10 days of dates starting from today
    const today = dayjs();
    const dates = Array.from({ length: 10 }, (_, i) =>
      today.subtract(i, 'day').format('YYYY-MM-DD')
    ).reverse();

    // Generate mock shipments and deliveries
    const mockOrders = dates.flatMap(date =>
      Array.from({ length: Math.floor(Math.random() * 5 + 1) }, (_, idx) => ({
        id: `${date}-order-${idx}`,
        created_at: date
      }))
    );

    const mockDriverPerformance = dates.map(date => ({
      date,
      deliveries: Math.floor(Math.random() * 6) + 1
    }));

    const shipmentsByDate = {};
    mockOrders.forEach(order => {
      const date = dayjs(order.created_at).format('YYYY-MM-DD');
      shipmentsByDate[date] = (shipmentsByDate[date] || 0) + 1;
    });

    const deliveriesByDate = {};
    mockDriverPerformance.forEach(entry => {
      const date = dayjs(entry.date).format('YYYY-MM-DD');
      deliveriesByDate[date] = (deliveriesByDate[date] || 0) + entry.deliveries;
    });

    const shipments = dates.map(date => shipmentsByDate[date] || 0);
    const deliveries = dates.map(date => deliveriesByDate[date] || 0);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Total Shipments',
          data: shipments,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        },
        {
          label: 'Deliveries Completed',
          data: deliveries,
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
      ]
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Shipments and Deliveries Over Last 10 Days'
      },
      legend: {
        position: 'bottom'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {chartData ? <Bar data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default ShipmentsChart;
