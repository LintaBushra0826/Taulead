import styled from "styled-components";

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
export const Img = styled.img`
  width: 500px;
  height: 1000px;
  position: relative;
  top: 20px;
  left: 65px;
`;

export const Paragraph = styled.h4`
  display: flex;
  // margin-top: -3%;
  font-size: 14px;
  color: white;
  justify-content: center;
  font-weight: normal;
  background: linear-gradient(#7b4397, #dc2430);
  -webkit-background-clip: text; //Apply gradient to text
  background-clip: text; //Apply gradient to text
  -webkit-text-fill-color: transparent;
`;

export const Heading = styled.h4`
  font-weight: bold;
  display: flex;
  // margin-top: 75%;
  // font-size: 22px;
  // color: white;
  justify-content: center;
  background: linear-gradient(#7b4397, #dc2430);
  -webkit-background-clip: text; //Apply gradient to text
  background-clip: text; //Apply gradient to text
  -webkit-text-fill-color: transparent;
`;
