import React from "react";
import profile from "../../assets/images/profile.png";
import {
  HeaderContainer,
  ProfileDropdown,
} from "./index.styled";
import { Link } from "react-router-dom";
import { AudioOutlined } from '@ant-design/icons';
import { Dropdown,Input, Space } from 'antd';
import { CgProfile } from "react-icons/cg";




function DashboardHeader() {
  const items = [
    {
      label: <Link to="/settings">Settings</Link>,
      key: "0",
    },
    {
      label: <Link to="/logout">Logout</Link>,
      key: "logout",
    },
  ];
  const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);


  return (
    <HeaderContainer>
      <Space direction="vertical">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: '350px',
          marginLeft: '25%'
        }}
      />
     </Space>
      <Dropdown trigger={["click"]} menu={{ items }}>
        {/* <CgProfile/> */}
        <ProfileDropdown src={CgProfile} alt="profile" />
      </Dropdown>
    </HeaderContainer>
    
  );
}

export default DashboardHeader;
