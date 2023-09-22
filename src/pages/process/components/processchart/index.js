import React, { useState, useEffect } from "react";
import { Gantt } from "gantt-task-react-pro";
import "gantt-task-react-pro/dist/index.css";
import axios from "axios";
import { Menu, Modal, Radio } from "antd";
import { FormWrapper } from "../createprocessmodal/index.styled";
function ProcessChart() {
  const [size, setSize] = useState("Month");
  const [data, setData] = useState(null);
  const [viewMode, setViewMode] = useState("Mins");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const response = await axios.get("http://localhost:3003/process");
      const rawData = response.data.data;

      const processedDataArray = rawData.map((item) => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const day = startDate.getDate();
        const hours = startDate.getHours();
        const minutes = startDate.getMinutes();
        const seconds = minutes * 60;
        const endyear = endDate.getFullYear();
        const endmonth = endDate.getMonth();
        const endday = endDate.getDate();
        const endhours = endDate.getHours();
        const endminutes = endDate.getMinutes();
        const endseconds = endminutes * 60;

        const strtdate = new Date(year, month, day);
        const enddate = new Date(endyear, endmonth, endday);
        const starttime = `${hours}:${minutes}:${seconds}`;
        const endtime = `${endhours}:${endminutes}:${endseconds}`;

        return {
          ...item,
          strtdate,
          enddate,
          starttime,
          endtime,
        };
      });
      setData(processedDataArray);
    } catch (error) {
      console.error("Error fetching process data:", error);
    }
  };

  const onChange = (e) => {
    setSize(e.target.value);
    setViewMode(e.target.value === "Mins" ? "Minutes" : "Hours");
  };

  const tasks = data
    ? data.map((item) => ({
        start: item.strtdate,
        end: item.enddate,
        name: item.name,
        id: item._id,
        time: item.starttime,
        duration: item.duration,
        type: "task",
        progress: 45,
        isDisabled: true,
        styles: {
          progressColor: "#ffbb54",
          progressSelectedColor: "#ff9e0d",
        },
      }))
    : [];

  const onTaskItemClick = (taskId) => {
    const selectedTaskData = data.find((task) => task.id === taskId);

    if (selectedTaskData) {
      setSelectedTask(selectedTaskData);
      setIsModalVisible(true);
    }
  };

  const handleModalAction = (action) => {
    if (action === "update") {
      // Implement the update logic here
      console.log("Update task with ID:", selectedTask.id);
    } else if (action === "delete") {
      // Implement the delete logic here
      console.log("Delete task with ID:", selectedTask.id);
    }

    // Close the modal after performing the action
    setIsModalVisible(false);
  };

  return (
    <>
      <Radio.Group
        value={size}
        onChange={onChange}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "300px",
        }}
      >
        <Radio.Button value="Hour">Hours</Radio.Button>
        <Radio.Button value="Day">Day</Radio.Button>
        <Radio.Button value="Week">Week</Radio.Button>
        <Radio.Button value="Month">Month</Radio.Button>
        <Radio.Button value="Year">Year</Radio.Button>
      </Radio.Group>

      {data ? (
        <Gantt
          key={1}
          tasks={tasks}
          fontSize={14}
          viewMode={size}
          onDateChange={"onDateChange"}
          onTaskDelete={"onTaskDelete"}
          onProgressChange={"onProgressChange"}
          onDoubleClick={onTaskItemClick}
          onClick={onTaskItemClick}
          columnWidth={100}
          listCellWidth={200}
        />
      ) : (
        <p>Loading data...</p>
      )}

      <FormWrapper>
      <Modal
        title="Task Options"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Menu onClick={(e) => handleModalAction(e.key)}>
          <Menu.Item key="update">Update</Menu.Item>
          <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
      </Modal>
      </FormWrapper>
    </>
  );
}

export default ProcessChart;
