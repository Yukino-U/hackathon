import { useState, useEffect, useContext} from "react";
import { memo, FC } from "react";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import {Box} from "@mui/material";
import { UserCard } from "./UserCard";
import {UserContext} from "./Shared/Context";

type Member={
    name : string;
    id : string;
    photo : string;
    point : number;
  };

const UserList: FC = memo(() => {
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


    const {setUser} =useContext(UserContext);
    const onSubmit = ( id:string, photo: string, name: string, point : number)  => {
      setUser(id, photo, name, point);
      console.log(id)
     }
  return (
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
                <div onClick={()=>onSubmit(user.id, user.photo, user.name, user.point)} key={user.id}>
                <UserCard  user={user}  />
                
                </div> 
              ))}
            </MenuList>

        
      </Box>
    </Paper>
  );
})

export default UserList;
