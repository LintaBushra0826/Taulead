import React, { useState, useEffect } from "react";
import Header from "../../layout/dashboardheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, TableWrapper } from "../../styles/global.styled";
import { Table, Typography, Modal, Input, Form } from "antd";
import axios from "axios";

function ViewMeauringUnit() {
  const API_BASE_URL = "http://localhost:3003";
  const [formData, setFormData] = useState({});
  const [selectedUnit, setSelectedUnit] = useState({});
  const [editingKey] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading] = useState(false);
  const [data, setData] = useState(null); // Initialize data as null instead of an empty array
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
      await axios.delete(`${API_BASE_URL}/MeasuringUnit/${unitId}`);
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
        name: selectedUnit.name,
        desc: selectedUnit.desc,
        type: selectedUnit.type,
        scale: selectedUnit.scale,
      };

      console.log("Update Data:", updateData);
      // const response = await axios.put(
      //   `${API_BASE_URL}/MeasuringUnit/${selectedUnit._id}`,
      //   updateData
      // );
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
    fetchMeasuringUnit();
  }, []);

  const fetchMeasuringUnit = async () => {
    try {
      const response = await axios.get("http://localhost:3003/MeasuringUnit");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];

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
            <p>Loading..</p>
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
