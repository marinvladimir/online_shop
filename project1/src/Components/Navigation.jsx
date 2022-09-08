import React from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import { ReactComponent as cartIcon } from "../Assets/cart.svg";
import { ReactComponent as accountIcon } from "../Assets/account.svg";
import { ReactComponent as wishlistIcon } from "../Assets/wishlist.svg";

const Title = styled.div`
  color: #c18d3e;
  font-size: 25px;
`;

const NavigateTrack = styled.div`
  //height: 120px;
  background: #500907;
  border-bottom: 0.5rem solid #772c07;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem;
`;

const StyledCartIcon = styled(cartIcon)`
  width: 1rem !important;
  height: 1rem !important;
  g {
    fill: #c18d3e;
  }
`;

const StyledAccIcon = styled(accountIcon)`
  width: 1rem !important;
  height: 1rem !important;
  path {
    fill: #c18d3e;
  }
`;

const StyledWishlistIcon = styled(wishlistIcon)`
  width: 1rem !important;
  height: 1rem !important;
  path {
    fill: #c18d3e;
  }
`;

const Navigation = () => {
  return (
    <NavigateTrack>
      <div style={{ width: "210px" }}></div>
      <Title>My own Shop App</Title>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button link="/" icon={<StyledCartIcon />} />
        <Button link="/wishlist" icon={<StyledWishlistIcon />} />
        <Button link="/account" icon={<StyledAccIcon />} />
      </div>
    </NavigateTrack>
  );
};

export default Navigation;
