import React, { useState, useEffect, useMemo, useReducer } from "react";
import { Table, InputNumber } from "antd";
import { FormWrapper } from "../../../createprocessmodal/index.styled";
import { Select, Space } from "antd";
import { FormHeader } from "./index.styled";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { UpdateRawMaterialAtom } from "../../../../../../atoms/process.atom";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_ITEMS":
      return action.payload;
    default:
      return state;
  }
}

function RawMaterialForm(rawMaterialData) {
  const updateRawMaterial = useSetAtom(UpdateRawMaterialAtom);
  const up = useAtomValue(UpdateRawMaterialAtom);
  const [value, setValue] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [selectedItems, dispatch] = useReducer(reducer, []);
  const [selectedItem, setSelectedItems] = useState([]);

  const rawMaterialArray = Object.values(rawMaterialData);
  const flatRawMaterialArray = rawMaterialArray.flat(2);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:3005/rawMaterial");
        const rawData = response.data.data;

        // Check if rawData is an array before processing
        const dataArray = Array.isArray(rawData) ? rawData : [];

        setRawMaterial(dataArray);

        // Initialize selectedItems once when data is fetched
        const initialSelectedItems = flatRawMaterialArray.map((item) => ({
          ...item,
        }));
        setSelectedItems(initialSelectedItems);
        dispatch({ type: "UPDATE_ITEMS", payload: initialSelectedItems });
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    fetchRawMaterials();
  }, [rawMaterialData]);

  useEffect(() => {
    // Identify newly selected items
    const newSelectedItems = value.map((id) => {
      const existingItem = selectedItems.find((item) => item._id === id);
      const newItem = rawMaterial.find((item) => item._id === id);

      if (existingItem) {
        return existingItem;
      } else if (newItem) {
        // Check if it's a new item and set quan to 1 only if it doesn't exist in selectedItems
        const existingSelectedItem = selectedItems.find(
          (item) => item._id === newItem._id
        );
        return existingSelectedItem ? newItem : { ...newItem, quan: 1 };
      }

      return null;
    });

    // Combine existing and newly selected items while avoiding duplicates
    const updatedItems = [
      ...selectedItems.filter((item) => !value.includes(item._id)),
      ...newSelectedItems.filter(Boolean),
    ];

    dispatch({ type: "UPDATE_ITEMS", payload: updatedItems });
    updateRawMaterial(updatedItems);
  }, [value, rawMaterial, selectedItems, updateRawMaterial]);

  const options = useMemo(
    () =>
      rawMaterial.map((material) => ({
        label: material.Name,
        value: material._id,
      })),
    [rawMaterial]
  );

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

      dispatch({ type: "UPDATE_ITEMS", payload: updatedSelectedItems });
      updateRawMaterial(updatedSelectedItems);
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
      render: (record, item) => (
        <InputNumber
          min={1}
          value={item?.quan || 1}
          onChange={(value) => handleInputChange(value, item._id)}
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
        style={{ width: "50%", position: "relative", padding: "10px" }}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          value={value}
          options={options}
          onChange={setValue}
          placeholder="Select Item..."
          maxTagCount="responsive"
        />
      </Space>

      <Table dataSource={selectedItems} columns={columns} />
    </FormWrapper>
  );
}

export default RawMaterialForm;
