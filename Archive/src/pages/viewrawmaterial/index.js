import React, { useState, useEffect } from "react";
import Header from "../../layout/dashboardheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, TableWrapper } from "../../styles/global.styled";
import { Table, Typography, Modal, Input, Form } from "antd";
import axios from "axios";

function ViewRawMaterial() {
  const API_BASE_URL = "http://localhost:3003";
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [editingKey] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState(null); // Initialize data as null instead of an empty array
  const [loading, setLoading] = useState(true);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const showModal = async (id) => {
    console.log(id);
    try {
      setOpen(true);
      const selectedItem = data.find((item) => item._id === id);
      setSelectedItem(selectedItem);
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    console.log(itemId);
    try {
      await axios.delete(`${API_BASE_URL}/rawMaterial/${itemId}`);
      alert("Item deteted successfully");
      // Reload the current route
      window.location.reload();
    } catch (error) {
      // Handle error
      alert("Item could not be deteted");
    }
  };

  const handleOk = async () => {
    try {
      const updateData = {
        Name: formData.Name,
        Desc: formData.Desc,
        unit: formData.unit,
        quan: formData.quan,
        expdate: formData.expdate,
        price: formData.price,
        totcost: formData.totcost,
      };
  
      await axios.put(`${API_BASE_URL}/rawMaterial/${selectedItem._id}`, updateData);
      alert("Item Updated");
      setOpen(false);
    } catch (error) {
      // Handle error
      console.error("Error updating item:", error);
    }
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
              onClick={() => showModal(record._id)}
              style={{ padding: "10%" }}
            >
              Update
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => handleDeleteItem(record._id)}
              style={{ padding: "10%" }}
            >
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];

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
      {/* <Header /> */}
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          {!loading && data.length > 0 ? ( // Conditionally render the table when data is available and not loading
            <Table columns={columns} dataSource={data} loading={loading} style={{width:"100"}}/>
          ) : (
            <p>Loading..</p>
          )}
        </TableWrapper>
      </BodyWrapper>
      <Modal
        title="Update Item Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {selectedItem && (
          <Form
            name="basic"
            initialValues={{
              Name: selectedItem.Name,
              Desc: selectedItem.Desc,
              unit: selectedItem.unit,
              quan: selectedItem.quan,
              expdate: selectedItem.expdate,
              price: selectedItem.price,
              totcost: selectedItem.totcost,
            }}
            onFinish={handleOk}
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
        )}
      </Modal>
    </div>
  );
}

export default ViewRawMaterial;