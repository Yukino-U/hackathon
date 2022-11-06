import  { useState, useEffect, useContext } from "react";
import {UserContext} from "./Context";
//import internal from "stream";
//import "../Form";
import {ToCont} from "../MyPage/ToUser"
import {FromCont} from "../MyPage/FromUser"
type Member={
    name : string;
    id : number;
    photo : string;
    point : number;
  }


export const CurrentUser = () => {
    const url = "http://localhost:8080/user?id="+useContext(UserContext).id;
     //"https://hackathon-ncnl2mzkfa-uc.a.run.app/user?id="+useContext(UserContext).id;
    console.log(url)
    const [data, setData] = useState([]);
    const get = async () => {
        const response = await fetch(url,
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
        <div>
        <form style={{ display: "flex", flexDirection: "column" }}>
      
      <ul>
                {
                    data.map((d:Member ) => 
                    <li key={d.id}>{<img src={d.photo}></img>}{d.name}{d.point}</li>
                    )
                }
            </ul>
      
    </form>
    <ToCont></ToCont>
    <FromCont></FromCont>
    </div>

    );
  };