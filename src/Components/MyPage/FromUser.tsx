import { useState, useEffect, useContext} from "react";
import {UserContext} from "../Shared/Context";
import { Group, Avatar, Text, Accordion , Flex} from '@mantine/core';
import {MdOutlineDoubleArrow} from "react-icons/md";
import { IconContext } from 'react-icons';
import { IconPencil } from '@tabler/icons';
import {EditModal} from "./EditModal";
import ReactLoading from "react-loading";

type Contribution= {
    id : string
    from_name : string;
    from_photo : string;
    to_id : string;
    to_name : string;
    to_photo : string;
    point : number;
    message : string;
    post_time : string;
    update_time : string;
    // reload : () =>Promise<void>
  }

export const FromCont = () => {
  // console.log("From");
  const [isLoading ,setLoading]= useState<boolean>(true); 
    const [cont, setCont] = useState<Contribution[]>([])
    const url = "https://hackathon-ncnl2mzkfa-uc.a.run.app/fromcont?id="+useContext(UserContext).id;
    // "http://localhost:8080/fromcont?id="+useContext(UserContext).id;
    const getconst = async () => {
              const response = await fetch(url,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              const nowCont : Contribution[] = await response.json();
              setCont(nowCont);
              setLoading(false)
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
      // console.log("ALavel")
      return (
        <>
        <Group noWrap>
          <div>
            <Avatar src={item.from_photo} radius="xl" size="lg" />
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
          <Text>{item.message}</Text> 
          </div>
      </Group>
    </>
    )
  }
    const items =()=>{
      // console.log("items")
      return( cont.map((item : Contribution) => (
      <Accordion.Item value={item.id} key={item.id}>
        <Accordion.Control >
          <AccordionLabel {...item}/>
        </Accordion.Control>
          <Accordion.Panel>
            <EditModal {...item} reload={getconst} ></EditModal>
          </Accordion.Panel>
       </Accordion.Item>
     )))}
                  
     if (isLoading) {
      return (
        <Flex justify="center" align="center"> 
        <section className="flex justify-center items-center h-screen">
          <div>
            <ReactLoading
              type="spin"
              color="#ebc634"
              height="100px"
              width="100px"
              className="mx-auto"
            />
            <p className="text-center mt-3">loading</p>
          </div>
        </section>
        </Flex>
      );
    } else {return <Accordion  chevron={<IconPencil size={16} color="blue" />} styles={{
          chevron: {
             '&[data-rotate]': {transform: 'rotate(360deg)',},
            } } }
           chevronPosition="right" variant="contained"
           >
          {items()}</Accordion>;
}}
  