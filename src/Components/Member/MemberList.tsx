import { useState, useEffect } from "react";
import { Box } from '@mantine/core';
import {MemberCard} from "./MemberCard"
import "../../Form";
type Member={
    name : string;
    id : string;
    photo : string;
    point : number;
  }

export const MemberList = () => {
    const [data, setData] = useState([])
    const get = async () => {
        const response = await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/user",
          // "http://localhost:8080/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const nowData = await response.json();
      ()=>setData(nowData)
    };
      useEffect(() => {
        get();
      },[]
      );

    return (
      <div>

      {data.map((user :Member) => (
        <Box key={user.id}
        sx={(theme) => ({
          textAlign: 'left',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.xl,
          cursor: 'pointer',
  
          // '&:hover': {
          //   backgroundColor:
          //     theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
          // },
        })}
      >
        <MemberCard  user={user}  />
      </Box>
      ))}
      </div>

    );
  };