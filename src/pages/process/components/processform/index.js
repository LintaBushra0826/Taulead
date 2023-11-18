import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
} from "antd";
import { useSetAtom } from "jotai";
import React from "react";
import { ProcessAtom } from "../../../../atoms/process.atom";

function ProcessForm({ formData, setFormData }) {
  const setProcess = useSetAtom(ProcessAtom);

  const onStartChange = (value, dateString) => {
    console.log("Selected Start Time: ", value);
    console.log("Formatted Selected Start Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const startDate = value ? value.toDate() : null;

    setFormData((prevData) => ({
      ...prevData,
      start: startDate,
    }));
    setProcess((prevProcess) => ({
      ...prevProcess,
      start: startDate,
    }));
  };

  const onEndChange = (value, dateString) => {
    console.log("Selected End Time: ", value);
    console.log("Formatted Selected End Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const endDate = value ? value.toDate() : null;

    setFormData((prevData) => ({
      ...prevData,
      end: endDate,
    }));
    setProcess((prevProcess) => ({
      ...prevProcess,
      end: endDate,
    }));
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
          <Form.Item label="Process ID" name="pid">
            <Input
              name="pid"
              value={formData.pid}
              onChange={handleInputChange}
              placeholder="PPP-1"
            />
          </Form.Item>
        </Col>
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
          <Form.Item label="Process Start Date/Time" name="start">
          <DatePicker showTime onChange={onStartChange} />
          </Form.Item>
        </Col>
        <Col padding="0px" span={8}>
          <Form.Item label="Process End Date/Time" name="end">
          <DatePicker showTime onChange={onEndChange} />
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
