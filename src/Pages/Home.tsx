import React, { useState, useEffect } from "react";
import "../Form";
import {Timeline} from "../Components/Home/Timeline";
import Frame from "../Components/Shared/Frame";

export const Home = () => {
  return(
    <div>{Frame(Timeline())}</div>)
  };