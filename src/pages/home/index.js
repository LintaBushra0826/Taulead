import React, { useState, useEffect } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import {
  BodyWrapper,
  ButtonWrapper,
  Heading,
  Paragraph,
  ImageWrap,
  ImageWrap2,
  ImageWrap3,
  CardWrapper,
  FeartureHeading,
  BackgroundPic,
  StyledCircleContainer,
  StyledCircleContainer2,
  StyledCircle,
  StyledCircle1,
  StyledCircle2,
  StyledCircleContainer3,
  StyledCircle3,
} from "./index.styled";
import { Button, Space } from "antd";
import Card from "./components/card";
import HomepageTransistion from "../../assets/images/dasboardpic.png";
import backgroundpic from "../../assets/images/backgroundImg3.jpg";
import mfr from "../../assets/images/mfr.jpg";
import inventory from "../../assets/images/Inventory.png";
import Features from "../home/components/features";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const ToDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    // Simulate loading time (adjust the duration as needed)
    setTimeout(() => {
      setLoaded(true);
      console.log('loaded:', loaded); // Log the value of loaded
    }, 1500); // 1.5 seconds for example, you can adjust this value
  }, []);  
  

  return (
    <>
      <BodyWrapper>
        <BackgroundPic src={backgroundpic} alt="image" loaded={loaded}/>
        <Header />
        <Heading>
          Master your Manufacturing Processes Management with Excellence
        </Heading>
        <Paragraph>
          <p>
            Create your own manufacturing business and manage your tasks here
            easily with secure access
          </p>
        </Paragraph>

        <StyledCircleContainer>
          <StyledCircle1></StyledCircle1>
        </StyledCircleContainer>

        <StyledCircleContainer2>
          <StyledCircle2></StyledCircle2>
        </StyledCircleContainer2>

        <StyledCircleContainer3>
          <StyledCircle3></StyledCircle3>
        </StyledCircleContainer3>

        <ButtonWrapper>
          <Space wrap>
            <Button type="primary" name="GetStarted" onClick={ToDown}>
              Get Started
            </Button>
            <Button name="demo" onClick={ToDown}>
              Request Demo
            </Button>
          </Space>
        </ButtonWrapper>

        <ImageWrap src={HomepageTransistion} alt="image" />
        {/* <ImageWrap src={Stats3d} alt="image" />
        <ImageWrap2 src={mfr} />
        <ImageWrap3 src={inventory} /> */}

        {/* <CardWrapper>
        <FeartureHeading>Features</FeartureHeading>
      </CardWrapper>
      <Card id="services-card" /> */}

        <Features />

        <Footer />
      </BodyWrapper>
    </>
  );
}
export default Home;
