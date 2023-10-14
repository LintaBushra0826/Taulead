import React from "react";
import {SidebarMenu} from "./index.styled";

function SideMenu({ selectedTaskData }) {
  return (
    <SidebarMenu>
      {selectedTaskData ? (
        <>
          <h2>{selectedTaskData.name}</h2>
          <p>Start Date: {selectedTaskData.start.toString()}</p>
          <p>End Date: {selectedTaskData.end.toString()}</p>
          <p>Duration: {selectedTaskData.duration} days</p>
          <p>Progress: {selectedTaskData.progress}%</p>
          {/* Add more data fields here */}
        </>
      ) : (
        <p>No task selected</p>
      )}
    </SidebarMenu>
  );
}

export default SideMenu;