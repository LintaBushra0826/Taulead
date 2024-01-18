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
    title: "Item Name",
    dataIndex: "ItemName",
  },
  {
    title: "Item Unit",
    dataIndex: "ItemUnit",
  },
  {
    title: "Process ID",
    dataIndex: "ProcessId",
  },
  {
    title: "Process Name",
    dataIndex: "ProcessName",
  },
  {
    title: "Total Quantity",
    dataIndex: "TotalQuan",
  },
  {
    title: "Used Quantity",
    dataIndex: "UsedQuan",
  },
  {
    title: "Updated Inventory",
    dataIndex: "UpdatedQuan",
  },
  // {
  //   title: "Available Quantity",
  //   dataIndex: "availQuan",
  // },
  {
    title: "Status",
    dataIndex: "Status",
  },
];
const customRowClassName = (record, index) => {
  return index % 2 === 0;
};

const StatsTable = (extractedProcessRecords) => {
  const [Datasetdata, setDataSetData] = useState(null);

  useEffect(() => {
    const extractedArray = Object.values(extractedProcessRecords).map(
      (item) => item
    );
    console.log("extractedArray", extractedArray);

    const dataset = [];

    extractedArray.forEach((innerArray) => {
      if (Array.isArray(innerArray)) {
        innerArray.forEach((item) => {
          const itemName = item.itemName || "";
          const itemUnit = item.itemUnit || "";
          const itemQuan = item.itemQuan || 0;
          const record = {
            ItemName: itemName,
            ItemUnit: itemUnit,
            ItemQuan: itemQuan,
            TotalQuan: item.originalQuan || "N/A",
            UpdatedQuan: item.updatedQuan || "N/A",
            Status: item.tag || "N/A",
          };

          if (
            Array.isArray(item.processRecords) &&
            item.processRecords.length > 0
          ) {
            item.processRecords.forEach((recordItem) => {
              console.log("recordItem.processName", recordItem.processName);
              const processRecord = {
                ...record,
                ProcessId: recordItem.processId.toUpperCase(),
                UsedQuan: recordItem.usedQuan || "N/A",
                ProcessName: recordItem.processName || "N/A",
              };
              dataset.push(processRecord);
            });
          } else {
            // If processRecords are missing or empty, push a single record with placeholder values
            console.log(
              "Invalid structure: item.processRecords is missing or empty."
            );
            record.ProcessId = "N/A";
            record.UsedQuan = "N/A";
            record.ProcessName = "N/A";
            dataset.push(record);
          }
        });
      } else {
        console.log(
          "Invalid structure: innerArray is not an array or has a different structure."
        );
      }
    });
    // Displaying the single dataset object with merged attributes for each item
    console.log("Dataset:", dataset);

    const formattedData = dataset.map((item) => {
      return {
        ItemName: item.ItemName,
        ItemUnit: item.ItemUnit,
        ProcessId: item.ProcessId,
        ProcessName: item.ProcessName,
        UsedQuan: item.UsedQuan,
        TotalQuan: item.TotalQuan,
        UpdatedQuan: item.UpdatedQuan,
        Status: item.Status,
      };
    });

    // Set the formatted data to the state variable
    setDataSetData(formattedData);
  }, [extractedProcessRecords]);

  return (
    <CardContainer>
      {/* <Head>Resource Inventory Table View</Head> */}
      <Card
        title="Resource Inventory Table View"
        style={{
          width: "99%",
          height: "275px",
          borderRadius: "10px",
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
        }}
      >
        <Table
          columns={columns}
          dataSource={Datasetdata}
          size="middle"
          scroll={{
            y: 70,
            scrollToFirstRowOnChange: true,
          }}
        />
        <Space
          direction="vertical"
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
          }}
        />
      </Card>
    </CardContainer>
  );
};
export default StatsTable;
