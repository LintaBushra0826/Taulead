import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { CardContainer, ChartWrapper } from "./index.styled";
import { Card, Space } from "antd";

const RawMaterialChart = ({ extractedProcessRecords }) => {
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  useEffect(() => {
    const dataset = [];
    const uniqueColors = {};
    const colors = ["#061161", "#F3904F", "#2a0845", "#F3B664", "#001B79"];
    let colorIndex = 0;

    Object.values(extractedProcessRecords).forEach((item) => {
      const itemName = item.itemName || "";
      const itemUnit = item.itemUnit || "";

      if (
        Array.isArray(item.processRecords) &&
        item.processRecords.length > 0
      ) {
        item.processRecords.forEach((recordItem) => {
          const processId = recordItem.processId.toUpperCase();

          const key = `${itemName}-${itemUnit}-${processId}`;

          if (!uniqueColors[key]) {
            if (colorIndex >= colors.length) {
              colorIndex = 0;
            }
            uniqueColors[key] = colors[colorIndex++];
          }

          const processRecord = {
            ItemName: itemName,
            ItemUnit: itemUnit,
            ProcessId: processId,
            UsedQuan: recordItem.usedQuan || "N/A",
            ProcessName: recordItem.processName,
            backgroundColor: uniqueColors[key],
          };
          dataset.push(processRecord);
        });
      } else {
        console.log(
          "Invalid structure: item.processRecords is missing or empty."
        );
      }
    });

    const labels = Array.from(
      new Set(dataset.map((item) => `${item.ProcessId} - ${item.ProcessName}`))
    );

    const uniqueItems = Array.from(
      new Set(dataset.map((item) => `${item.ItemName} (${item.ItemUnit})`))
    );

    const datasets = labels.map((processIdWithName) => {
      const [processId, processName] = processIdWithName.split(" - ");
      const data = dataset
        .filter(
          (item) =>
            item.ProcessId === processId && item.ProcessName === processName
        )
        .map((record) => ({
          itemName: `${record.ItemName} (${record.ItemUnit})`,
          usedQuan: record.UsedQuan !== "N/A" ? record.UsedQuan : 0,
        }));

      const dataForChart = uniqueItems.map((item) => {
        const found = data.find((d) => d.itemName === item);
        return {
          itemName: item,
          usedQuan: found ? found.usedQuan : 0,
        };
      });

      return {
        label: processIdWithName,
        data: dataForChart.map((dataItem) => dataItem.usedQuan),
        backgroundColor: dataset.find(
          (item) =>
            item.ProcessId === processId && item.ProcessName === processName
        ).backgroundColor,
      };
    });

    const chartData = {
      labels: uniqueItems,
      datasets: datasets,
    };

    console.log("chartData:", chartData);

    const maxUsedQuan = Math.max(
      ...dataset.map((record) =>
        record.UsedQuan !== "N/A" ? record.UsedQuan : 0
      )
    );

    destroyChart();

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: maxUsedQuan,
        },
      },
      indexAxis: "x",
      elements: {
        bar: {
          borderWidth: 1,
          barThickness: 3,
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: options,
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [extractedProcessRecords]);

  return (
    <CardContainer>
      <Card
        title="Resource Inventory Bar Chart"
        style={{
          width: "100%",
          height: "50%",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "2px",
        }}
      >
        <ChartWrapper>
          <canvas ref={chartRef} width={900} height={200} />
        </ChartWrapper>
        <br />
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
  );
};

export default RawMaterialChart;
