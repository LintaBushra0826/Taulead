import React, { useState } from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, TableWrapper } from "../../styles/global.styled";
import { Table, Typography } from "antd";

function ViewMeasuringUnit() {
  const data = [
    {
      key: "1",
      name: "Milk",
      desc: "Milk is made by tetrapack",
      unit: "kg",
      quan: 1000,
      status: "available",
      price: 150,
      totprice: 115000,
    },
    {
      key: "1",
      name: "Milk",
      desc: "Milk is made by tetrapack",
      unit: "kg",
      quan: 1000,
      status: "available",
      price: 150,
      totprice: 115000,
    },
    {
      key: "1",
      name: "Milk",
      desc: "Milk is made by tetrapack",
      unit: "kg",
      quan: 1000,
      status: "available",
      price: 150,
      totprice: 115000,
    },
    {
      key: "1",
      name: "Milk",
      desc: "Milk is made by tetrapack",
      unit: "kg",
      quan: 200,
      status: "available",
      price: 150,
      totprice: 115000,
    },
  ];
  const [editingKey, setEditingKey] = useState("");
  // const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    setEditingKey(record.key);
  };
  // const [filteredInfo, setFilteredInfo] = useState({});
  // const [sortedInfo, setSortedInfo] = useState({});
  // const handleChange = (pagination, filters, sorter) => {
  //   console.log("Various parameters", pagination, filters, sorter);
  //   setFilteredInfo(filters);
  //   setSortedInfo(sorter);
  // };
  // const clearFilters = () => {
  //   setFilteredInfo({});
  // };
  // const clearAll = () => {
  //   setFilteredInfo({});
  //   setSortedInfo({});
  // };
  // const setAgeSort = () => {
  //   setSortedInfo({
  //     order: "descend",
  //     columnKey: "age",
  //   });
  // };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "fit-content",
      // filters: [                                    //filteration code...
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "Jim",
      //     value: "Jim",
      //   },
      // ],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "fit-content",
      editable: true,
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quan",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Total Price",
      dataIndex: "totprice",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "fit-content",
      render: (_, record) => {
        return (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Update
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{ padding: "10%" }}
            >
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="divform">
      <Header />
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          <Table columns={columns} dataSource={data} />
        </TableWrapper>
      </BodyWrapper>
    </div>
  );
}

export default ViewMeasuringUnit;
