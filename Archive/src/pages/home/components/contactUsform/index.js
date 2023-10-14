import React, { useState } from "react";
import img3 from "../../../../assets/images/img3.jpg";
import { Box, Wrapper, Div } from "./index.styled";
import nastp from "../../../../assets/images/nastp-removebg-preview.png";
import siber from "../../../../assets/images/siber-removebg-preview.png";

export default function Features() {
  const [slideUp, setSlideUp] = useState(false);
  return (
    <Wrapper>
      <Box
        className={`col-lg-6 my-5 col-12 col-md-6 col-sm-10 ${
          slideUp ? "slide-up" : ""
        }`}
      >
      
        <div className="Container">
          <div className="card-container">
           
          </div>
        </div>
      </Box>
    </Wrapper>
  );
}
