import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import $ from "jquery";

const RadioBtnStyle = styled.div`
  max-width: fit-content;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 13px;

  label {
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(214, 177, 177, 0.349);
    color: #adadad;
    border-radius: 25px;
    white-space: nowrap;
    width: -webkit-fill-available;
    margin: 3px 0px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: all 0.2s;

    ::before {
      display: inline-block;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      font-size: 12px;
      padding: 2px 6px 2px 2px;
      content: "\f067";
      transition: transform 0.3s ease-in-out;
    }
  }

  input[type="radio"]:checked + label {
    border: #c79c99 2px solid;
    background-color: #e7d296;
    width: -webkit-fill-available;
    text-align: center;
    color: #fff;
    transition: all 0.2s;
  }

  input[type="radio"] {
    display: absolute;
  }
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
  input[type="radio"]:focus + label {
    border: #f1d9d9 2px solid;
  }
`;

const RadioWrapper = styled.div`
  align-content: center;
  display: flex;
  text-align: center;
  margin-bottom: 16px;

  overflow: hidden;
  transition: height 0.3s ease-out;

  height: ${(props) => (props.sortOpen ? props.initialHeight : "0px")};
`;

const MenuTitle = styled.button`
  margin-bottom: 16px;
  background: #d1a67a;
  color: white;
  text-align: center;
  height: 32px;
  border-bottom: 3px dotted white;
  border-top: unset;
  border-right: unset;
  border-left: unset;
  width: 100%;
  cursor: pointer;

  :hover {
    background: #c79c99;
    color: #630e0e;
  }
`;

const RadioBtn = ({ names, title, reset, setMenuChoice }) => {
  const chkHeight = useRef(null);

  const [sortOpen, setSortOpen] = useState(true);
  const [winHeight, setWinHeight] = useState(null);

  const resetHandle = () => {
    setMenuChoice(null);

    // this part uses jquery to remove the checked value from all the radioButtons in menu
    for (var i = 0; i < names.length; i++) {
      let tempName = "#" + names[i] + "-radio";
      $(tempName).prop("checked", false);
    }
  };

  useEffect(() => {
    if (!sortOpen) {
      setWinHeight("0px");
    } else {
      let height = chkHeight?.current?.clientHeight + "px";
      setWinHeight(height);
    }
    //eslint-disable-next-line
  }, [chkHeight]);

  return (
    <>
      <MenuTitle
        onClick={() => {
          setSortOpen(!sortOpen);
        }}
      >
        {title}
      </MenuTitle>
      <RadioWrapper
        sortOpen={sortOpen}
        ref={chkHeight}
        initialHeight={winHeight}
      >
        <RadioBtnStyle>
          {names.map((name, key) => (
            <span key={"radio" + key}>
              <input
                type="radio"
                key={key + "radioBtn"}
                onClick={() => setMenuChoice(name)}
                className="radioGroup"
                name="radio"
                id={name + "-radio"}
              ></input>
              <label
                key={key + "labelRadio"}
                className={"radioGroup"}
                htmlFor={name + "-radio"}
              >
                {name && name}
              </label>
            </span>
          ))}
          {reset && (
            <Button
              menu={true}
              title="Reset"
              customFunction={() => resetHandle()}
            />
          )}
        </RadioBtnStyle>
      </RadioWrapper>
    </>
  );
};

export default RadioBtn;
