import React, { useState, useEffect } from "react";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import { TableWrapper } from "./index.styled";
import { Table, Modal, Input, Form, Tag, InputNumber } from "antd";
import { Spin } from "antd";
import axios from "axios";
import { BodyWrapper, SpinWrapper } from "../../styles/global.styled";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

function ViewRawMaterial() {
  const API_BASE_URL = "http://localhost:3005";
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [editingKey] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [total, setTotal] = useState(0);

  function getTagColor(record) {
    console.log("record", record.quan);
    let color = record.quan > 0 ? "green" : "green";
    if (record.quan === 0) {
      color = "grey";
      record.tag = "Finished";
    } else if (record.quan < 10) {
      color = "red";
      record.tag = "Alert";
    }
    return color;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Check the name of the input field and set the appropriate state variable
    if (name === "price") {
      setOne(value);
    } else if (name === "quan") {
      setTwo(value);
    }
  };

  const handleInChange = async (value, itemId) => {
    try {
      const selectedItem = data.find((item) => item._id === itemId);

      const previousPrice = selectedItem.price;

      selectedItem.price = value;

      await axios.put(`${API_BASE_URL}/rawMaterial/${itemId}`, selectedItem);

      await axios.post(`${API_BASE_URL}/priceLog`, {
        itemId: selectedItem._id,
        itemName: selectedItem.Name,
        previousPrice: previousPrice,
        updatedPrice: value,
      });

      fetchRawMaterials();
    } catch (error) {
      console.error("Error updating price:", error);
    }
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
        tag: formData.tag,
        itemlimit: formData.itemlimit,
      };

      await axios.put(
        `${API_BASE_URL}/rawMaterial/${selectedItem._id}`,
        updateData
      );
      alert("Item Updated");
      setOpen(false);
      window.location.reload();
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
    setOpen(false);
  };

  useEffect(() => {
    const numOne = one;
    const numTwo = two;

    if (!isNaN(numOne) && !isNaN(numTwo)) {
      const result = numOne * numTwo;
      setTotal(result);
      setFormData({ ...formData, totcost: result });
    } else {
      setTotal(0);
      setFormData({ ...formData, totcost: 0 });
    }
  }, [one] || [two]);

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
      key: "quan",
      width: "fit-content",
      editable: true,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "fit-content",
      editable: true,
      render: (record, item) => {
        return (
          <InputNumber
            defaultValue={item.price}
            onChange={(value) => handleInChange(value, item._id)}
            style={{ width: "100%", position: "relative" }}
          />
        );
      },
    },
    {
      title: "Limit",
      dataIndex: "itemlimit",
      key: "itemlimit",
      render: (text, record) => `${text} ${record.unit}`,
      width: "fit-content",
    },
    {
      title: "Total Price",
      dataIndex: "totcost",
      width: "fit-content",
      editable: true,
      render: (text) => `Rs.${text}`,
    },
    {
      title: "Status",
      dataIndex: "tag",
      width: "fit-content",
      render: (_, record) => (
        <Tag color={getTagColor(record)} key={record}>
          {record.tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "fit-content",
      render: (_, record) => {
        return (
          <>
            <FiEdit3
              onClick={() => showModal(record._id)}
              style={{ color: "#360a5a", width: "20px", height: "35px" }}
            />
            <MdOutlineDelete
              onClick={() => handleDeleteItem(record._id)}
              style={{
                marginLeft: "25px",
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

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3005/rawMaterial");
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
          {!loading && data.length > 0 ? (
            <Table
              columns={columns}
              dataSource={data}
              loading={loading}
            
              rowKey={(record) => record.uid}
            />
          ) : (
            <>
              <SpinWrapper>
                <Spin size="large" />
              </SpinWrapper>
            </>
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

            <Form.Item label="Total Cost" name="totcost">
              <Input
                name="totcost"
                value={total}
                onChange={handleInputChange}
              />
              {/* console.log("total value", total) */}
              {total}
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default ViewRawMaterial;
