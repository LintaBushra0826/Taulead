import React from "react";
import { BodyWrapper } from "../../styles/global.styled";
import { LoginContainer, TransitionContainer } from "./index.styled";
import LoginForm from "./components/loginform";
import * as Transition from "./index.styled";

function Login() {
  return (
    <div>
      <BodyWrapper>
        <LoginContainer>
          <LoginForm />
        </LoginContainer>
        <TransitionContainer>
          <Transition.Heading>τau_Lead</Transition.Heading>
          <Transition.Paragraph>
            Optimizes The Monitoring Of Processes And Manage Resources Helps To
            Reduce Labor Cost Time
          </Transition.Paragraph>
        </TransitionContainer>
      </BodyWrapper>
    </div>
  );
}
export default Login;
