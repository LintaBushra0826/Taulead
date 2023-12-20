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
  const [inprogesponse, setinprogesponse] = useState([]);

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

  const handleDeleteProcess = async (prId) => {
    console.log("prId, sprId", prId);
    try {
      await axios.delete(`${API_BASE_URL}/executed-process/${prId}`);
      // if (sprId) {
      //   await axios.delete(`${API_BASE_URL}/executed-subprocess/${sprId}`);
      // }
      alert("Executed Process deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting Executed process:", error);
      alert("Error deleting Executed process", error);
    }
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

  useEffect(() => {
    fetchProcessData();
  }, []);

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
            progress: (() => {
              const startDate = new Date(item.start);
              const endDate = new Date(item.end);
              const currentTime = new Date();

              if (currentTime < startDate) {
                return 0; // Task hasn't started yet
              } else if (currentTime > endDate) {
                return 100; // Task has finished
              } else {
                const totalDuration = endDate - startDate;
                const elapsed = currentTime - startDate;
                const calculatedProgress = (elapsed / totalDuration) * 100;
                return calculatedProgress;
              }
            })(),
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
                progress: (() => {
                  const subStartDate =
                    new Date(subitem.substart).getTime() + item.diff;
                  const subEndDate =
                    new Date(subitem.subend).getTime() + item.diff;
                  const currentTime = new Date().getTime();

                  if (currentTime < subStartDate) {
                    return 0; // Subtask hasn't started yet
                  } else if (currentTime > subEndDate) {
                    return 100; // Subtask has finished
                  } else {
                    const totalDuration = subEndDate - subStartDate;
                    const elapsed = currentTime - subStartDate;
                    const calculatedProgress = (elapsed / totalDuration) * 100;
                    return calculatedProgress;
                  }
                })(),

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

  useEffect(() => {
    const processTasks = async () => {
      try {
        // Fetch existing in-progress tasks
        const inprogressResponse = await axios.get("http://localhost:3005/inprogress-process");
        const inprogressData = inprogressResponse.data.data;
        const inprogressKeys = new Set(inprogressData.map(item => item.key));
  
        // Fetch existing completed tasks
        const completedResponse = await axios.get("http://localhost:3005/completed-process");
        const completedData = completedResponse.data.data;
        const completedKeys = new Set(completedData.map(item => item.key));
  
        for (const task of tasks) {
          const key = task.key;
  
          if (!inprogressKeys.has(key) && task.status === "inprogress") {
            try {
              // Add the task to the in-progress table using an API call
              const response = await axios.post(
                `${API_BASE_URL}/inprogress-process`,
                {
                  // Add your task properties here
                  // Assuming task properties are: newName, start, end, desc, duration, processId, humanresource, rawmaterial
                  name: task.newName,
                  start: task.start,
                  end: task.end,
                  desc: task.desc,
                  duration: task.duration,
                  pid: task.processId,
                  humanresource: task.humanresource,
                  rawmaterial: task.rawmaterial,
                  key:task.key,
                  status: task.status,
                  progress: task.progress,
                }
              );
  
              if (response.status === 200) {
                console.log("Successfully added in-progress process");
                console.log("In-progress process", response);
                inprogressKeys.add(key); // Update the set with the added key
              } else {
                console.error("Error adding in-progress process");
              }
            } catch (error) {
              console.error("Error posting in-progress process data:", error);
            }
          } else if (!completedKeys.has(key) && task.status === "completed") {
            try {
              // Add the task to the completed table using an API call
              const response = await axios.post(
                `${API_BASE_URL}/completed-process`,
                {
                  // Add your task properties here
                  // Assuming task properties are: newName, start, end, desc, duration, processId, humanresource, rawmaterial
                  name: task.newName,
                  start: task.start,
                  end: task.end,
                  desc: task.desc,
                  duration: task.duration,
                  pid: task.processId,
                  humanresource: task.humanresource,
                  rawmaterial: task.rawmaterial,
                  key:task.key,
                  status: task.status,
                 
                }
              );

              // const delresponse = await axios.delete(
              //   `${API_BASE_URL}/inprogress-process`,
              //   {
              //     name: task.newName,
              //     start: task.start,
              //     end: task.end,
              //     desc: task.desc,
              //     duration: task.duration,
              //     pid: task.processId,
              //     humanresource: task.humanresource,
              //     rawmaterial: task.rawmaterial,
              //     key:task.key,
              //     status: task.status,
                 
              //   }
              // )
  
              if (response.status === 200) {
                console.log("Successfully added completed process");
                console.log("Completed process", response);
                completedKeys.add(key); // Update the set with the added key
              } else {
                console.error("Error adding completed process");
              }
            } catch (error) {
              console.error("Error posting completed process data:", error);
            }
          } else {
            console.log("Task with key", key, "already exists with status", task.status);
          }
        }
      } catch (error) {
        console.error("Error processing tasks:", error);
      }
    };
  
    processTasks();
  }, [tasks]);
  

  // useEffect(() => {
  //   const processTasks = async () => {
  //     try {
  //       const [inprogressResponse] = await Promise.all([
  //         axios.get("http://localhost:3005/inprogress-process"),
  //       ]);

  //       const inprogressData = inprogressResponse.data.data;
  //       console.log("inprogressResponse", inprogressData);

  //       for (const task of tasks) {
  //         const taskEndTime = new Date(task.end);
  //         const currentTime = new Date();

  //         if (taskEndTime <= currentTime) {
  //           // The task has reached its end time
  //           try {
  //             // Update HumanResource status to "Available"
  //             const humanResourceUpdateResponse = await axios.put(
  //               `${API_BASE_URL}/humanresource/${task.humanresource.id}`,
  //               {
  //                 tag: "Available",
  //               }
  //             );

  //             if (humanResourceUpdateResponse.status === 200) {
  //               console.log("Employee status updated to AVAILABLE");
  //             }
  //           } catch (error) {
  //             console.error("Error updating employee status:", error);
  //             // Handle error while updating employee status
  //           }

  //           // Check if the task is in progress or completed
  //           const matchInProgress = inprogressData.find(
  //             (item) => item.id === task.id
  //           );

  //           if (matchInProgress) {
  //             // Handle logic for in-progress tasks if needed
  //             // For example, update the in-progress process data
  //             try {
  //               // Post in-progress task to the in-progress table
  //               const inprogressPostResponse = await axios.post(
  //                 `${API_BASE_URL}/inprogress-process`,
  //                 task // Assuming the task data matches the in-progress table structure
  //               );
  //               alert("Posted to in-progress table:", inprogressPostResponse);
  //             } catch (error) {
  //               console.error("Error posting to in-progress table:", error);
  //               // Handle error while posting to in-progress table
  //             }
  //           } else {
  //             // Handle logic for completed tasks if needed
  //             // For example, post the task to the completed table
  //             try {
  //               // Post completed task to the completed table
  //               const completedPostResponse = await axios.post(
  //                 `${API_BASE_URL}/completed-process`,
  //                 task // Assuming the task data matches the completed table structure
  //               );
  //               alert("Posted to completed table:", completedPostResponse);
  //             } catch (error) {
  //               console.error("Error posting to completed table:", error);
  //               // Handle error while posting to completed table
  //             }
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error processing tasks:", error);
  //     }
  //   };

  //   processTasks();
  // }, [tasks]);

  let columnWidth = 65;
  if (view === ViewMode.Hour) {
    columnWidth = 100;
  } else if (view === ViewMode.Day) {
    columnWidth = 100;
  } else if (view === ViewMode.Month) {
    columnWidth = 500;
  }

  const handleClick = (task) => {
    console.log("up-onc", task);
    setSelectedTaskData(task);
    setOpen(true);
  };
  const handleMenuClick = (e) => {
    // Handle menu item click here
    setContextMenuVisible(false);
  };

  const getStatusForProcess = (process) => {
    console.log("executedprocess", process);
    if (process.progress >= 100) {
      return "completed";
    } else if (process.progress > 0 && process.progress < 100) {
      return "inprogress";
    } else if (process.progress === 0) {
      return "Not Started Yet";
    }
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
