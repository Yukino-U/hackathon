import {useState, useEffect, useContext} from "react";
import { Group, Avatar, Text, Box , Flex, Divider} from '@mantine/core';
import {MdOutlineDoubleArrow} from "react-icons/md";
import { IconContext } from 'react-icons';
import ReactLoading from "react-loading";

type Contribution= {
    id : string
    from_name : string;
    from_photo : string;
    to_name : string;
    to_photo : string;
    point : number;
    message : string;
    post_time: string;
    update_time : string;
  
  }
  export const Contribution=() =>  {  
    const [cont, setCont] = useState([]);
    const [isLoading ,setLoading]= useState<boolean>(false);
    const getconst = async () => {
      setLoading(true);
      const response = await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/home",
        // "http://localhost:8080/home",
         {
           method: "GET",
           headers: {"Content-Type": "application/json",},
                },
              );
      const nowCont = await response.json();
      setCont(nowCont);
      setLoading(false);
      // console.log("false")  
        };
        useEffect(() => {getconst()},[]);
  
interface AccordionLabelProps {
    id : string;
    from_photo : string;
    from_name : string;
    to_photo : string;
    to_name : string;
    point : number;
    message : string;
    post_time : string;
    update_time : string;
}

const AccordionLabel = (item: AccordionLabelProps) =>{

    return <>
    <Group noWrap>
    <div>
        <Avatar src={item.from_photo} radius="xl" size="lg" />
        <Text>{item.from_name}</Text>
    </div>
    <div>
        <IconContext.Provider value={{ color: '#8ED1F4', size: '30px' }}>
            <MdOutlineDoubleArrow/>
        </IconContext.Provider>
        <Text >{item.point} Pt</Text>
    </div>
    <div>
        <Avatar src={item.to_photo} radius="xl" size="lg" /> 
        <Text>{item.to_name}</Text>
    </div>
      <div>
        <Text size="sm" color="dimmed" weight={400}>{item.post_time}{item.post_time!=item.update_time && (<> (編集済み)</>)}</Text>
        
        <Text>
          {item.message}
        </Text>
        
      </div>
    </Group>
    </>
    ;
  }



    const items = cont.map((item : Contribution) => (

      <div key={item.id}>
      <Flex align="center">
      <Box color="white">
            
        <AccordionLabel {...item} />

    </Box>
    </Flex>
    <Divider my="sm" color='#8ED1F4'/>
    </div>
    ));
  

    if (isLoading) {
      return (
        <Flex justify="center" align="center"> 
        <section className="flex justify-center items-center h-screen">
          <div>
            <p></p>
            <ReactLoading
              type="spin"
              color='#8ED1F4'
              height="100px"
              width="100px"
              className="mx-auto"
            />
            <p className="text-center mt-3">Loading...</p>
          </div>
        </section>
        </Flex>
      );
    } else {
      return <>
      <Flex >
      <Text 
      variant="gradient"
      gradient={{ from: '#8ED1F4', to: '#EB94E2',deg: 35}}
      fz="xl" fw={70} >貢献一覧</Text>
      </Flex>
      <Divider my="sm" color='#8ED1F4' />
      {items}
    </>;
  }
}
