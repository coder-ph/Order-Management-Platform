import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';
import dayjs from 'dayjs';
import DasshboardHeader from '../../Components/DasshboardHeader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
// } from 'recharts';


export default function InventoryAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [revenueView, setRevenueView] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [filteredData, setFilteredData] = useState([]);
const [selectedFilter, setSelectedFilter] = useState('year');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const [inventoryRes, movementRes, productRes, ordersRes, orderItemsRes] = await Promise.all([
          axios.get('https://eci-jsons-myf8.vercel.app/inventory'),
          axios.get('https://eci-jsons-myf8.vercel.app/inventory_movements'),
          axios.get('https://eci-jsons-myf8.vercel.app/products'),
          axios.get('https://eci-jsons-myf8.vercel.app/orders'),
          axios.get('https://eci-jsons-myf8.vercel.app/order_items')
        ]);

        const inventory = inventoryRes.data;
        const movements = movementRes.data;
        const products = productRes.data;
        const orders = ordersRes.data;
        const order_items = orderItemsRes.data;

        const unmatched = inventory.filter(item =>
          !products.some(p => p.product_id === item.product_id)
        );
        console.log('Unmatched products:', unmatched);
        

        // Stock Levels
        const stockLevels = { Critical: 0, Low: 0, Normal: 0 };
        inventory.forEach(item => {
          const available = item.quantity_on_hand - item.quantity_allocated;
          if (available <= 50) stockLevels.Critical++;
          else if (available <= 100) stockLevels.Low++;
          else stockLevels.Normal++;
        });

        // Stock level grouping per product for bar chart
        const stockBarData = inventory.map(item => {
          const product = products.find(p => p.product_id === item.product_id);
          const available = item.quantity_on_hand - item.quantity_allocated;

          return {
            name: product?.name || 'Unknown',
            onHand: item.quantity_on_hand,
            allocated: item.quantity_allocated,
            available
          };
        });


        // Movement Trend - past 30 days
        const now = dayjs();
        const last30Days = Array.from({ length: 30 }, (_, i) =>
          now.subtract(29 - i, 'day').format('YYYY-MM-DD')
        );

        const inbound = {};
        const outbound = {};
        last30Days.forEach(date => {
          inbound[date] = 0;
          outbound[date] = 0;
        });

        movements.forEach(m => {
          const date = dayjs(m.movement_date).format('YYYY-MM-DD');
          if (last30Days.includes(date)) {
            if (m.movement_type === 'receipt') inbound[date] += m.quantity;
            if (m.movement_type === 'shipment') outbound[date] += m.quantity;
          }
        });

        // Fastest Moving Products
        const productMovementMap = {};
        movements.forEach(m => {
          if (m.movement_type === 'shipment') {
            productMovementMap[m.product_id] = (productMovementMap[m.product_id] || 0) + m.quantity;
          }
        });

        const fastestMoving = Object.entries(productMovementMap)
          .map(([productId, total_moved]) => {
            const product = products.find(p => p.product_id === productId);
            return {
              name: product?.name || 'Unknown',
              total_moved
            };
          })
          .sort((a, b) => b.total_moved - a.total_moved)
          .slice(0, 5);

        // Inventory Turnover Rate (simplified)
        const totalIssues = Object.values(productMovementMap).reduce((sum, qty) => sum + qty, 0);
        const avgInventory = inventory.reduce((sum, item) => sum + item.quantity_on_hand, 0) / inventory.length;
        const inventoryTurnoverRate = avgInventory ? (totalIssues / avgInventory).toFixed(2) : '0.00';

        // 1. Map product values
        const productValueMap = {};
        products.forEach(p => {
          productValueMap[p.product_id] = p.value || 0; // per-unit value
        });

        // 2. Filter confirmed or delivered orders
        const fulfilledOrderIds = orders
          .filter(order => order.status === 'CONFIRMED' || order.status === 'DELIVERED')
          .map(order => order.order_id);

        // 3. Calculate total outbound value (COGS-like)
        let totalOutboundValue = 0;
        order_items.forEach(item => {
          if (fulfilledOrderIds.includes(item.order_id)) {
            const unitValue = productValueMap[item.product_id] || 0;
            totalOutboundValue += item.quantity * unitValue;
          }
        });

        // 4. Calculate average inventory value
        let totalInventoryValue = 0;
        let inventoryCount = 0;
        inventory.forEach(item => {
          const unitValue = productValueMap[item.product_id] || 0;
          totalInventoryValue += item.quantity_on_hand * unitValue;
          inventoryCount++;
        });

        const avgInventoryValue = inventoryCount > 0 ? totalInventoryValue / inventoryCount : 0;

        // 5. Final Inventory Turnover Rate (value-based)
        const inventoryTurnoverValueRate = avgInventoryValue > 0
          ? (totalOutboundValue / avgInventoryValue).toFixed(2)
          : '0.00';
        

        // Prepare breakdown maps
        const revenueByDay = {};
        const revenueByMonth = {};
        const revenueByYear = {};

        const productPriceMap = {};
          products.forEach(p => {
          productPriceMap[p.product_id] = p.value || 0; // Assuming 'price' is the correct field
        });


        orders.forEach(order => {
          if (fulfilledOrderIds.includes(order.order_id)) {
            const day = dayjs(order.order_date).format('YYYY-MM-DD');
            const month = dayjs(order.order_date).format('YYYY-MM');
            const year = dayjs(order.order_date).format('YYYY');

            let orderRevenue = 0;

            order_items
              .filter(item => item.order_id === order.order_id)
              .forEach(item => {
                const unitPrice = productPriceMap[item.product_id] || 0;
                orderRevenue += item.quantity * unitPrice;
              });

            revenueByDay[day] = (revenueByDay[day] || 0) + orderRevenue;
            revenueByMonth[month] = (revenueByMonth[month] || 0) + orderRevenue;
            revenueByYear[year] = (revenueByYear[year] || 0) + orderRevenue;
          }
        });
  
          

        setAnalytics({
          stock_levels: stockLevels,
          movement_trend: { inbound, outbound },
          fastest_moving_products: fastestMoving,
          inventory_turnover_rate: inventoryTurnoverRate, 
  
          stock_bar_chart: stockBarData,
          movement_trend: { inbound, outbound },
          fastest_moving_products: fastestMoving,
          inventory_turnover_rate: inventoryTurnoverRate,
          inventory_turnover_value_rate: inventoryTurnoverValueRate,

          revenue_breakdown: {
            daily: revenueByDay,
            monthly: revenueByMonth,
            yearly: revenueByYear
          }
        });
        setLoading(false)

      } catch (err) {
        console.error('Error loading analytics:', err);
        setError("Failed to load analytics data")
        setLoading(false)
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading analytics...</p>;

  if (error) return <p className='text-center text-red-500'>{error}</p>

  
  const stockLevelsChart = {
    labels: ['Critical', 'Low', 'Normal'],
    datasets: [
      {
        label: 'Stock Levels',
        data: [
          analytics.stock_levels.Critical,
          analytics.stock_levels.Low,
          analytics.stock_levels.Normal
        ],
        backgroundColor: ['#dc2626', '#facc15', '#16a34a']
      }
    ]
  };

  const movementDates = Object.keys(analytics.movement_trend.inbound);
  const inboundData = movementDates.map(date => analytics.movement_trend.inbound[date]);
  const outboundData = movementDates.map(date => analytics.movement_trend.outbound[date]);

  const movementChart = {
    labels: movementDates,
    datasets: [
      {
        label: 'Inbound',
        data: inboundData,
        borderColor: '#3b82f6',
        fill: false
      },
      {
        label: 'Outbound',
        data: outboundData,
        borderColor: '#ef4444',
        fill: false
      }
    ]
  };

  const fastMoverChart = {
    labels: analytics.fastest_moving_products.map(p => p.name),
    datasets: [
      {
        label: 'Top Movers (Quantity)',
        data: analytics.fastest_moving_products.map(p => p.total_moved),
        backgroundColor: '#10b981'
      }
    ]
  };

  const stockGroupedBarChart = {
    labels: analytics.stock_bar_chart.map(item => item.name),
    datasets: [
      {
        label: 'On Hand',
        data: analytics.stock_bar_chart.map(item => item.onHand),
        backgroundColor: '#3b82f6'
      },
      {
        label: 'Allocated',
        data: analytics.stock_bar_chart.map(item => item.allocated),
        backgroundColor: '#f59e0b'
      },
      {
        label: 'Available',
        data: analytics.stock_bar_chart.map(item => item.available),
        backgroundColor: '#10b981'
      }
    ]
  };

  const revenueData = analytics.revenue_breakdown[revenueView];
  const revenueLabels = Object.keys(revenueData).sort();  // sort by date
  const revenueValues = revenueLabels.map(label => revenueData[label]);

  const revenueChartData = {
    labels: revenueLabels,
    datasets: [
      {
        label: `Revenue (${revenueView})`,
        data: revenueValues,
        fill: false,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.3
      }
    ]
  };

  
    // const groupRevenueData = (data, filterType) => {
    //   const grouped = {};

    //   data.forEach(item => {
    //     const date = dayjs(item.date); // assuming item.date is in ISO or Date string format

    //     const key = filterType === 'year'
    //       ? date.format('MMM') // e.g., 'Jan'
    //       : date.format('D MMM'); // e.g., '5 May'

    //     if (!grouped[key]) {
    //       grouped[key] = { label: key, revenue: 0 };
    //     }

    //     grouped[key].revenue += item.revenue;
    //   });

    //   // Return the grouped values sorted chronologically
    //   return Object.values(grouped).sort((a, b) =>
    //     dayjs(a.label, filterType === 'year' ? 'MMM' : 'D MMM')
    //       .toDate() - dayjs(b.label, filterType === 'year' ? 'MMM' : 'D MMM').toDate()
    //   );
    // };


  

  return (
    <div className='flex flex-col p-12 m-10'>
      <DasshboardHeader title="COMPANY ANALYTICS" subtitle="Inventory Overview" />
      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow p-12">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">Stock Level Overview</h2>
          <Doughnut data={stockLevelsChart} />
        </div>

        <div className="bg-white rounded-2xl shadow p-12">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">Inbound vs Outbound (Last 30 Days)</h2>
          <Line data={movementChart} />
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">Top 5 Fastest Moving Products</h2>
          <Bar data={fastMoverChart} />
        </div>

        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Inventory Turnover Rate</h2>
          <p className="text-4xl text-blue-600 font-bold text-center">{analytics.inventory_turnover_rate}</p>
          <p className="text-sm text-gray-500 text-center">This Month</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 col-span-2">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">Stock Levels by Product</h2>
          <Bar
            data={stockGroupedBarChart}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: false }
              },
              scales: {
                x: { stacked: false },
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Inventory Turnover Rate (Value-Based)</h2>
          <p className="text-4xl font-bold text-indigo-600">{analytics.inventory_turnover_value_rate}</p>
          <p className="text-sm text-gray-500">Based on fulfilled orders and inventory value</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center bg-white p-4 rounded mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Trends</h2>
            <select
              value={revenueView}
              onChange={e => setRevenueView(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-800"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>          
          <Line
            data={revenueChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: false }
              },
              scales: {
                x: { ticks: { autoSkip: true, maxTicksLimit: 12 } },
                y: { beginAtZero: true }
              }
            }}
          />
        </div>
      </div>
    </div>  
  );
}

