import styled from "styled-components";

export const FooterWrapper = styled.div`
  width: 100%;
  font-family: "Roboto", sans-serif;
  /* background: #654ea3; */
  background-color: #060047;
  color: white;
  padding: 20px; /* Add padding as needed */

  .text-center.text-lg-start.text-muted {
    color: white;
  }

  .row {
    color: white;
  }

  .text-muted {
    color: white;
  }
  .text-center {
    color: white;
  }

  .d-none {
    color: white;
    padding-left: 55px;
  }

  .text-uppercase {
    position: relative;
  }
`;

export const ImageWapper = styled.img`
  display: flex;
  position: relative;
  top: 20px;
  width: 110px;
  height: 150px;
  color: white;
  text-decoration: none;
`;

export const footerLogo = styled.img`
  display: flex;
  position: absolute;
  width: 110px;
  height: 100px;
`;
