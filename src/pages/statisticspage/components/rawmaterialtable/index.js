import React, { useEffect, useState } from "react";
import { Table, Divider } from "antd";
import { BodyWrapper } from "./index.styled";
import Paragraph from "antd/es/skeleton/Paragraph";
import { CardContainer } from "./index.styled";
import { Card, Space } from "antd";
import { Head } from "../rawmaterialchart/index.styled";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "Name",
  },
  {
    title: "Process ID",
    dataIndex: "processId",
  },
  {
    title: "Used Quantity",
    dataIndex: "usedquantity",
  },
  {
    title: "Total Quantity",
    dataIndex: "totalquantity",
  },
  {
    title: "Updated Quantity",
    dataIndex: "updatedquantity",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data = [
  {
    key: "1",
    itemname: "Chicken",
    processId: "CHP-1",
    usedquantity: "12kg",
    totalquantity: "200kg",
    updatedquantity: "188kg",
    status: "Available",
  },
  {
    key: "2",
    itemname: "Mango",
    processId: "RHP-2",
    usedquantity: "3kg",
    totalquantity: "200kg",
    updatedquantity: "197kg",
    status: "Available",
  },
  {
    key: "2",
    itemname: "Rice",
    processId: "RHP-2",
    usedquantity: "19kg",
    totalquantity: "200kg",
    updatedquantity: "181kg",
    status: "Available",
  },
  {
    key: "2",
    itemname: "Careem",
    processId: "RHP-2",
    usedquantity: "5kg",
    totalquantity: "200kg",
    updatedquantity: "195kg",
    status: "Available",
  },
];
const customRowClassName = (record, index) => {
  return index % 2 === 0;
};

function StatsTable() {
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [humanResourceData, setHumanResourceData] = useState([]);
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
      const rawMaterialArray = processesArray.map(
        (process) => process.rawmaterial
      );
      setRawMaterialData(rawMaterialArray);
      console.log("processesArray in chart", processesArray );
      console.log("rawMaterialData in chart", rawMaterialData );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <CardContainer>
      <Head>Resource Inventory Table View</Head>
      {/* <Card
        title="Resource Inventory Table View"
        style={{
          width: "100%",
          height: "280px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
          overflow:"scroll",
        }}
      > */}
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        rowClassName={customRowClassName}
      />
      <Space
        direction="vertical"
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "row",
        }}
      />
      {/* </Card> */}
    </CardContainer>
  );
}
export default StatsTable;
