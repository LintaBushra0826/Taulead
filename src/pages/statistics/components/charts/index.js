import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CardContainer } from "./index.styled";
import { Card, Space } from "antd";

const PurpleBarChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null; // Store the chart instance

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart
    }
  };

  useEffect(() => {
    // Data for the bar chart
    const data = {
      labels: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        // "Chicken",
        // "Rice",
        // "Mango",
        // "Careem",
      ],
      datasets: [
        {
          label: "Process 1",
          data: [12, 19, 3, 5, 2, 30, 23, 14],
          backgroundColor: "#F3904F",
        },
        {
          label: "Process 2",
          data: [12, 19, 3, 5, 2, 30, 23, 14],
          backgroundColor: "#061161",
        },
      ],
    };

    // Chart configuration
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Destroy the existing chart before creating a new one
    destroyChart();

    // Create and render the new bar chart
    const ctx = chartRef.current.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });
  }, []);

  return (
    <>
      <CardContainer>
        <Card
          title="Resource Inventory Bar Chart"
          style={{
            width: "800px",
            height: "360px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "2px",
          }}
        >
          <canvas ref={chartRef} width={800} height={300} />
          <Space
            direction="vertical"
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "row",
            }}
          />
        </Card>
      </CardContainer>
    </>
  );
};

export default PurpleBarChart;
