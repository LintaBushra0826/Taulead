import React, { useEffect, useState } from "react";
import SideMenu from "../../layout/sideMenu";
import RawMaterialChart from "./components/rawmaterialchart";
import HumanResourceChart from "./components/humanrsourcechart";
import RawMaterialTable from "./components/rawmaterialtable";
import HumanResourceTable from "./components/humanresourcetable";
import ProcessTable from "./components/processtable";
import Table from "./components/rawmaterialtable";
import { Select } from "antd";
import {
  ButtonWrapper,
  ChartWrapper,
  TableWrapper,
  BarWrapper,
} from "./index.styled";
import { BodyWrapper } from "../../styles/global.styled";
import axios from "axios";

function Statistics() {
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [humanResourceData, setHumanResourceData] = useState([]);

  function formatDuration(start, end) {
    const durationInmilliseconds = end - start;
    const hours = Math.floor(durationInmilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInmilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (hours === 0) {
      return `${minutes} minute(s)`;
    } else if (minutes === 0) {
      return `${hours} hour(s)`;
    } else {
      return `${hours} hour(s) and ${minutes} minute(s)`;
    }
  }

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3005/rawMaterial");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];

      setRawMaterialData(dataArray);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };

  // console.log("RawMaterial Data", rawMaterialData);

  const extractedProcessRecords = rawMaterialData.reduce((result, item) => {
    if (item.hasOwnProperty("processRecords")) {
      result.push({
        itemId: item._id,
        itemName: item.Name,
        itemQuan: item.quan,
        AvailableQuan: item.quan,
        itemUnit: item.unit,
        originalQuan: item.originalQuan,
        updatedQuan: item.quan,
        tag: item.tag,
        processRecords: item.processRecords,
      });
    }
    return result;
  }, []);

  console.log("Extracted Process Records:", extractedProcessRecords);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => {
    // Reset the selectedValue to null when a new option is selected
    setSelectedValue(value);
  };
  const renderConditionalContent = () => {
    if (selectedValue === "resource inventory") {
      return (
        <div>
          <RawMaterialChart extractedProcessRecords={extractedProcessRecords} />
          <RawMaterialTable extractedProcessRecords={extractedProcessRecords} />
        </div>
      );
    } else if (selectedValue === "human resource") {
      return (
        <div>
          <HumanResourceChart />
          <HumanResourceTable />
        </div>
      );
    } else if (selectedValue === "process") {
      return <ProcessTable extractedProcessRecords={extractedProcessRecords} />;
    } else {
      return (
        <div>
          <RawMaterialChart extractedProcessRecords={extractedProcessRecords} />
          <RawMaterialTable extractedProcessRecords={extractedProcessRecords} />
        </div>
      );
    }
  };

  return (
    <>
      <BodyWrapper>
        <SideMenu />
        <ButtonWrapper>
          <Select
            showSearch
            placeholder="Select the type"
            optionFilterProp="children"
            onChange={handleChange}
            onSearch={onSearch}
            filterOption={filterOption}
            style={{ width: "250px" }}
            options={[
              {
                value: "resource inventory",
                label: "Resource Inventory Statistics View",
              },
              // {
              //   value: "human resource",
              //   label: "Human Resource Statistics View",
              // },
              {
                value: "process",
                label: "Process Statistics View",
              },
            ]}
          />
        </ButtonWrapper>

        <ChartWrapper>{renderConditionalContent()}</ChartWrapper>
      </BodyWrapper>
    </>
  );
}

export default Statistics;
