import React, { useState, useEffect, useMemo } from "react";
import { Table, InputNumber } from "antd";
import { FormWrapper } from "../../../../../createprocessmodal/index.styled";
import { Select, Space } from "antd";
import { FormHeader } from "./index.styled";
import { useAtomValue, useSetAtom } from "jotai";
import { UpdateSubRawMaterialAtom } from "../../../../../../../../atoms/subprocess.atom";
import { ProcessAtom } from "../../../../../../../../atoms/process.atom";

function SubRawMaterialForm() {
  const updateSubRawMaterialAtom = useSetAtom(UpdateSubRawMaterialAtom);
  const process = useAtomValue(ProcessAtom);
  const [value, setValue] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    updateSubRawMaterialAtom(selectedItems);
  }, [selectedItems]);

  const options = useMemo(() => {
    return process.rawMaterial.map((material) => ({
      label: material.Name,
      value: material.id,
      quantity: material.quantity,
      unit: material.unit,
    }));
  }, [process.rawMaterial]);

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    value,
    options,
    onChange: onChange,
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };

  const handleInputChange = (value, id) => {
    const updatedSelectedItems = selectedMaterials.map((item) => {
      if (id === item.id) {
        return {
          id: id,
          Name: item.Name,
          quantity: value,
          unit: item.unit,
        };
      }
      return item;
    });
    setSelectedItems(updatedSelectedItems);
  };

  const selectedMaterials = useMemo(() => {
    return value.map((item) => {
      const rawMaterialItem = process.rawMaterial.find(
        (_item) => item.id === _item._id
      );
      return {
        ...rawMaterialItem,
        ...item,
      };
    });
  }, [value, process.rawMaterial]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Item Quantity",
      dataIndex: "quan",
      key: "quan",
      render: (record, item) => {
        return (
          <InputNumber
            min={1}
            max={item.quantity}
            defaultValue={1}
            onChange={(value) => handleInputChange(value, item.id)}
            style={{ width: "50%", position: "relative" }}
          />
        );
      },
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
        style={{ width: "50%", position: "relative", padding: "10px" }}
      >
        <Select {...selectProps} />
      </Space>

      <Table dataSource={selectedMaterials} columns={columns} />
    </FormWrapper>
  );
}

export default SubRawMaterialForm;
