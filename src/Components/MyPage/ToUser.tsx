import { useState, useEffect, useContext} from "react";
import {UserContext} from "../Shared/Context";
import { Group, Avatar, Text, Accordion} from '@mantine/core';
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

export const ToCont = () => {
    const [cont, setCont] = useState<Contribution[]>([])
    const url = "https://hackathon-ncnl2mzkfa-uc.a.run.app/tocont?id="+useContext(UserContext).id;
    const getconst = async () => {
              const response = await fetch(url,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              const nowCont = await response.json();
            setCont(nowCont);
            }
              useEffect(() => {
                getconst();
              },[]
                    );
  
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
//                   const [searchValue, onSearchChange] = useState('');
// interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
//   id: string;
//   name: string;
//   photo: string;
//   label : string;
// }

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
        <Text size="sm" color="dimmed" weight={400}>{item.post_time}{item.post_time!=item.update_time && (<> (編集済み)</>)}</Text>
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
    </Accordion.Item>
      ));
  return <Accordion chevronPosition="right" variant="contained" chevron="" mx="auto">{items}</Accordion>;
    }
  

                  