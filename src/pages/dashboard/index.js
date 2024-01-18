import React, { useState, useEffect, useCallback } from "react";
import Header from "../../layout/justheader";
import Sidemenu from "../../layout/sideMenu";
import { Card, Tag, List, Table, Button, Empty } from "antd";
import {
  Container1,
  Container2,
  Container3,
  Container4,
  CardContainer,
  Paragraph,
  Paragraph1,
} from "./index.styled";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import VirtualList from "rc-virtual-list";
import { CgReorder } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Column } from "@ant-design/plots";
import { FcProcess } from "react-icons/fc";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

function Dashboard() {
  const [usedItems, setUsedItems] = useState(0);
  const [unusedItems, setUnusedItems] = useState(0);
  const [totalRawMaterials, setTotalRawMaterials] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState(0);
  const [busyEmployees, setBusyEmployees] = useState(0);
  const [executedData, setExecutedData] = useState([]);
  const [totalProcesses, setTotalProcessesCount] = useState(0);
  const [totalDefProcesses, setTotalProcesses] = useState(0);
  const [completedProcessesCount, setCompletedProcessesCount] = useState(0);
  const [inProgressProcessesCount, setInProgressProcessesCount] = useState(0);
  const [backlogProcessesCount, setBacklogProcessesCount] = useState(0);
  const [isInlistDrawerOpen, setIsInlistDrawerOpen] = useState(false);
  const [isHrlistDrawerOpen, setIsHrlistDrawerOpen] = useState(false);
  const [isProlistDrawerOpen, setIsProlistDrawerOpen] = useState(false);
  const [isprocessCostAnalysisOpen, setisprocessCostAnalysisOpen] = useState(
    false
  );
  const [UsedItemObjects, setUsedItemObjects] = useState([]);
  const [UnUsedItemObjects, setUnUsedItemObjects] = useState([]);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [BusyObjects, setBusyObjects] = useState([]);
  const [AvailableObjects, setAvailableObjects] = useState([]);
  const [CompletedProcessObj, setCompletedProcessObj] = useState([]);
  const [InprogProcessObj, setInprogProcessObj] = useState([]);
  const [BacklogProcessObj, setBacklogProcessObj] = useState([]);
  const [totalInventory, setTotalInventory] = useState([]);
  const [processRawMaterialCost, setProcessRawMaterialCost] = useState([]);
  const [processExecutionCounts, setProcessExecutionCounts] = useState({});
  const ContainerHeight = 340;

  const CContainerHeight = 210;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3005/rawMaterial");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];
      const totalRawMaterials = dataArray.length;

      const usedItemsCount = dataArray.reduce(
        (count, item) =>
          count +
          (item.processRecords && item.processRecords.length >= 1 ? 1 : 0),
        0
      );

      const unusedItemsCount = dataArray.reduce(
        (count, item) =>
          count +
          (!item.processRecords || item.processRecords.length === 0 ? 1 : 0),
        0
      );

      const itemProcessCosts = {};

      const processedDataArray = dataArray.map((item) =>
        item.processRecords.map((processRecord) => {
          const { price, Name } = item;
          const { processId, processName, usedQuan } = processRecord;

          // Create a unique key for each combination of itemName, processId, and processName
          const key = `${Name}_${processId}_${processName}`;

          if (!itemProcessCosts[key]) {
            itemProcessCosts[key] = {
              ...item,
              itemName: Name,
              itemPrice: price,
              processId: processId,
              processName: processName,
              usedQuan: usedQuan,
              totalCost: usedQuan * price,
            };
          } else {
            // Increment totalCost based on the existing entry in itemProcessCosts
            itemProcessCosts[key].totalCost += usedQuan * price;
          }

          // Return a value from the inner map
          return processRecord; // You can modify this return statement based on your needs
        })
      );

      console.log("processedDataArray", processedDataArray);
      // Convert the object values into an array
      const itemProcessCostsArray = Object.values(itemProcessCosts);

      const unusedItems = dataArray.filter(
        (item) => !item.processRecords || item.processRecords.length === 0
      );

      const itemUnProcessCosts = {};

      unusedItems.forEach((item) => {
        const { Name, price } = item;
        const totalCost = 0; // Since the item is unused, set the totalCost to 0

        // Create a unique key for each unused item
        const key = `${Name}_unused`;

        if (!itemUnProcessCosts[key]) {
          itemUnProcessCosts[key] = {
            ...item,
            itemName: Name,
            processId: "N/A",
            processName: "Unused",
            usedQuan: 0,
            totalCost: totalCost,
          };
        } else {
          itemUnProcessCosts[key].totalCost += totalCost;
        }
      });

      // Convert the object values into an array
      const itemUnProcessCostsArray = Object.values(itemUnProcessCosts);

      setTotalRawMaterials(totalRawMaterials);
      setUsedItems(usedItemsCount);
      setUnusedItems(unusedItemsCount);
      setUsedItemObjects(itemProcessCostsArray);
      setUnUsedItemObjects(itemUnProcessCostsArray);
      setTotalInventory(dataArray);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  }, []);

  const fetchHRData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3005/humanresource");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];
      const totalEmployees = dataArray.length;

      const availableEmployees = dataArray.filter(
        (item) => item.tag === "available"
      );
      const busyEmployees = dataArray.filter((item) => item.tag === "Busy");

      const availableEmployeesCount = availableEmployees.length;
      const busyEmployeesCount = busyEmployees.length;

      setTotalEmployees(totalEmployees);
      setAvailableEmployees(availableEmployeesCount);
      setBusyEmployees(busyEmployeesCount);
      setBusyObjects(busyEmployees);
      setAvailableObjects(availableEmployees);
    } catch (error) {
      console.error("Error fetching HR data:", error);
    }
  }, []);

  const fetchComProcessData = useCallback(async () => {
    try {
      const completedResponse = await axios.get(
        "http://localhost:3005/completed-process"
      );
      const rawData = completedResponse.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setCompletedProcessesCount(dataArray.length);
      setCompletedProcessObj(dataArray);
      console.log("completed process", dataArray);
    } catch (error) {
      console.error("Error fetching completed process:", error);
    }
  }, []);

  const fetchInProgProcessData = useCallback(async () => {
    try {
      const inProgressResponse = await axios.get(
        "http://localhost:3005/inprogress-process"
      );
      const rawData = inProgressResponse.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setInProgressProcessesCount(dataArray.length);
      setInprogProcessObj(dataArray);

      console.log("dataArray", dataArray);
    } catch (error) {
      console.error("Error fetching inprogress process:", error);
    }
  }, []);

  const fetchExecutedProcess = useCallback(async () => {
    try {
      const executedResponse = await axios.get(
        "http://localhost:3005/executed-process"
      );
      const rawData = executedResponse.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setExecutedData(dataArray);
      console.log("executed processes", executedData);
    } catch (error) {
      console.error("Error fetching executed process:", error);
    }
  }, []);

  const fetchBackLogProcess = useCallback(async () => {
    try {
      const backlogResponse = await axios.get("http://localhost:3005/process");
      const backlogData = backlogResponse.data.data;
      const backlogArray = Array.isArray(backlogData) ? backlogData : [];

      // Fetch executed processes
      const executedResponse = await axios.get(
        "http://localhost:3005/executed-process"
      );
      const exerawData = executedResponse.data.data;
      const exedataArray = Array.isArray(exerawData) ? exerawData : [];

      // Find processes in backlog that haven't been executed
      const backlogNotExecuted = backlogArray.filter((backlogItem) => {
        return !exedataArray.some(
          (executedItem) => executedItem.key === backlogItem._id
        );
      });

      // Set total processes and backlog processes count
      setTotalProcessesCount(backlogArray.length);
      setTotalProcesses(backlogArray);

      setBacklogProcessObj(backlogNotExecuted);
      setBacklogProcessesCount(backlogNotExecuted.length);

      // Fetch inventory data
      const inventoryResponse = await axios.get(
        "http://localhost:3005/rawMaterial"
      );
      let inventory = inventoryResponse.data.data;
      inventory = Array.isArray(inventory) ? inventory : [];

      const processExecutionCounts = [];

      // Initialize a flag to keep track of changes made in inventory
      let changesMade;

      do {
        changesMade = false;

        backlogArray.forEach((process) => {
          process.rawMaterial.forEach((item) => {
            const matchingInventoryIndex = inventory.findIndex(
              (invItem) => item.id === invItem._id
            );

            if (matchingInventoryIndex !== -1) {
              const matchingInventoryItem = inventory[matchingInventoryIndex];

              if (item.quan <= matchingInventoryItem.quan) {
                const updatedQuantity = matchingInventoryItem.quan - item.quan;

                // Update the quantity in the copied inventory
                inventory[matchingInventoryIndex].quan = updatedQuantity;

                // Update the canExecuteCount for the current process
                process.canExecuteCount = (process.canExecuteCount || 0) + 1;

                changesMade = true;
              }
            }
          });
        });
      } while (changesMade);

      // Generate execution counts based on the final canExecuteCount values
      backlogArray.forEach((process) => {
        let status = "stock shortage";

        if (process.canExecuteCount > 0) {
          status = "stock available";
        }

        const executionInfo = {
          canExecuteCount: process.canExecuteCount || 0,
          pid: process.pid,
          name: process.name,
          status,
        };

        processExecutionCounts.push(executionInfo);
      });

      setProcessExecutionCounts(processExecutionCounts);

      console.log("processExecutionCounts", processExecutionCounts);
    } catch (error) {
      console.error("Error fetching backlog process:", error);
    }
  }, []);

  useEffect(() => {
    const fetchallData = async () => {
      try {
        // Fetch all necessary data here
        await Promise.all([
          fetchData(),
          fetchHRData(),
          fetchComProcessData(),
          fetchInProgProcessData(),
          fetchBackLogProcess(),
          fetchExecutedProcess(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchallData();
  }, [
    fetchData,
    fetchHRData,
    fetchComProcessData,
    fetchInProgProcessData,
    fetchExecutedProcess,
  ]);

  useEffect(() => {
    if (Array.isArray(totalDefProcesses)) {
      const processesWithRawMaterialDetails = totalDefProcesses.map(
        (process) => {
          const rawMaterials = process.rawMaterial || [];
          let totalRawMaterialCost = 0;
          let totalRawMaterialQuan = 0;
          let itemQuan = 0;
          let itemPrice = 0;
          let itemName = "";
          let itemTotalCost = 0;
          let rawMaterialDetails = [];

          rawMaterials.map((material) => {
            itemQuan = material.quan || 0;
            itemPrice = material.price || 0;
            itemName = material.Name;
            itemTotalCost = itemQuan * itemPrice;

            totalRawMaterialCost += itemTotalCost;
            totalRawMaterialQuan += itemQuan;

            rawMaterialDetails.push({
              itemName,
              itemQuan,
              itemPrice,
              itemTotalCost,
            });
          });

          return {
            processName: process.name,
            processId: process.pid,
            rawMaterialDetails,
            totalRawMaterialCost,
            totalRawMaterialQuan,
          };
        }
      );

      setProcessRawMaterialCost(processesWithRawMaterialDetails);
    }

    console.log("processRawMaterialCost", processRawMaterialCost);
  }, [totalDefProcesses]);

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const ppdata = {
    datasets: [
      {
        data: [
          completedProcessesCount,
          inProgressProcessesCount,
          backlogProcessesCount,
        ],
        backgroundColor: ["#061161", "#F3904F", "#F0ECE5"],
        borderWidth: 2,
        borderColor: "transparent",
        spacing: 1,
      },
    ],
  };
  const hrdata = {
    datasets: [
      {
        data: [availableEmployees, busyEmployees],
        backgroundColor: ["#061161", "#F3904F"],
        borderWidth: 2,
        borderColor: "transparent",
        spacing: 1,
      },
    ],
  };
  const Indata = {
    datasets: [
      {
        data: [usedItems, unusedItems],
        backgroundColor: ["#061161", "#F3904F"],
        borderWidth: 2,
        borderColor: "transparent",
        spacing: 1,
      },
    ],
  };

  const chartData = [];

  if (Array.isArray(totalDefProcesses)) {
    totalDefProcesses.forEach((process) => {
      const humanResources = process.humanResource || [];
      const hrHours = humanResources.length;

      chartData.push({
        processId: `${process.pid.toUpperCase()} ${capitalizeFirstLetter(
          process.name
        )}`,
        hours: hrHours,
        type: "HR(s)",
      });

      const rawMaterials = process.rawMaterial || [];
      const rawHours = rawMaterials.length;

      chartData.push({
        processId: `${process.pid.toUpperCase()} ${capitalizeFirstLetter(
          process.name
        )}`,
        hours: rawHours,
        type: "Material(s)",
      });
    });
  } else {
    console.error("totalDefProcesses is not an array.");
  }

  const processStatsConfig = {
    data: chartData,
    isStack: true,
    xField: "processId",
    yField: "hours",
    seriesField: "type",
    label: {
      position: "middle",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
    color: ({ type }) => {
      if (type === "HR(s)") {
        return "#faa46e";
      } else if (type === "Material(s)") {
        return "#360a5a";
      }
    },
    flipXY: true,
  };

  const Optimizationcolumns = [
    {
      title: "Process Id",
      dataIndex: "pid",
      key: "pid",
      render: (_, record) => (
        <span>
          <FcProcess
            style={{
              color: "#360a5a",
              width: "15px",
              height: "20px",
              marginRight: "5px",
            }}
          />
          <span style={{ color: "green" }}>
            {`${record.pid}`.toUpperCase()}{" "}
          </span>
        </span>
      ),
    },
    {
      title: "Process Name",
      dataIndex: "name",
      // render: (_, record) => (
      //   <span style={{ color: "#360a5a" }}>
      //     {capitalizeFirstLetter(record.name)}
      //   </span>
      // ),
    },
    {
      title: "Possible Executions",
      dataIndex: "executionCount",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        let tagColor = "green";
        let textColor = "green";

        if (text === "stock shortage") {
          tagColor = "#ededed";
          textColor = "#000";
        }

        return (
          <Tag style={{ color: textColor }} color={tagColor}>
            {text}
          </Tag>
        );
      },
    },
  ];

  // Function to transform processExecutionCounts object into table data
  const generateTableData = () => {
    const capitalizeFirstLetter = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const tableData = Object.keys(processExecutionCounts).map((processId) => ({
      executionCount: processExecutionCounts[processId].canExecuteCount,
      pid: processExecutionCounts[processId].pid.toUpperCase(),
      name: capitalizeFirstLetter(processExecutionCounts[processId].name),
      status: processExecutionCounts[processId].status,
    }));
    return tableData;
  };

  const filteredItems = totalInventory.filter(
    (item) => item.quan < item.itemlimit
  );

  const handleInButtonClick = () => {
    setIsInlistDrawerOpen(true);
  };

  const handleInCloseDrawer = () => {
    setIsInlistDrawerOpen(false);
  };

  const handleHrButtonClick = () => {
    setIsHrlistDrawerOpen(true);
  };

  const handleHrCloseDrawer = () => {
    setIsHrlistDrawerOpen(false);
  };

  const handleProButtonClick = () => {
    setIsProlistDrawerOpen(true);
  };

  const handleProCloseDrawer = () => {
    setIsProlistDrawerOpen(false);
  };

  const handleProcessCostingDrawer = () => {
    setisprocessCostAnalysisOpen(true);
  };

  const handleProcessCostingDrawerClose = () => {
    setisprocessCostAnalysisOpen(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const Inlist = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{
        padding: "5px",
        background: "linear-gradient(140deg, #f5f0fa, #fafafa,#faf1eb 100%)",
      }}
    >
      <List>
        <Card
          title="Used Items Details"
          style={{
            width: "100%",
            height: "43vh",
            borderRadius: "10px",
            marginTop: "20px",
            fontSize: "8px",
            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #f5f0fa, #faf1eb 100%)",
          }}
        >
          <Table
            dataSource={UsedItemObjects.map((record) => ({
              key: `${record.Name}_${record.processId}_${record.processName}`,
              Name: record.Name,
              processId: record.processId,
              processName: record.processName,
              usedQuan: record.usedQuan,
              price: record.price,
              totalCost: record.totalCost,
            }))}
            columns={[
              {
                title: "Item Name",
                dataIndex: "Name",
              },
              {
                title: "Item Price",
                dataIndex: "price",
              },
              {
                title: "Process ID",
                dataIndex: "processId",
              },
              {
                title: "Process Name",
                dataIndex: "processName",
              },
              {
                title: "Used Quan",
                dataIndex: "usedQuan",
              },
              {
                title: "Total Item Cost",
                dataIndex: "totalCost",
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 160,
            }}
            pagination={false}
            style={{ background: "transparent" }}
          />
        </Card>
      </List>

      <List>
        <Card
          title="Unused Items Details"
          style={{
            width: "100%",
            height: "50vh",
            borderRadius: "10px",
            fontSize: "12px",
            marginTop: "20px",
            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #faf1eb, #f5f0fa 100%)",
          }}
        >
          <Table
            dataSource={UnUsedItemObjects}
            columns={[
              {
                title: "Item Name",
                dataIndex: "Name",
              },
              {
                title: "Item Unit",
                dataIndex: "unit",
              },
              {
                title: "Item Price",
                dataIndex: "price",
              },
              {
                title: "Item Quantity",
                dataIndex: "quan",
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 250,
            }}
            pagination={false}
            style={{ background: "transparent" }}
          />
        </Card>
      </List>
    </Box>
  );

  const Hrlist = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{
        padding: "5px",
        background: "linear-gradient(140deg, #f5f0fa, #fafafa,#faf1eb 100%)",
      }}
    >
      <List>
        <Card
          title="Busy Employee Details"
          style={{
            width: "100%",
            height: "43vh",
            borderRadius: "10px",
            marginTop: "20px",
            fontSize: "8px",

            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #f5f0fa, #faf1eb 100%)",
          }}
        >
          <Table
            dataSource={BusyObjects.flatMap((record) =>
              record.HRprocessRecords.map((processRecord) => ({
                key: `${record.name}_${processRecord.processId}_${processRecord.processName}`,
                name: record.name,
                processId: processRecord.processId,
                processName: processRecord.processName,
                duration: processRecord.duration,
                desgn: record.desgn,
              }))
            )}
            columns={[
              {
                title: "Emp Name",
                dataIndex: "name",
              },
              {
                title: "Designation",
                dataIndex: "desgn",
              },
              {
                title: "Process ID",
                dataIndex: "processId",
              },
              {
                title: "Process Name",
                dataIndex: "processName",
              },
              {
                title: "Duration",
                dataIndex: "duration",
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 165,
            }}
            pagination={false}
            style={{ background: "transparent" }}
          />
        </Card>
      </List>

      <List>
        <Card
          title="Available Employee Details"
          style={{
            width: "100%",
            height: "50vh",
            borderRadius: "10px",
            fontSize: "12px",
            marginTop: "20px",
            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #faf1eb, #f5f0fa 100%)",
          }}
        >
          <Table
            dataSource={AvailableObjects.map((processRecord) => ({
              key: `${processRecord.name}_${processRecord.desgn}`,
              name: processRecord.name,
              designation: processRecord.desgn,
            }))}
            columns={[
              {
                title: "Emp Name",
                dataIndex: "name",
              },
              {
                title: "Designation",
                dataIndex: "designation",
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 250,
            }}
            pagination={false}
            style={{ background: "transparent" }}
          />
        </Card>
      </List>
    </Box>
  );

  const Prolist = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{
        padding: "5px",
        background: "linear-gradient(140deg, #f5f0fa, #fafafa,#faf1eb 100%)",
      }}
    >
      <List>
        <Card
          title="Completed Process"
          style={{
            width: "100%",
            height: "33vh",
            borderRadius: "10px",
            fontSize: "8px",

            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #f5f0fa, #faf1eb 100%)",
          }}
        >
          <Table
            dataSource={CompletedProcessObj.map((processRecord) => ({
              key: `${processRecord.name}_${processRecord.pid}`,
              name: processRecord.name,
              pid: processRecord.pid,
              duration: processRecord.duration,
              rawMaterial: processRecord.rawMaterial.map((material) => ({
                itemName: material.Name,
                itemQuan: material.quan,
              })),
              humanResource: processRecord.humanResource.map((resource) => ({
                empName: resource.name,
                empDesgn: resource.desgn,
              })),
            }))}
            columns={[
              {
                title: "Name",
                width: "fit-content",
                dataIndex: "name",
              },
              {
                title: "ID",
                width: "fit-content",
                dataIndex: "pid",
              },
              {
                title: "Duration",
                width: "fit-content",
                dataIndex: "duration",
              },
              {
                title: "Raw Material",
                dataIndex: "rawMaterial",
                width: 120,
                render: (rawMaterial) => (
                  <List
                    size="small"
                    dataSource={rawMaterial}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.itemName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.itemQuan}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                title: "Employees",
                dataIndex: "humanResource",
                width: 110,
                render: (humanResource) => (
                  <List
                    size="small"
                    dataSource={humanResource}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.empName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.empDesgn}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 135,
            }}
            pagination={false}
            style={{
              background: "transparent",
              marginTop: "-15px",
            }}
          />
        </Card>
      </List>

      <List>
        <Card
          title="In-Progress Process"
          style={{
            width: "100%",
            height: "31vh",
            borderRadius: "10px",
            fontSize: "8px",
            marginTop: "20px",
            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #f5f0fa, #faf1eb 100%)",
          }}
        >
          <Table
            dataSource={InprogProcessObj.map((processRecord) => ({
              key: `${processRecord.name}_${processRecord.pid}`,
              name: processRecord.name,
              pid: processRecord.pid,
              duration: processRecord.duration,
              rawMaterial: processRecord.rawMaterial.map((material) => ({
                itemName: material.Name,
                itemQuan: material.quan,
              })),
              humanResource: processRecord.humanResource.map((resource) => ({
                empName: resource.name,
                empDesgn: resource.desgn,
              })),
            }))}
            columns={[
              {
                title: "Name",
                width: "fit-content",
                dataIndex: "name",
              },
              {
                title: "ID",
                width: "fit-content",
                dataIndex: "pid",
              },
              {
                title: "Duration",
                width: "fit-content",
                dataIndex: "duration",
              },
              {
                title: "Raw Material",
                dataIndex: "rawMaterial",
                width: 120,
                render: (rawMaterial) => (
                  <List
                    size="small"
                    dataSource={rawMaterial}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.itemName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.itemQuan}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                title: "Employees",
                dataIndex: "humanResource",
                width: 110,
                render: (humanResource) => (
                  <List
                    size="small"
                    dataSource={humanResource}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.empName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.empDesgn}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 120,
            }}
            pagination={false}
            style={{
              background: "transparent",
              marginTop: "-15px",
            }}
          />
        </Card>
      </List>

      <List>
        <Card
          title="Backlog Process"
          style={{
            width: "100%",
            height: "29vh",
            borderRadius: "10px",
            fontSize: "12px",
            marginTop: "20px",
            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #faf1eb, #f5f0fa 100%)",
          }}
        >
          <Table
            dataSource={BacklogProcessObj.map((processRecord) => ({
              key: `${processRecord.name}_${processRecord.pid}`,
              name: processRecord.name,
              pid: processRecord.pid,
              duration: processRecord.duration,
              rawMaterial: processRecord.rawMaterial.map((material) => ({
                itemName: material.Name,
                itemQuan: material.quan,
              })),
              humanResource: processRecord.humanResource.map((resource) => ({
                empName: resource.name,
                empDesgn: resource.desgn,
              })),
            }))}
            columns={[
              {
                title: "Name",
                width: "fit-content",
                dataIndex: "name",
              },
              {
                title: "ID",
                width: "fit-content",
                dataIndex: "pid",
              },
              {
                title: "Duration",
                width: "fit-content",
                dataIndex: "duration",
              },
              {
                title: "Raw Material",
                dataIndex: "rawMaterial",
                width: 120,
                render: (rawMaterial) => (
                  <List
                    size="small"
                    dataSource={rawMaterial}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.itemName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.itemQuan}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                title: "Employees",
                dataIndex: "humanResource",
                width: 110,
                render: (humanResource) => (
                  <List
                    size="small"
                    dataSource={humanResource}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.empName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.empDesgn}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
            size="small"
            scroll={{
              x: 500,
              y: 120,
            }}
            pagination={false}
            style={{ background: "transparent", marginTop: "-15px" }}
          />
        </Card>
      </List>
    </Box>
  );

  const ProCostAnalysislist = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{
        padding: "5px",
        background: "linear-gradient(140deg, #f5f0fa, #fafafa,#faf1eb 100%)",
      }}
    >
      <List>
        <Card
          title="Process Details"
          style={{
            width: "100%",
            height: "96vh",
            borderRadius: "10px",
            fontSize: "12px",
            marginTop: "20px",
            boxShadow: "0 1px 8px #f3edf7",
            background: "linear-gradient(140deg, #faf1eb, #f5f0fa 100%)",
          }}
        >
          <Table
            dataSource={totalDefProcesses.map((processRecord) => ({
              key: `${processRecord.name}_${processRecord.pid}`,
              name: processRecord.name,
              pid: processRecord.pid,
              duration: processRecord.duration,
              rawMaterial: processRecord.rawMaterial.map((material) => ({
                itemName: material.Name,
                itemQuan: material.quan,
              })),
              humanResource: processRecord.humanResource.map((resource) => ({
                empName: resource.name,
                empDesgn: resource.desgn,
              })),
            }))}
            columns={[
              {
                title: "Name",
                width: "fit-content",
                dataIndex: "name",
              },
              {
                title: "ID",
                width: "fit-content",
                dataIndex: "pid",
              },
              {
                title: "Duration",
                width: 80,
                dataIndex: "duration",
              },
              {
                title: "Raw Material",
                dataIndex: "rawMaterial",
                width: 200,
                render: (rawMaterial) => (
                  <List
                    size="small"
                    dataSource={rawMaterial}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.itemName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.itemQuan}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                title: "Employees",
                dataIndex: "humanResource",
                width: 300,
                render: (humanResource) => (
                  <List
                    size="small"
                    dataSource={humanResource}
                    renderItem={(material) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{material.empName}</span>
                        <span style={{ color: "#F3904F" }}>
                          {material.empDesgn}
                        </span>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
            size="small"
            scroll={{
              x: 700,
              y: 500,
            }}
            pagination={false}
            style={{ background: "transparent", marginTop: "-15px" }}
          />
        </Card>
      </List>
    </Box>
  );

  return (
    <>
      <BodyWrapper>
        <Sidemenu />
        <Header />
        <MainContainer>
          <Container1>
            {/*Inventory Overview */}
            <CardContainer>
              <Card
                style={{
                  height: "145px",
                  borderRadius: "10px",
                  textAlign: "right",
                  boxShadow: "0 1px 8px #f3edf7",
                  background: "transparent",
                  // background:
                  //   "linear-gradient(140deg, #fafafa, #fafafa, #faece3 120%)",
                }}
              >
                <Paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineInventory2
                    style={{
                      width: "15px",
                      height: "15px",
                      marginTop: "2px",
                      marginRight: "10px",
                      color: "#360a5a",
                    }}
                  />
                  <span style={{ marginRight: "5px" }}>Raw Material</span>
                </Paragraph>

                {Indata.length === 0 ? (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No Rawmaterials"
                  />
                ) : (
                  <>
                    <div style={{ position: "relative" }}>
                      <Doughnut
                        data={Indata}
                        options={{
                          cutout: 70,
                          radius: 25,
                        }}
                        width={100}
                        height={100}
                        style={{
                          position: "absolute",
                          marginTop: "22%",
                          left: "85%",
                          transform: "translate(-60%, -60%)",
                          backgroundColor: "transparent",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        fontSize: "28px",
                        color: "#faa46e",
                      }}
                    >
                      {totalRawMaterials}
                      <span
                        style={{
                          fontSize: "10px",
                          display: "block",
                          marginTop: "-5%",
                        }}
                      >
                        Items
                      </span>
                      <Button
                        type="link"
                        onClick={handleInButtonClick}
                        style={{
                          fontSize: "12px",
                          display: "block",
                          marginTop: "5%",
                          marginLeft: "-8%",
                          color: "#360a5a",
                        }}
                      >
                        View
                      </Button>
                      <Drawer
                        anchor="right"
                        open={isInlistDrawerOpen}
                        onClose={handleInCloseDrawer}
                        // hideBackdrop={true}
                      >
                        {Inlist("right")}
                      </Drawer>
                    </div>

                    <div
                      style={{
                        marginTop: "-30px",
                        float: "right",
                        width: "fit-content",
                      }}
                    >
                      <Tag
                        style={{
                          fontSize: "7px",
                          fontWeight: "bold",
                          color: "#061161",
                          border: "none",
                        }}
                      >
                        {usedItems} Used
                      </Tag>
                      <Tag
                        style={{
                          fontSize: "7px",
                          fontWeight: "bold",
                          color: "#F3904F",
                          border: "none",
                        }}
                      >
                        {unusedItems} Un-Used
                      </Tag>
                    </div>
                  </>
                )}
              </Card>
            </CardContainer>

            {/* Human Resource Overview */}
            <CardContainer>
              <Card
                style={{
                  height: "145px",
                  borderRadius: "10px",
                  textAlign: "right",
                  boxShadow: "0 1px 8px #f3edf7",
                  background: "transparent",
                  // background:
                  //   "linear-gradient(140deg, #fafafa, #fafafa, #f4ebfc 120%)",
                }}
              >
                <Paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FiUsers
                    style={{
                      width: "15px",
                      height: "15px",
                      marginTop: "2px",
                      marginRight: "10px",
                      color: "#360a5a",
                    }}
                  />
                  <span style={{ marginRight: "5px" }}>HR Resource</span>
                </Paragraph>
                <div style={{ position: "relative" }}>
                  <Doughnut
                    data={hrdata}
                    options={{
                      cutout: 70,
                      radius: 25,
                    }}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      marginTop: "22%",
                      left: "85%",
                      transform: "translate(-60%, -60%)",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "28px",
                    color: "#faa46e",
                  }}
                >
                  {totalEmployees}
                  <span
                    style={{
                      fontSize: "10px",
                      display: "block",
                      marginTop: "-5%",
                    }}
                  >
                    Employees
                  </span>
                  <Button
                    type="link"
                    onClick={handleHrButtonClick}
                    style={{
                      fontSize: "12px",
                      display: "block",
                      marginTop: "5%",
                      marginLeft: "-8%",
                      color: "#360a5a",
                    }}
                  >
                    View
                  </Button>
                  <Drawer
                    anchor="right"
                    open={isHrlistDrawerOpen}
                    onClose={handleHrCloseDrawer}
                  >
                    {Hrlist("right")}
                  </Drawer>
                </div>
                <div
                  style={{
                    marginTop: "-30px",
                    float: "right",
                    width: "fit-content",
                  }}
                >
                  <Tag
                    style={{
                      fontSize: "7px",
                      fontWeight: "bold",
                      color: "#061161",
                      border: "none",
                    }}
                  >
                    {availableEmployees} Available
                  </Tag>
                  <Tag
                    style={{
                      fontSize: "7px",
                      fontWeight: "bold",
                      color: "#F3904F",
                      border: "none",
                    }}
                  >
                    {busyEmployees} Busy
                  </Tag>
                </div>
              </Card>
            </CardContainer>

            {/* Process Overview */}
            <CardContainer>
              <Card
                style={{
                  height: "145px",
                  borderRadius: "10px",
                  textAlign: "right",
                  boxShadow: "0 1px 8px #f3edf7",
                  background: "transparent",
                  // background:
                  //   "linear-gradient(140deg, #fafafa, #fafafa, #faece3 120%)",
                }}
              >
                <Paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VscServerProcess
                    style={{
                      width: "15px",
                      height: "15px",
                      marginTop: "2px",
                      marginRight: "10px",
                      color: "#360a5a",
                    }}
                  />
                  <span style={{ marginRight: "5px" }}>Processes </span>
                </Paragraph>
                <div style={{ position: "relative" }}>
                  <Doughnut
                    data={ppdata}
                    options={{
                      cutout: 70,
                      radius: 25,
                    }}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      marginTop: "22%",
                      left: "85%",
                      transform: "translate(-60%, -60%)",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "28px",
                    color: "#faa46e",
                  }}
                >
                  {totalProcesses}
                  <span
                    style={{
                      fontSize: "10px",
                      display: "block",
                      marginTop: "-5%",
                    }}
                  >
                    Processes
                  </span>
                  <Button
                    type="link"
                    onClick={handleProButtonClick}
                    style={{
                      fontSize: "12px",
                      display: "block",
                      marginTop: "5%",
                      marginLeft: "-8%",
                      color: "#360a5a",
                    }}
                  >
                    View
                  </Button>
                  <Drawer
                    anchor="right"
                    open={isProlistDrawerOpen}
                    onClose={handleProCloseDrawer}
                  >
                    {Prolist("right")}
                  </Drawer>
                </div>
                <div
                  style={{
                    marginTop: "-30px",
                    float: "right",
                    width: "fit-content",
                  }}
                >
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#061161",
                      border: "none",
                    }}
                  >
                    {completedProcessesCount}{" "}
                    <CheckCircleOutlined twoToneColor="#061161" />
                  </Tag>
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#F3904F",
                      border: "none",
                    }}
                    u
                  >
                    {inProgressProcessesCount}{" "}
                    <SyncOutlined spin style={{ color: "#F3904F" }} />
                  </Tag>
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "grey",
                      border: "none",
                    }}
                  >
                    {backlogProcessesCount} <MinusCircleOutlined color="grey" />
                  </Tag>
                </div>
              </Card>
            </CardContainer>

            {/* Inventory Reorders */}
            <Container2>
              <CardContainer>
                <Card
                  style={{
                    height: "410px",
                    width: "270px",
                    borderRadius: "10px",
                    textAlign: "center",
                    boxShadow: "0 8px 8px #f0edf2",
                    backgroundColor: "transparent",
                  }}
                >
                  <Paragraph>Inventory Reorders</Paragraph>
                  <div style={{ position: "relative", textAlign: "left" }}>
                    {filteredItems.length === 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: ContainerHeight,
                        }}
                      >
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No Reorders"
                        />
                      </div>
                    )}
                    {filteredItems.length > 0 && (
                      <List>
                        <VirtualList
                          data={filteredItems}
                          height={ContainerHeight}
                        >
                          {(item) => (
                            <List.Item key={item.email}>
                              <List.Item.Meta
                                avatar={
                                  <CgReorder
                                    style={{
                                      color: "#F3904F",
                                      width: "20px",
                                      height: "30px",
                                    }}
                                  />
                                }
                                title={
                                  <>
                                    <Link to="/viewrawmaterial">
                                      <div style={{ width: "100px" }}>
                                        {" "}
                                        {item.Name}
                                      </div>
                                    </Link>
                                  </>
                                }
                              />

                              <div>
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {item.quan}{" "}
                                </span>
                                <span style={{ color: "#f3904f" }}>|</span>
                                <span style={{ color: "green" }}>
                                  {" "}
                                  {item.itemlimit}
                                </span>
                              </div>
                            </List.Item>
                          )}
                        </VirtualList>
                      </List>
                    )}
                  </div>
                </Card>
              </CardContainer>
            </Container2>
          </Container1>

          {/* Process Statistics */}
          <Container3>
            <CardContainer>
              <Card
                style={{
                  height: "250px",
                  width: "815px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 8px 8px #f0edf2",
                  backgroundColor: "transparent",
                }}
              >
                <Paragraph1>Process Statistics</Paragraph1>
                <div style={{ position: "relative", height: "200px" }}>
                  {processStatsConfig.data &&
                  processStatsConfig.data.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Stats"
                      />
                    </div>
                  ) : (
                    <Column {...processStatsConfig} />
                  )}
                </div>
              </Card>
            </CardContainer>
          </Container3>

          <Container4>
            {/* Process Cost Analysis */}
            <CardContainer>
              <Card
                style={{
                  height: "270px",
                  width: "400px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 8px 8px #f0edf2",
                  backgroundColor: "transparent",
                }}
              >
                <Paragraph1>Process Cost Analysis</Paragraph1>
                <div style={{ position: "relative", textAlign: "left" }}>
                  {processRawMaterialCost.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: CContainerHeight,
                      }}
                    >
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Analysis"
                      />
                    </div>
                  )}
                  {processRawMaterialCost.length > 0 && (
                    <List>
                      <VirtualList
                        data={processRawMaterialCost}
                        height={CContainerHeight}
                      >
                        {(item) => (
                          <List.Item key={item.email}>
                            <Drawer
                              anchor="right"
                              open={isprocessCostAnalysisOpen}
                              onClose={handleProcessCostingDrawerClose}
                            >
                              {ProCostAnalysislist("right")}
                            </Drawer>
                            <List.Item.Meta
                              avatar={
                                <FcProcess
                                  style={{
                                    color: "#360a5a",
                                    width: "15px",
                                    height: "20px",
                                  }}
                                />
                              }
                              title={
                                <Link onClick={handleProcessCostingDrawer}>
                                  <span style={{ color: "green" }}>
                                    {`${item.processId}`.toUpperCase()}{" "}
                                  </span>
                                  {capitalizeFirstLetter(item.processName)}
                                </Link>
                              }
                            />
                            <div>
                              {item.totalRawMaterialCost}{" "}
                              <span style={{ fontSize: "7px" }}>
                                (Aggregate Cost)
                              </span>
                            </div>
                          </List.Item>
                        )}
                      </VirtualList>
                    </List>
                  )}
                </div>
              </Card>
            </CardContainer>

            <CardContainer>
              <Card
                style={{
                  height: "270px",
                  width: "710px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 8px 8px #f0edf2",
                  backgroundColor: "transparent",
                }}
              >
                <Paragraph1>Optimization</Paragraph1>
                <div
                  style={{
                    position: "relative",
                    height: "200px",
                    background: "transparent",
                  }}
                >
                  <Table
                    columns={Optimizationcolumns}
                    dataSource={generateTableData()}
                    size="middle"
                    scroll={{
                      y: 160,
                    }}
                    pagination={false}
                    style={{
                      background: "transparent",
                    }}
                  />
                </div>
              </Card>
            </CardContainer>
          </Container4>
        </MainContainer>
      </BodyWrapper>
    </>
  );
}
export default Dashboard;
