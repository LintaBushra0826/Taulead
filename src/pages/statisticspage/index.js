import React, { useEffect, useState } from "react";
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
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const [response, subprocessResponse] = await Promise.all([
        axios.get("http://localhost:3005/executed-process"),
        axios.get("http://localhost:3005/subprocess"),
      ]);

      console.log("executed process response", response);

      const process = response.data.data;
      const subprocess = subprocessResponse.data.data;

      // Iterate through the subprocess array
      subprocess.forEach((sub) => {
        // Find the corresponding process using the "pName" field
        const correspondingProcess = process.find(
          (proc) => proc.name === sub.pName
        );

        if (correspondingProcess) {
          // Add the subprocess to the corresponding process
          if (!correspondingProcess.subprocesses) {
            correspondingProcess.subprocesses = [];
          }
          correspondingProcess.subprocesses.push(sub);
        }
      });

      let count = 1; // Initialize a count variable
      const mappedProcesses = {};

      // Create a map of subprocesses by their _id for efficient lookup
      const subprocessMap = {};
      // Iterate through the process array
      process.forEach((item) => {
        const ProcessdurationInHours = formatDuration(
          new Date(item.start),
          new Date(item.end)
        );
        console.log(
          "Formatted ProcessdurationInHours: " + ProcessdurationInHours
        );

        // Check if the item is already in mappedProcesses to avoid duplicates
        if (!mappedProcesses[item._id]) {
          const mappedItem = {
            key: item._id,
            start: new Date(item.start),
            end: new Date(item.end),
            name: item.name,
            id: item.name,
            processId: item.pid,
            humanresource: item.humanResource,
            rawmaterial: item.rawMaterial,
            duration: ProcessdurationInHours,
            progress:
              (new Date(item.end) - new Date()) /
              (new Date(item.end) - new Date(item.start)),
            type: "project",
            displayOrder: count++,
            hideChildren: false,
          };
          mappedProcesses[item._id] = mappedItem;

          if (item.subprocesses) {
            item.subprocesses.forEach((subitem, index) => {
              let lastItem = null;
              const subdurationInHours = formatDuration(
                new Date(new Date(subitem.substart).getTime() + item.diff),
                new Date(new Date(subitem.subend).getTime() + item.diff)
              );
              const subMappedItem = {
                key: subitem._id,
                start: new Date(
                  new Date(subitem.substart).getTime() + item.diff
                ),
                end: new Date(new Date(subitem.subend).getTime() + item.diff),
                name: subitem.subname,
                id: subitem.subname,
                subprocessId: subitem.subId,
                subhumanresource: subitem.humanResource,
                subrawmaterial: subitem.rawMaterial,
                duration: subdurationInHours,
                progress:
                  new Date() -
                    new Date(new Date(subitem.substart).getTime() + item.diff) <
                  0
                    ? 0
                    : ((new Date() -
                        new Date(
                          new Date(subitem.substart).getTime() + item.diff
                        )) /
                        (new Date(
                          new Date(subitem.subend).getTime() + item.diff
                        ) -
                          new Date(
                            new Date(subitem.substart).getTime() + item.diff
                          ))) *
                      100,
                type: "task",
                project: item.name,
                displayOrder: count++,
              };

              if (index) {
                subMappedItem = { ...subMappedItem, dependencies: [lastItem] };
              }

              lastItem = subitem.subname;
              mappedProcesses[subitem._id] = subMappedItem;
            });
          }
        }
      });

      // Convert the mapped processes map to an array
      const processesArray = Object.values(mappedProcesses);
      const rawMaterialArray = processesArray.map(
        (process) => process.rawmaterial
      );
      setRawMaterialData(rawMaterialArray);

      // console.log("Raw Material Data:", rawMaterialData);

      // setRawMaterialData(processesArray.rawMaterial);
      // setHumanResourceData(processesArray.humanResource);

      // const extractedRawMaterial = processesArray
      //   .filter((item) => item.rawMaterial !== undefined) // Filter out objects without rawMaterial property
      //   .map((item) => item.rawMaterial);

      // const extractedHumanResource = processesArray
      //   .filter((item) => item.humanresource !== undefined) // Filter out objects without humanresource property
      //   .map((item) => item.humanresource);

      // // Set the extracted data into the state variables
      // setRawMaterialData(extractedRawMaterial);
      // setHumanResourceData(extractedHumanResource);

      // // Logging for verification
      // console.log("extractedRawMaterial:", extractedRawMaterial);
      // console.log("extractedHumanResource:", extractedHumanResource);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
      </BodyWrapper>
    </>
  );
}

export default Statistics;
