import styled from "styled-components";

export const SideMenuContainer = styled.div`
  .ant-menu-inline .ant-menu-item::before,
  .ant-menu-inline .ant-menu-submenu-title::before {
    display: none;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    color: white !important; 
  }
  color: white;
  background: linear-gradient(135deg, #3c1053, #ad5389);
  .menudiv ul {
    background-color: transparent;
    color: white;
    flex-direction: column;
    height: 100%;
  }

  .ant-menu-title-content:hover {
    display: flex;
    color: white;
    flex-direction: column;
    height: 100%;
  }
`;