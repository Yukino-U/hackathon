import React, { useState, useEffect } from "react";
import internal from "stream";
import "../../Form";
type Member={
    name : string;
    id : number;
    photo : string;
    point : number;
  }
  

export const MemberList = () => {
    const [data, setData] = useState([])
    const get = async () => {
        const response = await fetch("http://localhost:8080/user",
        //"https://hackathon-ncnl2mzkfa-uc.a.run.app/user?name=taro",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const nowData = await response.json();
      setData(nowData)
    }
      useEffect(() => {
        get()
      },[]
    
      )

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
      <ul>
                {
                    data.map((d: Member) => 
                    <li key={d.id}>{<img src={d.photo}></img>}{d.name}{d.point}</li>
                    )
                }
            </ul>
    </form>
    );
  };