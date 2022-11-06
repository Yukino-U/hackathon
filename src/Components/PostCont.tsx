import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Shared/Context";
import { memo, FC } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import {Box} from "@mui/material";
import { UserCard } from "./UserCard";




const PostCont = () => {
    const useId = useContext(UserContext).id;
//   const get = async () => {
//     try{
//     const response = await fetch(
//       "http://localhost:8000/user",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     if (!response.ok){
//       throw Error (`Failed to fetch users : ${response.status}`);
//     }
//     const nowData = await response.json();
//     setData(nowData);
//   } catch(err){
//     console.error(err)}}
  
//     useEffect(() => {
//       get()
//     },[]
//           )


// type PostCont= {
//     //id : string
//     from_id : string;
//     //from_photo : string;
//     to_id : string;
//     // to_photo : string;
//     point : number;
//     message : string;
  
//   }
  const [toId, setToId] = useState<string>("");
  const [message, setMessage]  = useState<string>("");
  const [point, setPoint]  = useState<number>(0);
  const [post_time, setPostTime] =useState<string>("")
  const [update_time, setUpdateTime] =useState<string>("")
  

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    const time = new Date().toLocaleString();
    setPostTime(time);
    setUpdateTime(time);
    console.log(post_time)
    if (!toId){
      alert("Please select user");
      return;
    }
    if (point<=0){
        alert ("0より大きい整数値を入力してください。");
        return;
      }
    if (point%1!=0){
        alert("0より大きい整数値を入力してください。");
        return;
    }
    if (message ==""){
        alert("Please write message")
        return;
    }
    if (message.length >5000){
      alert("Please enter a message shorter than 5000 characters");
      return;
    }
    if (post_time ==""){
        alert("Time is null");
        return;
      }
    try{
      const result = 
        await fetch("http://localhost:8080/home",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        //   "name": name,
        //   "age": age,
        "from_id" : useId,
        "to_id" : toId,
        "point" : point,
        "message" : message,
        "post_time": post_time,
        "update_time": update_time,
            }), 
      }
    );
    if (!result.ok){
      throw Error('Failed to create user : ${result.status}');
    }
    setToId("");
    setMessage("")
    setPoint(0);
    setPostTime("")
    setUpdateTime("")
    // get()
  }catch (err){
    console.error(err);
  }
    // get()
  };


  type Member={
    name : string;
    id : string;
    photo : string;
  };

    const [data, setData] = useState([])
    const get = async () => {
        const response = await fetch("http://localhost:8080/user",
        //"https://hackathon-ncnl2mzkfa-uc.a.run.app/user",
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
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
    <label>To: </label>
    <Paper
      sx={{
        width: `80%`,
        overflow: "auto",
        m: 1,
        borderRadius: 5,
        boxShadow: 10,
      }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>

          </Box>
            <MenuList>
              {data.map((user :Member) => (
                <div onClick={()=>setToId(user.id)} key={user.id}>
                <UserCard  user={user}  />
                
                </div> 
              ))}
            </MenuList>

        
      </Box>
    </Paper>
       <label>Point: </label>
      <input
        type={"number"}
        value={point}
        onChange={(e) => setPoint(e.target.valueAsNumber)}
      ></input>
      <label>Message: </label>
      <input
        type={"text"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
    
       <button>Post</button>
    </form>
  );
};

export default PostCont;