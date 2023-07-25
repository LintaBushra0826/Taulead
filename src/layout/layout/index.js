import React, { useState } from 'react';
import { HomeOutlined } from "@ant-design/icons";
import { MdInventory } from "react-icons/md";
import { TbRulerMeasure, TbReportSearch } from "react-icons/tb";
import { FcProcess, FcStatistics } from "react-icons/fc";
import { CiUser, CiSettings } from "react-icons/ci";
import { Layout, Menu } from 'antd';
const {  Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Inventory', 'sub0', <MdInventory />), [
    getItem('Raw Material Inventory', '2'),
    getItem('Human Resource Inventory', '3'),
  ],
  getItem('Measuring Units', 'sub1', <TbRulerMeasure/>, [
    getItem('Create Unit', '4'),
    getItem('View Unit', '5'),
  ]),
  getItem('Processes', 'sub2', <FcProcess />, [
    getItem('Process Creation', '6'), 
  ]),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      {/* <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        </Layout> */}
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          τau-Lead @ Manufacturing Resource Pipeline
        </Footer>
    </Layout>
  );
};
export default App;