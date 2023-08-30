import React from "react";
import { BodyWrapper } from "../../styles/global.styled";
import { ButtonContainer } from "../humanresource/components/humanResourceForm/index.styled";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";

function Home() {
  return (
    <div>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <ButtonContainer>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
          <br></br>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </ButtonContainer>
      </BodyWrapper>
    </div>
  );
}
export default Home;
