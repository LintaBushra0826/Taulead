import React from "react";
import { Gantt } from "gantt-task-react-pro";
import "gantt-task-react-pro/dist/index.css";

function ProcessChart() {
  let tasks = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: "Idea",
      id: "Task 0",
      type: "task",
      progress: 45,
      isDisabled: true,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    },
  ];
  return (
    <>
      <Gantt
        tasks={tasks}
        viewMode={"Year"}
        onDateChange={"onDateChange"}
        onTaskDelete={"onTaskDelete"}
        onProgressChange={"onProgressChange"}
        onDoubleClick={"onDblClick"}
        onClick={"onClick"}
      />
    </>
  );
}

export default ProcessChart;
