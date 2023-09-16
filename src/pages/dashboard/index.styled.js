import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center; 
  width: fit-content;
`;

export const CardContainer = styled.div`
  margin: 0 10px;
`;

export const Paragraph = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 100px;
  font-size: 18px;
  font-weight: bold;
`;
export const DashboardchartWrapper = styled.div`
  display: flex;
  width: calc(143vh - 400px);
  height: calc(65vh - 120px);
  box-shadow: 0 4px 7px 0 grey;
  position: relative;
  top:40px;
  margin: 0 10px;
`;

export const StatsChartWrapper = styled.div`
  padding: 15px;
  width: 100%;
  height: 95%;
`;