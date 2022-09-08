import React, { useEffect } from "react";
import styled from "styled-components";

const SlideShow = styled.div`
  border: #f1d9d9 2px solid;
  width: 152px;
  height: 8rem;
  position: relative;
  margin: auto;
  margin: 0 auto;
  overflow: hidden;
  max-width: 500px;
  background: #6d9da53b;

  .slideshowSlider {
    white-space: nowrap;
    transition: ease 1000ms;
  }

  .slide {
    display: inline-block;

    height: 100px;
    width: 100%;
    //border-radius: 40px;
  }

  /* Buttons */

  .slideshowDots {
    text-align: center;
  }

  .slideshowDot {
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;

    cursor: pointer;
    margin: 0px 3px 0px;

    background-color: #f1d9d9;
  }

  .slideshowDot.active {
    background-color: #772c07;
  }
`;

const ImageSlideshow = ({ imgArray }) => {
  const delay = 2500;
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imgArray.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, imgArray.length]);

  return (
    <SlideShow className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {imgArray.map((imgArray, index) => (
          <img className="slide" key={index} alt="" src={imgArray}></img>
        ))}
      </div>

      <div className="slideshowDots">
        {imgArray.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </SlideShow>
  );
};

export default ImageSlideshow;
