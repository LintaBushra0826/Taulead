import React, { useState } from "react";
import SideMenu from "../../layout/sideMenu";
import ProgressBar from "./components/progressbars";
import RawMaterial from "./components/rawmaterialchart";
import HumanResource from "./components/humanrsourcechart";
import RawMaterialTable from "./components/rawmaterialtable";
import HumanResourceTable from "./components/humanresourcetable";
import Table from "./components/rawmaterialtable";
import { Select } from "antd";
import {
  ButtonWrapper,
  ChartWrapper,
  TableWrapper,
  BarWrapper,
} from "./index.styled";
import { BodyWrapper } from "../../styles/global.styled";

function Statistics() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const [selectedValue, setSelectedValue] = useState(null);

  // Step 2: Create a function to handle the change event
  const handleChange = (value) => {
    // Reset the selectedValue to null when a new option is selected
    setSelectedValue(value);
  };

  // Step 3: Define the conditional rendering logic
  const renderConditionalContent = () => {
    // Here, you can define what content or components to render based on the selectedValue
    if (selectedValue === "resource inventory") {
      return (
        <div>
          <RawMaterial />
          <RawMaterialTable />
        </div>
      );
    } else if (selectedValue === "human resource") {
      return (
        <div>
          <HumanResource />
          <HumanResourceTable />
        </div>
      );
    } else if (selectedValue === "process") {
      return <div>Process Content</div>;
    } else {
      return (
        <div>
          <RawMaterial />
          <RawMaterialTable />
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
                label: "Resource Inventory",
              },
              {
                value: "human resource",
                label: "Human Resource",
              },
              {
                value: "process",
                label: "Process",
              },
            ]}
          />
        </ButtonWrapper>

        <ChartWrapper>{renderConditionalContent()}</ChartWrapper>

        <BarWrapper>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
            Process Completion
          </h4>
          <ProgressBar />
          <ProgressBar />
          <ProgressBar />
          <ProgressBar />
          <ProgressBar />
        </BarWrapper>
      </BodyWrapper>
    </>
  );
}

export default Statistics;
