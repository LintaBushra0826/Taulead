import React from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import {
  BodyWrapper,
  ButtonWrapper,
  Heading,
  BgImg,
  Section2,
  Section3,
  Section4,
} from "./index.styled";
import { Button, Space } from "antd";
import bgPic from "../../assets/images/whitebg4.jpeg";
import backgroundpic from "../../assets/images/bgAnimation.png";
import Features from "../home/components/features";
import Partners from "../home/components/partners";
import Contact from "../home/components/contactUsform";

function Home() {
  const ToDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <BodyWrapper>
        <img
          src={bgPic}
          alt="bgPic"
          style={{ width: "100%", height: "100vh", opacity: "0.09" }}
        />

        <Header />
        <BgImg src={backgroundpic} />

        <Heading>
          Manage Your{" "}
          <span className="headerSpan">Manufacturing Resource Pipeline </span>
          {"\t "}
          with Excellence
        </Heading>

        <ButtonWrapper>
          <Space wrap>
            <Button className="signupbtn" onClick={ToDown}>
              Learn more
            </Button>

            <Button className="demobtn" onClick={ToDown}>
              Request Demo
            </Button>
          </Space>
        </ButtonWrapper>

        <Section3>
          <Partners />
        </Section3>

        <Section2>
          <Features />
        </Section2>

        <Section2>
          <Contact />
        </Section2>

        <Footer />
      </BodyWrapper>
    </>
  );
}
export default Home;
