import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 50px;
  flex-direction: column;
  gap: 5px;
  margin-top: -10px;
  margin-left: 230px;
  margin-right: auto;
  margin-bottom: auto;
  float: left;
  position: relative;

  .ant-form-item-label {
    display: inline-flex;
    width: fit-content;
    margin-bottom: -3px;
  }
  .ant-form-item-row {
    padding: 0px;
    margin-bottom: -10px;
  }
  .ant-input {
    display: flex;
    width: 150%;
  }
  .formdiv {
    position: relative;
    margin-top: auto;
    margin-left: 350;
    margin-right: auto;
    margin-bottom: 35px;
  }
  .Formheading {
    margin-top: 20px;
    margin-left: 210px;
    position: relative;
    font-size: 24px;
    margin-bottom: 5px;
  }
`;
