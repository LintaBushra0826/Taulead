import styled from "styled-components";

export const BodyWrapper = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  top: 30px;
  width: 800px;

  .ant-table-tbody .purple-row {
    background-color: #ede4ff !important;
    color: black !important;
  }

  .ant-table-tbody .white-row {
    background-color: white !important;
    color: black !important;
  }
`;

export const Container = styled.div`
  /* display: flex; */
  align-items: center;
  width: fit-content;
  padding-bottom: "20px";
`;

export const CardContainer = styled.div`
  /* margin: 5 5px;
  /* overflow: hidden; */
  /*width: 100%; */
`;
