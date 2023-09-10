import styled, { keyframes } from "styled-components";

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #ede4ff, #e8cbc0); //approved
  /* background: linear-gradient(135deg, #636FA4,#ede4ff, #302b63); */
  /* background: #e2e2e2; */
  /* background: linear-gradient(135deg, #D3CCE3,#E9E4F0); */ //approved
  /* background: linear-gradient(135deg, #ba90c6, #fdf4f5, #ba90c6); //latest */
  /* background: linear-gradient(100deg, #654ea3, #E9E4F0, #654ea3); */
  height: 100vh;
  color: #2c2c54;
`;
export const BackgroundPic = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, #e8cbc0, #ddd6f3, #cbb4d4);
    opacity: 0.95;
    transition: opacity 1s ease, transform 1s ease; 
  }
`;

export const Heading = styled.h1`
  position: relative;
  padding-top: 80px;
  font-family: "Roboto", sans-serif;
  font-size: 32pt;
  font-weight: 500;
  width: 800px;
  color: linear-gradient(135deg, #654ea3, #1d2b64);

`;

export const Paragraph = styled.p`
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 12pt;
  font-weight: normal;
  width: 500px;
  padding: 20px;
  color: linear-gradient(135deg, #654ea3, #1d2b64);

  /* 
  &:before {
    content: "Create your own manufacturing business and manage your tasks here easily with secure access";
    position: absolute;
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    left:10px;
    animation: typing 8s steps(1000, end);
  } */

  /* @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  } */
`;

const blink = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const TypingText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  position: relative;

  &:after {
    content: "|"; /* Typing cursor */
    display: inline-block;
    width: 0;
    animation: blink 0.7s infinite; /* Cursor blinking animation */
  }
`;
export const ButtonWrapper = styled.button`
  padding-top: 5px;
  background-color: transparent;
  border: none;
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
  /* 
  @keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
} */

  /* @keyframes scaleUp {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
} */

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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust the desired distance */
  }
  100% {
    transform: translateY(0);
  }
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
