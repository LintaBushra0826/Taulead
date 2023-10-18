import React from "react";
import { BodyWrapper } from "../../styles/global.styled";
import { LoginContainer, TransitionContainer } from "./index.styled";
import LoginForm from "./components/loginform";
import * as Transition from "./index.styled";
import login from "../../assets/images/desktop-removebg-preview.png"
function Login() {
  return (
    <div>
      <BodyWrapper>
        <LoginContainer>
          <LoginForm />
        </LoginContainer>
        <TransitionContainer>
          <Transition.Img src={login} alt="" />
          <Transition.Heading>τau_Lead</Transition.Heading>
          <Transition.Paragraph>
            Optimizes and Monitoring Processes and Resources Pipeline
          </Transition.Paragraph>
        </TransitionContainer>
      </BodyWrapper>
    </div>
  );
}
export default Login;
