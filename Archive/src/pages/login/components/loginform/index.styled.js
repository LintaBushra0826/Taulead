import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 500px;
  align-self: center;
  .ant-form-item-label{
    display:flex;
    width:fit-content;
    font-weight: bold;
  }
  .ant-form-item-control{
    display:flex;
    width:fit-content;
  }
  .ant-input {
    display: flex;
    width: 60%;
    float: right;
  }
   .login-form-forgot {
    position: relative;
    float: right;
    padding-bottom: 20px;
    color: #660066;
  } 
  /*.signuplink {
    position: relative;
    float: right;
    padding-bottom: 10px;
    color: #660066;
  } */
`;