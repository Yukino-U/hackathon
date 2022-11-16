import React, { useState, useEffect, useContext,forwardRef} from "react";
import { UserContext } from "../Shared/Context";
// import Paper from "@mui/material/Paper";
// import MenuList from "@mui/material/MenuList";
// import {Box} from "@mui/material";
import { Select, Group, Avatar, Text, SelectItem } from '@mantine/core';
// import { UserList } from "./UserList";

type Member={
  name : string;
  id : string;
  photo : string;
}
type AddMember={
  name : string;
  id : string;
  photo : string;
  label : string;
  value : string;
}


const PostCont = () => {
  const useId = useContext(UserContext).id;
 // const [toId, setToId] = useState<string>("");
  const [message, setMessage]  = useState<string>("");
  const [point, setPoint]  = useState<number>(0);
  // const [post_time, setPostTime] =useState<string>("");
  // const [update_time, setUpdateTime] =useState<string>("");
  const [value, setValue ]  =useState<string | null>(null);
  

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
    console.log(value)
    e.preventDefault();
    const time = new Date().toLocaleString();
    // setPostTime(time);
    // setUpdateTime(time);
    console.log(time)
    if (!useId){
      alert("Who are you?");
      return;
    };
    if (!value){
      alert("Please select user");
      return;
    };
    if(value==useId){
      alert("自分以外の人を選んでください")
      return
    };
    if (point<=0){
        alert ("0より大きい整数値を入力してください。");
        return;
      };
    if (point%1!=0){
        alert("0より大きい整数値を入力してください。");
        return;
    };
    if (message ==""){
        alert("Please write message")
        return;
    };
    if (message.length >5000){
      alert("Please enter a message shorter than 5000 characters");
      return;
    };
    if (time ==""){
        alert("Time is null");
        return;
      };
    try{
      const result = 
        await fetch("http://localhost:8080/home",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        "from_id" : useId,
        "to_id" : value,
        "point" : point,
        "message" : message,
        "post_time": time,
        "update_time": time,
            }), 
      }
    );
    if (!result.ok){
      throw Error('Failed to create user : ${result.status}');
    }
    setValue("");
    setMessage("")
    setPoint(0);
    // setPostTime("")
    // setUpdateTime("")
    // get()
  }catch (err){
    console.error(err);
  }
    // get()
  };




  const [data, setData] = useState<Member[]>([])
  const [addData, setAddData] = useState<AddMember[]>([])
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
    const nowData: Member[] = await response.json();
    setData(nowData)
    const users = nowData.map((user : Member)=>{
      return {...user,
      label : user.name,
      value: user.id}
    })
    setAddData(users)
  }



  useEffect(() => {
      get()
    },[]
          )
const [searchValue, onSearchChange] = useState('');
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  id: string;
  name: string;
  photo: string;
  label : string;
}




const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, name, photo, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others} key={id}>
      <Group noWrap>
        <Avatar src={photo} />
        
        <div>
          <Text>{name}</Text>
        </div>
      </Group>
    </div>
  )
);




  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
    <label>To: </label>
    {/* <Paper
      sx={{
        width: `80%`,
        overflow: "auto",
        m: 1,
        borderRadius: 5,
        boxShadow: 10,
      }}
    // > */}
    {/* //   <Box sx={{ width: "100%", typography: "body1" }}>
        
    //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}

          {/* </Box> */}
            {/* <MenuList>
              {data.map((user :Member) => (
                <div onClick={()=>setToId(user.id)} key={user.id}>
                <UserCard  user={user}  />
                
                </div> 
              ))}
            </MenuList> */}
    <Select
      label="誰に送りますか？"
      placeholder="Pick all that you like"
      itemComponent={SelectItem}
      data={addData}
      searchable
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      nothingFound="Nothing found"
      filter={(value : string, item: SelectItem) =>
        (item.id!=useId)&&(item.name.toLowerCase().includes(value.toLowerCase().trim()))
      }
      value={value}
      onChange={setValue}
      

    />

        
      {/* </Box>
    </Paper> */}
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