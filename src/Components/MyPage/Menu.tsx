import { useState } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import {MdDelete} from "react-icons/md";
import { IconDots } from '@tabler/icons';
import {EditModal} from "./EditModal";
type Contribution ={
    id : string;
    to_id : string;
    from_photo : string;
    from_name : string;
    to_photo : string;
    to_name : string;
    point : number;
    message : string;
    post_time : string;
    update_time : string;
}

export const ToggleMenu=(props : Contribution) =>{
  const [opened, setOpened] = useState(false);
  return (
    <Menu position ="left" opened={opened} onChange={setOpened}>
        <Menu.Target>
        <ActionIcon size="lg">
            <IconDots size={16} />
        </ActionIcon>
    </Menu.Target>
    
    <Menu.Dropdown>
      <Menu.Item  icon={<IconPencil size={14} />}>Edit</Menu.Item>
      <Menu.Item icon={<MdDelete size={14} />}>Delete</Menu.Item>
      
      </Menu.Dropdown>
    </Menu>
  );
}