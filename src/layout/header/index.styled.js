import styled from "styled-components";

// export const HeaderWrapper = styled.div`
//   border-bottom: 1px solid #210062;
// `;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 150px;
`;

export const Logo = styled.img`
  position: relative;
  top: 20px;
  width: 110px;
  height: 150px;
  display: flex;
  color: white;
  text-decoration: none;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

export const Heading = styled.h2`
  font-size: 14pt;
  color: #702963;
  font-family: "Times New Roman";
  display: flex;
  width: fit-content;
`;

export const Username = styled.div`
  display: flex;
  color: white;
  text-decoration: none;
`;

export const HeadButton = styled.div`
  display: flex;
  background: none;
  border: none;
  color: blue;
`;

export const HeadMenu = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-items: center;
  padding-left: 160px;
  width: 700px;
  .ant-menu {
    width: 450;
    background: transparent;
    padding-left: 50px;
    font-size: 12pt;
    color: #210062;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }
`;

// export const ButtonContainer = styled.div`
//   position:relative;
//   display:flex;
//   justify-content: flex-end;
//   gap:10px;
//   padding-top:16px;
//   a{
//     color: #210062;
//   }
//   .signupbtn{
//     display:flex;
//     background-color: #654ea3;
//     color:white;
//     height: 30px;
//   }
// `;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center; /* Align items vertically in the center */
  gap: 10px;
  padding-top: 3px;

  a {
    color: #210062;
    display: inline-block; /* Display the login link as an inline block */
  }
`;
