// import React, { useState } from "react";
// import { Modal, Steps, Checkbox, Button, Divider } from "antd";
// import { FormWrapper } from "./index.styled";
// import axios from "axios";
// import { CreateProcessCon, FormLabel, StepsFormDiv } from "./index.styled";
// import ProcessForm from "../processform";
// import RawMaterialForm from "../rawmaterialform";
// import HumanResourceForm from "../humanresourceform";
// import { useAtomValue } from "jotai";
// import { ProcessAtom } from "../../process.atom";
// import SubProcessModal from "../subprocessmodal";
// import SubProcessForm from "../subprocessmodal/components/subprocessform";
// import SubRawMaterialForm from "../subprocessmodal/components/subprocessrawmaterial";
// import SubHumanResourceForm from "../subprocessmodal/components/subprocesshumanresource";
// import { SubProcessAtom } from "../../../../../../atoms/subprocess.atom";

// function SubProcessModal({ isVisible, onClose }) {
//   const [formData, setFormData] = useState({});
//   const process = useAtomValue(ProcessAtom);
//   const subprocess = useAtomValue(SubProcessAtom);
//   const API_BASE_URL = "http://localhost:3003";
//   const [current, setCurrent] = useState(1);
//   const [isSubModalVisible, setSubIsModalVisible] = useState(false);
//   const [showSubprocessContent, setShowSubprocessContent] = useState(false);
//   const [subprocessCount, setSubprocessCount] = useState(0);

//   const handleOpenModal = () => {
//     console.log("Subprocess Modal should open");
//     setSubIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setSubIsModalVisible(false);
//   };

//   const onChangeValue = (value) => {
//     console.log("onChange:", value);
//     setCurrent(value);
//   };

//   const items = [
//     {
//       title: "Create Subprocess",
//     },
//   ];

//   const materialitems = [
//     {
//       title: "Subprocess Raw Material",
//     },
//   ];

//   const hritems = [
//     {
//       title: "Subprocess Human Resource",
//     },
//   ];

//   const handleCheckboxChange = (e) => {
//     setSubIsModalVisible(e.target.checked);
//     setShowSubprocessContent(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log("process", process);

//       const combinedData = {
//         ...process,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/process`,
//         combinedData
//       );
//       if (response.status === 200) {
//         alert("Process added successfully!");
//         //setSubprocessModalVisible(true); // Show the subprocess modal
//       } else {
//         alert("Error adding process");
//       }
//     } catch (error) {
//       alert("Error adding process");
//     }
//   };

//   const handleSubSubmit = async () => {
//     try {
//       console.log("subprocess", subprocess);

//       const combinedData = {
//         ...subprocess,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/process`,
//         combinedData
//       );
//       if (response.status === 200) {
//         alert("Subprocess added successfully!");
//         setSubprocessCount((prevCount) => prevCount + 1);
//         //setSubprocessModalVisible(true); // Show the subprocess modal
//       } else {
//         alert("Error adding process");
//       }
//     } catch (error) {
//       alert("Error adding process");
//     }
//   };

//   return (
//     <FormWrapper>
//       <Modal
//         open={isSubModalVisible}
//         onCancel={handleCloseModal}
//         centered
//         footer={null}
//         width={1000}
//         onOk={handleSubSubmit}
//       >
//         <FormLabel>Process Name: {process.name}</FormLabel>
//         <FormLabel>Subprocess Number: {subprocessCount + 1}</FormLabel>
//         <br />

//         <StepsFormDiv>
//           <Steps
//             current={current}
//             labelPlacement="Horizontal"
//             items={items}
//             onChange={(c) => {
//               setCurrent(0);
//             }}
//           />
//           <br />
//           <SubProcessForm formData={formData} setFormData={setFormData} />

//           <Divider />

//           <Steps
//             current={current}
//             labelPlacement="Horizontal"
//             onChange={onChangeValue}
//             items={materialitems}
//           />
//           <br />

//           <SubRawMaterialForm />

//           <Divider />

//           <Steps
//             current={current}
//             labelPlacement="Horizontal"
//             onChange={onChangeValue}
//             items={hritems}
//           />
//           <br />

//           <SubHumanResourceForm />
//         </StepsFormDiv>

//         <CreateProcessCon>
//           <Checkbox onChange={handleCheckboxChange}></Checkbox>
//           <Button type="primary" onClick={handleOpenModal}>
//             Submit Subprocess
//           </Button>
//         </CreateProcessCon>
//       </Modal>
//     </FormWrapper>
//   );
// }

// export default SubProcessModal;
