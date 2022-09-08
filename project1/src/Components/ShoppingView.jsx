import React, { useState, useEffect } from "react";
import ImageSlideshow from "../Components/ImageSlideshow";
import Item from "../Data/shopItems";
import Card from "../Components/Card";
import RadioBtn from "./RadioBtn";
import sample from "../Assets/sample.jpg";
import sample2 from "../Assets/sample2.jpg";
import sample3 from "../Assets/sample3.jpg";
import styled from "styled-components";
import textureWood from "../Assets/woodTexture.jpg";
import Modal from "react-modal";
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from "creditcard.js";
import { useForm } from "react-hook-form";
import "card-js/card-js.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ShoppingViewTable = styled.div`
  //width: 100%;
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  //min-width: 720px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ShoppingViewRow = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 720px;
  flex-wrap: wrap;
`;

const MenuWrapper = styled.div`
  min-width: 160px;
  position: absolute;
  right: 0;
  max-height: 410px;
  overflow: scroll;
  //background: white;
  margin-right: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 16px;
  border: #f1d9d9 2px solid;
  padding: 16px;
  background-image: url(${textureWood});
`;

const ShoppingView = () => {
  // initialize arrays for passing as props
  const sortArray = ["By Price", "By Discount", "By Rating"];
  const filterArray = ["electronics", "pets", "furniture", "clothes"];
  const notify = () => toast("Thank you for your purchase!");

  // setting the sort and filter modifications
  const [filterChoice, setFilterChoice] = useState(null);
  const [sortChoice, setSortChoice] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const DepartmentSelection = {
    electronics: [],
    clothes: [],
    furniture: [],
    pets: [],
  };

  // this function will filter only the items of selected department
  const MapDepartments = (toMap) => {
    for (let i = 0; i < toMap.length; i++) {
      switch (toMap[i].department) {
        case filterArray[0]:
          DepartmentSelection.electronics.push(toMap[i]);
          break;
        case filterArray[1]:
          DepartmentSelection.clothes.push(toMap[i]);
          break;
        case filterArray[2]:
          DepartmentSelection.furniture.push(toMap[i]);
          break;
        case filterArray[3]:
          DepartmentSelection.pets.push(toMap[i]);
          break;
        default:
          break;
      }
    }
  };
  MapDepartments(Item);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSelectedItem(0);
    closeModal();
    notify();
  };

  isValid("4916108926268679"); // returns true
  isExpirationDateValid("02", "2027"); // returns true
  isSecurityCodeValid("4556603578296676", "250"); // returns true
  getCreditCardNameByNumber("4539578763621486"); // returns 'Visa'

  const returnFilterArray = () => {
    switch (filterChoice) {
      case filterArray[0]:
        return DepartmentSelection.electronics;
      case filterArray[1]:
        return DepartmentSelection.clothes;
      case filterArray[2]:
        return DepartmentSelection.furniture;
      case filterArray[3]:
        return DepartmentSelection.pets;
      default:
        break;
    }
  };

  const returnSortArray = () => {
    let initialArray = Item;

    switch (sortChoice) {
      case sortArray[0]: {
        initialArray.sort((a, b) => (a.price > b.price ? 1 : -1));
        return initialArray;
      }
      case sortArray[1]: {
        initialArray.sort((a, b) =>
          a.discount.value > b.discount.value ? 1 : -1
        );
        return initialArray;
      }
      case sortArray[2]: {
        initialArray.sort((a, b) => (a.rating > b.rating ? 1 : -1));
        return initialArray;
      }
      default: {
        initialArray = Item;
        return initialArray;
      }
    }
  };

  useEffect(() => {}, [sortChoice]);

  useEffect(() => {}, [filterChoice]);

  return (
    <>
      <ShoppingViewTable>
        <ShoppingViewRow>
          <Card
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            item={Item}
            filter={returnFilterArray()}
            sort={returnSortArray()}
          ></Card>
        </ShoppingViewRow>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div>Current billing price: {selectedItem}</div>
          <button disabled={selectedItem === 0} onClick={openModal}>
            Go To CheckOut
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button onClick={closeModal}>close</button>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
                class="card-js"
              >
                {/* errors will return when field validation fails  */}
                {errors.creditCardNumber && (
                  <span>Wrong credit card format</span>
                )}
                <label id="ccn">Credit Card Owner:</label>
                <input
                  {...register("ownerName", {
                    required: true,
                    maxLength: 40,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                {errors.ownerName && <span>Owner name cannot be empty</span>}
                <label id="ccn">Credit Card Number:</label>
                <input
                  id="ccn"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="cc-number"
                  maxlength="19"
                  placeholder="xxxx xxxx xxxx xxxx"
                  {...register("creditCardNumber", {
                    required: true,
                    pattern: /[0-9\s]{13,19}/i,
                  })}
                />
                <label id="ccn">Credit Card Expire Date:</label>
                <input
                  type="expireDate"
                  placeholder="xx/xx"
                  {...register("expireDate", {
                    required: true,
                    maxLength: 40,
                    pattern: /\d{2}\/\d{2}/i,
                  })}
                />
                {errors.expireDate && <span>Wrong expire date</span>}
                <label id="ccn">Credit Card CVV:</label>
                <input
                  type="threeDigNum"
                  placeholder="xxx"
                  maxlength="3"
                  {...register("threeDigNum", {
                    pattern: /\d{3}$/i,
                    maxLength: 3,
                    required: true,
                  })}
                />
                {errors.threeDigNum && <span>Three digits are required</span>}
                <input type="submit" />
              </div>
            </form>
          </Modal>
        </div>
      </ShoppingViewTable>
      <MenuWrapper>
        <RadioBtn
          title="Sort"
          names={sortArray}
          setMenuChoice={setSortChoice}
        />
        <RadioBtn
          title="Filter"
          names={filterArray}
          setMenuChoice={setFilterChoice}
          reset={true}
        />
        <ImageSlideshow imgArray={[sample, sample2, sample3]} />

        <ToastContainer />
      </MenuWrapper>
    </>
  );
};

export default ShoppingView;
