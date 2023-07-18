import React from "react";
import { Input, Form, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  ButtonContainer,
  FormHeading,
} from "../../../humanresource/components/humanResourceForm/index.styled";

function rawMaterialForm() {
  return (
    <>
      <FormHeading className="HeaderHeading">
        Raw Material Inventory
      </FormHeading>
      <Form name="basic" layout="vertical" autoComplete="off">
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              label="Item Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please input item name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Item Description"
              name="Desc"
              rules={[
                {
                  required: true,
                  message: "Please input item description!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Item Unit"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "Please input item unit!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Item Quantity"
              name="quan"
              rules={[
                {
                  required: true,
                  message: "Please input item quantity!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Item Expiry Date"
              name="expdate"
              rules={[
                {
                  required: true,
                  message: "Please input item expiry date!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Item Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input item price",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Total Cost" name="totcost">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <ButtonContainer>
            <Button type="primary">Add Item</Button>
            <br></br>
            <Link to="/viewrawmaterial">
              <Button>View Item</Button>
            </Link>
          </ButtonContainer>
        </Form.Item>
      </Form>
    </>
  );
}

export default rawMaterialForm;
