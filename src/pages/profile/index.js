import React from 'react';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import ProfileForm from "./components/profileform";
import { FormWrapper } from "./index.styled";

function Profile() {
  return (
    <div className='divform'>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <FormWrapper>
          <ProfileForm />
        </FormWrapper>
      </BodyWrapper>
    </div>
  );
}

export default Profile;
