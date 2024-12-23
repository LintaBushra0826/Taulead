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
  const API_BASE_URL = "http://localhost:3005";

  const onChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const updatedValue = value.map((id) => {
      const item = rawMaterial.find((_item) => id === _item._id);
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
    console.log("item which is updtaed", updatedValue);
    setSelectedItems(updatedValue);
  }, [value]);

  useEffect(() => {
    updateRawMaterial(selectedItems);
  }, [selectedItems]);

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
      const token = localStorage.getItem("token");

      // Include the token in the headers
      const response = await fetch(`${API_BASE_URL}/rawMaterial`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      const rawData = data.data;

      // Ensure rawData is an array
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

  const handleInputChange = (updatedValue, id) => {
    const itemToUpdate = rawMaterial.find((_item) => id === _item._id);
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

      // If the value is different from the current value in the selected materials
      setSelectedItems(updatedSelectedItems);
      // if (value !== itemToUpdate.quan) {
      // } else {
      //   // If the value remains the same (1), add the item as is (without quan change)
      //   setSelectedItems((prevSelectedItems) => {
      //     if (!prevSelectedItems.find((item) => item.id === id)) {
      //       return [...prevSelectedItems, itemToUpdate];
      //     }
      //     return prevSelectedItems;
      //   });
      // }
    }
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Item quan",
      dataIndex: "quan",
      key: "quan",
      render: (record, item) => {
        return (
          <InputNumber
            min={1}
            // max={item.quan}
            defaultValue={1}
            // value={item.quan}
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

export default RawMaterialForm;
