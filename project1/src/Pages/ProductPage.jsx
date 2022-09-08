import React, { useContext } from "react";
import Navigation from "../Components/Navigation";
import styled from "styled-components";
import ImageSlideshow from "../Components/ImageSlideshow";
import { ProductContext } from "./Context/ProductContext";
import textureWood from "../Assets/woodTexture.jpg";
import sample from "../Assets/sample.jpg";
import sample2 from "../Assets/sample2.jpg";
import sample3 from "../Assets/sample3.jpg";
import Button from "../Components/Button";

const HomeWrapper = styled.div`
  min-height: -webkit-fill-available;
  display: flex;
  height: 100%;
  flex-direction: column;
  //border: 1.5rem #772c07 ridge;
`;

const ContentWrapper = styled.main`
  display: flex;
  justify-content: center;
  background: #f8efedd4;
  height: 100%;
  width: 100%;

  .main-element {
    position: absolute;
    top: 1%;
    left: 1%;
    display: block;
    height: 98%;
    width: 98%;
    background: white;
    background: linear-gradient(to right, #fff 0%, #ebdede 100%);
    margin: auto;
    align-self: center;
    z-index: 1;
  }

  .border {
    position: absolute;
    display: block;
    top: -50%;
    left: -50%;
    z-index: -9;
    display: block;
    height: 200%;
    width: 200%;
    transform: rotate(-45deg);
    overflow: hidden;
    background: linear-gradient(
      to right,
      #fff 20%,
      #d1aa98 40%,
      #6b330d 50%,
      #f4ffcf 55%,
      #fff 70%,
      #fff 100%
    );
    background-size: 200% auto;

    animation: shine 3s linear infinite;
  }

  /*Begin shimmer code*/

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const Details = styled.div`
  width: 700px;
  margin: 2rem;
  padding-top: 100px;
  position: relative;
  overflow: hidden;

  .message {
    position: absolute;
    right: 20px;
    bottom: 10px;
    color: black;
    font-family: "Josefin Slab", serif;
    line-height: 27px;
    font-size: 18px;
    text-align: right;
    pointer-events: none;
    animation: message-frames 1s ease 1s infinite;
    opacity: 0;

    @keyframes message-frames {
      0% {
        opacity: 0;
      }
      25% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      75% {
        opacity: 0.5;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

const ParaWrapper = styled.div`
  background-image: url(${textureWood});
  width: 200px;
  opacity: 75%;
  color: white;
  text-align: center;
  height: 3rem;
  border: #c18944 2px solid;
  margin: auto;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
`;

const FlexLayout = styled.div`
  display: flex;
  height: -webkit-fill-available;
`;

const LeftSide = styled.div`
  background: white;
  margin: 0.5rem;
  border: #f1d9d9 2px solid;
  width: 50%;
  height: fit-content;
`;

const LeftPara = styled.div`
  padding: 0.1rem;
  background: white;
  border: #f1d9d9 2px solid;
  margin: 0.5rem;
`;

const RightSide = styled.div`
  padding: 0.5rem;
  background: white;
  margin: 0.5rem;
  border: #f1d9d9 2px solid;
  width: 50%;
  height: fit-content;
`;

const Center = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  padding: 1rem;
`;

const ProductPage = () => {
  const { product } = useContext(ProductContext);
  if (product)
    return (
      <HomeWrapper>
        <Navigation />
        <ContentWrapper>
          <Details>
            <div className="border"></div>
            <div className="main-element">
              <ParaWrapper>{product?.name}</ParaWrapper>
              <FlexLayout style={{ flexDirection: "row" }}>
                <LeftSide>
                  <LeftPara>
                    Category: {product?.category} , Department:{" "}
                    {product?.department}
                  </LeftPara>
                  <LeftPara> Description: {product?.description}</LeftPara>
                  <LeftPara>
                    Price: {product?.price}, Discount:{" "}
                    {product?.discount?.value}
                  </LeftPara>
                  <LeftPara>
                    Starting : {product?.discount?.startDate} , ending:{" "}
                    {product?.discount?.endDate}
                  </LeftPara>
                  <LeftPara>
                    Shipping Price: {product?.shippingPrice}, In Stock:
                    {product?.inStock}
                  </LeftPara>
                </LeftSide>
                <RightSide>
                  <ImageSlideshow imgArray={[sample, sample2, sample3]} />
                  <LeftPara>This is an Ad</LeftPara>
                </RightSide>
                <FlexLayout>
                  <div className="message">Add to wishlist</div>
                </FlexLayout>
              </FlexLayout>
            </div>
          </Details>
        </ContentWrapper>
      </HomeWrapper>
    );
  else
    return (
      <HomeWrapper>
        <Navigation />
        <ContentWrapper>
          <Details>
            <Center>
              <>
                Since there is no backend, there is no content upon refreshing
                the page.
              </>
              <br></br>
              <> Go back?</>
            </Center>
            <Button title="Go Back" link="/"></Button>
          </Details>
        </ContentWrapper>
      </HomeWrapper>
    );
};

export default ProductPage;
