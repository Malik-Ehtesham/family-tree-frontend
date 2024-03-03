/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DetailsAddChildCard from "../DetailsAddChildCard/DetailsAddChildCard";

const DetailsAddChildModal = (props) => {
  const [numberOfChildren, setNumberOfChildren] = useState(
    localStorage.getItem("numberOfChildren") || 0
  );
  const [remainingChildren, setRemainingChildren] = useState(numberOfChildren);

  useEffect(() => {
    setRemainingChildren(numberOfChildren);
  }, [numberOfChildren]);
  const submitHandler = () => {
    console.log("submit");
    props.setCurrentDetails("Parents Details");
    props.setChildButtonIsActive("false");
    props.setParentsButtonIsActive("true");
  };
  // useEffect(() => {
  //   setNumberOfChildren(localStorage.getItem("numberOfChildren"));
  // }, [numberOfChildren]);

  // useEffect(() => {
  //   setRemainingChildren(numberOfChildren);
  // }, [numberOfChildren]);

  // Generate an array of length equal to randomNumber
  const childs = Array.from({ length: numberOfChildren }, (v, i) => i);

  return (
    <div>
      {Array.from({ length: remainingChildren }, (_, index) => (
        <DetailsAddChildCard
          key={index}
          setRemainingChildren={setRemainingChildren}
          remainingChildren={remainingChildren}
          setChildButtonIsActive={props.setChildButtonIsActive}
          setParentsButtonIsActive={props.setParentsButtonIsActive}
          setCurrentDetails={props.setCurrentDetails}
        />
      ))}
      <div className="flex justify-around">
        <button
          className="btn btn-error text-white  m-2"
          type="button"
          onClick={() => {
            props.setChildButtonIsActive(false);
            props.setParentsButtonIsActive(true);
            props.setCurrentDetails("Parents Details");
          }}
        >
          Skip
        </button>
        <form
          className="btn btn-success text-white  m-2"
          type="button"
          onClick={submitHandler}
        >
          Submit
        </form>
      </div>
    </div>
  );
};

export default DetailsAddChildModal;
