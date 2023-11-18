import React, { useState } from "react";
import {
  MenuContainer,
  TaskName,
  TaskDetail,
  ProgressBar,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TimeFormat,
  DateFormat,
  CreateProcessCon,
} from "./index.styled";
import { Button } from "antd";
import axios from "axios";

function SideMenu({ selectedTaskData, onCancel }) {
  console.log("Data in modal", selectedTaskData);

  const [formData, setFormData] = useState({});
  const API_BASE_URL = "http://localhost:3005";

  const handleSubmit = async () => {
    try {
      const combinedData = {
        ...process,
      };

      const response = await axios.post(
        `${API_BASE_URL}/process`,
        combinedData
      );

      if (response.status === 200) {
        alert("Process added successfully!");
        setFormData(response.data);

        // // Check if the checkbox is checked before opening the subprocess modal
        // if (showSubprocessContent) {
        //   setSubIsModalVisible(true);
        // }
      } else {
        alert("Error adding process");
      }
    } catch (error) {
      alert("Error adding process");
    }
  };

  // const handleCancel = () => {
  //   setOpen(false);
  // };

  return (
    <MenuContainer>
      {selectedTaskData.type === "project" ? (
        <>
          <TaskName>{selectedTaskData.name}</TaskName>
          <TaskDetail>
            <DateFormat>Start Date: </DateFormat>
            {selectedTaskData.start.toLocaleDateString("en-GB")}{" "}
            <TimeFormat>
              Start Time: {selectedTaskData.start.toLocaleTimeString()}
            </TimeFormat>
          </TaskDetail>
          <TaskDetail>
            <DateFormat>End Date: </DateFormat>
            {selectedTaskData.end.toLocaleDateString("en-GB")}{" "}
            <TimeFormat>
              Start Time: {selectedTaskData.end.toLocaleTimeString()}
            </TimeFormat>
          </TaskDetail>
          <TaskDetail>Duration: {selectedTaskData.duration}</TaskDetail>
          <TaskDetail>
            Progress: {selectedTaskData.progress}%{" "}
            {/* <ProgressBar
              max="100"
              value={selectedTaskData.progress}
            ></ProgressBar> */}
          </TaskDetail>
          <>
            {selectedTaskData.humanresource &&
            selectedTaskData.humanresource.length > 0 ? (
              <Table>
                <thead style={{ fontWeight: "bold" }}>
                  Process Human Resource
                  <TableRow>
                    <TableHeader>Employee Name</TableHeader>
                    <TableHeader>Employee Designation</TableHeader>
                    <TableHeader>Employee Skills</TableHeader>
                    <TableHeader>Work Duration</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {selectedTaskData.humanresource.map(
                    (humanresource, index) => (
                      <TableRow key={index}>
                        <TableCell>{humanresource.name}</TableCell>
                        <TableCell>{humanresource.desgn}</TableCell>
                        <TableCell>{humanresource.skills}</TableCell>
                        <TableCell>{selectedTaskData.duration}</TableCell>
                      </TableRow>
                    )
                  )}
                </tbody>
              </Table>
            ) : (
              <p>No human resource data available for the process</p>
            )}
          </>
          <>
            {selectedTaskData.rawmaterial &&
            selectedTaskData.rawmaterial.length > 0 ? (
              <Table>
                <thead style={{ fontWeight: "bold" }}>
                  Process Raw Material
                  <TableRow>
                    <TableHeader>Item Name</TableHeader>
                    <TableHeader>Item Quantity</TableHeader>
                    <TableHeader>Item Unit</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {selectedTaskData.rawmaterial.map((rawmaterial, index) => (
                    <TableRow key={index}>
                      <TableCell>{rawmaterial.Name}</TableCell>
                      <TableCell>{rawmaterial.quantity}</TableCell>
                      <TableCell>{rawmaterial.unit}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No raw material data available for the process</p>
            )}
          </>
        </>
      ) : null}
      {selectedTaskData.type === "task" ? (
        <>
          <TaskName>{selectedTaskData.name}</TaskName>
          <TaskDetail>
            <DateFormat>Start Date: </DateFormat>
            {selectedTaskData.start.toLocaleDateString("en-GB")}{" "}
            <TimeFormat>
              Start Time: {selectedTaskData.start.toLocaleTimeString()}
            </TimeFormat>
          </TaskDetail>
          <TaskDetail>
            <DateFormat>End Date: </DateFormat>
            {selectedTaskData.end.toLocaleDateString("en-GB")}{" "}
            <TimeFormat>
              Start Time: {selectedTaskData.end.toLocaleTimeString()}
            </TimeFormat>
          </TaskDetail>
          <TaskDetail>Duration: {selectedTaskData.duration} </TaskDetail>
          <TaskDetail>
            Progress: {selectedTaskData.progress}%{" "}
            {/* <ProgressBar
              max="100"
              value={selectedTaskData.progress}
            ></ProgressBar> */}
          </TaskDetail>
          <>
            {selectedTaskData.subhumanresource &&
            selectedTaskData.subhumanresource.length > 0 ? (
              <Table>
                <thead style={{ fontWeight: "bold" }}>
                  SubProcess Human Resource
                  <TableRow>
                    <TableHeader>Employee Name</TableHeader>
                    <TableHeader>Employee Designation</TableHeader>
                    <TableHeader>Employee Skills</TableHeader>
                    <TableHeader>Work Duration</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {selectedTaskData.subhumanresource.map(
                    (subhumanresource, index) => (
                      <TableRow key={index}>
                        <TableCell>{subhumanresource.name}</TableCell>
                        <TableCell>{subhumanresource.desgn}</TableCell>
                        <TableCell>{subhumanresource.skills}</TableCell>
                        <TableCell>{selectedTaskData.duration}</TableCell>
                      </TableRow>
                    )
                  )}
                </tbody>
              </Table>
            ) : (
              <p>No human resource data available for the process</p>
            )}
          </>
          <>
            {selectedTaskData.subrawmaterial &&
            selectedTaskData.subrawmaterial.length > 0 ? (
              <Table>
                <thead style={{ fontWeight: "bold" }}>
                  SubProcess Raw Material
                  <TableRow>
                    <TableHeader>Item Name</TableHeader>
                    <TableHeader>Item Quantity</TableHeader>
                    <TableHeader>Item Unit</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {selectedTaskData.subrawmaterial.map(
                    (subrawmaterial, index) => (
                      <TableRow key={index}>
                        <TableCell>{subrawmaterial.Name}</TableCell>
                        <TableCell>{subrawmaterial.quantity}</TableCell>
                        <TableCell>{subrawmaterial.unit}</TableCell>
                      </TableRow>
                    )
                  )}
                </tbody>
              </Table>
            ) : (
              <p>No raw material data available for the process</p>
            )}
          </>
        </>
      ) : null}

      {/* <CreateProcessCon>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          Execute
        </Button>
      </CreateProcessCon> */}
    </MenuContainer>
  );
}

export default SideMenu;
