import {FC, useState, useContext } from 'react';
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
  const [message, setMessage]  = useState<string>(props.message);
  const [point, setPoint]  = useState<number>(props.point);
  const history = useHistory();
  const [cont, setCont] = useState<Contribution[]>([])
  const url = "https://hackathon-ncnl2mzkfa-uc.a.run.app/tocont?id="+useContext(UserContext).id;
  // "http://localhost:8080/fromcont?id="+useContext(UserContext).id;
  
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      const time = new Date().toLocaleString();
      if (point<=0){
          alert ("Point: 0より大きい整数値を入力してください。");
          return;
        }
      if (point%1!=0){
          alert("Point: 0より大きい整数値を入力してください。");
          return;
      }
      if (message ==""){
          alert("メッセージを入力してください。")
          return;
      }
      if (message.length >5000){
        alert("5000字以内で入力してください。");
        return;
      }
      if (time ==""){
          alert("もう一度送信してください。");
          return;
        }
      try{
        const result = 
          await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/edit",{
            // "http://localhost:8080/edit",{
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
        throw Error('Failed to edit contribution : ${result.status}');
      }
      await props.reload()
    }catch (err){
      console.error(err);
    };
    // console.log(props.point)
    };

    const onDelete = async()=> {
      try{
        const result = 
          await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/delete",{
            // "http://localhost:8080/delete",{
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
        throw Error('Failed to delete contribution : ${result.status}');
      }
      await props.reload()
    }catch (err){
      console.error(err);
    };
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
 <button onClick={()=>onDelete}>Delete</button>
    </>)
  ;
}