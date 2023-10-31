import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, Wrapper, IconWrapper } from "./index.styled";
import { Modal, Button, Dropdown, Menu } from "antd";
import { ViewMode, Gantt } from "gantt-task-react-pro";
import ViewSwitcher from "./components/view-switcher";
import { getStartEndDateForProject } from "./components/helper";
import "gantt-task-react/dist/index.css";
import SidebarWrapper from "./components/processsidemenu";
import { MoreOutlined } from "@ant-design/icons";
import ProcessTags from "./components/processtags";
import UpdateProcess from "./components/updateprocess";
import { FcProcess } from "react-icons/fc";

function ProcessChart() {
  const API_BASE_URL = "http://localhost:3003";
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(ViewMode.Hour);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedTaskData, setSelectedTaskData] = useState(null);
  const [open, setOpen] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProcessData, setSelectedProcessData] = useState(null);

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
        axios.get("http://localhost:3003/process"),
        axios.get("http://localhost:3003/subprocess"),
      ]);

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
        function formatDuration(start, end) {
          const durationInMilliseconds = end - start;
          const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
          const minutes = Math.floor(
            (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
          );

          if (hours === 0) {
            return `${minutes} minute(s)`;
          } else if (minutes === 0) {
            return `${hours} hour(s)`;
          } else {
            return `${hours} hour(s) and ${minutes} minute(s)`;
          }
        }

        const ProcessdurationInHours = formatDuration(
          new Date(item.start),
          new Date(item.end)
        );
        console.log(
          "Formatted ProcessdurationInHours: " + ProcessdurationInHours
        );

        // Map the item to the desired format
        const mappedItem = {
          key: item._id,
          start: new Date(item.start),
          end: new Date(item.end),
          name: item.name,
          id: item.name,
          processId: item.pid,
          humanresource: item.humanResource,
          rawmaterial: item.rawMaterial,
          duration: ProcessdurationInHours,
          progress: "55",
          type: "project",
          displayOrder: count++,
        };
        mappedProcesses.push(mappedItem);

        if (item.subprocesses.length > 0) {
          let lastItem = [];
          item.subprocesses.forEach((subitem) => {
            const subdurationInHours = formatDuration(
              new Date(subitem.substart),
              new Date(subitem.subend)
            );
            const mappedItem = {
              key: subitem._id,
              start: new Date(subitem.substart),
              end: new Date(subitem.subend),
              name: subitem.subname,
              id: subitem.subname,
              subhumanresource: subitem.humanResource,
              subrawmaterial: subitem.rawMaterial,
              duration: subdurationInHours,
              progress: "35",
              type: "task",
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

  const handleDblClick = (taskId) => {
    console.log("Clicked task ID:", taskId);

    const selectedTaskData = tasks.find((task) => task.id === taskId._id);
    console.log("Selected task data:", selectedTaskData);

    if (selectedTaskData) {
      setSelectedTaskData(selectedTaskData);
      // setIsSidebarOpen(true); // Open the sidebar
    }
  };

  const handleClick = (task) => {
    console.log("On Click event Id:" + task.id);
    console.log("Clicked task ID:", task);

    const selectedTaskData = tasks.find((taskid) => taskid.id === task.id);
    console.log("Selected task data:", selectedTaskData);

    if (selectedTaskData) {
      setSelectedTaskData(selectedTaskData);
    }
    setOpen(true);

    console.log();
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
      await axios.delete(`${API_BASE_URL}/subprocess/${sprId}`);
      alert("Process deleted successfully");

      // Reload the current route
      window.location.reload();
    } catch (error) {
      alert("Process data deleted");
    }
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
            tasks={tasks.map((task) => ({
              ...task,
              name: (
                <>
                  <FcProcess />{" "}
                  {task.processId ? task.processId.toUpperCase() : ""}{" "}
                  {task.name}{" "}
                  <ProcessTags
                    status={getStatusForProcess(task)}
                    style={{ display: "flex" }}
                  />
                </>
              ),
            }))}
            viewMode={view}
            onDateChange={handleTaskChange}
            onDoubleClick={handleDblClick}
            onClick={handleClick}
            listCellWidth={isChecked ? "155px" : ""}
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
              // onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer=""
              width={1000}
            >
              <SidebarWrapper
                selectedTaskData={selectedTaskData}
                onCancel={() => setOpen(false)}
              />
              <IconWrapper onContextMenu={handleContextMenu}>
                <Dropdown
                  overlay={menu}
                  visible={contextMenuVisible}
                  onVisibleChange={(visible) => setContextMenuVisible(visible)}
                >
                  <div>
                    {" "}
                    {/* Wrap the Button and UpdateProcess components in a parent container */}
                    <Button
                      type="text"
                      style={{ border: "none", padding: 0, background: "none" }}
                    >
                      <MoreOutlined style={{ fontSize: "24px" }} />
                    </Button>
                    {updateModalVisible && (
                      <UpdateProcess
                        isVisible={updateModalVisible}
                        onClose={handleCloseUpdateModal}
                        // Pass the selected process data here
                      />
                    )}
                  </div>
                </Dropdown>
              </IconWrapper>
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
