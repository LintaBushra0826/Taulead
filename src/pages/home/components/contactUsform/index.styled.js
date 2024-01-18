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
  background: linear-gradient(
    100deg,
    rgba(6, 17, 97, 0.89) -100%,
    rgba(42, 8, 69, 0.9)
  );

  .contactbutton {
    position: relative;
    width: 12%;
    border-color: #1d2b64;
    color: #1d2b64;
    height: 40px;
    font-weight: 500;
    top: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    float: left;
    color: #fff;
    border: 1px solid;
  }

  .bg-image {
    animation: ${flip} 5s ease-out 0s infinite alternate;
  }
`;

export const ContactHead = styled.div`
  position: relative;
  font-size: 36px;
  color: #ffaf7b;
  padding-bottom: 2%;
  text-align: left;
  font-style: italic;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
`;

export const FormWrapper = styled.div`
  position: relative;
  width: fit-content;
`;
