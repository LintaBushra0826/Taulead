import styled, { keyframes } from "styled-components";

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  background: linear-gradient(100deg, #2a0845, #2a0845, #061161 120%);
  width: 100%;
  height: 100vh;
  opacity: 1.05;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const popUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
const slideInRight = keyframes`
  0% {
    transform: translateX(100%); /* Initial state */
    opacity: 0;
  }
  100% {
    transform: translateX(0); /* Starting state of animation */
    opacity: 1;
  }
`;
export const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;
const moveDiagonal = keyframes`
   0% {
    transform: translate(0, 0);
    opacity:1;
  }
  50% {
    transform: translate(0.6%, 0.6%);
    opacity:1;
  }
  100% {
    transform: translate(0, 0);
    opacity:1;
  }
`;

export const Heading = styled.h1`
  position: absolute;
  padding-top: 220px;
  font-family: "Titillium Web", Sans-serif;
  font-size: 34pt;
  font-weight: 400;
  width: 400px;
  height: 200px;
  color: #fff;
  left: 200px;
  background: linear-gradient(135deg, #eaafc8, #d3cce3, #91eae4);
  -webkit-background-clip: text; /* Apply gradient to text */
  background-clip: text; /* Apply gradient to text */
  /* -webkit-text-fill-color: transparent; Hide the text color */
  animation: ${slideUp} 1s ease-out 0.9s both;

  .headerSpan {
    /* background: linear-gradient(135deg,#FF8235,#ff9966,#f7b733);
    -webkit-background-clip: text;  //Apply gradient to text 
     background-clip: text;  //Apply gradient to text 
    -webkit-text-fill-color: transparent; */
    color: #ffaf7b;
  }
`;

export const Paragraph = styled.p`
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 14pt;
  font-weight: normal;
  width: 500px;
  padding: 30px;
  color: #fff;

  animation: ${slideUp} 1s ease-out 0.9s both;
`;

export const BgImg = styled.img`
  display: flex;
  position: absolute;
  width: 55%;
  height: 85%;
  opacity: 0;
  top: 30px;
  left: 600px;
  border-radius: 180px;

  animation: ${slideInRight} 1s ease-out 0.9s 1,
    ${moveDiagonal} 2s ease-out 1.8s infinite;
`;
export const Gradient = styled.div`
  top: 150px;
  left: 800px;
  background: linear-gradient(135deg, #be93c5 150%, #7bc6cc 150%);
`;

export const ButtonWrapper = styled.button`
  display: flex;
  position: absolute;
  left: 200px;
  top: 500px;
  background-color: transparent;
  border: none;
  animation: ${popUp} 1.5s ease-out 1.1s both,
    ${pulseAnimation} 4s ease-out 3s 1;
  opacity: 0;

  .signupbtn {
    width: fit-content;
    background-color: #d3cce3;
    border-color: #1d2b64;
    color: #1d2b64;
    height: 40px;
    font-weight: 500;
  }
  .demobtn {
    width: fit-content;
    background-color: transparent;
    border-color: white;
    color: white;
    height: 40px;
    font-weight: 500;
  }
`;

export const Section2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* background: linear-gradient(100deg, #dbe6f6, #e6dada); */
  width: 100%;
  /* height: 60vh; */
`;

export const Section3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* background: linear-gradient(100deg, #e6dada, #dbe6f6); */
  width: 100%;
  /* height: 100vh; */
`;

export const Section4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  background: linear-gradient(100deg, #e6dada, #dbe6f6);
  width: 100%;
  height: 100vh;
`;
export const CardWrapper = styled.div`
  position: absolute;
  top: 800px;
  left: 150px;
  width: 1200px;
  height: 1000px;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.1);
  background-color: #ede4ff;
  border-radius: 50px;
`;

export const ImageWrap = styled.img`
  display: flex;
  position: relative;
  border-radius: 30px;
  width: 800px;
  height: 500px;
  filter: drop-shadow(8px 8px 10px #2c2c54);
  top: 80px;
  left: 10px;
  right: 10px;

  /* Add the animation properties here */
  animation-name: ${pulseAnimation};
  animation-duration: 3s; /* Adjust the duration as needed */
  animation-delay: 1s; /* Delay the animation if desired */
  animation-fill-mode: both;
`;

export const ImageWrap2 = styled.img`
  display: flex;
  border-radius: 10px;
  width: 340px;
  height: 220px;
  filter: drop-shadow(8px 8px 10px #2c2c54);
  position: absolute;
  top: 510px;
  left: 560px;
`;

export const ImageWrap3 = styled.img`
  display: flex;
  width: 250px;
  height: 180px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px #2c2c54);
  position: absolute;
  top: 380px;
  left: 240px;
`;

export const FeartureHeading = styled.div`
  padding-top: 30px;
  font-family: "Roboto", sans-serif;
  font-size: 22pt;
  width: 700px;
  padding-left: 550px;
`;

export const StyledCircleContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  /* top:500px; */
  top: 500px;
  left: 1350px;
  box-shadow: 40px 14px 16px #210062;

  animation-name: ${moveUpDown};
  animation-duration: 2s; /* Adjust the duration as needed */
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;
export const StyledCircleContainer2 = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  top: 200px;
  left: 1300px;
  box-shadow: 40px 14px 16px #210062;

  animation-name: ${moveUpDown};
  animation-duration: 2s; /* Adjust the duration as needed */
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;
export const StyledCircleContainer3 = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  /* top:500px; */
  top: 700px;
  right: 20px;
  box-shadow: 40px 14px 16px #210062;

  animation-name: ${moveUpDown};
  animation-duration: 2s; /* Adjust the duration as needed */
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

export const StyledCircle1 = styled.div`
  display: flex;
  position: absolute;
  width: 50px;
  height: 50px;
  /* border: 10px solid #cbb4d4; */
  border: 10px solid #9f91cc;
  border-radius: 100%;
`;

export const StyledCircle2 = styled.div`
  display: flex;
  position: absolute;
  width: 300px;
  height: 300px;
  border: 30px solid #9f91cc;
  border-radius: 50%;
`;

export const StyledCircle3 = styled.div`
  display: flex;
  position: absolute;
  width: 50px;
  height: 50px;
  border: 10px solid #9f91cc;
  border-radius: 100%;
`;

export const FeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(100deg, #2a0845, #2a0845, #2a0845 120%);
  width: 100%;
  height: 100vh;
  opacity: 1.05;
`;
