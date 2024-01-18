import React, { useEffect, useState } from "react";
import Header from "../../../../layout/justheader";
import SideMenu from "../..../../../../../layout/sideMenu";
import { BodyWrapper } from "../../../../styles/global.styled";
import { Divider, Empty, Table } from "antd";
import { MdOutlineDelete, MdPadding } from "react-icons/md";
import axios from "axios";
import { TableWrapper } from "./index.styled";
import { CheckCircleTwoTone, MinusCircleOutlined } from "@ant-design/icons";
import { SyncOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const { Panel } = Collapse;

function ProcessLogs() {
  const API_BASE_URL = "http://localhost:3005";
  const [Compdata, setCompData] = useState([]);
  const [Inprogdata, setInProgData] = useState([]);
  const [BackLogdata, setBackLogData] = useState([]);
  const [Executeddata, setExecutedData] = useState([]);
  const [CombinedData, setCombinedData] = useState([]);

  const handleDeleteItem = async (itemId) => {
    console.log(itemId);
    try {
      await axios.delete(`${API_BASE_URL}/pricelog/${itemId}`);
      alert("Log deteted successfully");

      window.location.reload();
    } catch (error) {
      alert("Log could not be deteted");
    }
  };

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

      const backlogNotExecuted = backlogArray.filter((backlogItem) => {
        return !Executeddata.some(
          (executedItem) => executedItem.key === backlogItem._id
        );
      });

      setBackLogData(backlogNotExecuted);
    } catch (error) {
      console.error("Error fetching backlog process:", error);
    }
  };

  // Function to display data week-wise
  const displayDataByWeek = (data) => {
    const weekWiseData = {};

    data.forEach((record) => {
      const timestamp = new Date(record.StartTime);
      const weekNumber = getWeekNumber(timestamp);

      if (!weekWiseData[weekNumber]) {
        weekWiseData[weekNumber] = [];
      }

      weekWiseData[weekNumber].push(record);
    });

    return weekWiseData;
  };

  // Function to get the week number from a date
  const getWeekNumber = (date) => {
    const dt = new Date(date);
    const monthStart = new Date(dt.getFullYear(), dt.getMonth(), 1);
    const difference = (dt - monthStart) / (7 * 24 * 60 * 60 * 1000);
    return Math.ceil(difference) + 1;
  };

  // State to store week-wise data
  const [weekWiseData, setWeekWiseData] = useState({});

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
          ProcessId: item.pid,
          ProcessName: item.name,
          StartTime: item.start,
          EndTime: item.end,
          actStartTime: item.actual_start,
          actEndTime: item.actual_end,
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
          actStartTime: item.actual_start,
          actEndTime: item.actual_end,
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
    // console.log("BackLogdata", BackLogdata);
    setCombinedData(combined);

    console.log("combined process stats", combined);
  }, [Compdata, Inprogdata, Executeddata]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    if (CombinedData.length > 0) {
      const organizedData = displayDataByWeek(CombinedData);
      setWeekWiseData(organizedData);
    }
  }, [CombinedData]);

  // Logic to group data by weeks
  const organizeDataByWeeks = (data) => {
    const weekWiseData = {};

    data.forEach((record) => {
      const timestamp = new Date(record.StartTime);
      const year = timestamp.getFullYear();
      const weekNumber = getISOWeek(timestamp);

      const month = timestamp.toLocaleString("default", { month: "long" });
      const weekLabel = `Week ${weekNumber}`;

      if (!weekWiseData[year]) {
        weekWiseData[year] = {};
      }

      if (!weekWiseData[year][month]) {
        weekWiseData[year][month] = {};
      }

      if (!weekWiseData[year][month][weekLabel]) {
        weekWiseData[year][month][weekLabel] = [];
      }

      weekWiseData[year][month][weekLabel].push(record);
    });

    return weekWiseData;
  };

  const renderTableByMonthsAndWeeks = () => {
    const monthWiseData = organizeDataByWeeks(CombinedData);

    return (
      <Table
        dataSource={Object.keys(monthWiseData).map((year) => ({
          key: year,
          year,
          months: Object.keys(monthWiseData[year]).map((month) => ({
            month,
            weeks: [...Array(4).keys()].map((weekNumber) => {
              const week = `Week ${weekNumber + 1}`;
              const data = monthWiseData[year][month][week] || [];

              return {
                key: `${year}_${month}_${week}`,
                week,
                data,
              };
            }),
          })),
        }))}
        columns={[
          {
            title: "Year",
            dataIndex: "year",
            key: "year",
            fixed: "left",
            width: 2,
            render: (year) => <strong>{year}</strong>,
            onCell: () => ({
              onClick: () => {},
            }),
          },
          {
            title: "Months",
            dataIndex: "months",
            key: "months",
            fixed: "left",
            width: 500,
            render: (months) => (
              <div>
                {months.map((monthData) => (
                  <div key={monthData.month}>
                    <h3 style={{ fontSize: "18px" }}>{monthData.month}</h3>
                    {/* <Divider /> */}
                    <Collapse
                      style={{ background: "transparent", border: "none" }}
                      accordion
                    >
                      {monthData.weeks.map((weekData) => (
                        <Panel
                          header={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                overflowX: "auto",
                                color:
                                  weekData.data.length > 0 ? "#360a5a" : "",
                                cursor: weekData.data.length > 0 ? "" : "",
                                backgroundColor:
                                  weekData.data.length > 0 ? "" : "",
                              }}
                            >
                              <span>{weekData.week}</span>
                              <div
                                style={{
                                  color:
                                    weekData.data.length > 0 ? "#360a5a" : "",
                                }}
                              >
                                {`Executed Processes: ${weekData.data.length}`}
                              </div>
                            </div>
                          }
                          key={weekData.key}
                          disabled={weekData.data.length === 0}
                        >
                          <Table
                            dataSource={weekData.data}
                            columns={[
                              {
                                title: "Process Id",
                                dataIndex: "ProcessId",
                                fixed: "left",
                              },
                              {
                                title: "Process Name",
                                dataIndex: "ProcessName",
                                fixed: "left",
                              },
                              // {
                              //   title: "Defined Start",
                              //   dataIndex: "actStartTime",
                              //   render: (text) => formatTimestamp(text),
                              //   fixed: "left",
                              // },
                              // {
                              //   title: "Defined End",
                              //   dataIndex: "actEndTime",
                              //   render: (text) => formatTimestamp(text),
                              //   fixed: "left",
                              // },
                              {
                                title: "Start D/T",
                                dataIndex: "StartTime",
                                render: (text) => formatTimestamp(text),
                                fixed: "left",
                                key: `1`,
                              },
                              {
                                title: "End D/T",
                                dataIndex: "EndTime",
                                render: (text) => formatTimestamp(text),
                                fixed: "left",
                                key: `2`,
                              },
                              {
                                title: "Duration",
                                dataIndex: "Duration",
                                fixed: "left",
                                key: `3`,
                              },
                              {
                                title: "Item Name",
                                dataIndex: "ItemName",
                                fixed: "left",
                                key: `4`,
                              },
                              {
                                title: "Item Quantity",
                                dataIndex: "ItemQuan",
                                fixed: "left",
                                key: `5`,
                              },
                              {
                                title: "Emp Name",
                                dataIndex: "EmpName",
                                fixed: "left",
                                key: `6`,
                              },
                              {
                                title: "Desgn",
                                dataIndex: "EmpDesignation",
                                fixed: "left",
                                key: `7`,
                              },
                              {
                                title: "Process Status",
                                dataIndex: "ProcessStatus",
                                fixed: "left",
                                key: `8`,
                              },
                            ]}
                            scroll={{ y: 300, hideScrollbar: true }}
                            pagination={false}
                            style={{
                              padding: "0px",
                              margin: "0px",
                              OverflowX: "auto",
                              width: "100%",
                            }}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                    {/* <Divider /> */}
                  </div>
                ))}
              </div>
            ),
          },
        ]}
        scroll={{ x: true, y: 590, hideScrollbar: true }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              {<span>Note: Process details of the year {record.year}</span>}
            </p>
          ),
          defaultExpandedRowKeys: Object.keys(monthWiseData).map(
            (year) => `${year}_Week 1`
          ),
        }}
      />
    );
  };

  // Function to get ISO week number within a month
  const getISOWeek = (date) => {
    const dt = new Date(date);
    dt.setHours(0, 0, 0, 0);

    // Get the first day of the month
    const monthStart = new Date(dt.getFullYear(), dt.getMonth(), 1);

    // Calculate the week number within the month
    return Math.ceil((dt.getDate() + monthStart.getDay()) / 7);
  };

  return (
    <div className="divform">
      <TableWrapper>
        {Object.keys(weekWiseData).length > 0 ? (
          renderTableByMonthsAndWeeks()
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data" />
          </div>
        )}
      </TableWrapper>
    </div>
  );
}

export default ProcessLogs;
