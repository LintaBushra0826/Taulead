import React from 'react';
import { BodyWrapper } from "../../styles/global.styled";
import { LoginContainer, TransitionContainer } from "./index.styled";
import LoginForm from "./components/loginform";
import * as Transition from './index.styled';

function Login() {
  return (
    
    <div>
      <BodyWrapper>
        {/* <Justheader /> */}
        <LoginContainer>
          <LoginForm />
        </LoginContainer>
        <TransitionContainer>
            <Transition.heading>τau_Lead</Transition.heading>
            <Transition.paragraph>Optimizes the monitoring of processes and manage resources helps to reduce labor, cost and time.</Transition.paragraph>
        </TransitionContainer>
      </BodyWrapper>
    </div>
  )
}
  /*const [signIn, toggle] = React.useState(true);*/
export default Login;
