import React from "react";
import img3 from "../../../../assets/images/img3.jpg";
import {
    Box,
    Wrapper, Div
} from "./index.styled"
// import Working from "../Working";
export default function Features() {
    return (
        <>
            {/* <Working /> */}
            <Wrapper className="container ">
                <Box className=" col-lg-6 my-5 col-12 col-md-6 col-sm-10">
                    <div className="text-center my-4">
                        <h1 className="">Features</h1>
                    </div>
                </Box >
                <Div className="container text-center justify-conntent-center align-self-center" id="sec-2">
                    <div className="row gy-5 align-items-center justify-content-center">
                        <div className="col col-md-6 col-lg-3 wrap mb-5 mb-lg-0 col-12">
                            <div className="card" style={{ height: '22rem', width: '18rem', borderRadius: '20px', border: 'none', boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)' }}>
                                <div className="card-body mt-2">
                                    <img src={img3} alt="Card image cap" style={{ width: '50px', float: 'left' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Understand Your <br />Customers</h5>
                                    <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. In iure ad doloremque at error animi eligendi soluta obcaecati atque dolorem.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-6 col-lg-3 wrap mb-5 mb-lg-0 col-12">
                            <div className="card" style={{ height: '22rem', width: '18rem', borderRadius: '20px', border: 'none', boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)' }}>

                                <div className="card-body mt-2" >
                                    <img src={img3} alt="Card image cap" style={{ width: '50px', float: 'left' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Increase Brand <br />Awareness</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor delectus fugit eveniet id earum necessitatibus quisquam omnis natus quam repudiandae!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-6 col-lg-3 wrap mb-5 mb-lg-0 col-12">
                            <div className="card" style={{ height: '22rem', width: '18rem', borderRadius: '20px', border: 'none', boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)' }}>

                                <div className="card-body mt-2">
                                    <img src={img3} alt="Card image cap" style={{ width: '50px', float: 'left' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Encourage <br />Conversations</h5>
                                    <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis expedita iste ex maiores minima corporis aut asperiores libero ipsam suscipit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Div>
            </Wrapper >

        </>
    );
}
