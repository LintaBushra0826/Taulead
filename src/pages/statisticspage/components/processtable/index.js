import React, { useEffect, useState } from "react";
import { Table, Divider } from "antd";
import { BodyWrapper } from "./index.styled";
import Paragraph from "antd/es/skeleton/Paragraph";
import { CardContainer } from "./index.styled";
import { Card, Space } from "antd";
import { Head } from "../rawmaterialchart/index.styled";
import axios from "axios";
import { CheckCircleTwoTone, MinusCircleOutlined } from "@ant-design/icons";
import { SyncOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Process Id",
    dataIndex: "ProcessId",
  },
  {
    title: "Process Name",
    dataIndex: "ProcessName",
  },
  {
    title: "Start Time",
    dataIndex: "StartTime",
  },
  {
    title: "End Time",
    dataIndex: "EndTime",
  },
  {
    title: "Duration",
    dataIndex: "Duration",
  },
  {
    title: "Item Name",
    dataIndex: "ItemName",
  },
  {
    title: "Item Quantity",
    dataIndex: "ItemQuan",
  },
  {
    title: "Employee Name",
    dataIndex: "EmpName",
  },
  {
    title: "Designation",
    dataIndex: "EmpDesignation",
  },
  {
    title: "Process Status",
    dataIndex: "ProcessStatus",
  },
];

