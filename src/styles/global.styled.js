import styled from "styled-components";


export const BodyWrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;

export const MainContainer = styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
  padding: 2.5rem;
  block-size: auto;
`;

export const bodyheading = styled.div``;

export const FormHeading = styled.div`
  font-size: 16pt;
  padding-bottom: 15px;
`;

export const TableWrapper = styled.div`
  padding: 15px;
  width: 100%;
`;

export const ChartWrapper = styled.div`
  padding: 15px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  
`;
export const FormHeader = styled.div`
  width: 500px;
  align-self: center;

  .logintext {
    font-size: 22px;
    color: Black;
  }
  .loginDesc {
    font-size: 12px;
    font-weight: normal;
    color: grey;
    padding-bottom: 40px;
    text-align: justify;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom:20px;
`;

export const Footer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
