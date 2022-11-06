import React, { useState, useEffect } from "react";
import "./Form.css"
// type User ={
//   name : string;
//   age : number;
//   id : number;
// }

type Member={
  name : string;
  id : number;
  photo : string;
}

type Contribution= {
  id : string
  from_name : string;
  from_photo : string;
  to_name : string;
  to_photo : string;
  point : number;
  message : string;

}

const Form = () => {
  const [data, setData] = useState([])
  const [cont, setCont] = useState([])
  const get = async () => {
    const response = await fetch("http://localhost:8080/user?name=taro",
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


  const [name, setName]  = useState<string>("");
  // const [age, setAge]  = useState<number>(0);
  const [photo, setPhoto] = useState<string>("")
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    await fetch("http://localhost:8080/user?name=i"
      //"https://hackathon-ncnl2mzkfa-uc.a.run.app/user?name=taro"
      ,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": name,
          //"age": age,
        })       
      }
    );
    get()
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <label>Name: </label>
      <input
        type={"text"}
        //value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Age: </label>
      <input
        type={"number"}
        //value={age}
        //onChange={(e) => setAge(e.target.valueAsNumber)}
      ></input>
       <button>Post</button>
      <ul>
                {
                    data.map((d: Member) => 
                    <li key={d.id}>{d.name}{<img src={d.photo}></img>}</li>
                    )
                }
            </ul>
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

export default Form;