import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const TaskName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const TaskDetail = styled.p`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
`;

export const ProgressBar = styled.progress`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background-color: #f0f0f0;
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const TimeFormat = styled.span`
  font-size: 16px;
  color: #666;
`;

export const DateFormat = styled.span`
  font-size: 16px;
  color: #666;
`;

export const CreateProcessCon = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  gap: 5%;
  padding-left: 82%;
  
`;
