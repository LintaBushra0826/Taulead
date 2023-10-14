import React from "react";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import ProgressBar from "./components/progressbars";
import Chart from "./components/charts";
import Table from "./components/table";
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

  return (
    <>
      <BodyWrapper>
        <SideMenu />
        <ButtonWrapper>
          <Select
            showSearch
            placeholder="Select the type"
            optionFilterProp="children"
            onChange={onChange}
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

        <ChartWrapper>
          <Chart />
        </ChartWrapper>

        <TableWrapper>
          <Table />
        </TableWrapper>

        <BarWrapper>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", color:"black" }}>
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
