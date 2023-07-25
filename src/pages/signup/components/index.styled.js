import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 600px;
  .logintext{
    font-size: 22px;
    color: Black;
    flex-direction: column;
    gap: 30px;
  }

  .loginDesc{
    font-size: 12px;
    color: grey;
    font-weight: normal;
    margin-left: left;
    flex-direction: column;
    gap: 10px;
    margin-top: 5px;
    margin-bottom: 40px;
    text-align: justify;
  }
  Form.Item .Input{
    display: inline;
  }

  .loginlabel{
    width: fit-content;
    font-weight: bold;
  }

  .ant-input{
    display:flex;
    width: 50%;
    float:right;
  }

  .ant-form{
    width: 80%;
    align-items: center;
    align-self: center;
    position: relative;
    margin-left: 50px; 
    }

    .formheader{
    width: 80%;
    align-items: center;
    align-self: center;
    position: relative;
    margin-left: 50px;
    }

    .login-form-forgot{
      position:relative;
      float: right;
      margin-bottom:10px;
    }
    .ant-form .label{
      display:inline;
      margin-left: auto;
    }

    .ant-form .checkbox{
      display:flex;
    }

    .ant-btn-primary{
      display:flex;
      margin-left: 330px;
      width: fit-content;
      background-color: #660066;
    }
    .SignUplabel{
      margin-left: 100px;
      margin-right: 10px;
    }
    a{
      position:relative;
      text-decoration: underline;
      color: #660066; 
    }
    .termslink{
      text-decoration: underline;
      color: #660066;
      position:relative;
      display:flex;
      justify-content: flex-start;
      flex-direction: row;
      gap:10px;

      }
`;

export const LoginContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  margin-bottom: auto;
  margin-right: auto;

`;