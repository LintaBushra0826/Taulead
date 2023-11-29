import React, { useState } from "react";
import img3 from "../../../../assets/images/img3.jpg";
import {
  Box,
  Wrapper3,
  Div,
  ContactHead,
  ContactButtonWrapper,
} from "./index.styled";
import nastp from "../../../../assets/images/nastp-removebg-preview.png";
import siber from "../../../../assets/images/siber-removebg-preview.png";
import bgPic from "../../../../assets/images/contact1.png";
import { Button, Col, Divider, Form, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ButtonItem } from "@progress/kendo-react-buttons/dist/npm/ListButton/ButtonItem";

export default function Features() {
  const [slideUp, setSlideUp] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    lname: "",
    email: "",
    phone: "",
    suggbox: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Wrapper3>
      <ContactHead>Contact Us</ContactHead>

      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        style={{ position: "absolute" }}
      >
        <Row gutter={20}>
          <Col span={9}>
            <Form.Item
              labelCol={{ span: 24 }}
              label={<span style={{ color: "#D3CCE3" }}>First Name</span>}
              name="fName"
            >
              <Input
                name="fName"
                defaultValue={formData.fName}
                onChange={handleInputChange}
                style={{
                  color: "#D3CCE3",
                  fontSize: "24px",
                  backgroundColor: "transparent",
                  borderColor: "#D3CCE3",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              label={<span style={{ color: "#D3CCE3" }}>Last Name</span>}
              name="lname"
              style={{ color: "D3CCE3" }}
            >
              <Input
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                style={{
                  color: "#D3CCE3",
                  fontSize: "24px",
                  backgroundColor: "transparent",
                  borderColor: "#D3CCE3",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              labelCol={{ span: 24 }}
              label={<span style={{ color: "#D3CCE3" }}>Email Address</span>}
              name="email"
            >
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  color: "#D3CCE3",
                  fontSize: "24px",
                  backgroundColor: "transparent",
                  borderColor: "#D3CCE3",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              label={<span style={{ color: "#D3CCE3" }}>Phone</span>}
              name="phone"
            >
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  color: "#D3CCE3",
                  fontSize: "24px",
                  backgroundColor: "transparent",
                  borderColor: "#D3CCE3",
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={17}>
            <Form.Item
              labelCol={{ span: 24 }}
              label={
                <span style={{ color: "#D3CCE3" }}>Comments/Suggestions</span>
              }
              name="suggbox"
            >
              <TextArea
                placeholder="Enter your comments/suggestions"
                allowClear
                onChange={handleInputChange}
                className="transparent-textarea"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Button className="contactbutton">Submit</Button>
      <img
        src={bgPic}
        alt="bgPic"
        className="bg-image"
        style={{
          position: "absolute",
          width: "30%",
          height: "60vh",
          marginRight: "-990px",
        }}
      />
    </Wrapper3>
  );
}
