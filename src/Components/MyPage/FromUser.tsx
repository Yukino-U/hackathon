import React, { useState, useEffect, useContext} from "react";
import "../../Form";
import {UserContext} from "../Shared/Context";
import { Group, Avatar, Text, Accordion } from '@mantine/core';
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
    post_time : string;
    update_time : string;
  
  }
  

export const FromCont = () => {
    const [cont, setCont] = useState([])
    const url = "http://localhost:8080/fromcont?id="+useContext(UserContext).id;
    const getconst = async () => {
              const response = await fetch(url,
                //"https://hackathon-ncnl2mzkfa-uc.a.run.app/home",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              const nowCont = await response.json();
              setCont(nowCont)
            }
              useEffect(() => {
                getconst()
              },[]
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
        <Text size="sm" color="dimmed" weight={400}>{item.post_time}</Text>
        <Text>
          {item.message}
        </Text>
        
      </div>
    </Group>
    
    </>
                    )
                    }
                    const items = cont.map((item : Contribution) => (
                      <Accordion.Item value={item.id} key={item.id}>
                        <Accordion.Control>
                          <AccordionLabel {...item} />
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Text size="sm">{item.message}</Text>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ));
                  
                    return <Accordion chevronPosition="right" variant="contained">{items}</Accordion>;
                  }
  