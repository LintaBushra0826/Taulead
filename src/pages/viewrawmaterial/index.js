import React, { useState, useEffect } from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, TableWrapper } from "../../styles/global.styled";
import { Table, Typography, Modal, Input, Form } from "antd";
import axios from "axios";

function ViewRawMaterial() {
  const API_BASE_URL = "http://localhost:3003";
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [editingKey, setEditingKey] = useState("");
  const edit = (record) => {
    setEditingKey(record.key);
  };
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modelText, setModalText] = useState("Content of the modal");

  const showModal = async (record) => {
    console.log("Clicked on Update. Record:", record);

    setOpen(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/rawMaterial/${record._id}` // Use record._id instead of record.key
      );
      const itemData = response.data["Item Recieved"];
      setFormData(itemData); // Set the fetched data to the form data state
    } catch (error) {
      console.error("Error fetching item data:", error);
      // Handle error as needed
    }
  };

  const handleOk = () => {
    setModalText("Updating");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      width: "fit-content",
    },
    {
      title: "Description",
      dataIndex: "Desc",
      width: "fit-content",
      editable: true,
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
      title: "Price",
      dataIndex: "price",
      width: "fit-content",
      editable: true,
      render: (text) => `Rs.${text}`,
    },
    {
      title: "Total Price",
      dataIndex: "totcost",
      width: "fit-content",
      editable: true,
      render: (text) => `Rs.${text}`,
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
              onClick={() => showModal(record)}
              style={{ padding: "10%" }}
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
  const [data, setData] = useState(null); // Initialize data as null instead of an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3003/rawMaterial");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];

      setData(dataArray); // Set the data array here
      setLoading(false);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
      setLoading(false);
    }
  };
  return (
    <div className="divform">
      <Header />
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          {!loading && data.length > 0 ? ( // Conditionally render the table when data is available and not loading
            <Table columns={columns} dataSource={data} loading={loading} />
          ) : (
            <p>Loading..</p>
          )}
        </TableWrapper>
      </BodyWrapper>
      <Modal
        title="Item Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item label="Item Name" name="Name">
            <Input
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Item Description" name="Desc">
            <Input
              name="Desc"
              value={formData.Desc}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Item Unit" name="unit">
            <Input
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Item Quantity" name="quan">
            <Input
              name="quan"
              value={formData.quan}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Item Expiry Date" name="expdate">
            <Input
              name="expdate"
              value={formData.expdate}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Item Price" name="price">
            <Input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewRawMaterial;

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

// sorter: (a, b) => a.age - b.age,
// sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
// ellipsis: true,

// {
//   title: "Status",
//   dataIndex: "status",
//   width: "fit-content",
//   editable: true,
// },
