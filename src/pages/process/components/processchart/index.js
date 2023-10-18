import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, Wrapper } from "./index.styled";
import { Modal } from "antd";
import { ViewMode, Gantt } from "gantt-task-react-pro";
import ViewSwitcher from "./components/view-switcher";
import { getStartEndDateForProject } from "./components/helper";
import "gantt-task-react/dist/index.css";
import SidebarWrapper from "./components/processsidemenu";

function ProcessChart() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(ViewMode.Hour);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const [response, subprocessResponse] = await Promise.all([
        axios.get("http://localhost:3003/process"),
        axios.get("http://localhost:3003/subprocess"),
      ]);

      // let count = 1;

      const process = response.data.data;
      const subprocess = subprocessResponse.data.data;

      // Iterate through the subprocess array
      subprocess.forEach((sub) => {
        // Find the corresponding process using the "pName" field
        const correspondingProcess = process.find(
          (proc) => proc.name === sub.pName
        );

        if (correspondingProcess) {
          // Add the subprocess to the corresponding process
          if (!correspondingProcess.subprocesses) {
            correspondingProcess.subprocesses = [];
          }
          correspondingProcess.subprocesses.push(sub);
        }
      });

      let count = 1; // Initialize a count variable
      const mappedProcesses = [];

      // Create a map of subprocesses by their _id for efficient lookup
      const subprocessMap = {};
      // Iterate through the process array
      process.forEach((item) => {
        // Map the item to the desired format
        const mappedItem = {
          key: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          name: item.name,
          id: item.name,
          humanresource: item.humanResource,
          rawmaterial: item.rawMaterial,
          type: "process",
          displayOrder: count++,
        };
        mappedProcesses.push(mappedItem);

        if (item.subprocesses.length > 0) {
          let lastItem = [];
          item.subprocesses.forEach((subitem) => {
            const mappedItem = {
              key: subitem.subname,
              start: new Date(subitem.substart),
              end: new Date(subitem.subend),
              name: subitem.subname,
              id: subitem.subname,
              subhumanresource: subitem.humanResource,
              subrawmaterial: subitem.rawMaterial,
              type: "subprocess",
              project: item.name,
              displayOrder: count++,
              dependencies: lastItem,
            };
            mappedProcesses.push(mappedItem);
            lastItem = [subitem.subname];
          });
        }
      });

      // Log the mapped processes
      console.log(mappedProcesses);

      setTasks(mappedProcesses);

      //done?

      //zaeem suno
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let columnWidth = 65;
  if (view === ViewMode.Hour) {
    columnWidth = 50;
  } else if (view === ViewMode.Day) {
    columnWidth = 100;
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

  // const handleTaskDelete = (task) => {
  //   const conf = window.confirm("Are you sure about " + task.name + " ?");
  //   if (conf) {
  //     setTasks(tasks.filter((t) => t.id !== task.id));
  //   }
  //   return conf;
  // };

  // const handleProgressChange = async (task) => {
  //   setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  //   console.log("On progress change Id:" + task.id);
  // };

  const handleDblClick = (taskId) => {
    console.log("Clicked task ID:", taskId);

    const selectedTaskData = tasks.find((task) => task.id === taskId._id);
    console.log("Selected task data:", selectedTaskData);

    if (selectedTaskData) {
      setSelectedTaskData(selectedTaskData);
      // setIsSidebarOpen(true); // Open the sidebar
    }
  };

  // const closeSidebar = () => {
  //   setIsSidebarOpen(false); // Close the sidebar
  // };

  const handleClick = (task) => {
    console.log("On Click event Id:" + task.id);
    console.log("Clicked task ID:", task);

    const selectedTaskData = tasks.find((taskid) => taskid.id === task.id);
    console.log("Selected task data:", selectedTaskData);

    if (selectedTaskData) {
      setSelectedTaskData(selectedTaskData);
    }
    setOpen(true);

    console.log()
  };

  // const handleSelect = (task, isSelected) => {
  //   console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  // };

  // const handleExpanderClick = (task) => {
  //   setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  //   console.log("On expander click Id:" + task.id);
  // };

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
            // onDelete={handleTaskDelete}
            // onProgressChange={handleProgressChange}
            onDoubleClick={handleDblClick}
            onClick={handleClick}
            // onSelect={handleSelect}
            // onExpanderClick={handleExpanderClick}
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
            <Modal
              title=""
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              <SidebarWrapper selectedTaskData={selectedTaskData}  />
            </Modal>
          </Wrapper>
        </Chart>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}

export default ProcessChart;
