import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, Wrapper, IconWrapper } from "./index.styled";
import { Modal, Button, Dropdown, Menu, Spin } from "antd";
import { ViewMode, Gantt } from "gantt-task-react-pro";
import ViewSwitcher from "./components/view-switcher";
import { getStartEndDateForProject } from "./components/helper";
import "gantt-task-react/dist/index.css";
import SidebarWrapper from "./components/processsidemenu";
import { MoreOutlined } from "@ant-design/icons";
import ProcessTags from "./components/processtags";
import UpdateProcess from "./components/updateprocess";
import { FcProcess } from "react-icons/fc";
import { SpinWrapper } from "../../../../styles/global.styled";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

function ProcessChart() {
  const API_BASE_URL = "http://localhost:3005";
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(ViewMode.Hour);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [open, setOpen] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProcessData, setSelectedProcessData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEditProcessClick = (selectedTaskData) => {
    setSelectedProcessData(selectedTaskData);
    setUpdateModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    setContextMenuVisible(true);
  };

  useEffect(() => {
    fetchProcessData();
  }, []);

  function formatDuration(start, end) {
    const durationInmilliseconds = end - start;
    const hours = Math.floor(durationInmilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInmilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (hours === 0) {
      return `${minutes} minute(s)`;
    } else if (minutes === 0) {
      return `${hours} hour(s)`;
    } else {
      return `${hours} hour(s) and ${minutes} minute(s)`;
    }
  }

  const menu = (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() => handleEditProcessClick(selectedTaskData)}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        onClick={() => {
          handleDeleteProcess(selectedTaskData.key);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const fetchProcessData = async () => {
    try {
      const [response, subprocessResponse] = await Promise.all([
        axios.get("http://localhost:3005/process"),
        axios.get("http://localhost:3005/subprocess"),
      ]);

      const process = response.data.data;
      const subprocess = subprocessResponse.data.data;

      // console.log("process.rawMaterial.id",process);
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
      const mappedProcesses = {};

      // Create a map of subprocesses by their _id for efficient lookup
      const subprocessMap = {};
      // Iterate through the process array
      process.forEach((item) => {
        const ProcessdurationInHours = formatDuration(
          new Date(item.start),
          new Date(item.end)
        );

        // Check if the item is already in mappedProcesses to avoid duplicates
        if (!mappedProcesses[item._id]) {
          const mappedItem = {
            key: item._id,
            start: new Date(item.start),
            end: new Date(item.end),
            name: item.name,
            id: item.name,
            desc: item.desc,
            processId: item.pid,
            humanresource: item.humanResource,
            rawmaterial: item.rawMaterial,
            duration: ProcessdurationInHours,
            type: "project",
            displayOrder: count++,
            hideChildren: false,
          };
          mappedProcesses[item._id] = mappedItem;

          if (item.subprocesses) {
            let lastItem = null;
            item.subprocesses.forEach((subitem, index) => {
              const subdurationInHours = formatDuration(
                new Date(subitem.substart),
                new Date(subitem.subend)
              );
              let subMappedItem = {
                key: subitem._id,
                start: new Date(subitem.substart),
                end: new Date(subitem.subend),
                name: subitem.subname,
                id: subitem.subname,
                subdesc: subitem.subdesc,
                subprocessId: subitem.subId,
                subhumanresource: subitem.humanResource,
                subrawmaterial: subitem.rawMaterial,
                duration: subdurationInHours,
                type: "task",
                project: item.name,
                displayOrder: count++,
              };

              if (index) {
                subMappedItem = { ...subMappedItem, dependencies: [lastItem] };
              }

              lastItem = subitem.subname;
              mappedProcesses[subitem._id] = subMappedItem;
            });
          }
        }
      });

      // Convert the mapped processes map to an array
      const processesArray = Object.values(mappedProcesses);

      const updatedTasks = processesArray.map((task) => {
        const newName = (
          <>
            <FcProcess />{" "}
            {task.processId && (
              <span style={{ color: "green" }}>
                {task.processId.toUpperCase()}
              </span>
            )}{" "}
            {task.subprocessId && (
              <span style={{ color: "blue" }}>
                {task.subprocessId.toUpperCase()}
              </span>
            )}{" "}
            {task.type === "project"
              ? task.name
              : task.subprocesses
              ? `${task.subprocesses.subname} - ${task.name}`
              : task.name}
            <ProcessTags
              status={getStatusForProcess(task)}
              style={{ display: "flex" }}
            />
          </>
        );

        return {
          ...task,
          name: newName,
          newName: task.name,
          status: getStatusForProcess(task),
        };
      });
      setTasks(updatedTasks);
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
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const projectIndex = newTasks.findIndex((t) => t.id === task.project);
      const project = newTasks[projectIndex];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = {
          ...project,
          start,
          end,
        };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleClick = (task) => {
    setSelectedTaskData(task);
    setOpen(true);
  };

  const handleMenuClick = (e) => {
    // Handle menu item click here
    setContextMenuVisible(false);
  };
  const getStatusForProcess = (process) => {
    if (process.isCompleted) {
      return "completed";
    } else if (process.isInProgress) {
      return "inprogress";
    } else {
      return "paused";
    }
  };

  const handleDeleteProcess = async (prId, sprId) => {
    try {
      await axios.delete(`${API_BASE_URL}/process/${prId}`);
      if (sprId) {
        await axios.delete(`${API_BASE_URL}/subprocess/${sprId}`);
      }
      alert("Process deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting process:", error);
      alert("Error deleting process");
    }
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  return (
    <>
      <Wrapper
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ViewSwitcher
          onViewModeChange={(viewMode) => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
      </Wrapper>

      <br />

      {tasks.length > 0 ? (
        <Chart>
          <Gantt
            tasks={tasks}
            viewMode={view}
            onDateChange={handleTaskChange}
            onDoubleClick={handleClick}
            listCellWidth={isChecked ? "155px" : ""}
            columnWidth={columnWidth}
            onExpanderClick={handleExpanderClick}
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
              onCancel={() => setOpen(false)}
              footer=""
              width={1000}
            >
              <SidebarWrapper
                selectedTaskData={selectedTaskData}
                onCancel={() => setOpen(false)}
              />
              <IconWrapper onContextMenu={handleContextMenu}>
                <div>
                  <Button
                    type="text"
                    style={{ border: "none", padding: 0, background: "none" }}
                    onClick={() => handleEditProcessClick(selectedTaskData.key)}
                  >
                    <FiEdit3
                      style={{
                        color: "#360a5a",
                        width: "20px",
                        height: "35px",
                      }}
                    />
                  </Button>
                  <Button
                    type="text"
                    style={{
                      border: "none",
                      padding: 0,
                      background: "none",
                      marginLeft: "25px",
                    }}
                    onClick={() => handleDeleteProcess(selectedTaskData.key)}
                  >
                    <MdOutlineDelete
                      style={{
                        color: "#360a5a",
                        width: "20px",
                        height: "35px",
                      }}
                    />
                  </Button>
                  {updateModalVisible && (
                    <UpdateProcess
                      isVisible={updateModalVisible}
                      onClose={handleCloseUpdateModal}
                      selectedTaskData={selectedTaskData}
                    />
                  )}
                </div>
              </IconWrapper>
            </Modal>
          </Wrapper>
        </Chart>
      ) : (
        <>
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        </>
      )}
    </>
  );
}

export default ProcessChart;
