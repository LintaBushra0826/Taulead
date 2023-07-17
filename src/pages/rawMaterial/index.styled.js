import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 50px;
  flex-direction: column;
  gap: 5px;
  margin-top: -10px;
  margin-left: 220px;
  margin-right: auto;
  margin-bottom: auto;
  float:left;
  position: relative;
  .divform{
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  }

  .ant-form-item-label {
    display:inline-flex;
    width: fit-content;
    margin-bottom:-3px;
  }
  .ant-form-item-row {
    padding: 0px;
    margin-bottom: -10px;
  }
  .ant-btn-primary {
    margin-left: -170px;
    width: 150px;
    background-color: #ad5389;
    margin-bottom: 10px;
  }
  .ant-btn-primary:hover {
    margin-left: -160px;
    width: 150px;
    background-color: #ad5389;
    margin-bottom: 10px;
  }
  .ant-input{
    display:flex;
    width:150%;
  }
  .formdiv{
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 35px;
  }
  .Formheading{
    margin-top: -20px;
    margin-left: 230px;
    position: relative;
    font-size: 24px;
    margin-bottom: 5px;
  }
`;
