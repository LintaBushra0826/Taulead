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

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 130%;
  transform: translateY(-50%);
  border-radius: 35px;
  color: #2a0845;
  .h1 {
    text-align: center;
    font-size: 32px;
  }

  .card-container {
    display: flex;
    position: relative;
    flex-direction: column;
    margin-top: 20px;
    margin-left:170px;
    max-width: 800px;
  }
  .card-row {
    display: flex;
    gap:40px;
    .card {
      flex: 0 0 calc(30% - 0px); /* Adjust the width as needed with some spacing */
      height: 10rem;
      border-radius: 20px;
      background: linear-gradient(100deg, #d3cce3, #e9e4f0);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      margin-top: 20px;
      margin-right: 5px;
      border-color: 2px solid transparent;

      /* animation: ${slideUp} s ease-out 2s 1; */
    }
  }
  .card:hover {
  border-color: #2a0845; /* Change the border color on hover */
}
`;
