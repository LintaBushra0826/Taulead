import React, { useState } from "react";
import { Space, Select, Table } from "antd";
import { FormWrapper } from "../createprocessform/index.styled";
import { FormHeader } from "../rawmaterialform/index.styled";

function HumanResourceForm() {
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
    placeholder: "Select Employees...",
    maxTagCount: "responsive",
  };
  const dataSource = [
    {
      key: "1",
      empid: 32,
      empname: "Mice",
      empdesc: "10 Downing Street",
      empskills: "Chief",
    },
    {
      key: "2",
      empid: 32,
      empname: "Mice",
      empdesc: "10 Downing Street",
      empskills: "Chief",
    },
    
  ];
  const columns = [
    {
      title: "Employee Id",
      dataIndex: "empid",
      key: "empid",
    },
    {
      title: "Employee Name",
      dataIndex: "empname",
      key: "empname",
    },
    {
      title: "Employee Designation",
      dataIndex: "empdesc",
      key: "empdesc",
    },
    {
      title: "Employee Skills",
      dataIndex: "empskills",
      key: "empskills",
    },
  ];
  return (
    <FormWrapper>
      <FormHeader>Select Employees:</FormHeader>
      <Space
        direction="vertical"
        style={{ width: "50%", position: "relative", padding: "10px" }}
      >
        <Select {...selectProps} />
      </Space>

      <Table dataSource={dataSource} columns={columns} />
    </FormWrapper>
  );
}

export default HumanResourceForm;
