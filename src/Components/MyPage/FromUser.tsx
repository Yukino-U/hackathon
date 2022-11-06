import React, { useState, useEffect, useContext} from "react";
import "../../Form";
import {UserContext} from "../Shared/Context";

type Contribution= {
    id : string
    from_name : string;
    from_photo : string;
    to_name : string;
    to_photo : string;
    point : number;
    message : string;
  
  }
  

export const FromCont = () => {
    const [cont, setCont] = useState([])
    const url = "http://localhost:8080/fromcont?id="+useContext(UserContext).id;
    const getconst = async () => {
              const response = await fetch(url,
                //"https://hackathon-ncnl2mzkfa-uc.a.run.app/home",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              const nowCont = await response.json();
              setCont(nowCont)
            }
              useEffect(() => {
                getconst()
              },[]
                    )
  

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
      <label>From this user </label>
      <ul>
          {
            cont.map((d: Contribution) => 
              <li key={d.id}>
                <div >from:{<img src={d.from_photo}></img>}{d.from_name}</div>
                <div>to:{<img src={d.to_photo}></img>}{d.to_name}</div>
                <div>{d.point}point</div>
                <div className="message">message:{d.message}</div>
                </li>
            )
                }
      </ul>
    </form>
    );
  };