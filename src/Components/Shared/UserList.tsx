import { useState, useEffect, useContext, memo, FC} from 'react';
import { Drawer, Button, Group, Box, Flex } from '@mantine/core';
import { UserContext } from './Context';
import { UserCard } from './UserCard';
import {RegisterUser} from "./RegisterUser";
import { useHistory } from 'react-router-dom';
import { ActiveContext } from './ActiveProvider';
import ReactLoading from "react-loading";

type Member={
  name : string;
  id : string;
  photo : string;
  point : number;
};

export const UserList=() => {
  // console.log("UserLIst")
  const [isLoading ,setLoading]= useState<boolean>(false); 
  const history = useHistory();
  const [data, setData] = useState<Member[]>([])
  const [opened, setOpened] = useState(false);
  const get = async () => {
    setLoading(true);
      const response = await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/user",
        // "http://localhost:8080/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const nowData : Member[] = await response.json();
    setData(nowData);
    setLoading(false);
  };
  useEffect(() => {get()},[]);
  const {set} =useContext(ActiveContext);
  const {setUser} =useContext(UserContext);
  const onSubmit = ( member : Member)  => {
    setUser(member.id, member.photo, member.name, member.point);
    set(-1) ;
    history.push("/");
   }


return (
<>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        // title="Select user"
        padding="sm"
        size="sm"
        position="right" 
      >
        {isLoading &&    <Flex justify="center" align="center"> 
    <section className="flex justify-center items-center h-screen">
      <div>
        <p></p>
        <ReactLoading
          type="spin"
          color='#8ED1F4'
          height="50px"
          width="50px"
          className="mx-auto"
        />
        <p className="text-center mt-3">Loading...</p>
      </div>
    </section>
    </Flex>}
    {isLoading==false &&
        <>
        <RegisterUser reload={get} ></RegisterUser>
        <p></p>
        {data.map((user :Member) => (
              <Box onClick={()=>onSubmit(user)} key={user.id} className="usercard"
              sx={(theme) => ({
                // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'left',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.xs,
                cursor: 'pointer',
        
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
              })}
            >
    
              
              <UserCard  user={user}  />
            </Box>
            
            ))}
            </>
}
          <Box>
        
            
          </Box>

        
      </Drawer>
{/* <Button  onClick={() => setOpened(true)} color='#EB94E2' */}
      <Group position="right">
      <Button variant="gradient" gradient={{ from: '#8ED1F4', to: '#EB94E2', deg: 35 }} onClick={() => setOpened(true)} >ユーザー変更</Button>
      </Group>

    

  
  </>
);
}

export default UserList;
