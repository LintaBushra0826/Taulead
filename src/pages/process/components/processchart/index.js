import React from "react";
import { Gantt } from "gantt-task-react-pro";
import "gantt-task-react-pro/dist/index.css";
import { ProcessAtom } from "../../../../atoms/process.atom";
import { useAtomValue } from "jotai";

function ProcessChart() {
  const process = useAtomValue(ProcessAtom);
  // console.log("process data:", process);

  let tasks = [
    {
      start: new Date(2022, 1, 1),
      end: new Date(2024, 12, 1),
      name: process.name,
      id: process._id,
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
        fontSize={14}
        viewMode={"Month"}
        onDateChange={"onDateChange"}
        onTaskDelete={"onTaskDelete"}
        onProgressChange={"onProgressChange"}
        onDoubleClick={"onDblClick"}
        onClick={"Onclick"}
      />
    </>
  );
}

export default ProcessChart;
