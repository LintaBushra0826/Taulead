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
  TextGradient,
  Gradient,
  BodyBackground,
  FeaturesWrapper,
  BgImg,
  Section2,
  Section3,
  Section4,
} from "./index.styled";
import { Button, Space } from "antd";
import Card from "./components/card";
import HomepageTransistion from "../../assets/images/dasboardpic.png";
import bgPic from "../../assets/images/whitebg4.jpeg";
import backgroundpic from "../../assets/images/bgAnimation.png";
import mfr from "../../assets/images/mfr.jpg";
import inventory from "../../assets/images/Inventory.png";
import Features from "../home/components/features";
import Partners from "../home/components/partners";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const ToDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    // Simulate loading time (adjust the duration as needed)
    setTimeout(() => {
      setLoaded(true);
      console.log("loaded:", loaded); // Log the value of loaded
    }, 1500); // 1.5 seconds for example, you can adjust this value
  }, []);

  return (
    <>
      <BodyWrapper>
        <img
          src={bgPic}
          style={{ width: "100%", height: "100vh", opacity: "0.09" }}
        />

        <Header />
        <BgImg src={backgroundpic} />

        <Heading>
          Manage Your{" "}
          <span className="headerSpan">Manufacturing Resource Pipeline </span>{" "}
          with Excellence
        </Heading>
        {/* <Paragraph>
          <p>
            Create business processes and manage tasks here with secure access
          </p>
        </Paragraph> */}
        {/*
        <StyledCircleContainer>
          <StyledCircle1></StyledCircle1>
        </StyledCircleContainer>

        <StyledCircleContainer2>
          <StyledCircle2></StyledCircle2>
        </StyledCircleContainer2>

        <StyledCircleContainer3>
          <StyledCircle3></StyledCircle3>
        </StyledCircleContainer3>*/}

        <ButtonWrapper>
          <Space wrap>
            <Button type="primary" name="learnmore" onClick={ToDown}>
              Learn more
            </Button>

            <Button name="demo" onClick={ToDown}>
              Request Demo
            </Button>
          </Space>
        </ButtonWrapper>

        <Section2>
          <Features />
        </Section2>
    
        <Section3>
          <Partners />
        </Section3>

        <Section4>
          
        </Section4>


        {/* <Section3>
          
        </Section3> */}

        {/* <Gradient></Gradient> */}

        {/* <StatisticsCard
          className="card"
          style={{
            height: "22rem",
            width: "18rem",
            borderRadius: "20px",
            border: "none",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="card-body mt-2">
            <h5 className="card-title">Statstics</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              Understand Your <br />
              Customers
            </h5>
            <p className="card-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In iure
              ad doloremque at error animi eligendi soluta obcaecati atque
              dolorem.
            </p>
          </div>
        </StatisticsCard> */}

        {/* <ImageWrap src={HomepageTransistion} alt="image" /> */}
        {/* <ImageWrap src={Stats3d} alt="image" />
        <ImageWrap2 src={mfr} />
        <ImageWrap3 src={inventory} /> */}

        {/* <CardWrapper>
        <FeartureHeading>Features</FeartureHeading>
      </CardWrapper>
      <Card id="services-card" /> */}

        <Footer />
      </BodyWrapper>
    </>
  );
}
export default Home;
