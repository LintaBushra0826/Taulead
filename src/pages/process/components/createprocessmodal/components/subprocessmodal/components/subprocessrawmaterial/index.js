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
    const updatedValue = value.map((id) => {
      const item = process.rawMaterial.find((_item) => id === _item._id);
      const prevItem = selectedItems.find((_item) => id === _item._id);
      if (item && prevItem) {
        return prevItem;
      } else if (item) {
        return {
          ...item,
          quan: 1,
        };
      }
      return item;
    });
    setSelectedItems(updatedValue);
  }, [value]);

  useEffect(() => {
    console.log(selectedItems, "pjpj");
    updateSubRawMaterialAtom(selectedItems);
  }, [selectedItems]);

  const options = useMemo(() => {
    return process.rawMaterial.map((material) => ({
      label: material.Name,
      value: material._id,
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

  const handleInputChange = (updatedValue, id) => {
    console.log(process.rawMaterial, "pjl", id);
    const itemToUpdate = process.rawMaterial.find((_item) => id === _item._id);
    if (itemToUpdate) {
      const updatedSelectedItems = selectedItems.map((item) => {
        if (id === item._id) {
          return {
            ...item,
            quan: updatedValue,
          };
        }
        return item;
      });
      setSelectedItems(updatedSelectedItems);
    }
  };

  // const selectedMaterials = useMemo(() => {
  //   return value.map((item) => {
  //     const rawMaterialItem = process.rawMaterial.find(
  //       (_item) => item.id === _item._id
  //     );
  //     return rawMaterialItem;
  //   });
  // }, [value]);

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
            max={process.rawMaterial.quan}
            defaultValue={1}
            onChange={(value) => handleInputChange(value, item._id)}
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

      <Table dataSource={selectedItems} columns={columns} />
    </FormWrapper>
  );
}

export default SubRawMaterialForm;
