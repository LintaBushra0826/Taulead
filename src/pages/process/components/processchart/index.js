import React, { useState, useEffect } from "react";
import { Gantt } from "gantt-task-react-pro";
import "gantt-task-react-pro/dist/index.css";
import { ProcessAtom } from "../../../../atoms/process.atom";
import { useAtomValue } from "jotai";
import axios from "axios";

function ProcessChart() {
  const API_BASE_URL = "http://localhost:3003";
  const [data, setData] = useState(null); // Initialize data as null instead of an empty array

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const response = await axios.get("http://localhost:3003/process");
      const rawData = response.data.data;

      // Ensure data is an array
      const processedDataArray = rawData.map((item) => {
        // Parse the start field as a Date object
        const startDate = new Date(item.start);
  
        // Extract date and time components
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const day = startDate.getDate();
        const hours = startDate.getHours();
        const minutes = startDate.getMinutes();
        const seconds = startDate.getSeconds();
  
        // Create new fields for date and time
        const date = new Date(year, month, day);
        const time = `${hours}:${minutes}:${seconds}`;
  
        // Return the modified item
        return {
          ...item,
          date, // Date component
          time, // Time component
        };
      });
      setData(processedDataArray);
      console.log("Process fetched data", data);
    } catch (error) {
      console.error("Error fetching process data:", error);
    }
  };

  const tasks = data
    ? [
        {
          start: data[0].date,
          end: new Date(2024, 12, 1),
          name: data[0].name, // Assuming you want the first item's name
          id: data[0]._id,
          duration: data[0].duration,
          type: "task",
          progress: 45,
          isDisabled: true,
          styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
        },
      ]
    : [fetchProcessData];
  return (
    <>
      {data ? (
        <Gantt
          key={1}
          tasks={tasks}
          fontSize={14}
          viewMode={"Month"}
          onDateChange={"onDateChange"}
          onTaskDelete={"onTaskDelete"}
          onProgressChange={"onProgressChange"}
          onDoubleClick={"onDblClick"}
          onClick={"Onclick"}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}

export default ProcessChart;
