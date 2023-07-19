import React, { useState } from "react";
import { Table, InputNumber } from "antd";
import { FormWrapper } from "../createprocessform/index.styled";
import { Select, Space } from "antd";
import { FormHeader } from "./index.styled";

function RawMaterialForm() {
  const onChange = (value) => {
    console.log("changed", value);
  };
  const options = [];
  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
      label: `Long Label: ${value}`,
      value,
    });
  }
  const [value, setValue] = useState(["a10", "c12", "h17", "j19", "k20"]);
  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };
  const dataSource = [
    {
      key: "1",
      name: "Rice",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "Milk",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Item Quantity",
      dataIndex: "quan",
      key: "quan",
      render: () => (
        <InputNumber
          min={1}
          max={10}
          defaultValue={1}
          onChange={onChange}
          style={{ width: "50%", position: "relative" }}
        />
      ),
    },
    {
      title: "Item Unit",
      dataIndex: "unit",
      key: "unit",
    },
  ];
  return (
    <FormWrapper>
      <FormHeader>Select Items:</FormHeader>
      <Space
        direction="vertical"
        style={{ width: "50%", position: "relative", padding:'10px'}}
      >
        <Select {...selectProps} />
      </Space>

      <Table dataSource={dataSource} columns={columns} />
    </FormWrapper>
  );
}

export default RawMaterialForm;
