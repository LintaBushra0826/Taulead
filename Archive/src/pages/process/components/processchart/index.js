import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radio } from "antd";
import { Chart } from "./index.styled";

import { Task, ViewMode, Gantt } from "gantt-task-react-pro";
import ViewSwitcher from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./components/helper";
import "gantt-task-react/dist/index.css";

function ProcessChart() {
  const [size, setSize] = useState("Month");
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(ViewMode.Day);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/process");
      const subprocessResponse = await axios.get(
        "http://localhost:3005/subprocess"
      );
      const rawData = response.data.data;
      const subprocess = subprocessResponse.data.data;
      console.log("subprocess", subprocess);
      const tasks = [];
      let count = 1;

      response.forEach((item) => {
        setTasks((prev) => [
          ...prev,
          {
            start: new Date(item.start),
            end: new Date(item.end),
            name: item.name,
            id: item._id,
            progress: 25,
            type: "project",
            //        hideChildren: false,
            displayOrder: count,
            subTasks: [],
          },
        ]);

        count++;
        console.log(tasks, "hh");
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange = (e) => {
    setSize(e.target.value);
  };

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>

      {tasks.length > 0 ? (
        <Chart>
          <Gantt
            tasks={tasks}
            viewMode={view}
            onDateChange={handleTaskChange}
            onDelete={handleTaskDelete}
            onProgressChange={handleProgressChange}
            onDoubleClick={handleDblClick}
            onClick={handleClick}
            onSelect={handleSelect}
            onExpanderClick={handleExpanderClick}
            listCellWidth={isChecked ? "155px" : ""}
            columnWidth={columnWidth}
          />
        </Chart>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default ProcessChart;
