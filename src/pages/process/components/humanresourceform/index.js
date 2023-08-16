import React, { useState, useEffect } from "react";
import { Space, Select, Table } from "antd";
import { FormWrapper } from "../createprocessmodal/index.styled";
import { FormHeader } from "../../index.styled";
import axios from "axios";
import { useSetAtom } from "jotai";
import { UpdateHumanResourceAtom } from "../../process.atom";

const generateOptions = (humanresource) => {
  const options = [];
  humanresource.forEach((emp) => {
    options.push({
      label: emp.name,
      value: emp._id,
    });
  });
  return options;
};

function HumanResourceForm() {
  const [value, setValue] = useState([]);
  const [options, setOptions] = useState([]);
  const [humanresource, setHumanResource] = useState([]);
  const setProcess = useSetAtom(UpdateHumanResourceAtom);

  useEffect(() => {
    fetchHumanResource();
  }, []);

  const fetchHumanResource = async () => {
    try {
      const response = await axios.get("http://localhost:3003/humanresource");
      const rawData = response.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setHumanResource(dataArray);
    } catch (error) {
      console.error("Error fetching human resources:", error);
    }
  };

  useEffect(() => {
    getOptions();
  }, [humanresource]); // Run when humanresource changes

  const getOptions = async () => {
    try {
      const newOptions = generateOptions(humanresource);
      setOptions(newOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const onChange = (newValue) => {
    setProcess(newValue);
    setValue(newValue);
    //setSelectedHumanResource(newValue); // Update selected employees in parent component
  };

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    value,
    options,
    onChange, // Use the onChange function defined above
    placeholder: "Select employee...",
    maxTagCount: "responsive",
  };

  const selectedHumanResource = humanresource.filter((employee) =>
    value.includes(employee._id)
  );

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Employee Designation",
      dataIndex: "desgn",
      key: "desgn",
    },
    {
      title: "Employee Skills",
      dataIndex: "skills",
      key: "skills",
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

      <Table dataSource={selectedHumanResource} columns={columns} />
    </FormWrapper>
  );
}

export default HumanResourceForm;
