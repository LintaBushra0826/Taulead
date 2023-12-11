import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useSetAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { ProcessAtom } from "../../../../atoms/process.atom";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

function ProcessForm({ formData, setFormData }) {
  const setProcess = useSetAtom(ProcessAtom);
  const [linkprocess, setLinkProcess] = useState([]);
  const [value, setvalue] = useState([]);
  const [isParallel, setIsParallel] = useState(false);
  const [isSequential, setIsSequential] = useState(false);

  const onStartChange = (value, dateString) => {
    console.log("Selected Start Time: ", value);
    console.log("Formatted Selected Start Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const startDate = value ? value.toDate() : null;

    setFormData((prevData) => ({
      ...prevData,
      start: startDate,
    }));
    setProcess((prevProcess) => ({
      ...prevProcess,
      start: startDate,
    }));
  };

  const onEndChange = (value, dateString) => {
    console.log("Selected End Time: ", value);
    console.log("Formatted Selected End Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const endDate = value ? value.toDate() : null;

    setFormData((prevData) => ({
      ...prevData,
      end: endDate,
    }));
    setProcess((prevProcess) => ({
      ...prevProcess,
      end: endDate,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
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

  const handleCheckboxChange = async (e) => {
    const { name, checked } = e.target;
    if (name === "parallel") {
      setIsParallel(checked);
      setIsSequential(false);

      if (checked && value.length >= 1) {
        const selectedProcess = linkprocess.find(
          (process) => process.name === process.name
        );
        if (selectedProcess) {
          const startDate = new Date(selectedProcess.start);
          const endDate = new Date(selectedProcess.end);

          // Update the form data and process atom with the selected dates
          setFormData((prevData) => ({
            ...prevData,
            start: startDate,
            end: endDate,
          }));
          setProcess((prevProcess) => ({
            ...prevProcess,
            start: startDate,
            end: endDate,
          }));
        }
      }
    } else if (name === "sequential") {
      setIsSequential(checked);
      setIsParallel(false);

      if (checked && value.length >= 1) {
        const selectedProcess = linkprocess.find(
          (process) => process.name === process.name
        );

        if (selectedProcess) {
          const selectedProcessEndDate = selectedProcess.end;

          // Set the start date of the process to 1 minute after the end date of the selected process
          const newStartDate = new Date(
            selectedProcessEndDate.getTime() + 60000
          );
          // Update the form data with the new start date
          setFormData((prevData) => ({
            ...prevData,
            start: newStartDate,
          }));
        }
      }
    }

    // Set the pre-filled start and end dates based on checkbox state
    if (checked && (name === "parallel" || name === "sequential")) {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // Add 1 hour to current time

      // Set the start and end dates based on the checkbox checked
      const startDate = checked ? now : undefined;
      const endDate = checked ? oneHourLater : undefined;

      // Update the form data with pre-filled start and end dates
      setFormData((prevData) => ({
        ...prevData,
        start: startDate,
        end: endDate,
      }));
    }
  };

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const [response, subprocessResponse] = await Promise.all([
        axios.get("http://localhost:3005/process"),
        axios.get("http://localhost:3005/subprocess"),
      ]);

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
            type: "project",
            displayOrder: count++,
            hideChildren: false,
          };
          mappedProcesses[item._id] = mappedItem;
        }
      });

      // Convert the mapped processes map to an array
      const processesArray = Object.values(mappedProcesses);
      setLinkProcess(processesArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const options = useMemo(
    () =>
      linkprocess.map((process) => ({
        label: `${process.processId} - ${process.name}`,
        value: process.id,
      })),
    [linkprocess]
  );

  const onChange = (selectedValues) => {
    setvalue(selectedValues);
    setFormData((prevData) => ({
      ...prevData,
      link: selectedValues,
    }));
  };

  // const startDateMoment = formData.start
  //   ? (console.log("Start Date String:", formData.start),
  //     moment(formData.start, "ddd MMM DD YYYY HH:mm:ss ZZ"))
  //   : null;
  // const endDateMoment = formData.end
  //   ? (console.log("End Date String:", formData.end),
  //     moment(formData.end, "ddd MMM DD YYYY HH:mm:ss ZZ"))
  //   : null;

  // const startDateJSDate = startDateMoment ? startDateMoment.toDate() : null;
  // const endDateJSDate = endDateMoment ? endDateMoment.toDate() : null;
  return (
    <Form name="basic" layout="vertical" initialValues={{}} autoComplete="off">
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Process ID" name="pid">
            <Input
              name="pid"
              value={formData.pid}
              onChange={handleInputChange}
              placeholder="PPP-1"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Process Name" name="name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Process Description" name="desc">
            <Input
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={20}>
          <Form.Item label="Link to" name="link">
            <Select
              allowClear
              style={{ display: "block", width: "27%" }}
              placeholder="Please select"
              onChange={onChange}
              options={options}
            />
            <br />
            <Space direction="horizontal">
              <br />
              <Checkbox
                name="parallel"
                checked={isParallel}
                onChange={handleCheckboxChange}
              >
                Parallel
              </Checkbox>
              <Checkbox
                name="sequential"
                checked={isSequential}
                onChange={handleCheckboxChange}
              >
                Sequential
              </Checkbox>
            </Space>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20} justify="start">
        <Col span={8}>
          <Form.Item label="Process Start Date/Time" name="start">
            <DatePicker showTime onChange={onStartChange} />
          </Form.Item>
        </Col>
        <Col padding="0px" span={8}>
          <Form.Item label="Process End Date/Time" name="end">
            <DatePicker showTime onChange={onEndChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ProcessForm;
