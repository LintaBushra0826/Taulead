import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 600px;
  margin-top: auto;
  margin-left: auto;
  margin-bottom: auto;
  margin-right: auto;
  
  .ant-form-item-label {
    padding: 0px;
  }

  .logintext{
    font-size: 22px;
    color: Black;
    margin-left: left;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 15px;
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

    .FormFields{
      width:80%;
      border-bottom: px solid grey;
    }

   .formdiv{
      margin: auto;
      border-bottom:1px solid black;
      margin-bottom: 20px;
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
      margin-bottom: 15px;
      background-color: #660066;
    }
    .ant-btn-primary:hover{
      color: #660066;
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
      margin-top:-23px;
      display:flex;
      position:relative;
      float: right;
      text-decoration: underline;
      color: #660066;
      margin-bottom: 15px;
      margin-right:160px;
      }
`;

export const LoginContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  margin-bottom: auto;
  margin-right: auto;

`;