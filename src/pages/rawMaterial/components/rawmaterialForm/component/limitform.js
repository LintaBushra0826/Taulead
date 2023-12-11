import React, { useState } from "react";
import { Input, Form, Row, Col, InputNumber } from "antd";
import { useSetAtom } from "jotai";
import { LimitAtom } from "../../../../../atoms/limit.atom";

function LimitForm() {
  const API_BASE_URL = "http://localhost:3005";
  const setlimitatom = useSetAtom(LimitAtom);
  const [formData, setFormData] = useState({
    itemlimit: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setlimitatom((prevProcess) => ({ ...prevProcess, [name]: value }));
  };
  return (
    <>
      <Form name="basic" layout="vertical" autoComplete="off">
        <Row gutter={20}>
          <Col span={20}>
            <Form.Item label="Set Inventory Limit" name="itemlimit">
              <InputNumber
                name="itemlimit"
                defaultValue={formData.itemlimit}
                onChange={handleInputChange}
                style={{ width: "25%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default LimitForm;
