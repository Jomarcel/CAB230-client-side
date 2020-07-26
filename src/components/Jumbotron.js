import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import backgroundImg from "../stocks-img.jpg";

const Styles = styled.div`
  .jumbo {
    background-image: url('https://cdn.pixabay.com/photo/2016/12/13/22/15/chart-1905224_1280.jpg');
    background-size: auto;
    color: #efefef;
    height: 300px;
    position: relative;
    z-index: -2;
    opacity: 0.9;
    border-bottom:5px solid #ffffff;
    border-top:5px solid #ffffff;
  }
  .overlay {
    color:  #ffffff
    background-color: #000;
    opacity: 0.8;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  
`;

const Jumbotron = () => {
  return (
    <div>
      <Styles>
        <Jumbo
          fluid
          className="jumbo"
          style={{ backgroundImage: { backgroundImg } }}
        >
          <div className="overlay">
            <Container>
              {/* <h1>Get the latest stock market information and data analysis reports</h1>
        <p>Find stock interactive charts, historical information, company news and more</p> */}
              {/* <button type="button" className="btn btn-info btn-primary">Get Started</button> */}
            </Container>
          </div>
        </Jumbo>
      </Styles>
    </div>
  );
};
export default Jumbotron;
