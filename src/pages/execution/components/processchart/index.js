import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, Wrapper, IconWrapper } from "./index.styled";
import { Modal, Button, Dropdown, Menu, Spin } from "antd";
import { ViewMode, Gantt } from "gantt-task-react-pro";
import ViewSwitcher from "./components/view-switcher";
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
    e.preventDefault();
    setContextMenuVisible(true);
  };

  const handleDeleteProcess = async (prId) => {
    console.log("prId, sprId", prId);
    try {
      await axios.delete(`${API_BASE_URL}/executed-process/${prId}`);
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
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: token,
      };

      const [processResponse, subprocessResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/executed-process`, { headers }),
        axios.get(`${API_BASE_URL}/executed-subprocess`, { headers }),
      ]);

      const process = processResponse.data.data;
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

      let count = 1;
      const mappedProcesses = {};

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
      console.log("processesArray", processesArray);
      const updatedTasks = processesArray.map((task, index) => {
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

  const checkExistingTask = async (taskKey, endpoint) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
      const existingTasks = response.data.data;
      const existingKeys = new Set(existingTasks.map((item) => item.key));

      return existingKeys.has(taskKey);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      return false;
    }
  };

  const postTaskIfNotExists = async (
    task,
    endpoint,
    authToken,
    processedKeys
  ) => {
    const key = task.key;

    try {
      const taskExists = await checkExistingTask(key, endpoint);

      if (!taskExists && !processedKeys.has(key)) {
        if (task.type === "project" || task.type === "task") {
          const headers = {
            Authorization: authToken,
          };
          let response;
          if (!taskExists && !processedKeys.has(key)) {
            response = await axios.post(
              `${API_BASE_URL}/${endpoint}`,
              {
                name: task.newName,
                start: task.start,
                end: task.end,
                desc: task.desc,
                duration: task.duration,
                pid:
                  task.type === "project" ? task.processId : task.subprocessId,
                humanresource:
                  task.type === "project"
                    ? task.humanresource
                    : task.subhumanresource,
                rawmaterial:
                  task.type === "project"
                    ? task.rawmaterial
                    : task.subrawmaterial,
                key: task.key,
                status: task.status,
                progress: task.progress,
              },
              { headers }
            );

            if (response.status === 200) {
              console.log(
                `Successfully added ${endpoint} process`,
                response.data.data
              );
              processedKeys.add(key);
            } else {
              console.error(`Error adding ${endpoint} process`);
            }
          } else {
          }
        }

        if (task.status === "completed") {
          // Update the completedtag attribute in HR process record
          if (task) {
            // Fetch the human resource record
            const hrResponse = await axios.get(
              `${API_BASE_URL}/humanresource`,
              {
                headers: {
                  Authorization: authToken,
                },
              }
            );

            const hrResponsedata = hrResponse.data.data;
            const flattenedArray = hrResponsedata.flat();

            // Extract names from hrResponsedata
            const hrNames = hrResponsedata.map((hr) => hr.name);

            // Filter task.humanresource based on matching names
            const matchingHumanResources = task.humanresource.filter((taskHR) =>
              hrNames.includes(taskHR.name)
            );
            // Now, let's find HR process records for each matching human resource
            const matchingHRProcessRecords = matchingHumanResources.map(
              (matchingHR) => {
                const hrRecord = hrResponsedata.find(
                  (hr) => hr.name === matchingHR.name
                );
                return {
                  ...hrRecord,
                  HRprocessRecords: hrRecord.HRprocessRecords || [],
                };
              }
            );

            if (
              matchingHRProcessRecords &&
              matchingHRProcessRecords.length > 0
            ) {
              // Use find to get the first element with HRprocessRecords property
              const firstMatchingRecord = matchingHRProcessRecords.find(
                (record) => record.HRprocessRecords
              );

              if (firstMatchingRecord) {
                // Extract HRprocessRecords array from the found record
                const hrProcessRecords = firstMatchingRecord.HRprocessRecords;

                // Extract names from hrProcessRecords
                const matchingHR = hrProcessRecords.map((hr) => hr);

                if (matchingHR) {
                  // Add completedtag property to each element in hrProcessRecords
                  const updatedHRProcessRecords = firstMatchingRecord.HRprocessRecords.map(
                    (record) => ({
                      ...record,
                      completedtag: "completed",
                    })
                  );

                  // Update the HR record with the modified HRprocessRecord
                  try {
                    const updatedHumanResource = {
                      ...firstMatchingRecord,
                      HRprocessRecords: updatedHRProcessRecords,
                    };

                    // Use the updatedHumanResource object in the PUT request
                    await axios.put(
                      `${API_BASE_URL}/humanresource/${firstMatchingRecord._id}`,
                      updatedHumanResource,
                      {
                        headers: {
                          Authorization: authToken,
                        },
                      }
                    );
                  } catch (error) {
                    console.error("Error updating HR record:", error);
                  }
                }
              }
            }
          }
        }
      } else {
        console.log(`Task with key ${key} already exists in ${endpoint}`);
      }
    } catch (error) {
      console.error(`Error posting ${endpoint} process data:`, error);
    }
  };

  const processData = async (tasksData) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const processedKeys = new Set();

      await Promise.all(
        tasksData.map(async (task) => {
          const isInProgress = await checkExistingTask(
            task.key,
            "inprogress-process"
          );
          const isCompleted = await checkExistingTask(
            task.key,
            "completed-process"
          );

          if (!processedKeys.has(task.key)) {
            if (task.status === "inprogress" && !isInProgress) {
              await postTaskIfNotExists(
                task,
                "inprogress-process",
                jwtToken,
                processedKeys
              );
            } else if (task.status === "completed" && !isCompleted) {
              await postTaskIfNotExists(
                task,
                "completed-process",
                jwtToken,
                processedKeys
              );
            } else {
              console.log(
                `Task with key ${task.key} has an unsupported status or already exists`
              );
            }
          }
        })
      );
    } catch (error) {
      console.error("Error processing tasks:", error);
    }
  };

  useEffect(() => {
    if (tasks.length > 0) {
      processData(tasks);
    }
  }, [tasks]);

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

  const handleProgressChange = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
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
            onProgressChange={handleProgressChange}
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
