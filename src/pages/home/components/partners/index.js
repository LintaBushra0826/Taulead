import React from "react";
// import img3 from "../../../../assets/images/img3.jpg";
import { Box, Wrapper } from "./index.styled";
import nastp from "../../../../assets/images/nastp-removebg-preview.png";
import siber from "../../../../assets/images/siber-removebg-preview.png";

export default function Features() {
  // const [slideUp, setSlideUp] = useState(false);
  return (
    <Wrapper>
      <Box className={`col-lg-6 my-5 col-12 col-md-6 col-sm-10 `}>
        <h5
          className="h5"
          style={{  color: "#279EFF" }}
        >
          Our Partners
        </h5>
        <h1 className="h1">Business Communities</h1>
        <div className="Container">
          <div className="card-container">
            <div className="card-row">
              <div className="card">
                <div className="card-body mt-2">
                  <img
                    src={nastp}
                    alt= "nastp"
                    style={{
                      display: "flex",
                      width: "75%",
                      height: "80%",
                      position: "absolute",
                      left: "20px",
                      top: "10%",
                      bottom: "10px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-body mt-2">
                  <img
                    src={siber}
                    alt= "siber"
                    style={{
                      display: "flex",
                      width: "120%",
                      height: "100%",
                      position: "relative",
                      left: "-15px",
                      top: "-20%",
                      bottom: "10px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
              </div>
              {/* <div className="card">
                <div className="card-body mt-2">
                  <img
                    src={logo}
                    style={{
                      display: "flex",
                      width: "70%",
                      height: "80%",
                      position: "relative",
                      left: "20px",
                      top: "10%",
                      bottom: "10px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Box>
    </Wrapper>
  );
}
