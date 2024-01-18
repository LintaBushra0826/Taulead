import React, { useEffect, useState } from "react";
import { Table, Space, Avatar, Tag } from "antd";
import axios from "axios";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { TableWrapper } from "./index.styled";
import { UserOutlined } from "@ant-design/icons";
import { VscServerProcess } from "react-icons/vsc";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FcProcess } from "react-icons/fc";
import { Link } from "react-router-dom";

const UserColumnRenderer = ({ userData }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Avatar
      style={{
        backgroundColor: "#360a5a",
        fontSize: "16px",
        marginRight: "5px",
      }}
      icon={<UserOutlined />}
    />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ color: "#360a5a", fontWeight: "bold", fontSize: "11px" }}>
        {userData.Name}
      </div>
      <div style={{ color: "#360a5a", fontSize: "11px", marginLeft: "-25px" }}>
        {userData.Status}
      </div>
    </div>
  </div>
);

const ProcessLogsTable = () => {
  const API_BASE_URL = "http://localhost:3005";
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Status: "",
  });
  const [data, setData] = useState([]);
  const [changesdata, setchangesData] = useState([]);

  useEffect(() => {
    fetchUserDataFromServer();
  }, []);

  const fetchUserDataFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing or undefined");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/userdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userDataFromServer = response.data;

      setUserData({
        Email: userDataFromServer.Email,
        Name: userDataFromServer.Name,
        Status: userDataFromServer.Status,
      });

      const processLogsResponse = await axios.get(
        `${API_BASE_URL}/processlogs`
      );
      const rawData = processLogsResponse.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      console.log("dataArray", dataArray);

      const processedData = dataArray.map((item) => {
        const processedItem = {
          key: item._id,
          user: {
            Name: userDataFromServer.Name,
            Email: userDataFromServer.Email,
            Status: userDataFromServer.Status,
          },
          logId: item.logId,
          action: item.action,
          type: item.modelType,
          timestamp: item.timestamp,
          changes: Array.isArray(item.changes) ? item.changes : [],
        };
        console.log("item changes", item.changes);

        // if (item.modelType === "Process") {
        //   if (item.action === "Create") {
        //     processedItem.processName = item.changes.find(
        //       (change) => change.attribute === "name"
        //     )?.updatedValue;
        //     processedItem.processPid = item.changes.find(
        //       (change) => change.attribute === "pid"
        //     )?.updatedValue;
        //     processedItem.processId = item.changes.find(
        //       (change) => change.attribute === "processId"
        //     )?.updatedValue;
        //   } else if (item.action === "Update") {
        //     // Assuming you want to get the latest change for "Update" action
        //     const latestChange = item.changes.reduce((latest, change) => {
        //       return change.timestamp > latest.timestamp ? change : latest;
        //     }, {});

        //     processedItem.processName =
        //       latestChange.attribute === "name"
        //         ? latestChange.updatedValue
        //         : latestChange.updatedValue;
        //     processedItem.processPid =
        //       latestChange.attribute === "pid"
        //         ? latestChange.updatedValue
        //         : latestChange.updatedValue;
        //     processedItem.processId =
        //       latestChange.attribute === "processId"
        //         ? latestChange.updatedValue
        //         : latestChange.updatedValue;
        //   }
        // }

        if (item.processName !== undefined)
          processedItem.processName = item.processName;
        if (item.processPid !== undefined)
          processedItem.processPid = item.processPid;

        return processedItem;
      });
      setData(processedData);
      console.log("processedData", processedData);

      const changesData = processedData.flatMap((item) => {
        if (item.changes && Array.isArray(item.changes)) {
          return {
            key: item.key,
            processName: item.processName,
            processPid: item.processPid,
            timestamp: item.timestamp,
            changes: item.changes.map((change) => {
              // Join array elements into a string
              const oldValue =
                Array.isArray(change.previousValue) &&
                change.previousValue.length > 0
                  ? change.previousValue.join(", ")
                  : change.previousValue;

              return {
                key: item.key,
                attribute: change.attribute,
                oldValue: oldValue,
                newValue: change.updatedValue,
                processName: item.processName,
                processPid: item.processPid,
                timestamp: change.timestamp,
              };
            }),
          };
        }
        return [];
      });
      console.log("changesData", changesData);

      // Flatten changesData and skip changes for "rawMaterial" and "humanResource
      const flattenedChangesData = changesData.flatMap((item) => {
        if (item.changes && Array.isArray(item.changes)) {
          const changesWithNewValues = item.changes
            .filter((change) => {
              // Filter out changes with different timestamps
              const changeTimestamp = change.timestamp;
              const mainLogTimestamp = item.timestamp;
              return changeTimestamp === mainLogTimestamp;
            })
            .map((change) => {
              if (
                change.attribute === "rawMaterial" ||
                change.attribute === "humanResource"
              ) {
                return null; // Skip changes for "rawMaterial" and "humanResource"
              }

              let newValue = change.newValue;
              let oldValue = change.oldValue;

              // Convert timestamps to formatted date strings
              if (change.attribute === "start" || change.attribute === "end") {
                newValue = formatTimestamp(change.newValue);
                oldValue = formatTimestamp(change.oldValue);
              }

              return {
                _id: item.key,
                processName: item.processName,
                processPid: item.processPid,
                attribute: change.attribute,
                oldValue: oldValue,
                newValue: newValue,
              };
            })
            .filter(Boolean); // Remove null entries

          return changesWithNewValues;
        }
        return [];
      });

      console.log("flattenedChangesData", flattenedChangesData);

      setchangesData(flattenedChangesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear());

    const hours = String(date.getHours() % 12 || 12).padStart(2, "0"); // Use modulo to convert 24-hour time to 12-hour time
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const getActionTextColor = (action) => {
    switch (action) {
      case "Update":
        return "#302191";
      case "Delete":
        return "red";
      case "Create":
        return "green";
      default:
        return "#564763"; // Default color
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: 140,
      render: (userData) => <UserColumnRenderer userData={userData} />,
      align: "center",
    },
    {
      title: "Entity Id",
      dataIndex: "logId",
      key: "logId",

      align: "left",
      render: (_, record) => (
        <Tag
          color="#f5f0fa"
          key={record}
          style={{ textAlign: "center", color: "#564763" }}
        >
          {record.logId.slice(0, 10)}...{" "}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",

      render: (text, record) => (
        <span
          style={{
            color: getActionTextColor(record.action),
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",

      render: (text) => {
        let icon;
        let iconStyle = {
          marginRight: "4px", // Adjust the margin as needed
        };

        let iconColor;
        switch (text.toLowerCase()) {
          case "process":
            icon = <FcProcess style={iconStyle} />;
            break;
          case "rawmaterial":
            icon = <MdOutlineInventory2 style={iconStyle} />;
            iconColor = "#f3904f";
            break;
          case "humanresource":
            icon = <IoCreateOutline style={iconStyle} />;
            iconColor = "#360a5a";
            break;

          default:
            icon = null;
        }

        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
            {text}
          </span>
        );
      },
    },

    {
      title: "TimeStamp",
      dataIndex: "timestamp",
      key: "timestamp",
      width: "fit-content",
      render: (timestamp) => formatTimestamp(timestamp),
    },
  ];

  return (
    <div className="divform">
      <Header />
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          {userData.Name && (
            <Table
              dataSource={data}
              columns={columns}
              scroll={{ x: true, y: 590, hideScrollbar: true }}
              expandable={{
                expandedRowRender: (record) => (
                  <Table
                    columns={[
                      {
                        title: "Process Name",
                        dataIndex: "processName",
                        key: "processName",
                      },
                      {
                        title: "Process PID",
                        dataIndex: "processPid",
                        key: "processPid",
                      },
                      {
                        title: "Attribute",
                        dataIndex: "attribute",
                        key: "attribute",
                      },
                      {
                        title: "Old Value",
                        dataIndex: "oldValue",
                        key: "oldValue",
                      },
                      {
                        title: "New Value",
                        dataIndex: "newValue",
                        key: "newValue",
                      },
                    ]}
                    dataSource={changesdata}
                    pagination={false}
                    scroll={{ y: 200 }}
                    style={{ marginLeft: "-20px" }}
                  />
                ),
                rowExpandable: (record) =>
                  record.changes && record.changes.length > 0,
              }}
            />
          )}
        </TableWrapper>
      </BodyWrapper>
    </div>
  );
};

export default ProcessLogsTable;
