import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radio } from "antd";
import { Chart, Wrapper } from "./index.styled";

import { Task, ViewMode, Gantt } from "gantt-task-react-pro";
import ViewSwitcher from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./components/helper";
import "gantt-task-react/dist/index.css";
import SidebarWrapper from "./components/processsidemenu";

function ProcessChart() {
  const [size, setSize] = useState("Hour");
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(ViewMode.Hour);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const [response, subprocessResponse] = await Promise.all([
        axios.get("http://localhost:3003/process"),
        axios.get("http://localhost:3003/subprocess"),
      ]);

      const rawData = response.data.data;
      const subprocess = subprocessResponse.data.data;

      const subTasks = subprocess.map((subitem, item) => ({
        start: new Date(subitem.substart),
        end: new Date(subitem.subend),
        name: subitem.subname,
        id: subitem._id,
        progress: 25,
        type: "project",
        // dependencies: [subitem.pName],
      }));

      rawData.push(...subTasks);

      const newTasks = rawData.map((item) => ({
        start: new Date(item.start),
        end: new Date(item.end),
        name: item.name,
        id: item._id,
        progress: 25,
        type: "project",
        dependencies: [subTasks.id],
      }));
      setTasks(newTasks);

      console.log("Process", newTasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange = (e) => {
    setSize(e.target.value);
  };

  let columnWidth = 65;
  if (view === ViewMode.Hour) {
    columnWidth = 50;
  } else if (view === ViewMode.Day) {
    columnWidth = 400;
  } else if (view === ViewMode.Month) {
    columnWidth = 500;
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

  const handleDblClick = (taskId) => {
    console.log("Clicked task ID:", taskId);

    const selectedTaskData = tasks.find((task) => task.id === taskId._id);
    console.log("Selected task data:", selectedTaskData);

    if (selectedTaskData) {
      setSelectedTaskData(selectedTaskData);
      setIsSidebarOpen(true); // Open the sidebar
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

  const handleClick = (task) => {
    console.log("On Click event Id:" + task.id);
    console.log("Clicked task ID:", task);

    const selectedTaskData = tasks.find((taskid) => taskid.id === task.id);
    console.log("Selected task data:", selectedTaskData);

    if (selectedTaskData) {
      setSelectedTaskData(selectedTaskData);
    }
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <>
      <Wrapper style={{ position: "relative", marginLeft: "410px" }}>
        <ViewSwitcher
          onViewModeChange={(viewMode) => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
          defaultViewMode={ViewMode.Hour}
        />
      </Wrapper>

      <br />

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
          <Wrapper
            style={{
              display: "flex",
              position: "relative",
              left: "350px",
              width: "2500px",
            }}
          >
            <SidebarWrapper selectedTaskData={selectedTaskData} />
          </Wrapper>
        </Chart>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}

export default ProcessChart;
