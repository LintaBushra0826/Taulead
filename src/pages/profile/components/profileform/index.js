// import React, { useState } from "react";
// import { Input, Upload, Form, message, Button } from "antd";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { FormWrapper, Formheader, UploadHeader } from "./index.styled";
// import { ButtonContainer } from "../../../humanresource/components/humanResourceForm/index.styled";

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

// function ProfileForm() {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState();
//   const handleChange = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };
//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   );
//   return (
//     <>
//     <FormWrapper>
//       <Formheader className='formheader'>My Profile</Formheader>
//       <UploadHeader>
//       <Upload
//         name="avatar"
//         listType="picture-circle"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//       >
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt="avatar"
//             style={{
//               width: "100%",
//             }}
//           />
//         ) : (
//           uploadButton
//         )}
//       </Upload>
//       </UploadHeader>
//       <Form
//         name="basic"
//         layout="vertical"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Name"
//           name="Name"
//           rules={[
//             {
//               required: true,
//               message: "Please input your name!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="Email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your email!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="Password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Phone No"
//           name="Number "
//           rules={[
//             {
//               required: true,
//               message: "Please input your phone number!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Business Name"
//           name="Business"
//           rules={[
//             {
//               required: true,
//               message: "Please input your business name!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//         >
//           <ButtonContainer>
//           <Button type="primary" htmlType="submit">
//             Save Changes
//           </Button>
//           </ButtonContainer>
//         </Form.Item>
        
//       </Form>
//       </FormWrapper>
//     </>
//   );
// }

// export default ProfileForm;


import React, { useState, useEffect } from "react";
import { Input, Upload, Form, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  FormWrapper,
  Formheader,
  UploadHeader,
} from "./index.styled";
import { ButtonContainer } from "../../../humanresource/components/humanResourceForm/index.styled";
import axios from "axios";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function ProfileForm() {
  const API_BASE_URL = "http://localhost:3005";
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(); 
  const [userData, setUserData] = useState({
    Name: '',
    Email: '',
    Password: '',
    Business: '', 
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserDataFromServer();
  }, []);

  const fetchUserDataFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing or undefined");
        // Handle the absence of a token, e.g., redirect to login
        return;
      }
  
      const response = await axios.get(`${API_BASE_URL}/userdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const userDataFromServer = response.data;
  
      setUserData({
        Name: userDataFromServer.Name,
        Email: userDataFromServer.Email,
        Password: userDataFromServer.Password,
        Business: userDataFromServer.BusinessName,
      });
      setImageUrl(userDataFromServer.imageUrl || '');
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setUpdatedUserData({
      Name: userData.Name,
      Email: userData.Email,
      Password: userData.Password,
      Business: userData.Business,
    });
  };

  const [updatedUserData, setUpdatedUserData] = useState({
    Name: '',
    Email: '',
    Password: '',
    Business: '',
  });

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing or undefined");
        return;
      }
  
      const response = await axios.put(`${API_BASE_URL}/signup`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedUserDataFromServer = response.data.updatedUser;
  
      setUserData({
        Name: updatedUserDataFromServer.Name,
        Email: updatedUserDataFromServer.Email,
        Password: updatedUserDataFromServer.Password,
        Business: updatedUserDataFromServer.BusinessName,
      });
  
      setEditMode(false);
      message.success("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      message.error("Failed to update user data");
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedUserData({
      ...updatedUserData,
      [field]: value,
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <FormWrapper>
        <Formheader className="formheader">My Profile</Formheader>
        <UploadHeader>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </UploadHeader>
        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
            Name: userData.Name,
            Email: userData.Email,
            Password: userData.Password,
            Business: userData.Business,
          }}
          autoComplete="off"
        >
       
       <Form.Item label="Name" rules={[{ required: true, message: "Please input your name!" }]}>
      <Input
        value={editMode ? updatedUserData.Name : userData.Name}
        onChange={(e) => handleInputChange("Name", e.target.value)}
        disabled={!editMode}  // Disable input when not in edit mode
      />
    </Form.Item>

    <Form.Item label="Email" rules={[{ required: true, message: "Please input your email!" }]}>
      <Input
        value={editMode ? updatedUserData.Email : userData.Email}
        onChange={(e) => handleInputChange("Email", e.target.value)}
        disabled={!editMode}
      />
    </Form.Item>

    <Form.Item label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
      <Input.Password
        value={editMode ? updatedUserData.Password : userData.Password}
        onChange={(e) => handleInputChange("Password", e.target.value)}
        disabled={!editMode}
      />
    </Form.Item>

    <Form.Item label="Business Name" rules={[{ required: true, message: "Please input your business name!" }]}>
      <Input
        value={editMode ? updatedUserData.Business : userData.Business}
        onChange={(e) => handleInputChange("Business", e.target.value)}
        disabled={!editMode}
      />
    </Form.Item>

    <Form.Item>
      <ButtonContainer>
        {editMode ? (
          <Button type="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
        ) : (
          <Button type="primary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </ButtonContainer>
    </Form.Item>
        </Form>
      </FormWrapper>
    </>
  );
}

export default ProfileForm;
