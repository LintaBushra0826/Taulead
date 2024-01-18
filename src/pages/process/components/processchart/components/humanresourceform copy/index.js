import React, { useState, useEffect, useMemo } from "react";
import { Space, Select, Table } from "antd";
import { FormWrapper } from "../../../createprocessmodal/index.styled";
import { FormHeader } from "../../../../index.styled";
import axios from "axios";
import { useSetAtom } from "jotai";
import { UpdateHumanResourceAtom } from "../../../../../../atoms/process.atom";

function HumanResourceForm(humanResourceData) {
  const [value, setValue] = useState([]);
  const [humanresource, setHumanResource] = useState([]);
  const [selectedHumanResource, setSelectedHumanResource] = useState([]);
  const updatehr = useSetAtom(UpdateHumanResourceAtom);

  const humanResourceArray = Object.values(humanResourceData);
  const flatHumanResourceArray = humanResourceArray.flat(2);

  useEffect(() => {
    const updatedSelected = flatHumanResourceArray.map((item) => ({
      ...item,
    }));
    setSelectedHumanResource(updatedSelected);
    updatehr(updatedSelected);
  }, [humanResourceData]);

  useEffect(() => {
    fetchHumanResource();
  }, []);

  const fetchHumanResource = async () => {
    try {
      const response = await axios.get("http://localhost:3005/humanresource");
      const rawData = response.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setHumanResource(dataArray);
    } catch (error) {
      console.error("Error fetching human resources:", error);
    }
  };

  const onChange = (ids) => {
    setValue(ids);

    // Update selectedHumanResource based on the selected ids
    const updatedSelected = [
      ...flatHumanResourceArray, // Existing ones
      ...ids.map((id) => humanresource.find((emp) => emp._id === id)),
    ];

    setSelectedHumanResource(updatedSelected);
    updatehr(updatedSelected);
  };

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

  const options = useMemo(
    () =>
      humanresource.map((emp) => ({
        label: emp.name,
        value: emp._id,
      })),
    [humanresource]
  );

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    value,
    options,
    onChange,
    placeholder: "Select employee...",
    maxTagCount: "responsive",
  };

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
