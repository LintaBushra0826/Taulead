import React from 'react';
import { BodyWrapper } from "../../styles/global.styled";
import { TransitionContainer } from "./index.styled";
import SignupForm from './components/index';
import * as Transition from './index.styled';
import { SignContainer } from './index.styled';
import signup from '../../assets/images/pic3.png'

function Signup() {
  return (

    <div>
      <BodyWrapper>
        <TransitionContainer>
          <Transition.Img src={signup} alt="" />
          <Transition.Heading>τau_Lead</Transition.Heading>
          <Transition.Paragraph>Welcome to Manufacturing Resource Pipeline Management System</Transition.Paragraph>
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
