import { useState, useEffect, useContext, memo, FC} from 'react';
import { Drawer, Button, Group, Box } from '@mantine/core';
import { UserContext } from './Context';
import { UserCard } from './UserCard';

type Member={
  name : string;
  id : string;
  photo : string;
  point : number;
};


export const UserList=() => {
  const [data, setData] = useState([])
  const [opened, setOpened] = useState(false);
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
  const onSubmit = ( id:string, photo: string, name: string)  => {
    setUser(id, photo, name);
    console.log(id)
   }
return (
<>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select user"
        padding="sm"
        size="sm"
        position="right" 
      >
        {data.map((user :Member) => (
              <Box onClick={()=>onSubmit(user.id, user.photo, user.name)} key={user.id}
              sx={(theme) => ({
                //backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
        
      </Drawer>

      <Group position="right">
      <Button onClick={() => setOpened(true)} color="white">
        ユーザー変更
      </Button>
      </Group>
    

  
  </>
);
}

export default UserList;
