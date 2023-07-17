import React from 'react';
import { BodyWrapper } from "../../styles/global.styled";
import { FormWrapper, LoginContainer, TransitionContainer } from "./index.styled";
import SignupForm from './components/index';
import * as Transition from './index.styled';
import { SignContainer } from './index.styled'
//import Justheader from '../../layout/justheader'
function Signup() {
  return (
    
    <div>
      <BodyWrapper>
        {/* <Justheader /> */}
        <TransitionContainer>
            <Transition.heading>τau_Lead</Transition.heading>
            <Transition.paragraph>Welcome to Manufacturing Resource Pipeline Management System</Transition.paragraph>
        </TransitionContainer>
        <SignContainer>
          <SignupForm />
        </SignContainer>
      </BodyWrapper>
    </div>
  )
}
  /*const [signIn, toggle] = React.useState(true);*/
export default Signup;
