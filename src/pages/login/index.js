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
          <Transition.heading τau_Lead />
          <Transition.paragraph
            optimizesTheMonitoringOfProcessesAndManageResourcesHelpsToReduceLaborCostTime
          />
        </TransitionContainer>
      </BodyWrapper>
    </div>
  );
}
/*const [signIn, toggle] = React.useState(true);*/
export default Login;
