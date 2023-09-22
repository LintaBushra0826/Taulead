import React from "react";
import { Table, Divider } from "antd";
import { BodyWrapper } from "./index.styled";
import Paragraph from "antd/es/skeleton/Paragraph";
import { CardContainer } from "./index.styled";
import { Card, Space } from "antd";

const columns = [
  {
    title: "Item Name",
    dataIndex: "itemname",
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
        title="Resource Inventory Table View"
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
      </Card>
    </CardContainer>
  );
}
export default StatsTable;
