import React, { useState } from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import ProcessChart from "./components/processchart";
import { Button } from "antd";
import { ButtonWrapper, ChartWrapper } from "./index.styled";
import CreateProcessModal from "./components/createprocessmodal";

function Process() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    console.log("Modal should open");
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // const handleHumanResourceChange = (newSelectedHumanResource) => {
  //   setSelectedHumanResource(newSelectedHumanResource);
  // };

  // const ProcessForm = ({ formData }) => {
  //   return <CreateProcessForm />;
  // };

  // const onChangeValue = (value) => {
  //   console.log("onChange:", value);
  //   setCurrent(value);
  // };

  // const Materialform = ({ formData }) => {
  //   return <RawMaterialForm />;
  // };

  // const Hrform = ({ formData }) => {
  //   return (
  //     <HumanResourceForm
  //       selectedHumanResource={selectedHumanResource}
  //       handleHumanResourceChange={handleHumanResourceChange}
  //     />
  //   );
  // };

  // const items = [
  //   {
  //     title: "Create Process",
  //   },
  // ];

  // const materialitems = [
  //   {
  //     title: "Raw Material",
  //   },
  // ];

  // const hritems = [
  //   {
  //     title: "Human Resource",
  //   },
  // ];

  // const subprocessitem = [
  //   {
  //     title: "Create Subprocess",
  //   },
  // ];

  // const handleprocessForm = (formData) => {
  //   setShowProcessform(true);
  // };

  // const handleMaterialForm = (formData) => {
  //   setShowMaterialform(true);
  // };
  // const handleHrForm = (formData) => {
  //   setShowHrform(true);
  // };

  // const onChange = (value, dateString) => {
  //   console.log("Selected Time: ", value);
  //   console.log("Formatted Selected Time: ", dateString);

  //   // Convert the js object to a JavaScript Date object
  //   const startDate = value ? value.toDate() : null;

  //   setFormData({ ...formData, start: startDate });
  // };

  // const onSubProcessChange = (value, dateString) => {
  //   console.log("Selected Subprocess Time: ", value);
  //   console.log("Formatted Subprocess Time: ", dateString);

  //   // Convert the moment.js object to a JavaScript Date object
  //   const subStartDate = value ? value.toDate() : null;

  //   setFormData({ ...formData, substart: subStartDate });
  // };

  // const onOk = (value) => {
  //   console.log("onOk: ", value);
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/process`, {
  //       ...formData,
  //       // rawMaterials: selectedRawMaterial, // Selected raw materials
  //       // humanResources: selectedHumanResource, // Selected human resources
  //     });
  //     alert("Process added successfully!");
  //   } catch (error) {
  //     alert("Error adding process");
  //   }
  // };

  // const handleSubSubmit = async () => {
  //   try {
  //     const subprocessData = {
  //       ...formData, // Subprocess form data
  //       humanResources: selectedHumanResource,
  //     };

  //     // Make the API call to save subprocessData into the database
  //     const response = await axios.post(
  //       `${API_BASE_URL}/subprocess`,
  //       subprocessData
  //     );

  //     // Handle the API response as needed
  //     if (response.status === 200) {
  //       alert("Subprocess added successfully!");
  //       console.log("data", selectedHumanResource);
  //       setOpen(false);
  //     } else {
  //       alert("Error adding subprocess");
  //     }
  //   } catch (error) {
  //     alert("Error adding subprocess");
  //   }
  // };

  // const handleCheckboxChange = (e) => {
  //   setCreateSubprocess(e.target.checked);
  //   setSubprocessModalOpen(e.target.checked);
  // };

  return (
    <>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <ChartWrapper>
          <ProcessChart />
        </ChartWrapper>

        <ButtonWrapper>
          <Button type="primary" onClick={handleOpenModal}>
            Create Process
          </Button>
        </ButtonWrapper>

        <CreateProcessModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />


        {/* <Modal
            open={open}
            onCancel={() => setOpen(false)}
            centered
            footer={null}
            width={1000}
            onOk={handleSubmit}
          >
            <FormLabel>Process Creation</FormLabel>
            <br />

            <StepsFormDiv>
              <Steps
                current={current}
                labelPlacement="Horizontal"
                items={items}
                onChange={(c) => {
                  setCurrent(0);
                }}
              />
              <br />

              <Form
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleSubmit}
                autoComplete="off"
              >
                <Row gutter={20}>
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
                <Row gutter={20} justify="start">
                  <Col span={8}>
                    <Form.Item label="Process Start Date" name="start">
                      <DatePicker
                        showTime
                        onChange={onChange}
                        onOk={onOk}
                        value={formData.start}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={8}>
                  <Col padding="0px" span={8}>
                    <Form.Item label="Process Duration" name="duration">
                      <Input
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </StepsFormDiv>

            {createSubprocess && (
              <>
                <Modal
                  open={subprocessModalOpen}
                  centered
                  width={1000}
                  onOk={handleSubSubmit}
                  onCancel={() => setSubprocessModalOpen(false)}
                >
                  <FormLabel>Subprocess</FormLabel>
                  <br />

                  <StepsFormDiv>
                    <Steps
                      current={current}
                      labelPlacement="Horizontal"
                      onChange={onChangeValue}
                      items={subprocessitem}
                    />
                    <br />

                    <Form
                      name="basic"
                      layout="vertical"
                      initialValues={{
                        remember: true,
                      }}
                      autoComplete="off"
                    >
                      <Row gutter={20}>
                        <Col span={8}>
                          <Form.Item label="Subprocess Name" name="subname">
                            <Input
                              name="subname"
                              value={formData.subname}
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            label="Subprocess Description"
                            name="subdesc"
                          >
                            <Input
                              name="subdesc"
                              value={formData.subdesc}
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={20} justify="start">
                        <Col span={8}>
                          <Form.Item
                            label="Subprocess Start Date"
                            name="substart"
                          >
                            <DatePicker
                              name="substart"
                              showTime
                              onChange={onSubProcessChange}
                              onOk={onOk}
                              value={formData.substart}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={8}>
                        <Col padding="0px" span={8}>
                          <Form.Item
                            label="Subprocess Duration"
                            name="subduration"
                          >
                            <Input
                              name="subduration"
                              value={formData.subduration}
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>

                    <Divider />

                    <Steps
                      current={current}
                      labelPlacement="Horizontal"
                      onChange={onChangeValue}
                      items={materialitems}
                    />
                    <br />

                    <SubprocessDiv>
                      <Materialform formData={handleMaterialForm} />
                    </SubprocessDiv>

                    <Divider />

                    <Steps
                      current={current}
                      labelPlacement="Horizontal"
                      onChange={onChangeValue}
                      items={hritems}
                    />
                    <br />

                    <SubprocessDiv>
                      <Hrform formData={handleHrForm} />
                    </SubprocessDiv>
                  </StepsFormDiv>
                </Modal>
              </>
            )}

            <CreateProcessCon>
              <Checkbox onChange={handleCheckboxChange}>
                Create Subprocess
              </Checkbox>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </CreateProcessCon>
          </Modal> */}
      </BodyWrapper>
    </>
  );
}

export default Process;
