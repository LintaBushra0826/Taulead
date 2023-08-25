import React, { useState, useEffect, useMemo } from "react";
import { Space, Select, Table } from "antd";
import { FormWrapper } from "../../../../../createprocessmodal/index.styled";
import { FormHeader } from "../../../../../../index.styled";
import { useSetAtom, useAtomValue } from "jotai";
import { UpdateSubHumanResourceAtom } from "../../../../../../../../atoms/subprocess.atom";
import { ProcessAtom } from "../../../../../../../../atoms/process.atom";

function SubHumanResourceForm() {
  const [value, setValue] = useState([]);
  const process = useAtomValue(ProcessAtom);
  const UpdateSubHRAtom = useSetAtom(UpdateSubHumanResourceAtom);

  const options = useMemo(
    () =>
      process.humanResource.map((emp) => ({
        label: emp.name,
        value: emp.id,
      })),
    [process.humanResource]
  );

  const onChange = (newValue) => {
    setValue(newValue);
  };

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

  const selectedSubHumanResource = useMemo(() => {
    return value.map((id) => {
      const emp = process.humanResource.find((_emp) => id.includes(_emp.id));

      return {
        id: emp.id,
        name: emp.name,
        desgn: emp.desgn,
        skills: emp.skills,
      };
    });
  }, [value, process.humanResource]);

  useEffect(() => {
    UpdateSubHRAtom(selectedSubHumanResource);
  }, [selectedSubHumanResource]);

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

      <Table dataSource={selectedSubHumanResource} columns={columns} />
    </FormWrapper>
  );
}

export default SubHumanResourceForm;
