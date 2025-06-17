"use client";
 
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartSectionProps {
  chartData: {
    labels: string[];
    data: number[];
  };
  loading: boolean;
}

export default function ChartSection({ chartData, loading }: ChartSectionProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  
  const data = {
    labels: chartData.labels.length > 0 ? chartData.labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Activities",
        data: chartData.data.length > 0 ? chartData.data : [12, 19, 13, 15, 20, 25],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        fill: chartType === "line",
        tension: 0.4
      },
    ],
  };
  
  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Activity Overview",
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Activity Overview",
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Activity Overview</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded bg-gray-200">Loading...</button>
          </div>
        </div>
        
        <div className="h-80 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Activity Overview</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${chartType === "line" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
            onClick={() => setChartType("line")}
          >
            Line
          </button>
          <button
            className={`px-3 py-1 rounded ${chartType === "bar" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
            onClick={() => setChartType("bar")}
          >
            Bar
          </button>
        </div>
      </div>
      
      <div className="h-80">
        {chartType === "line" ? (
          <Line options={lineOptions} data={data} />
        ) : (
          <Bar options={barOptions} data={data} />
        )}
      </div>
    </div>
  );
} 