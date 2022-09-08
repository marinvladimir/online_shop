import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.menu ? "1rem" : "0")};

  button {
    min-width: 3rem;
    //min-width: 10rem;
    border-radius: 25px;
    //no border radius
    color: #e961b7;
    text-align: center;
    display: inline-block;
    //padding: 15px 40px;
    padding: 15px 18px;
    border: 1px solid #f8efedd4;
    cursor: pointer;
    letter-spacing: 2px;
    position: relative;
    overflow: hidden;
    //margin: 0 20px;
    margin: 0 0.5rem;

    :before {
      content: "";
      position: absolute;
      height: 150px;
      width: 50px;
      background: #500907;
      left: -55px;
      top: -40px;
      transform: rotate(37deg);
      transition: all 0.3s;
      opacity: 0.3;
    }

    :hover:before {
      left: 95%;
    }
  }
`;

const Button = ({ link, title, icon, customFunction, menu }) => {
  const navigate = useNavigate();
  return (
    <ButtonWrapper menu={menu}>
      <button
        onClick={() => {
          link && navigate(link);
          customFunction && customFunction();
        }}
      >
        {title} {icon && icon}
      </button>
    </ButtonWrapper>
  );
};

export default Button;
