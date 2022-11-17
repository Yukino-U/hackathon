import { useState, useContext } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { UserContext } from './Context';
import { useHistory } from 'react-router-dom';

type Props={
    reload :Promise<void>
}
export const RegisterUser = (props:  Props) => {
  const [opened, setOpened] = useState(false);
  //const id = useContext(UserContext).id
  const history = useHistory();
    const [name, setName]  = useState<string>("");
    const [photo, setPhoto]  = useState<string>("");
    //const point = useContext(UserContext).point;
    const {setUser} =useContext(UserContext);     
  
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        // const time = new Date().toLocaleString();
        // setUpdateTime(time);
        if (name==''){
            alert ("名前を入力してください");
            return;
          }
        if (photo==''){
            alert("プロフィール写真のリンクを入力してください。");
            return;
        }
        try{
          const result = 
            await fetch("http://localhost:8080/registermember",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            "name" : name,
            "photo" : photo
                }), 
          }
        );
        if (!result.ok){
          throw Error('Failed to edit profile : ${result.status}');
        }
        setOpened(false);
        await props.reload;
        //setUser(id, photo, name, point)
      }catch (err){
        console.error(err);
      };

      };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="This is fullscreen modal!"
        fullScreen
      >
        
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <label>Name: </label>
     <input
       type={"string"}
       value={name}
       onChange={(e) => setName(e.target.value)}
     ></input>
     <label>Photo URL: </label>
     <input
       type={"string"}
       value={photo}
       onChange={(e) => setPhoto(e.target.value)}
     ></input>
     
   
      <button>Edit</button>
   </form>

      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}　variant="gradient" gradient={{ from: '#8ED1F4', to: '#EB94E2', deg: 35 }}>新規ユーザー作成</Button>
      </Group>
    </>
  );
}