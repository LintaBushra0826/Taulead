import React, { useState, useEffect } from "react";
import Header from "../../layout/dashboardheader";
import SideMenu from "../../layout/sideMenu";
import {
  BodyWrapper,
  SpinWrapper,
  TableWrapper,
} from "../../styles/global.styled";
import { Table, Typography, Modal, Input, Form, Tag, Spin } from "antd";
import axios from "axios";

function ViewHumanResource() {
  const API_BASE_URL = "http://localhost:3005";
  const [formData, setFormData] = useState({});
  const [selectedHR, setSelectedHR] = useState({});
  const [editingKey] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function getTagColor(record) {
    console.log("record", record);
    let color = record.quan > 0 ? "green" : "green";
    if (record === "busy") {
      color = "green";
    } else if (record === "terminated") {
      color = "orange";
    }
    return color;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const showModal = async (id) => {
    try {
      setOpen(true);
      const selectedHR = data.find((item) => item._id === id);
      setSelectedHR(selectedHR);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleDeleteItem = async (hrId) => {
    try {
      await axios.delete(`${API_BASE_URL}/humanresource/${hrId}`);
      alert("Employee data deleted successfully");

      // Reload the current route
      window.location.reload();
    } catch (error) {
      alert("Employee data deleted");
    }
  };

  const handleOk = async () => {
    try {
      const updateData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        email: formData.email,
        salary: formData.salary,
        hired: formData.hired,
        desgn: formData.desgn,
        desgnesc: formData.desgnesc,
        skills: formData.skills,
        tag: formData.tag,
      };

      await axios.put(
        `${API_BASE_URL}/humanresource/${selectedHR._id}`,
        updateData
      );
      alert("Employee data Updated");

      // Handle success or navigate to a different page
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee data:", error);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "fit-content",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: "fit-content",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "fit-content",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      width: "fit-content",

      render: (text) => `Rs.${text}`,
    },
    {
      title: "Hired On",
      dataIndex: "hired",
      width: "fit-content",
    },
    {
      title: "Designation",
      dataIndex: "desgn",
      width: "fit-content",
    },
    {
      title: "Job Description",
      dataIndex: "desgnesc",
      width: "fit-content",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      width: "fit-content",
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
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => showModal(record._id)}
              style={{
                fontSize: "12px",
                // padding: "2%",
                backgroundColor: "#ECF8F9",
                color: "#00A9FF",
                borderColor: "#AEE2FF",
                border: "1px",
                borderStyle: "solid",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "6px",
              }}
            >
              UPDATE
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => handleDeleteItem(record._id)}
              style={{
                Left: "5%",
                fontSize: "12px",
                backgroundColor: "#FFE5E5",
                color: "#BB2525",
                borderColor: "#FF9B82",
                border: "1px",
                borderStyle: "solid",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              DELETE
            </Typography.Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchHumanResource();
  }, []);

  const fetchHumanResource = async () => {
    try {
      const response = await axios.get("http://localhost:3005/humanresource");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setData(dataArray);
      console.log("data", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching human resource:", error);
      setLoading(false);
    }
  };
  return (
    <div className="divform">
      {/* <Header /> */}
      <BodyWrapper>
        <SideMenu />
        <TableWrapper>
          {!loading && data.length > 0 ? (
            <Table
              columns={columns}
              dataSource={data}
              loading={loading}
              scroll={{
                x: 80, // Set a fixed height for vertical scrolling (can be 'number' or 'string')
                scrollToFirstRowOnChange: true, // Scroll to the top of the table when paging, sorting, filtering changes
              }}
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
        title="Employees Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {selectedHR && (
          <Form
            name="basic"
            initialValues={{
              name: selectedHR.name,
              phoneNumber: selectedHR.phoneNumber,
              address: selectedHR.address,
              email: selectedHR.email,
              salary: selectedHR.salary,
              hired: selectedHR.hired,
              desgn: selectedHR.desgn,
              desgnesc: selectedHR.desgnesc,
              skills: selectedHR.skills,
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
            <Form.Item label="Name" name="name">
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Phone Number" name="phoneNumber">
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Salary" name="salary">
              <Input
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Hired On" name="hired">
              <Input
                name="hired"
                value={formData.hired}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Designation" name="desgn">
              <Input
                name="desgn"
                value={formData.desgn}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Job Description" name="desgnesc">
              <Input
                name="desgnesc"
                value={formData.desgnesc}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Skills" name="skills">
              <Input
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default ViewHumanResource;
