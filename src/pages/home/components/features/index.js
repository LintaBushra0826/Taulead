import React from "react";
// import img3 from "../../../../assets/images/img3.jpg";
import {
  A,
  Box,
  Crop,
  FeaturesHead,
  ImageWrapper,
  Li,
  Mask,
  Root,
  Ul,
  Void,
  Wrapper2,
} from "./index.styled";
import invenImg from "../../../../assets/images/inventory.jpg";
import { Card, Carousel } from "antd";
import Meta from "antd/es/card/Meta";
import { CardWrapper } from "./index.styled";
import { MdInventory } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { TbRulerMeasure } from "react-icons/tb";
import { VscServerProcess } from "react-icons/vsc";
import { ImStatsBars } from "react-icons/im";
import { MdTableRows } from "react-icons/md";

export default function Features() {
  return (
    <Wrapper2>
      <>
        <Void class="void" id="void">
          <Crop class="crop">
            <Ul id="card-list" style={{ "--count": 6, "--rotate-speed": 40 }}>
              <Li>
                <Card class="card">
                  <A href="">
                    <MdInventory
                      class="model-name"
                      style={{ width: "20%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Material Inventory Management</span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <GoPersonFill
                      class="model-name"
                      style={{ width: "20%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Human Resource Management </span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <TbRulerMeasure
                      class="model-name"
                      style={{ width: "20%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Measuring Unit Management {"   "}</span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <VscServerProcess
                      class="model-name"
                      style={{ width: "20%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Process Management</span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <ImStatsBars
                      class="model-name"
                      style={{ width: "20%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Statistics</span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <MdTableRows
                      class="model-name"
                      style={{ width: "20%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Logs</span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <MdTableRows
                      class="model-name"
                      style={{ width: "25%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Process-Resource Cost Analysis</span>
                  </A>
                </Card>
              </Li>
              <Li>
                <Card class="card">
                  <A href="">
                    <MdTableRows
                      class="model-name"
                      style={{ width: "25%", color: "#ffaf7b", height: "20%" }}
                    />
                    <br />
                    <span>Process Optimization</span>
                  </A>
                </Card>
              </Li>
              <Li>
                {/* <Card class="card">
                  <A href="">
                    <MdTableRows
                      class="model-name"
                      style={{ width: "10%", color: "#ffaf7b", height: "10%" }}
                    />
                    <br />
                    <span></span>
                  </A>
                </Card> */}
              </Li>
            </Ul>
            <div class="last-circle"></div>
            <div class="second-circle"></div>
          </Crop>
          <Mask class="mask"></Mask>
          <div class="center-circle">
            {" "}
            <FeaturesHead>Features To Be</FeaturesHead>
          </div>
        </Void>
      </>
    </Wrapper2>
  );
}
