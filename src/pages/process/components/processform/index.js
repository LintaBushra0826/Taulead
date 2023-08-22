import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  //message,
  // Dropdown,
  // Space,
  // Typography,
  // Button,
} from "antd";
// import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useSetAtom } from "jotai";
import React from "react";
import { ProcessAtom } from "../../process.atom";

function ProcessForm({ formData, setFormData }) {
  const setProcess = useSetAtom(ProcessAtom);

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const startDate = value ? value.toDate() : null;

    setFormData((prevData) => ({ ...prevData, start: startDate }));
    setProcess((prevProcess) => ({ ...prevProcess, start: startDate }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
  };

  // const handleMenuClick = (e) => {
  //   message.info("Click on menu item.");
  //   console.log("click", e);
  // };

  // const items = [
  //   {
  //     label: "process",
  //     key: "3",
  //   },
  // ];

  // const menuProps = {
  //   items,
  //   onClick: handleMenuClick,
  // };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Process Name" name="name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Process Description" name="desc">
            <Input
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20} justify="start">
        <Col span={8}>
          <Form.Item label="Process Start Date" name="start">
            <DatePicker showTime onChange={onChange} />
          </Form.Item>
        </Col>
        <Col padding="0px" span={8}>
          <Form.Item label="Process Duration" name="duration">
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={8}>
        <Col span={20}>
          <Form.Item label="Link to" name="sublink">
            <Input
              name=""
              value={formData.subduration}
              onChange={handleInputChange}
            />
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  select process
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Form.Item>
        </Col>
      </Row> */}
    </Form>
  );
}

export default ProcessForm;
