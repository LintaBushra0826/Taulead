import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { CardContainer, ChartWrapper } from "./index.styled";
import { Card, Space } from "antd";

const HumanResourceChart = ({ extractedHRRecords }) => {
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

    Object.values(extractedHRRecords).forEach((emp) => {
      const empName = emp.empName || "";
      const empDesgn = emp.empDesgn || "";

      if (Array.isArray(emp.empRecords) && emp.empRecords.length > 0) {
        emp.empRecords.forEach((recordItem) => {
          const processId = recordItem.processId.toUpperCase();

          const key = `${empName}-${empDesgn}-${processId}`;

          if (!uniqueColors[key]) {
            if (colorIndex >= colors.length) {
              colorIndex = 0;
            }
            uniqueColors[key] = colors[colorIndex++];
          }

          const processRecord = {
            empName: empName,
            empDesgn: empDesgn,
            ProcessId: processId,
            duration: recordItem.duration || "N/A",
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
      new Set(dataset.map((emp) => `${emp.ProcessId} - ${emp.ProcessName}`))
    );

    const uniqueEmp = Array.from(
      new Set(dataset.map((emp) => `${emp.empName} (${emp.empDesgn})`))
    );

    function parseDuration(durationString) {
      const matches = durationString.match(
        /(\d+) hour(?:s)?(?: (\d+) min(?:ute)?s?)?/
      );

      if (!matches) {
        return 0;
      }

      const hours = parseInt(matches[1], 10);
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;

      return hours + minutes / 60;
    }

    const datasets = labels.map((processIdWithName) => {
      const [processId, processName] = processIdWithName.split(" - ");
      const data = dataset
        .filter(
          (emp) =>
            emp.ProcessId === processId && emp.ProcessName === processName
        )
        .map((record) => ({
          empName: `${record.empName} (${record.empDesgn})`,
          duration: parseDuration(record.duration),
        }));

      const dataForChart = uniqueEmp.map((item) => {
        const found = data.find((d) => d.empName === item);
        return {
          empName: item,
          duration: found ? found.duration : 0,
        };
      });

      return {
        label: processIdWithName,
        data: dataForChart.map((dataItem) => dataItem.duration),
        backgroundColor: dataset.find(
          (emp) =>
            emp.ProcessId === processId && emp.ProcessName === processName
        ).backgroundColor,
      };
    });

    const chartData = {
      labels: uniqueEmp,
      datasets: datasets,
    };

    const maxUsedQuan = Math.max(
      ...dataset.map((record) =>
        record.duration !== "N/A" ? record.duration : 0
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
  }, [extractedHRRecords]);

  return (
    <CardContainer>
      <Card
        title="Human Resource Bar Chart"
        style={{
          width: "100%",
          height: "30%",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "2px",
        }}
      >
        <ChartWrapper>
          <canvas ref={chartRef} width={900} height={180} />
        </ChartWrapper>
        <br />
        <Space
          direction="vertical"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
          }}
        />
      </Card>
    </CardContainer>
  );
};

export default HumanResourceChart;
