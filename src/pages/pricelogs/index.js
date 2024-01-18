import React, { useEffect, useState } from "react";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { Table } from "antd";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { TableWrapper } from "./index.styled";

function ViewPriceLogs() {
  const API_BASE_URL = "http://localhost:3005";
  const [data, setData] = useState(null);

  console.log("pricelog data", data);

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
    fetchpricelogs();
  }, []);

  const fetchpricelogs = async () => {
    try {
      const response = await axios.get("http://localhost:3005/pricelogs");
      const rawData = response.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];

      setData(dataArray);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      width: "fit-content",
    },
    {
      title: "Previous Price",
      dataIndex: "previousPrice",
      key: "previousPrice",
      width: "fit-content",
      align: "center",
    },
    {
      title: "Updated Price",
      dataIndex: "updatedPrice",
      key: "updatedPrice",
      width: "fit-content",
      align: "center",
    },
    {
      title: "Modification Date",
      dataIndex: "timestamp",
      key: "timestamp",
      width: "fit-content",
      render: (text) => formatDate(text),
      align: "center",
    },
    {
      title: "Modification Time",
      dataIndex: "timestamp",
      key: "timestamp",
      width: "fit-content",
      render: (text) => formatTime(text),
      align: "center",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      width: "fit-content",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <MdOutlineDelete
              onClick={() => handleDeleteItem(record._id)}
              style={{
                alignItem: "center",
                justifyContent: "center",
                color: "#360a5a",
                width: "20px",
                height: "35px",
              }}
            />
          </>
        );
      },
    },
  ];

  // Function to format date (dd Month yyyy)
  const formatDate = (timestamp) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = String(date.getFullYear());

    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  };

  // Function to format time (hh:mm:ss)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="divform">
      <Header />
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          <Table columns={columns} dataSource={data} scroll={{ y: 590 }} />
        </TableWrapper>
      </BodyWrapper>
    </div>
  );
}

export default ViewPriceLogs;
