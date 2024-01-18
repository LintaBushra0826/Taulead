import styled, { keyframes } from "styled-components";

const circular = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(-90deg) translateY(300px) rotate(90deg); 
    opacity: 0;
  }
  5%{
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(-630deg) translateY(300px) rotate(630deg);
    opacity: 1;
  }
`;

const pulseGlow = keyframes`
  from {
    background-size: 60%;
  }
  to {
    background-size: 100%;
  }
`;

export const Body = styled.body`
  margin: 0;
`;

export const Void = styled.div`
  width: 100%;
  max-width: 824px;
  margin: auto;
  position: relative;
  aspect-ratio: 1 / 1;
  .center-circle {
    position: absolute;
    width: 230px;
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 18px 36px -18px rgba(12, 5, 46, 0.3),
      0px 30px 60px -12px rgba(12, 5, 46, 0.25);
    border-radius: 50%;
  }
`;

export const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  outline: 2px dotted magenta;
  z-index: 1;
  &:hover * {
    animation-play-state: paused;
  }
`;

export const Li = styled.li`
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 45%;
  width: 24%;
  height: 20%;
  opacity: 0;
  animation: none;
  &:nth-child(1) {
    opacity: 0;
    animation: ${circular} 30s linear 1.7s infinite;
  }
  &:nth-child(2) {
    opacity: 0;
    animation: ${circular} 30s linear 4s infinite;
  }
  &:nth-child(3) {
    opacity: 0;
    animation: ${circular} 30s linear 6s infinite;
  }
  &:nth-child(4) {
    opacity: 0;
    animation: ${circular} 30s linear 8s infinite;
  }
  &:nth-child(5) {
    opacity: 0;
    animation: ${circular} 30s linear 10s infinite;
  }
  &:nth-child(6) {
    opacity: 0;
    animation: ${circular} 30s linear 12s infinite;
  }
  &:nth-child(7) {
    opacity: 0;
    animation: ${circular} 30s linear 16s infinite;
  }
  /* &:nth-child(8) {
    opacity: 0;
    animation: ${circular} 30s linear 18s infinite;
  }
  &:nth-child(9) {
    opacity: 0;
    animation: ${circular} 30s linear 20s infinite;
  } */
`;

export const Card = styled.div`
  width: 57%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 24px;
  gap: 8px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1), 0px 16px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #535062;
`;

export const A = styled.a`
  text-decoration: none;
  color: unset;
`;

export const ModelName = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  color: #3b2ed0;
  display: block;
`;

export const Crop = styled.div`
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1)
  );
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1)
  );
  .second-circle {
    position: absolute;
    width: 45%;
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #f5f4fe;
    opacity: 0.5;
    box-shadow: 0px 18px 36px -18px rgba(12, 5, 46, 0.3),
      0px 30px 60px -12px rgba(12, 5, 46, 0.25);
    border-radius: 50%;
  }
  .last-circle {
    position: absolute;
    width: 66%;
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #f5f4fe;
    opacity: 0.25;
    box-shadow: 0px 18px 36px -18px rgba(12, 5, 46, 0.3),
      0px 30px 60px -12px rgba(12, 5, 46, 0.25);
    border-radius: 50%;
  }
`;

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  animation: ${pulseGlow} 5s linear infinite alternate;
  background-position: 100% 50%;
  background-repeat: no-repeat;
  background-image: radial-gradient(
    100% 50% at 100% 50%,
    rgba(60, 26, 229, 0.25) 0%,
    rgba(60, 26, 229, 0.247904) 11.79%,
    rgba(32, 26, 229, 0) 100%
  );

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 80%;
    right: 0;
    display: block;
    background-image: linear-gradient(
      180deg,
      rgba(60, 26, 229, 0) 0%,
      #3c1ae5 50%,
      rgba(60, 26, 229, 0) 100%
    );
  }
`;

export const FeaturesHead = styled.div`
  display: block;
  font-size: 30px;
  color: #ffaf7b;
  text-align: center;
  padding-top: 90px;
  margin-bottom: 20px;
  font-style: italic;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
`;

export const Wrapper2 = styled.div`
  width: 100%;
  min-height: 10vh;
  background: linear-gradient(
    0deg,
    rgba(42, 8, 69, 0.88),
    rgba(42, 8, 69, 0.88)
  );
`;
