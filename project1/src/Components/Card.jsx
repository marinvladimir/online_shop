import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import sample from "../Assets/sample.jpg";
import { ProductContext } from "../Pages/Context/ProductContext";
import { ReactComponent as CartIcon } from "../Assets/cart.svg";

const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "#d1a67a",
  },
})(Tooltip);

const CartStyled = styled(CartIcon)`
  width: 20px;
  height: 20px;
`;

const CardWrapper = styled.div`
  border: #f1d9d9 2px solid;
  width: 128px;
  height: 180px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem;
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-weight: 700;
  text-transform: uppercase;
  padding-bottom: 1rem;
  border-bottom: 1px solid gray;
`;

const CardContent = styled.button`
  height: 100%;
  margin-top: 1rem;
  background-color: #f8efed47;
  padding: 0px 8px 8px 8px;
  font-size: 10px;
  color: gray;
  border: unset;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  :hover {
    cursor: pointer;
    color: white;
    background-color: #d1a67a;
    animation: bgChange 3s ease, textChange 1s ease;
    z-index: 400;
    box-shadow: 0 0 1px #ffee10;
    text-shadow: 0 0 1px #ffee10;
    @keyframes bgChange {
      from {
        background-color: #f8efed47;
      }
      to {
        background-color: #d1a67a;
      }
    }

    @keyframes textChange {
      0% {
        color: gray;
      }
      50% {
        color: #c5c5c5;
      }
      100% {
        color: white;
      }
    }
  }
`;

const CardPrice = styled.div`
  padding: 8px;
  display: flex;
  background: ${(props) =>
    props.position
      ? "linear-gradient(to right, #ffffff00, #e37e7e59)"
      : "linear-gradient(to right, #ffffff00, #7eb9e359)"};
  justify-content: ${(props) =>
    props.position ? "space-between" : "flex-end"};
  margin-top: 8px;
`;

const CardDiscount = styled.button`
  position: absolute;
  border: unset;
  width: 56px;
  height: 20px;
  background: lightyellow;
  transform: rotateZ(310deg);
  bottom: 8px;
  right: -12px;
  color: #e15555;
  text-align: center;

  :hover {
    color: #ff1313;
    border: 1px solid #ff1313;
    background: #ffffc0;
    cursor: default;
  }
`;

const AddToCart = styled.button`
  position: absolute;
  border: unset;
  background: lightyellow;
  bottom: 0rem;
  left: 0rem;

  :hover {
    color: #ff1313;
    background: #ffffc0;
    cursor: pointer;
  }
`;

const CardImage = styled.img`
  max-width: 5rem;
`;

const CardName = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 14px;
  text-align: center;
  white-space: nowrap;
  max-width: 108px;
`;

const OldPrice = styled.div`
  text-decoration: ${(props) => (props.position ? "line-through" : "")};
`;

const NewPrice = styled.div`
  color: #e15555;
`;

const Card = ({ item, filter, sort, selectedItem, setSelectedItem }) => {
  console.log(selectedItem);
  const [array, setArray] = useState(item);
  const navigate = useNavigate();
  const { setProduct } = useContext(ProductContext);

  const getNewPrice = (price, discount) => {
    return (price - price * discount).toString().match(/\d*.\d{2}/g);
  };

  const getDiscountDuration = (start, end) => {
    return "Lasts from " + start + " to " + end;
  };

  useEffect(() => {
    if (filter) {
      setArray(filter);
    } else if (sort) setArray(sort);
    else setArray(item);

    // if (sort) setArray(sort);
  }, [filter, sort, item]);

  // list of all items of all departments
  return array.map((item, key) => (
    <CardWrapper key={key}>
      <CardTitle>{item.department}</CardTitle>
      <CardContent
        onClick={() => {
          setProduct(item);
          navigate("/product/" + key + "");
        }}
      >
        <CardName>{item.name}</CardName>
        <CardImage src={sample} />
      </CardContent>
      <CardPrice position={item.discount.value}>
        <OldPrice position={item.discount.value}>{item.price + "$"}</OldPrice>
        {item.discount.value && (
          <NewPrice>
            {getNewPrice(item.price, item.discount.value) + "$"}
          </NewPrice>
        )}
      </CardPrice>
      <AddToCart
        onClick={() =>
          setSelectedItem(
            selectedItem + Number(getNewPrice(item.price, item.discount.value))
          )
        }
      >
        <CartStyled />
      </AddToCart>
      {item.discount.value && (
        <BlueOnGreenTooltip
          title={getDiscountDuration(
            item.discount.startDate,
            item.discount.endDate
          )}
        >
          <CardDiscount data-title="My site">
            {item.discount.value * 100 + "%"}
          </CardDiscount>
        </BlueOnGreenTooltip>
      )}
    </CardWrapper>
  ));
};

export default Card;
