import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FooterWrapper } from "./index.styled";
import logo from "../../assets/images/Logo white.png";
import { Logo } from "../header/index.styled";
import { CiLocationOn} from "react-icons/ci";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function App() {
  return (
    <FooterWrapper>
      <MDBFooter
        bgColor="#210062"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div
            className="me-5 d-none d-lg-block"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <span>Get connected with us</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="google" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <Logo src={logo} alt="image" />

              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Product</h6>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    JavaScript
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Services
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" style={{display: 'flex', width: '100%'}}/>
                  <CiLocationOn/> NASTP, Alpha Techno Square, Old Airport, Chaklala, Rawalpindi
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" style={{display: 'flex', width: '100%'}}/>
                  <AiOutlineInfoCircle/> info@taulead.com
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className="text-center p-4">
          © 2021 Copyright: {"   "}
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/" >
             Taulead.com
          </a>
        </div>
      </MDBFooter>
    </FooterWrapper>
  );
}
