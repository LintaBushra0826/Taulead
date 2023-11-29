import React, { useState, useEffect } from "react";
// import Header from "../../layout/justheader";
import Sidemenu from "../../layout/sideMenu";
import { Card, Progress, Button, Space } from "antd";
import {
  Container,
  CardContainer,
  Paragraph,
  // DashboardchartWrapper,
  // StatsChartWrapper,
} from "./index.styled";
import { Line } from "@ant-design/plots";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const [totalInventoryCount, setTotalInventoryCount] = useState(0);
  const [totalhrCount, setTotalhrCount] = useState(0);
  const [hrdata, sethrData] = useState([]);
  useEffect(() => {
    fetchRawMaterial();
  }, []);

  const fetchRawMaterial = async () => {
    try {
      const response = await axios.get("http://localhost:3005/rawMaterial");
      const rawData = response.data.data;

      const dataArray = Array.isArray(rawData) ? rawData : [];
      setData(dataArray);

      setTotalInventoryCount(dataArray.length);
    } catch (error) {
      console.error("Error fetching raw material:", error);
    }
  };

  useEffect(() => {
    fetchHumanResource();
  }, []);

  const fetchHumanResource = async () => {
    try {
      const response = await axios.get("http://localhost:3005/humanresource");
      const rawData = response.data.data;

      const dataArray = Array.isArray(rawData) ? rawData : [];
      sethrData(dataArray);

      const hrElements = dataArray.filter(
        (element) => element.tag === "available"
      );

      setTotalhrCount(hrElements.length);
    } catch (error) {
      console.error("Error fetching human resource:", error);
    }
  };

  // Calculate the total limit based on the maximum item limit (example: itemlimit property)
  const totalLimit = Math.max(...data.map((item) => item.itemlimit));

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
                  percent={(totalInventoryCount * 100) / totalLimit}
                  width={80}
                  format={() => `${(totalInventoryCount * 100) / totalLimit}%`}
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
                <Paragraph>Available Resource</Paragraph>
                <Progress
                  type="circle"
                  percent={(totalhrCount * 100) / hrdata.length}
                  width={80}
                  format={() => `${(totalhrCount * 100) / hrdata.length}%`}
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
              <Line
                {...config}
                style={{
                  width: "600px",
                  height: "300px",
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
            <Card
              title="Completed Processes"
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                float: "right",
                marginTop: "-400px",
                paddingBottom: "30px",
              }}
            >
              <Line
                {...config}
                style={{
                  width: "350px",
                  height: "300px",
                }}
              />
              <Space
                direction="vertical"
                style={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
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
