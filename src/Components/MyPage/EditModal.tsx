import {FC, useState, useContext } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { render } from '@testing-library/react';
import { reload } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import {UserContext} from "../Shared/Context";
import {FromCont} from "./FromUser";

type Contribution ={
    id : string;
    to_id : string;
    from_photo : string;
    from_name : string;
    to_photo : string;
    to_name : string;
    point : number;
    message : string;
    post_time : string;
    update_time : string;
}

type EditModalProps = Contribution & {
  reload: () =>Promise<void>
} 
export const EditModal: FC<EditModalProps> =(props) =>{

  // const [opened, setOpened] = useState(false);
  const [message, setMessage]  = useState<string>(props.message);
  const [point, setPoint]  = useState<number>(props.point);
  // const [update_time, setUpdateTime] =useState<string>(props.update_time);
  const history = useHistory();
  const [cont, setCont] = useState([])
  const url = "http://localhost:8080/fromcont?id="+useContext(UserContext).id;
  const get = async () => {
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
          };
           

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      const time = new Date().toLocaleString();
      // setUpdateTime(time);
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
      if (time ==""){
          alert("Time is null");
          return;
        }
      try{
        const result = 
          await fetch("http://localhost:8080/edit",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          "id" : props.id,
          "to_id" : props.to_id,
          "point" : point,
          "delete_point" : props.point,
          "message" : message,
          "update_time": time,
              }), 
        }
      );
      if (!result.ok){
        throw Error('Failed to create user : ${result.status}');
      }
      await props.reload()

      // setUpdateTime("");
      //get();
    
      //history.push('/currentuser');
      // {FromCont()}
    }catch (err){
      console.error(err);
    };
    // history.push('/');
    // history.push('/currentuser')
    //window.location.reload()

    console.log(props.point)
    };

    const onDelete = async()=> {
      try{
        const result = 
          await fetch("http://localhost:8080/delete",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          "id" : props.id,
          "to_id" : props.to_id,
          "point": props.point,
              }), 
        }
      );
      if (!result.ok){
        throw Error('Failed to create user : ${result.status}');
      }
      await props.reload()
    }catch (err){
      console.error(err);
    };
    // history.push('/currentuser')
    // window.location.reload()
 
    
    };
 

  return (
    <>
       
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
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
   
 
    <button>Edit</button>
 </form>
 <button onClick={onDelete}>Delete</button>
    
    </>)
  ;
}