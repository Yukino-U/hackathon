import {useState, useEffect} from "react";
import { Group, Avatar, Text, Box , Flex, Divider } from '@mantine/core';
import {MdOutlineDoubleArrow} from "react-icons/md";
import { IconContext } from 'react-icons';

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

    const [cont, setCont] = useState([])
    const getconst = async () => {
      const response = await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/home",
        // "http://localhost:8080/home",
         {
           method: "GET",
           headers: {"Content-Type": "application/json",},
                },
              );
      const nowCont = await response.json();
      setCont(nowCont)
        }
    useEffect(() => {getconst()},[]
                    )
  
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
  return (
    <>
    <Group noWrap>
    <div>
        <Avatar src="{item.from_photo}" radius="xl" size="lg" />
        <Text>{item.from_name}</Text>
    </div>
    <div>
        <IconContext.Provider value={{ color: '#ccc', size: '30px' }}>
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
  );
}


    const items = cont.map((item : Contribution) => (

      <div key={item.id}>
      <Flex align="center">
      <Box color="white">
            
        <AccordionLabel {...item} />

    </Box>
    </Flex>
    <Divider my="sm" />
    </div>
    ));
  
    return <div>
      <Text>All Contribution</Text>
      <Divider my="sm" />
      {items}
    </div>;
  }
