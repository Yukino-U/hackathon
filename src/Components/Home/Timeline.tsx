import React, { useState, useEffect } from "react";
import "../../Form";

type Contribution= {
    id : string
    from_name : string;
    from_photo : string;
    to_name : string;
    to_photo : string;
    point : number;
    message : string;
    post_time: string;
    update_time : string;
  
  }
  

export const Timeline = () => {
    const [cont, setCont] = useState([])
    const getconst = async () => {
              const response = await fetch("http://localhost:8080/home",
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
      <label>Timeline</label>
      <ul>
          {
            cont.map((d: Contribution) => 
              <li key={d.id}>
                {/* <div>{d.post_time.getFullYear()}{d.post_time.getMonth()}{d.post_time.getDate()}{d.post_time.getHours()}{d.post_time.getMinutes()}</div> */}
                <div>{d.post_time}</div>
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