import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 600px;

  .logintext {
    font-size: 22px;
    color: Black;
    display: flex;
    flex-direction: column;
    gap: 30px;
    bottom: 15px;
  }

  .login-form-button {
    position: relative;
    left: 85%;
  }

  .loginDesc {
    font-size: 12px;
    color: grey;
    font-weight: normal;
    flex-direction: column;
    gap: 10px;
    top: 5px;
    bottom: 40px;
    text-align: justify;
  }

  .loginlabel {
    width: fit-content;
    font-weight: bold;
  }

  .ant-input {
    display: flex;
    width: 50%;
    float: right;
  }

  .ant-form {
    width: 80%;
    align-items: center;
    align-self: center;
    position: relative;
    left: 50px;
  }

  .formheader {
    width: 80%;
    align-items: center;
    align-self: center;
    position: relative;
    left: 50px;
  }

  .login-form-forgot {
    position: relative;
    float: right;
    margin-bottom: 10px;
  }
  .footer {
    position:absolute;
    align-items: center;
    align-self:center;
    padding-top:29px ;
    padding-left: 35%;
    gap:20px;
  }
`;


export const FormHeader = styled.div`
  width: 80%;
  align-items: center;
  align-self: center;
  position: relative;
  left: 50px;
  gap: 20px;
`;
