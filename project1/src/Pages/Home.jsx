import React from "react";
import styled from "styled-components";
import Navigation from "../Components/Navigation";
import LightSwitch from "../Components/LightSwitch";
import ShoppingView from "../Components/ShoppingView";

const HomeWrapper = styled.div`
  min-height: -webkit-fill-available;
  display: flex;
  // height: 100%;
  flex-direction: column;
  //border: 1.5rem #772c07 ridge;
`;

const Main = styled.main`
  display: flex;
  justify-content: flex-start;
  background: #f8efedd4;
  height: 100%;
  width: 100%;
  //border: 1.5rem #772c07 ridge;
`;

const Footer = styled.div`
  background: #500907;
  border-top: 8px solid #772c07;
  padding: 16px 24px;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Navigation />
      <Main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <LightSwitch /> */}
        </div>
        <ShoppingView />
      </Main>
      <Footer></Footer>
    </HomeWrapper>
  );
};

export default Home;
