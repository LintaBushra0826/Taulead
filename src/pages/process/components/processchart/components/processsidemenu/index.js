import React, { useEffect, useState } from "react";
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
import { RawMaterialAtom } from "../../../../../../atoms/rawMaterials.atom";

function SideMenu({ selectedTaskData, onCancel }) {
  const API_BASE_URL = "http://localhost:3005";
  const setExecutedProcess = useSetAtom(ExecutedProcessAtom);
  const setRawMaterialProcess = useSetAtom(RawMaterialAtom);
  const RawMaterialProcess = useAtomValue(RawMaterialAtom);
  const executedProcess = useAtomValue(ExecutedProcessAtom);
  const [data, setData] = useState(null);
  const [hrdata, setHRData] = useState(null);

  console.log("selectedTaskData", selectedTaskData);

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

      setData(dataArray); // Set the data array here
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };

  useEffect(() => {
    fetchHumanResource();
  }, []);

  const fetchHumanResource = async () => {
    try {
      const response = await axios.get("http://localhost:3005/humanresource");
      const rawData = response.data.data;

      // Ensure data is an array
      const dataArray = Array.isArray(rawData) ? rawData : [];
      setHRData(dataArray);
      console.log("data", hrdata);
    } catch (error) {
      console.error("Error fetching human resource:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // setExecutedProcess({
      //   name: selectedTaskData.newName,
      //   start: selectedTaskData.start,
      //   end: selectedTaskData.end,
      //   desc: selectedTaskData.desc,
      //   duration: selectedTaskData.duration,
      //   pid: selectedTaskData.processId,
      //   humanresource: selectedTaskData.humanresource,
      //   rawmaterial: selectedTaskData.rawmaterial,
      // });

      // console.log("executedProcess", executedProcess);

      const response = await axios.post(`${API_BASE_URL}/executed-process`, {
        name: selectedTaskData.newName,
        start: selectedTaskData.start,
        end: selectedTaskData.end,
        desc: selectedTaskData.desc,
        duration: selectedTaskData.duration,
        pid: selectedTaskData.processId,
        humanresource: selectedTaskData.humanresource,
        rawmaterial: selectedTaskData.rawmaterial,
        key: selectedTaskData.key,
        executedstatus: "executed",
      });

      await fetchRawMaterials();
      if (response.status === 200) {
        const starttime = selectedTaskData.start;
        const endtime = selectedTaskData.end;
        const HumanResource = selectedTaskData.humanresource;
        const rawMaterials = selectedTaskData.rawmaterial;
        // Ensure data is an array
        const dataArray = Array.isArray(data) ? data : [];

        // Ensure hrdata is an array
        const hrdataArray = Array.isArray(hrdata) ? hrdata : [];

        const updateRequests = rawMaterials.map(async (material) => {
          const updatedItem = rawMaterials.find(
            (item) => item.id === material.id
          );
          console.log("updatedItem", updatedItem);
          const originalItems = dataArray.find(
            (dataItem) => dataItem._id === material.id
          );
          console.log("originalItems", originalItems);

          const updatedQuantity = originalItems.quan - updatedItem.quan;

          const existingProcessRecords = dataArray.find(
            (dataItem) => dataItem._id === material.id
          );
          console.log("existingProcessRecords", existingProcessRecords);

          const newRecord = {
            processKey: selectedTaskData.key,
            processId: selectedTaskData.processId,
            processName: selectedTaskData.newName,
            usedQuan: updatedItem.quan,
            availableQuan: updatedQuantity,
            // originalQuan:  updatedQuantity,
            updatedQuan: updatedQuantity,
            usedQuanUnit: updatedItem.unit,
            itemId: updatedItem.id,
          };

          const updatedProcessRecords = material.processRecords
            ? [...material.processRecords, newRecord]
            : [newRecord];

          console.log("updatedProcessRecords", updatedProcessRecords);
          try {
            const response = await axios.put(
              `${API_BASE_URL}/rawMaterial/${material.id}`,
              {
                quan: updatedQuantity,
                // originalQuan:updatedQuantity,
                $push: { processRecords: updatedProcessRecords },
              }
            );

            console.log("UPDATED SUCCCCC");
            return response.data;
          } catch (error) {
            console.error(
              `Error updating raw material with ID ${material.id}`,
              error
            );
            throw error;
          }
        });

        const updateHrRequests = HumanResource.map(async (employee) => {
          const updatedHR = HumanResource.find(
            (item) => item.id === employee.id
          );
          console.log("updatedHR", updatedHR);
          const originalHR = hrdataArray.find(
            (dataItem) => dataItem._id === employee.id
          );
          console.log("originalHR", originalHR);

          // const updatedQuantity = originalItems.quan - updatedItem.quan;

          const existingHRProcessRecords = hrdataArray.find(
            (dataItem) => dataItem._id === employee.id
          );
          console.log("existingHRProcessRecords", existingHRProcessRecords);

          const newRecord = {
            processKey: selectedTaskData.key,
            processId: selectedTaskData.processId,
            processName: selectedTaskData.newName,
            duration: formatDuration(
              selectedTaskData.start,
              selectedTaskData.end
            ),
            empId: updatedHR.id,
          };

          const updatedHRProcessRecords = employee.processRecords
            ? [...employee.processRecords, newRecord]
            : [newRecord];

          console.log("updatedHRProcessRecords", updatedHRProcessRecords);
          try {
            const response = await axios.put(
              `${API_BASE_URL}/humanresource/${employee.id}`,
              {
                tag: "Busy",
                $push: { HRprocessRecords: updatedHRProcessRecords },
              }
            );

            //     const currentTime = new Date();
            //     console.log(
            //       "current , start, end time ",
            //       currentTime,
            //       starttime,
            //       endtime
            //     );
            //     const timeDifference = endtime - currentTime;

            //     console.log("timedifference", timeDifference);

            //  if (timeDifference < 0) {
            //       // Update HumanResource status to "available" if process end time has passed
            //       const updateHrAvailabilityRequests = HumanResource.map(
            //         async (employee) => {
            //           try {
            //             const response = await axios.put(
            //               `${API_BASE_URL}/humanresource/${employee.id}`,
            //               {
            //                 tag: "available",
            //               }
            //             );

            //             return response.data;
            //             alert("Employee status updated to AVAILABLE");
            //           } catch (error) {
            //             console.error(
            //               `Error updating employee tag with ID ${employee.id}`,
            //               error
            //             );
            //             throw error;
            //           }
            //         }
            //       );
            //     }
            return response;
          } catch (error) {
            console.error(
              `Error updating employee with ID ${employee.id}`,
              error
            );
            throw error;
          }
        });

        // Execute all update requests concurrently
        try {
          const updatedMaterials = await Promise.all(updateRequests);
        } catch (error) {
          console.error("Error updating materials:", error);
        }

        // Execute all update hr requests concurrently
        try {
          const updatedEmployee = await Promise.all(updateHrRequests);
        } catch (error) {
          console.error("Error updating employees:", error);
        }

        // // Wait until the end time of the process
        // const currentTime = new Date();
        // console.log("current , start, end time ", currentTime,starttime, endtime);
        // const timeDifference = endtime - currentTime;

        // console.log("timedifference", timeDifference);

        // if (timeDifference > 0) {
        //   // Wait until the end time to update HumanResource status to "busy"
        //   setTimeout(async () => {
        //     const updateHrAvailabilityRequests = HumanResource.map(
        //       async (employee) => {
        //         try {
        //           const response = await axios.put(
        //             `${API_BASE_URL}/humanresource/${employee.id}`,
        //             {
        //               tag: "busy",
        //             }
        //           );

        //           return response.data;
        //           alert("Employee status updated to BUSY");
        //         } catch (error) {
        //           console.error(
        //             `Error updating employee tag with ID ${employee.id}`,
        //             error
        //           );
        //           throw error;
        //         }
        //       }
        //     );

        //     // Execute update requests for HumanResource availability
        //     await Promise.all(updateHrAvailabilityRequests);
        //   }, timeDifference);
        // } else if (timeDifference < 0) {
        //   // Update HumanResource status to "available" if process end time has passed
        //   const updateHrAvailabilityRequests = HumanResource.map(
        //     async (employee) => {
        //       try {
        //         const response = await axios.put(
        //           `${API_BASE_URL}/humanresource/${employee.id}`,
        //           {
        //             tag: "available",
        //           }
        //         );

        //         return response.data;
        //         alert("Employee status updated to AVAILABLE");
        //       } catch (error) {
        //         console.error(
        //           `Error updating employee tag with ID ${employee.id}`,
        //           error
        //         );
        //         throw error;
        //       }
        //     }
        //   );

        //   // Execute update requests for HumanResource availability
        //   await Promise.all(updateHrAvailabilityRequests);
        // }

        alert("Executed successfully!");
      } else {
        alert("Error Executed process");
      }

      console.log("response", response);
      // console.log("hrresponse", hrResponse);
    } catch (error) {
      alert("Error Executed process");
    }
  };

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
              End Time: {selectedTaskData.end.toLocaleTimeString()}
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
