import React, { useState, useEffect, useMemo } from "react";
import { Space, Select, Table } from "antd";
import { FormWrapper } from "../createprocessmodal/index.styled";
import { FormHeader } from "../../index.styled";
import axios from "axios";
import { useSetAtom } from "jotai";
import { UpdateHumanResourceAtom } from "../../../../atoms/process.atom";
// import { ProcessAtom } from "../../../../atoms/process.atom";

function HumanResourceForm() {
  const [value, setValue] = useState([]);
  const [humanresource, setHumanResource] = useState([]);
  const UpdateHumanResource = useSetAtom(UpdateHumanResourceAtom);
  // const process = useAtomValue(ProcessAtom);

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

  const onChange = (id) => {
    setValue(id);
  };

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

  const selectedHumanResource = useMemo(() => {
    return value.map((id) => {
      const emp = humanresource.find((_emp) => id.includes(_emp._id));
      return {
        id: emp._id,
        name: emp.name,
        desgn: emp.desgn,
        skills: emp.skills,
      };
    });
  }, [value, humanresource]);
  

  useEffect(() => {
    UpdateHumanResource(selectedHumanResource);
  }, [selectedHumanResource, UpdateHumanResource]);

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
