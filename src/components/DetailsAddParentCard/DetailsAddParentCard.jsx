/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

const DetailsAddParentCard = (props) => {
  //   ------------USE STATES---------------
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [img, setImg] = useState(props.image);
  const [previewImg, setPreviewImg] = useState(props.image);

  //   ------------VAIRABLE DECLARATIONS---------------
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const data = new FormData();
  data.append("name", name);
  data.append("gender", gender);
  data.append("img", img);
  data.append("dob", dob);
  data.append("dod", dod);

  //   ---------HANDLERS----------

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return <></>;
};

export default DetailsAddParentCard;
