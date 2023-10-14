import React, { useState } from "react";
import img3 from "../../../../assets/images/img3.jpg";
import { Box, Wrapper, Div } from "./index.styled";
import { MdInventory } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { VscServerProcess } from "react-icons/vsc";
import { TbRulerMeasure } from "react-icons/tb";
import { IoStatsChartOutline } from "react-icons/io5";

export default function Features() {
  const [slideUp, setSlideUp] = useState(false);
  return (
    <Wrapper>
      <Box
        className={`col-lg-6 my-5 col-12 col-md-6 col-sm-10 ${
          slideUp ? "slide-up" : ""
        }`}
      >
        <h1 className="h1">Features to Get Started</h1>
        <div className="Container">
          <div className="card-container">
            <div className="card-row">
              <div className="card">
                <div className="card-body mt-2">
                  <MdInventory
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "40%",
                      position: "relative",
                      left: "60px",
                      top: "20%",
                      bottom: "0px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "18px",
                      textAlign: "center",
                      paddingRight: "17px",
                    }}
                  >
                    Raw Material Inventory Management
                  </h5>
                  {/* <p className="card-text" style={{ position:"absolute", top:"70%", fontSize:"14px", textAlign:"center", paddingRight:"17px"}}>
                  Efficiently track and manage your raw material inventory
                  </p> */}
                </div>
              </div>
              <div className="card">
                <div className="card-body mt-2">
                  <ImProfile
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "40%",
                      position: "relative",
                      left: "60px",
                      top: "20%",
                      bottom: "0px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "18px",
                      textAlign: "center",
                      paddingRight: "17px",
                    }}
                  >
                    Human Resource Management
                  </h5>
                  {/* <p className="card-text" style={{ position:"absolute", top:"70%", fontSize:"14px", textAlign:"center", paddingRight:"17px"}}>
                  Efficiently track and manage your raw material inventory
                  </p> */}
                </div>
              </div>
              <div className="card">
                <div className="card-body mt-2">
                  <TbRulerMeasure
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "40%",
                      position: "relative",
                      left: "60px",
                      top: "20%",
                      bottom: "0px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "18px",
                      textAlign: "center",
                      paddingRight: "17px",
                    }}
                  >
                    Customize Measuring Units
                  </h5>
                  {/* <p className="card-text" style={{ position:"absolute", top:"70%", fontSize:"14px", textAlign:"center", paddingRight:"17px"}}>
                  Efficiently track and manage your raw material inventory
                  </p> */}
                </div>
              </div>
            </div>
            <div className="card-row">
              <div className="card">
                <div className="card-body mt-2">
                  <VscServerProcess
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "40%",
                      position: "relative",
                      left: "60px",
                      top: "20%",
                      bottom: "0px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "18px",
                      textAlign: "center",
                      paddingRight: "50px",
                      paddingLeft: "30px",
                    }}
                  >
                    Process Management
                  </h5>
                  {/* <p className="card-text" style={{ position:"absolute", top:"70%", fontSize:"14px", textAlign:"center", paddingRight:"17px"}}>
                  Efficiently track and manage your raw material inventory
                  </p> */}
                </div>
              </div>
              <div className="card">
                <div className="card-body mt-2">
                  <IoStatsChartOutline
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "40%",
                      position: "relative",
                      left: "60px",
                      top: "20%",
                      bottom: "0px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "18px",
                      textAlign: "center",
                      paddingRight: "17px",
                      paddingLeft: "20px",
                    }}
                  >
                    Pipeline Statistics
                  </h5>
                  {/* <p className="card-text" style={{ position:"absolute", top:"70%", fontSize:"14px", textAlign:"center", paddingRight:"17px"}}>
                  Efficiently track and manage your raw material inventory
                  </p> */}
                </div>
              </div>
              <div className="card">
                <div className="card-body mt-2">
                  <IoStatsChartOutline
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "45%",
                      position: "relative",
                      left: "60px",
                      top: "20%",
                      bottom: "0px",
                      float: "left",
                      color: "#F3904F",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      position: "relative",
                      fontSize: "18px",
                      textAlign: "center",
                      marginTop: "-50px",
                    }}
                  >
                    Understand Your Customers
                  </h5>
                  {/* <p className="card-text" style={{ position:"absolute", top:"70%", fontSize:"14px", textAlign:"center", paddingRight:"17px"}}>
                  Efficiently track and manage your raw material inventory
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Wrapper>
  );
}
