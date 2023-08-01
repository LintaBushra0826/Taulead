import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 500px;
  align-self: center;
  .loginlabel {
    width: fit-content;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .loginDesc{
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
`;
export const FormHeader = styled.div`
  width: 500px;
  align-self: center;

  .logintext {
    font-size: 22px;
    color: Black;
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