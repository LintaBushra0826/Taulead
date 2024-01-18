import styled, { keyframes } from "styled-components";

export const SignContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
  flex-direction: column;
  background-color: white;
  flex-direction: column;
  height: 100%;
  float: right;
  width: 100%;
`;

export const TransitionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(#f2f2f2, #dbdbdb, #eaeaea);
  flex-direction: column;
  height: 100%;
  float: left;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 100%;
`;

const slideInLeft = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0); 
    opacity: 1;
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

export const Img = styled.img`
  width: 500px;
  height: 1000px;
  position: relative;
  top: 20px;
  left: 65px;
  animation: ${slideInLeft} 1s ease-out 0.3s both;
`;

export const Paragraph = styled.h4`
  display: flex;
  font-size: 14px;
  color: white;
  justify-content: center;
  font-weight: normal;
  background: linear-gradient(#7b4397, #dc2430);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: ${slideUp} 1s ease-out 0s both;
`;

export const Heading = styled.h4`
  font-weight: bold;
  display: flex;
  justify-content: center;
  background: linear-gradient(#7b4397, #dc2430);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: ${slideUp} 1s ease-out 0s both;
`;
