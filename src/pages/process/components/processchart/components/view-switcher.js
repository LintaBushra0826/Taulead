import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react-pro";
import {  Radio } from 'antd';

function ViewSwitcher ({ onViewModeChange, onViewListChange, isChecked }) {
  const [size, setSize] = useState('large'); 
  return (
    <div className="ViewContainer">
       <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button  value="Hour" onClick={() => onViewModeChange(ViewMode.Hour)}>Hour</Radio.Button>
        <Radio.Button value="Day" onClick={() => onViewModeChange(ViewMode.Day)}>Day</Radio.Button>
      </Radio.Group>

    </div>
  );
};

export default ViewSwitcher;
