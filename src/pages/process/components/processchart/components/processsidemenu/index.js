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
import { useAtomValue, useSetAtom } from "jotai";
import { ExecutedProcessAtom } from "../../../../../../atoms/executedProcess.atom";

function SideMenu({ selectedTaskData, onCancel }) {
  const API_BASE_URL = "http://localhost:3005";
  const setExecutedProcess = useSetAtom(ExecutedProcessAtom);
  const executedProcess = useAtomValue(ExecutedProcessAtom);

  const handleSubmit = async () => {
    try {
      setExecutedProcess({
        name: selectedTaskData.name,
        start: selectedTaskData.start,
        end: selectedTaskData.end,
        desc: selectedTaskData.desc,
        duration: selectedTaskData.duration,
        humanresource: selectedTaskData.humanresource,
        rawmaterial: selectedTaskData.rawmaterial,
      });

      console.log("executedProcess", executedProcess);

      const response = await axios.post(`${API_BASE_URL}/executed-process`, {
        name: selectedTaskData.name,
        start: selectedTaskData.start,
        end: selectedTaskData.end,
        desc: selectedTaskData.desc,
        duration: selectedTaskData.duration,
        humanresource: selectedTaskData.humanresource,
        rawmaterial: selectedTaskData.rawmaterial,
      });

      if (response.status === 200) {
        alert("Executed successfully!");
        // setFormData(response.data);
      } else {
        alert("Error adding process");
      }

      console.log("response", response);
    } catch (error) {
      alert("Error adding process");
    }
  };
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
          <TaskDetail>
            Duration:
            {formatDuration(selectedTaskData.start, selectedTaskData.end)}
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
                        <TableCell>
                          {formatDuration(
                            selectedTaskData.start,
                            selectedTaskData.end
                          )}
                        </TableCell>
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
                      <TableCell>{rawmaterial.quan}</TableCell>
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
          <TaskDetail>
            Duration:
            {formatDuration(selectedTaskData.start, selectedTaskData.end)}
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
                        <TableCell>
                          {formatDuration(
                            selectedTaskData.start,
                            selectedTaskData.end
                          )}
                        </TableCell>
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

      <CreateProcessCon>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          Execute
        </Button>
      </CreateProcessCon>
    </MenuContainer>
  );
}

export default SideMenu;
