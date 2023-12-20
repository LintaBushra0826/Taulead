import React, { useState, useEffect } from "react";
import Header from "../../layout/justheader";
import Sidemenu from "../../layout/sideMenu";
import { Card, Progress, Button, Space, Tag, List, Table } from "antd";
import {
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  CardContainer,
  Paragraph,
  Paragraph1,
  TagWrapper,
} from "./index.styled";
import { Line } from "@ant-design/plots";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
import axios from "axios";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2";
import VirtualList from "rc-virtual-list";
import { Avatar, message } from "antd";
import { CgReorder } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Column } from "@ant-design/plots";
import { FcProcess } from "react-icons/fc";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 330;

const CContainerHeight = 210;

function Dashboard() {
  const pcmpercent = 5;
  const pinpercent = 4;
  const pbkpercent = 1;
  const avaialable = 5;
  const busy = 4;
  const usedIn = 10;
  const UnusedIn = 4;

  const ppdata = {
    datasets: [
      {
        data: [pcmpercent, pinpercent, pbkpercent],
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
        data: [avaialable, busy],
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
        data: [usedIn, UnusedIn],
        backgroundColor: ["#061161", "#F3904F"],
        borderWidth: 2,
        borderColor: "transparent",
        spacing: 1,
      },
    ],
  };

  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        // message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  const [chartdata, setchartData] = useState([]);

  const statsdata = [
    {
      processId: "ppp-1",
      hours: 4,
      type: "hr",
    },
    {
      processId: "ppp-1",
      hours: 7,
      type: "raw",
    },
    {
      processId: "ppp-2",
      hours: 6,
      type: "hr",
    },
    {
      processId: "ppp-2",
      hours: 3,
      type: "raw",
    },
    {
      processId: "ppp-3",
      hours: 2,
      type: "hr",
    },
    {
      processId: "ppp-4",
      hours: 3,
      type: "raw",
    },
    {
      processId: "ppp-5",
      hours: 9,
      type: "raw",
    },
    {
      processId: "ppp-6",
      hours: 5,
      type: "raw",
    },
  ];
  const config = {
    data: statsdata,
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
      if (type === "hr") {
        return "#faa46e"; // Color for 'hr' type
      } else if (type === "raw") {
        return "#061161"; // Color for 'raw' type
      }
    },
  };
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
      title: "Possible Executions",
      dataIndex: "possibleExe",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

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
                  textAlign: "center",
                  boxShadow: "0 1px 8px #f3edf7",
                  // backgroundColor: "#f3f0f5",
                  background:
                    "linear-gradient(140deg, #fafafa, #fafafa, #faece3 120%)",
                }}
              >
                <Paragraph>Raw Material Overview</Paragraph>
                <div style={{ position: "relative" }}>
                  <Doughnut
                    data={Indata}
                    options={{
                      cutout: 70,
                      radius: 18,
                    }}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      marginTop: "-10%",
                      left: "30%",
                      transform: "translate(-30%, -30%)", // Center the chart
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div style={{ marginTop: "50px" }}>
                  {" "}
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#061161",
                      border: "none",
                    }}
                  >
                    {10} Used
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
                    {4} Un-Used
                  </Tag>
                </div>
              </Card>
            </CardContainer>
            {/* Human Resource Overview */}
            <CardContainer>
              <Card
                style={{
                  height: "145px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 1px 8px #f3edf7",
                  // backgroundColor: "#fcf1ed",
                  background:
                    "linear-gradient(140deg, #fafafa, #fafafa, #ebdcf7 120%)",
                }}
              >
                <Paragraph>HR Overview</Paragraph>
                <div style={{ position: "relative" }}>
                  <Doughnut
                    data={hrdata}
                    options={{
                      cutout: 70,
                      radius: 18,
                    }}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      marginTop: "-10%",
                      left: "30%",
                      transform: "translate(-30%, -30%)", // Center the chart
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div style={{ marginTop: "50px" }}>
                  {" "}
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#061161",
                      border: "none",
                    }}
                  >
                    {5} Available
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
                    {4} Busy
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
                  textAlign: "center",
                  boxShadow: "0 1px 8px #f3edf7",
                  // backgroundColor: "#f2f4fc",
                  background:
                    "linear-gradient(140deg, #fafafa, #fafafa, #faece3 120%)",
                }}
              >
                <Paragraph>Process Overview</Paragraph>
                <div style={{ position: "relative" }}>
                  <Doughnut
                    data={ppdata}
                    options={{
                      cutout: 70,
                      radius: 18,
                    }}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      marginTop: "-10%",
                      left: "30%",
                      transform: "translate(-30%, -30%)", // Center the chart
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div style={{ marginTop: "50px" }}>
                  {" "}
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#061161",
                      border: "none",
                    }}
                  >
                    {1} Completed
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
                    {1} In-Progress
                  </Tag>
                  <Tag
                    style={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "black",
                      border: "none",
                    }}
                  >
                    {1} Backlog
                  </Tag>
                </div>

                {/* <Button
                  type="link"
                  style={{
                    color: "#360a5a",
                    display: "flex",
                    fontSize: "12px",
                    margin: "auto",
                    paddingTop: "10px",
                  }}
                >
                  View
                </Button> */}
              </Card>
            </CardContainer>

            <Container2>
              {/* Inventory Reorders */}
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
                    <List>
                      <VirtualList
                        data={data}
                        height={ContainerHeight}
                        itemHeight={47}
                        onScroll={onScroll}
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
                                <Link to="/viewrawmaterial">
                                  {item.name.last}
                                </Link>
                              }
                            />
                            <div>
                              23
                              {/* <Progress
                              steps={3}
                              percent={50}
                              
                              size="small"
                              strokeColor="#F3904F"
                            /> */}
                            </div>
                          </List.Item>
                        )}
                      </VirtualList>
                    </List>
                  </div>
                </Card>
              </CardContainer>
            </Container2>
          </Container1>

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
                <Paragraph1>Statistics</Paragraph1>
                <div style={{ position: "relative", height: "200px" }}>
                  <Column {...config} />
                </div>
              </Card>
            </CardContainer>
          </Container3>

          <Container4>
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
                  <List>
                    <VirtualList
                      data={data}
                      height={CContainerHeight}
                      itemHeight={47}
                      onScroll={onScroll}
                    >
                      {(item) => (
                        <List.Item key={item.email}>
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
                              <Link to="/process">
                                <span style={{ color: "green" }}>
                                  {`ppp-1 `.toUpperCase()}
                                </span>
                                {item.name.last}
                              </Link>
                            }
                          />
                          <div>
                            600000{" "}
                            <span style={{ fontSize: "5px" }}>
                              (Aggregate Cost)
                            </span>
                          </div>
                        </List.Item>
                      )}
                    </VirtualList>
                  </List>
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
                    columns={columns}
                    // dataSource={CombinedData}
                    size="middle"
                    scroll={{
                      y: 515,
                      scrollToFirstRowOnChange: true,
                    }}
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
