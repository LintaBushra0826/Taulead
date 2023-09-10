import React, { useState, useEffect, useMemo } from "react";
import { Table, InputNumber } from "antd";
import { FormWrapper } from "../createprocessmodal/index.styled";
import { Select, Space } from "antd";
import { FormHeader } from "./index.styled";
import axios from "axios";
import { useSetAtom } from "jotai";
import { UpdateRawMaterialAtom } from "../../../../atoms/process.atom";

function RawMaterialForm() {
  const updateRawMaterial = useSetAtom(UpdateRawMaterialAtom);
  const [value, setValue] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    updateRawMaterial(selectedItems);
    console.log("selectedItems", selectedItems);
  }, [selectedItems, updateRawMaterial]);

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const options = useMemo(
    () =>
      rawMaterial.map((material) => ({
        label: material.Name,
        value: material._id,
      })),
    [rawMaterial]
  );

  const fetchRawMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3003/rawMaterial");
      const rawData = response.data.data;
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setRawMaterial(dataArray);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };

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
    const itemToUpdate = rawMaterial.find((_item) => id === _item._id);
    console.log("id", id);
    if (itemToUpdate) {
      const updatedSelectedItems = selectedMaterials.map((item) => {
        if (id === item._id) {
          console.log("item._id", id);
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
    }
  };

  const selectedMaterials = useMemo(() => {
    return value.map((id) => {
      const item = rawMaterial.find((_item) => id === _item._id);
      return {
        ...item,
        // quan: 1,
      };
    });
  }, [value, rawMaterial]);

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
            max={item.quan}
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

      <Table dataSource={selectedMaterials} columns={columns} />
    </FormWrapper>
  );
}

export default RawMaterialForm;