const ProcessTable = () => {
  const [Compdata, setCompData] = useState([]);
  const [Inprogdata, setInProgData] = useState([]);
  const [BackLogdata, setBackLogData] = useState([]);
  const [Executeddata, setExecutedData] = useState([]);
  const [CombinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchComProcessData();
    fetchInProgProcessData();
    fetchBackLogProcess();
    fetchExecutedProcess();
  }, []);

  const fetchComProcessData = async () => {
    try {
      const completedresponse = await axios.get(
        "http://localhost:3005/completed-process"
      );
      const rawData = completedresponse.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];

      setCompData(dataArray);
    } catch (error) {
      console.error("Error fetching completed process:", error);
    }
  };

  const fetchInProgProcessData = async () => {
    try {
      const inprogressresponse = await axios.get(
        "http://localhost:3005/inprogress-process"
      );
      const rawData = inprogressresponse.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];

      setInProgData(dataArray);
    } catch (error) {
      console.error("Error fetching inprogress process:", error);
    }
  };

  const fetchExecutedProcess = async () => {
    try {
      const executedresponse = await axios.get(
        "http://localhost:3005/executed-process"
      );
      const rawData = executedresponse.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];

      setExecutedData(dataArray);
    } catch (error) {
      console.error("Error fetching executed process:", error);
    }
  };
  const fetchBackLogProcess = async () => {
    try {
      const backlogresponse = await axios.get("http://localhost:3005/process");
      const backlogData = backlogresponse.data.data;

      // Ensure data is an array
      const backlogArray = Array.isArray(backlogData) ? backlogData : [];

      // Find processes in backlog that haven't been executed
      const backlogNotExecuted = backlogArray.filter((backlogItem) => {
        // Check if the key of backlog process exists in any executed processes
        return !Executeddata.some(
          (executedItem) => executedItem.key === backlogItem._id
        );
      });

      setBackLogData(backlogNotExecuted);
    } catch (error) {
      console.error("Error fetching backlog process:", error);
    }
  };

  useEffect(() => {
    const backlogNotExecuted = BackLogdata.filter((backlogItem) => {
      return !Executeddata.some(
        (executedItem) => executedItem.key === backlogItem._id
      );
    });

    // Combine all data into a single array
    const combined = [
      ...Compdata.map((item) => {
        let statusIcon;
        let statusText;

        if (item.status === "completed") {
          statusIcon = <CheckCircleTwoTone twoToneColor="#52c41a" />;
          statusText = "COMPLETED";
        } else if (item.status === "inprogress") {
          const progressPercentage = Math.floor(item.progress * 100);
          statusIcon = `${progressPercentage}%`;
          statusText = "IN-PROGRESS";
        } else {
          statusIcon = null;
          statusText = "N/A";
        }

        const itemName = item.rawMaterial.length
          ? item.rawMaterial.map((mat) => mat.Name).join(", ")
          : "N/A";

        const itemQuan = item.rawMaterial.length
          ? item.rawMaterial.map((mat) => mat.quan).join(", ")
          : "N/A";

        const empName = item.humanResource.length
          ? item.humanResource.map((emp) => emp.name).join(", ")
          : "N/A";

        const empDesignation = item.humanResource.length
          ? item.humanResource.map((emp) => emp.desgn).join(", ")
          : "N/A";

        return {
          ProcessId: item.pid, // Uppercase the ProcessId
          ProcessName: item.name,
          StartTime: item.start,
          EndTime: item.end,
          Duration: item.duration,
          ItemName: itemName,
          ItemQuan: itemQuan,
          EmpName: empName,
          EmpDesignation: empDesignation,
          ProcessStatus: (
            <>
              {statusIcon}{" "}
              <span
                style={{
                  textTransform: "uppercase",
                  color: item.status === "completed" ? "#52c41a" : "#1890ff",
                  fontSize: item.status === "completed" ? "12px" : "inherit",
                }}
              >
                {statusText}
              </span>
            </>
          ),
        };
      }),

      ...Inprogdata.map((item) => {
        let statusIcon = null;
        let statusText = null;

        if (item.status === "inprogress") {
          const progress = item.progress || 0;

          let nonDecimalProgress;
          if (progress >= 100) {
            nonDecimalProgress = "100";
          } else {
            nonDecimalProgress = Math.floor(progress).toString();
          }

          statusIcon = <SyncOutlined spin style={{ color: "#1890ff" }} />;
          statusText = (
            <span>
              INPROGRESS
              <br />
              {nonDecimalProgress}%
            </span>
          );
        }

        const itemName = item.rawMaterial.length
          ? item.rawMaterial.map((mat) => mat.Name).join(", ")
          : "N/A";

        const itemQuan = item.rawMaterial.length
          ? item.rawMaterial.map((mat) => mat.quan).join(", ")
          : "N/A";

        const empName = item.humanResource.length
          ? item.humanResource.map((emp) => emp.name).join(", ")
          : "N/A";

        const empDesignation = item.humanResource.length
          ? item.humanResource.map((emp) => emp.desgn).join(", ")
          : "N/A";

        return {
          ProcessId: item.pid,
          ProcessName: item.name,
          StartTime: item.start,
          EndTime: item.end,
          Duration: item.duration,
          ItemName: itemName,
          ItemQuan: itemQuan,
          EmpName: empName,
          EmpDesignation: empDesignation,
          ProcessStatus: (
            <>
              {statusIcon}{" "}
              <span
                style={{
                  textTransform: "uppercase",
                  color: "#1890ff",
                  fontSize: "12px",
                }}
              >
                {statusText}
              </span>
            </>
          ),
        };
      }),

      // BackLogData data filtering
      ...backlogNotExecuted.map((backlogItem) => {
        let statusIcon = <MinusCircleOutlined color="grey" />;
        let statusText = "BACKLOG";

        const itemName = backlogItem.rawMaterial.length
          ? backlogItem.rawMaterial.map((mat) => mat.Name).join(", ")
          : "N/A";

        const itemQuan = backlogItem.rawMaterial.length
          ? backlogItem.rawMaterial.map((mat) => mat.quan).join(", ")
          : "N/A";

        const empName = backlogItem.humanResource.length
          ? backlogItem.humanResource.map((emp) => emp.name).join(", ")
          : "N/A";

        const empDesignation = backlogItem.humanResource.length
          ? backlogItem.humanResource.map((emp) => emp.desgn).join(", ")
          : "N/A";

        return {
          ProcessId: backlogItem.pid,
          ProcessName: backlogItem.name,
          StartTime: backlogItem.start,
          EndTime: backlogItem.end,
          Duration: backlogItem.duration,
          ItemName: itemName,
          ItemQuan: itemQuan,
          EmpName: empName,
          EmpDesignation: empDesignation,
          ProcessStatus: (
            <>
              {statusIcon}{" "}
              <span
                style={{
                  textTransform: "uppercase",
                  color: "#555",
                  fontSize: "12px",
                }}
              >
                {statusText}
              </span>
            </>
          ),
        };
      }),
    ];
    console.log("BackLogdata", BackLogdata);
    setCombinedData(combined);

    console.log("combined process stats", combined);
  }, [Compdata, Inprogdata, BackLogdata, Executeddata]);
  return (
    <CardContainer>
      <Card
        // title="Process Statistics Table View"
        style={{
          width: "99%",
          height: "88vh",
          borderRadius: "10px",
        }}
      >
        <Table
          columns={columns}
          dataSource={CombinedData}
          size="middle"
          scroll={{
            y: 515,
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
export default ProcessTable;
