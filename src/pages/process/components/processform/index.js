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

function ProcessForm({ formData, setFormData }) {
  const setProcess = useSetAtom(ProcessAtom);
  const [linkprocess, setLinkProcess] = useState([]);
  const [value, setvalue] = useState([]);
  const [isParallel, setIsParallel] = useState(false);
  const [isSequential, setIsSequential] = useState(false);
  const API_BASE_URL = "http://localhost:3005";

  const onStartChange = (value, placeholder, dateString) => {
    if (value) {
      const startDate = value.toDate();
      setFormData((prevData) => ({
        ...prevData,
        start: startDate,
      }));
      setProcess((prevProcess) => ({
        ...prevProcess,
        start: startDate,
      }));
    } else if (placeholder.$d) {
      // Handle the case when only a placeholder is present
      const startDate = placeholder.$d.toDate();
      setFormData((prevData) => ({
        ...prevData,
        start: startDate,
      }));
      setProcess((prevProcess) => ({
        ...prevProcess,
        start: startDate,
      }));
    }
  };

  const onEndChange = (value, placeholder, dateString) => {
    if (value) {
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
    } else if (placeholder) {
      // Convert the js object to a JavaScript Date object
      const endDate = placeholder ? placeholder.$d.toDate() : null;

      setFormData((prevData) => ({
        ...prevData,
        end: endDate,
      }));
      setProcess((prevProcess) => ({
        ...prevProcess,
        end: endDate,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
  };

  function formatDuration(start, end) {
    const durationInmilliseconds = end - start;
    const hours = Math.floor(durationInmilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInmilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    let ProcessDuration;
    if (hours === 0) {
      ProcessDuration = `${minutes} minute(s)`;
    } else if (minutes === 0) {
      ProcessDuration = `${hours} hour(s)`;
    } else {
      ProcessDuration = `${hours} hour(s) and ${minutes} minute(s)`;
    }

    setProcess((prevProcess) => ({
      ...prevProcess,
      duration: ProcessDuration,
    }));
  }

  const handleCheckboxChange = async (e) => {
    const { name, checked } = e.target;
    if (name === "parallel") {
      setIsParallel(checked);
      setIsSequential(false);

      if (checked && value.length >= 1) {
        const selectedProcess = linkprocess.find(
          (process) => process.name.trim() === value.trim()
        );

        if (selectedProcess) {
          const startDate = selectedProcess.start;
          const endDate = selectedProcess.end;

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
    }
    if (name === "sequential") {
      setIsSequential(checked);
      setIsParallel(false);

      if (checked && value.length >= 1) {
        const selectedProcess = linkprocess.find(
          (process) => process.name.trim() === value.trim()
        );

        if (selectedProcess) {
          const selectedProcessEndDate = new Date(
            selectedProcess.end.getTime() + 60000
          );

          setFormData((prevData) => ({
            ...prevData,
            start: selectedProcessEndDate,
            end: null,
          }));
          setProcess((prevProcess) => ({
            ...prevProcess,
            start: selectedProcessEndDate,
            end: new Date(),
          }));
        }
      }
    }
  };

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: token,
      };
      const [processResponse, subprocessResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/process`, { headers }),
        axios.get(`${API_BASE_URL}/subprocess`, { headers }),
      ]);

      const process = processResponse.data.data;
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

  return (
    <Form name="basic" layout="vertical" initialValues={{}} autoComplete="off">
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Process ID" name="pid">
            <Input
              name="pid"
              value={formData.pid}
              onChange={handleInputChange}
              placeholder="Enter Process Id i.e, PPP-1"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Process Name" name="name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Process Name"
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Process Description" name="desc">
            <Input
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="Enter Process Description"
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
              placeholder="Select Process"
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
            <DatePicker
              showTime
              placeholder={formData.start}
              onChange={onStartChange}
              style={{ width: "1000px" }}
            />
          </Form.Item>
        </Col>
        <Col padding="0px" span={8}>
          <Form.Item label="Process End Date/Time" name="end">
            <DatePicker
              showTime
              placeholder={formData.end}
              onChange={onEndChange}
              style={{ width: "250px" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ProcessForm;
