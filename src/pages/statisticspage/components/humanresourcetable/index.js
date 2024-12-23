import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { CardContainer } from "./index.styled";
import { Card, Space } from "antd";

const columns = [
  {
    title: "Emp ID",
    dataIndex: "empId",
    render: (_, record) => record.empId.slice(0, 7) + "... ",
  },
  {
    title: "Emp Name",
    dataIndex: "empName",
  },
  {
    title: "Designation",
    dataIndex: "empDesgn",
  },
  {
    title: "Status",
    dataIndex: "empTag",
  },
  {
    title: "Time Reserved",
    dataIndex: "duration",
  },
  {
    title: "Process-ID",
    dataIndex: "processID",
  },
  {
    title: "Process-Name",
    dataIndex: "processName",
  },
  {
    title: "Completed Processes",
    dataIndex: "completedprocess",
  },
];
const customRowClassName = (record, index) => {
  return index % 2 === 0;
};

function StatsTable(extractedHRRecords) {
  const [Datasetdata, setDataSetData] = useState(null);

  useEffect(() => {
    const extractedArray = Object.values(extractedHRRecords).map(
      (item) => item
    );

    // Assuming dataset is defined before this logic
    const dataset = [];
    let totalCount = 0;

    extractedArray.forEach((innerArray) => {
      if (Array.isArray(innerArray)) {
        innerArray.forEach((emp) => {
          const empID = emp.empId || "";
          const empName = emp.empName || "";
          const empTag = emp.empTag || "";
          const empDesgn = emp.empDesgn || 0;
          let empCount = 0;

          if (Array.isArray(emp.empRecords) && emp.empRecords.length > 0) {
            emp.empRecords.forEach((recordItem) => {
              console.log("recordItem.processName", recordItem.processName);

              // Count CompletionTag
              if (recordItem.completedtag === "completed") {
                totalCount++;
                empCount++;
              }

              const processRecord = {
                empID: empID,
                empName: empName,
                empTag: empTag,
                empDesgn: empDesgn,
                ProcessId: recordItem.processId.toUpperCase(),
                ProcessName: recordItem.processName || "N/A",
                Duration: recordItem.duration || 0,
                CompletionTag: recordItem.completedtag,
              };

              dataset.push(processRecord);
            });
          } else {
            // If processRecords are missing or empty, push a single record with placeholder values
            console.log(
              "Invalid structure: item.processRecords is missing or empty."
            );
            const record = {
              empID: empID,
              empName: empName,
              empTag: empTag,
              empDesgn: empDesgn,
              ProcessId: "N/A",
              ProcessName: "N/A",
              Duration: "N/A",
              CompletionTag: "N/A",
            };
            dataset.push(record);
          }

          // Adding the count to each employee's record
          emp.completedprocess = totalCount;
        });
      } else {
        console.log(
          "Invalid structure: innerArray is not an array or has a different structure."
        );
      }
    });

    // Creating a formattedData array
    const formattedData = dataset.map((emp) => ({
      empId: emp.empID,
      empName: emp.empName,
      empDesgn: emp.empDesgn,
      empTag: emp.empTag,
      duration: emp.Duration,
      processID: emp.ProcessId,
      processName: emp.ProcessName,
      completedprocess: emp.completedprocess || 0,
    }));

    // Set the formatted data to the state variable
    setDataSetData(formattedData);
  }, [extractedHRRecords]);

  return (
    <CardContainer>
      <Card
        title="Human Resource Table View"
        style={{
          width: "100%",
          height: "275px",
          borderRadius: "10px",
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
}
export default StatsTable;
