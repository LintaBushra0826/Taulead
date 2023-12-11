import styled, { keyframes } from "styled-components";

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

const flip = keyframes`
  0% {
    transform: perspective(400px) rotateY(180deg);
  }
  100% {
    transform: perspective(400px) rotateY(360deg);
  }
  
`;

export const Wrapper3 = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(0deg, #cbb4d4, #e8cbc0); */
  /* background: linear-gradient(0deg, #e2e2e2, #c9d6ff); */
  background: linear-gradient(
    100deg,
    rgba(6, 17, 97, 0.89) -100%,
    rgba(42, 8, 69, 0.9)
  );
  .contactbutton {
    width: 12%;
    background-color: #d3cce3;
    border-color: #1d2b64;
    color: #1d2b64;
    height: 40px;
    font-weight: 500;
    top: 35%;
    left: -39%;
  }

  .bg-image {
    animation: ${flip} 5s ease-out 0s infinite alternate;
  }
  .transparent-textarea {
    color: #d3cce3;
    font-size: 14px;
    background-color: transparent !important;
    border-color: #d3cce3;
    resize: none;
    height: 120px;
  }
`;

export const ContactHead = styled.div`
  position: relative;
  font-size: 36px;
  color: #ffaf7b;
  top: -100px;
  left: -385px;
  margin-bottom: 20%;
`;
