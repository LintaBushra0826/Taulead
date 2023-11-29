import styled from "styled-components";

export const ButtonWrapper = styled.div`
  position: relative;
  top: 30px;
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  padding: 10px 30px;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 100px;
  display: flex;
  left:280px;
  justify-content: flex-start;
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 450px;
  display: flex;
  left:280px;
  justify-content: flex-start;
`;

export const BarWrapper = styled.div`
  position: absolute;
  top: -40px;
  left: 1110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  border: 1px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
