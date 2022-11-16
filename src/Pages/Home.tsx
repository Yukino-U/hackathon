import React, { useState, useEffect } from "react";
import "../Form";
import {Timeline} from "../Components/Home/Timeline";
import Frame from "../Components/Shared/Frame";
import {Contribution} from "../Components/Home/Contribution";
// import "./Pages.css";

export const Home = () => {
  return(
    <div>{Frame(Contribution())}</div>)

    
  };