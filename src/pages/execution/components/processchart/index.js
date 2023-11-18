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
  const API_BASE_URL = "http://localhost:3005";
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(ViewMode.Day);
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

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

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
        axios.get("http://localhost:3005/executed-process"),
        axios.get("http://localhost:3005/subprocess"),
      ]);

      console.log("executed process response", response);

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
      const mappedProcesses = {};

      // Create a map of subprocesses by their _id for efficient lookup
      const subprocessMap = {};
      // Iterate through the process array
      process.forEach((item) => {
        const ProcessdurationInHours = formatDuration(
          new Date(item.start),
          new Date(item.end)
        );
        console.log(
          "Formatted ProcessdurationInHours: " + ProcessdurationInHours
        );

        // Check if the item is already in mappedProcesses to avoid duplicates
        if (!mappedProcesses[item._id]) {
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
            progress:
              (new Date(item.end) - new Date()) /
              (new Date(item.end) - new Date(item.start)),
            type: "project",
            displayOrder: count++,
            hideChildren: false,
          };
          mappedProcesses[item._id] = mappedItem;

          if (item.subprocesses) {
            item.subprocesses.forEach((subitem, index) => {
              let lastItem = null;
              const subdurationInHours = formatDuration(
                new Date(new Date(subitem.substart).getTime() + item.diff),
                new Date(new Date(subitem.subend).getTime() + item.diff)
              );
              const subMappedItem = {
                key: subitem._id,
                start: new Date(
                  new Date(subitem.substart).getTime() + item.diff
                ),
                end: new Date(new Date(subitem.subend).getTime() + item.diff),
                name: subitem.subname,
                id: subitem.subname,
                subprocessId: subitem.subId,
                subhumanresource: subitem.humanResource,
                subrawmaterial: subitem.rawMaterial,
                duration: subdurationInHours,
                progress:
                  new Date() -
                    new Date(new Date(subitem.substart).getTime() + item.diff) <
                  0
                    ? 0
                    : ((new Date() -
                        new Date(
                          new Date(subitem.substart).getTime() + item.diff
                        )) /
                        (new Date(
                          new Date(subitem.subend).getTime() + item.diff
                        ) -
                          new Date(
                            new Date(subitem.substart).getTime() + item.diff
                          ))) *
                      100,
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

      setTasks(
        processesArray.map((task) => ({
          ...task,
          name: (
            <>
              <FcProcess />{" "}
              {task.processId ? (
                <span style={{ color: "green" }}>
                  {task.processId.toUpperCase()}
                </span>
              ) : (
                ""
              )}{" "}
              {task.subprocessId ? (
                <span style={{ color: "blue" }}>
                  {task.subprocessId.toUpperCase()}
                </span>
              ) : (
                ""
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
          ),
        }))
      );
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

  const handleClick = (task) => {
    console.log("up-onc", task);
    // console.log("On Click event Id:" + task.id);
    // console.log("Clicked task ID:", task);

    // const selectedTaskData = tasks.find((taskid) => taskid.id === task.id);
    // console.log("Selected task data:", selectedTaskData);

    // if (selectedTaskData) {
    // }
    setSelectedTaskData(task);
    setOpen(true);

    // console.log();
  };
  const handleMenuClick = (e) => {
    // Handle menu item click here
    setContextMenuVisible(false);
  };

  const getStatusForProcess = (process) => {
    console.log("executedprocess", process);
    if (process.progress == 100) {
      return "completed";
    } else if (process.progress > 0 && process.progress < 100) {
      return "inprogress";
    } else {
      return "Not Started Yet";
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

  return (
    <>
      <Wrapper style={{ position: "relative", marginLeft: "410px" }}>
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
            onDoubleClick={handleClick}
            listCellWidth={isChecked ? "155px" : ""}
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
