import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 500px;
  align-self: center;
  .loginlabel {
    width: fit-content;
    font-weight: bold;
  }
  .loginDesc {
    padding-bottom: 20px;
  }
  .ant-input {
    display: flex;
    width: 60%;
    float: right;
  }
  .login-form-forgot {
    position: relative;
    float: right;
    padding-bottom: 10px;
    color: #660066;
  }
  .signuplink {
    position: relative;
    float: right;
    padding-bottom: 10px;
    color: #660066;
  }
  .ant-form-item {
    padding: auto;
  }
  .ant-form-item-label {
    padding-bottom: -40px;
    display: flex;
  }
`;
export const FormHeader = styled.div`
  width: 500px;
  align-self: center;

  .logintext {
    background: linear-gradient(#7b4397, #dc2430);
    -webkit-background-clip: text; //Apply gradient to text
    background-clip: text; //Apply gradient to text
    -webkit-text-fill-color: transparent;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 10px;
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
  padding-bottom: 20px;
`;

export const Footer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
