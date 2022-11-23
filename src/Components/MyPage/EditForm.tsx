import {useState} from "react";
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

export function EditForm (props : Contribution) {
    const [message, setMessage]  = useState<string>(props.message);
    const [point, setPoint]  = useState<number>(props.point);
    const [update_time, setUpdateTime] =useState<string>(props.update_time);

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const time = new Date().toLocaleString();
        setUpdateTime(time);
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
        if (update_time ==""){
            alert("Time is null");
            return;
          }
        try{
          const result = 
            await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/home",{
              // "http://localhost:8080/home",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            "id" : props.id,
            "to_id" : props.to_id,
            "point" : point,
            "message" : message,
            "update_time": update_time,
                }), 
          }
        );
        if (!result.ok){
          throw Error('Failed to post contribution : ${result.status}');
        }
        setMessage("");
        setPoint(0);
        setUpdateTime("");
      }catch (err){
        console.error(err);
      }
      };
   
    return (<form onSubmit={()=>onSubmit} style={{ display: "flex", flexDirection: "column" }}>
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
)}