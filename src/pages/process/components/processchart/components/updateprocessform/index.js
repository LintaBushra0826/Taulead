import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useSetAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { ProcessAtom } from "../../../../../../atoms/process.atom";
import axios from "axios";
import moment from "moment";

function ProcessForm({ processData }) {
  const setProcess = useSetAtom(ProcessAtom);
  const [formData, setFormData] = useState({});

  // console.log("processData", processData);

  const onStartChange = (placeholder, dateString) => {
    // Convert the js object to a JavaScript Date object
    const startDate = placeholder ? placeholder.$d : null;

    setFormData((prevData) => ({
      ...prevData,
      start: startDate,
    }));
    setProcess((prevProcess) => ({
      ...prevProcess,
      start: startDate,
    }));
  };

  const onEndChange = (placeholder, dateString) => {
    // Convert the js object to a JavaScript Date object
    const endDate = placeholder ? placeholder.$d : null;

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
    console.log("name, value", name, value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));

    if (name === "processId") {
      setProcess((prevProcess) => ({ ...prevProcess, pid: value }));
    } else {
      setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
    }
    if (name === "newName") {
      setProcess((prevProcess) => ({ ...prevProcess, name: value }));
    } else {
      setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
    }
  };

  useEffect(() => {
    formatDuration(processData.start, processData.end);
  }, [processData.start, processData.end]);

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

    console.log("duration before set", ProcessDuration);

    setProcess((prevProcess) => ({
      ...prevProcess,
      duration: ProcessDuration,
    }));
  }

  return (
    processData && (
      <Form name="basic" layout="vertical" autoComplete="off">
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="Process ID" name="processId">
              <Input
                name="processId"
                value={formData.processId || processData.processId}
                onChange={handleInputChange}
              />
              <div hidden>{processData.processId}</div>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Process Name" name="name">
              <Input
                name="name"
                placeholder={processData.newName}
                // value={formData.newName || processData.newName}
                onChange={handleInputChange}
              />
              <div hidden>{processData.newName}</div>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Process Description" name="desc">
              <Input
                name="desc"
                value={formData.desc || processData.desc}
                onChange={handleInputChange}
              />
              <div hidden>{processData.desc}</div>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20} justify="start">
          <Col span={8}>
            <Form.Item label="Process Start Date/Time" name="start">
              <>
                <DatePicker
                  showTime
                  placeholder={processData.start}
                  value={formData.start || processData.start}
                  onChange={onStartChange}
                />
              </>
            </Form.Item>
          </Col>
          <Col padding="0px" span={8}>
            <Form.Item label="Process End Date/Time" name="end">
              <>
                <DatePicker
                  showTime
                  placeholder={processData.end}
                  value={formData.end || processData.end}
                  onChange={onEndChange}
                />
              </>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  );
}

export default ProcessForm;
