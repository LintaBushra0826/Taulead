import styled from "styled-components";

export const SideMenuContainer = styled.div`
  height: 100vh;
  border-radius: 0px 10px 10px 0px;
  /* margin:5px 5px; */
  .ant-menu-inline .ant-menu-item::before,
  .ant-menu-inline .ant-menu-submenu-title::before {
    display: none;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    color: white !important;
  }
  color: white;
  background: linear-gradient(100deg, #2a0845, #2a0845, #061161 150%);
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
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 15px;
  padding-bottom: 50px;
`;

export const Logo = styled.img`
  width: 100px;
  height: 85px;
  display: flex;
  color: white;
  text-decoration: none;
`;

export const LogoutDiv = styled.div`
  position: fixed;
  display: "flex";
  bottom: 40px;
  font-size: 10px;
  padding-left: 30px;
`;

export const MenuDiv = styled.div`
  position: fixed;
  display: "flex";
  bottom: 40px;
  font-size: 10px;
  padding-left: 30px;
`;
