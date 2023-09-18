import React, { useState, useEffect } from "react";
import Header from "../../layout/justheader";
import Sidemenu from "../../layout/sideMenu";
import { Card, Progress, Button, Space, Divider } from "antd";
import {
  Container,
  CardContainer,
  Paragraph,
  DashboardchartWrapper,
  StatsChartWrapper,
} from "./index.styled";
import { Line } from "@ant-design/plots";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return (
    <>
      <BodyWrapper>
        <Sidemenu />
        {/* <Header /> */}
        <MainContainer>
          <Container>
            <CardContainer>
              <Card
                title="Inventory"
                style={{
                  width: "350px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Paragraph>Total Inventory</Paragraph>
                <Progress
                  type="circle"
                  percent={75}
                  width={80}
                  format={() => "75%"}
                  strokeColor="#52c41a"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                />
                <Space
                  direction="vertical"
                  style={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button type="text" block>
                    Manage
                  </Button>
                  <Button type="link" block>
                    View
                  </Button>
                </Space>
              </Card>
            </CardContainer>
            <CardContainer>
              <Card
                title="Human Resource"
                style={{
                  width: "350px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Paragraph>Total Resource</Paragraph>
                <Progress
                  type="circle"
                  percent={60}
                  width={80}
                  format={() => "60%"}
                  strokeColor="#1890ff"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                />
                <Space
                  direction="vertical"
                  style={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button type="text" block>
                    Manage
                  </Button>
                  <Button type="link" block>
                    View
                  </Button>
                </Space>
              </Card>
            </CardContainer>
            <CardContainer>
              <Card
                title="Process"
                style={{
                  width: "345px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Paragraph>Completed Process</Paragraph>
                <Progress
                  type="circle"
                  percent={90}
                  width={80}
                  format={() => "90%"}
                  strokeColor="#f5222d"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                />
                <Space
                  direction="vertical"
                  style={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button type="text" block>
                    Manage
                  </Button>
                  <Button type="link" block>
                    View
                  </Button>
                </Space>
              </Card>
            </CardContainer>
          </Container>

          <CardContainer>
          <Card
            title="Process Statistics"
            style={{
              width: "660px",
              height: "400px",
              borderRadius: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
            }}
          >
            <Line {...config}  style={{
              width: "600px",
              height: "300px",
            }}/>
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
          <CardContainer>
          <Card
            title="Completed Processes"
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              float:"right",
              marginTop:'-400px',
              paddingBottom:"30px",
            }}
          >
            <Line {...config} style={{
              width: "350px",
              height: "300px",
            }}/>
            <Space
                  direction="vertical"
                  style={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems:"flex-start",
                  }}
               />
          </Card>
         </CardContainer>
        </MainContainer>
      </BodyWrapper>

      
    </>
  );
}
export default Dashboard;
