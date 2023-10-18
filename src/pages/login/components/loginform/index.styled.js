import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 500px;
  align-self: center;
  .ant-form-item-label {
    display: flex;
    width: fit-content;
    font-weight: bold;
  }
  .ant-form-item-control {
    display: flex;
    width: fit-content;
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
  .logintext {
    background: linear-gradient(#7b4397, #dc2430);
    -webkit-background-clip: text; //Apply gradient to text
    background-clip: text; //Apply gradient to text
    -webkit-text-fill-color: transparent;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  /*.signuplink {
    position: relative;
    float: right;
    padding-bottom: 10px;
    color: #660066;
  } */
`;
