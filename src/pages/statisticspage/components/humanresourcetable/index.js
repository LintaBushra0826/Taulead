import React from "react";
import { Table, Divider } from "antd";
import { BodyWrapper, CardContainer } from "./index.styled";
import Paragraph from "antd/es/skeleton/Paragraph";
import { Card, Space } from "antd";

const columns = [
  {
    title: "HR-ID",
    dataIndex: "HR-ID",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Time Reserved",
    dataIndex: "HRreservedtime",
  },
  {
    title: "Consumed Time",
    dataIndex: "ConsumedTime",
  },
  {
    title: "P-ID",
    dataIndex: "processID",
  },
  {
    title: "Completed Processes",
    dataIndex: "completedprocess",
  },
];
const customRowClassName = (record, index) => {
  return index % 2 === 0;
};

function StatsTable() {
  return (
    // <BodyWrapper>
    //   <h4>Resource Inventory Table View</h4>
    //   <Table
    //     columns={columns}
    //     dataSource={data}
    //     size="middle"
    //     rowClassName={customRowClassName}
    //   />
    // </BodyWrapper>
    <CardContainer>
      <Card
        title="Human Resource Table View"
        style={{
          width: "800px",
          height: "280px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
          overflow:"scroll",
        }}
      >
        <Table
          columns={columns}
          // dataSource={data}
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
      </Card>
    </CardContainer>
  );
}
export default StatsTable;
