import styled from "styled-components";

export const FormWrapper = styled.div`
`;

export const CreateProcessCon = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  .ant-checkbox + span {
    padding-top: 5px;
  }
`;

export const SubProcessHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .ant-checkbox + span {
    padding-top: 5px;
  }
`;

export const FormLabel = styled.div`
  /* right: 35px; */
  font-size: 17px;
`;

export const StepsFormDiv = styled.div`
  text-align: center;
  border-radius: 10px;
  border: 1px dashed #ccd1d1;
  padding: 20px;
  bottom: 20px;
  overflow: scroll;
  .ant-form-item-control-input-content {
    display: flex;
    flex: auto;
  }
`;