import React from 'react';
import { Menu } from 'antd';
import { SideMenuContainer } from './index.styled'

const items = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Inventory',
    key: 'Inventory',
    children: [
      {
        type: 'Raw Material Inventory',
        label: 'Raw Material Inventory',
      },
      {
        type: 'Human Resource Inventory',
        label: 'Human Resource Inventory',
      },
    ],
  },
  {
    label: 'Processes',
    key: 'Processes',
    children: [
      {
        type: 'Create Processes',
        label: 'Create Processes',
      },
      {
        type: 'View Processes',
        label: 'View Processes',
      },
    ],
  },
  {
    label: 'Measuring Units',
    key: 'Measuring Units',
    children: [
      {
        type: 'Create Units',
        label: 'Create Units',
      },
      {
        type: 'View Units',
        label: 'View Units',
      },
    ],
    },
  {
    label: 'Statistics',
    key: 'Statistics',
    children: [
      {
        type: 'Raw Material Stats',
        label: 'Raw Material Stats',
      },
      {
        type: 'Human Resource Stats',
        label: 'Human Resource Stats',
      },
      {
        type: 'Process Stats',
        label: 'Process Stats',
      },
    ],
  },
  {
    label: 'Logs',
    key: 'Logs',
    children: [
      {
        type: 'Process Logs',
        label: 'Process Logs',
      },
      {
        type: 'Price Logs',
        label: 'Price Logs',
      },
    ]
  },
  {
    label: 'Profile',
    key: 'profile',
    // disabled: true,
  },
  {
    label: 'Settings',
    key: 'Settings',
    // disabled: true,
  },
  
];

function SideMenu() {

  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <SideMenuContainer>
      <div className='menudiv'>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      </div>
    </SideMenuContainer>
  );
}

export default SideMenu;
