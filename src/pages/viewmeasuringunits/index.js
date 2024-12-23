import React, { useState, useEffect } from "react";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, SpinWrapper } from "../../styles/global.styled";
import { TableWrapper } from "./index.styled";
import { Table, Typography, Modal, Input, Form, Spin } from "antd";
import axios from "axios";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

function ViewMeauringUnit() {
  const API_BASE_URL = "http://localhost:3005";
  const [formData, setFormData] = useState({});
  const [selectedUnit, setSelectedUnit] = useState({});
  const [editingKey] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const showModal = async (id) => {
    console.log(id);
    try {
      setOpen(true);
      const selectedUnit = data.find((item) => item._id === id);
      setSelectedUnit(selectedUnit);
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  const handleDeleteItem = async (unitId) => {
    console.log(unitId);
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE_URL}/MeasuringUnit/${unitId}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Unit deleted successfully");
      // Reload the current route
      window.location.reload();
    } catch (error) {
      // Handle error
      alert("Unit could not be deleted");
    }
  };

  const handleOk = async () => {
    try {
      const updateData = {
        name: formData.name,
        desc: formData.desc,
        type: formData.type,
        scale: formData.scale,
      };

      const token = localStorage.getItem("token");

      await axios.put(
        `${API_BASE_URL}/MeasuringUnit/${selectedUnit._id}`,
        updateData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Unit Updated");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error("Error updating unit:", error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "fit-content",
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "fit-content",
      editable: true,
    },
    {
      title: "Scale",
      dataIndex: "scale",
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
    fetchMeasuringUnit();
  }, []);

  const fetchMeasuringUnit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token in fetch:", token);

      // Include the token in the headers
      const response = await fetch(`${API_BASE_URL}/MeasuringUnit`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      console.log("Data from fetch:", data);

      const rawData = data.data;

      // Ensure rawData is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];
      console.log("dataArray", dataArray);

      setData(dataArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching measuring unit:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          {!loading && data.length > 0 ? (
            <Table columns={columns} dataSource={data} loading={loading} />
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
        title="Update Unit Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {selectedUnit && (
          <Form
            name="basic"
            initialValues={{
              name: selectedUnit.name,
              desc: selectedUnit.desc,
              type: selectedUnit.type,
              scale: selectedUnit.scale,
            }}
            // onFinish={handleOk}
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
            <Form.Item label="Unit Name" name="name">
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Unit Description" name="desc">
              <Input
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Unit Type" name="type">
              <Input
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Unit Scale" name="scale">
              <Input
                name="scale"
                value={formData.scale}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default ViewMeauringUnit;
