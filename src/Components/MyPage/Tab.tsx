import { useState } from 'react';
import { Tabs } from '@mantine/core';
import {ToCont} from "./ToUser"
import { FromCont } from './FromUser';
import { EditProfile } from './EditProfile';

export const Tab=()=> {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="first">送った貢献</Tabs.Tab>
        <Tabs.Tab value="second">貰った貢献</Tabs.Tab>
        <Tabs.Tab value="third">プロフィール編集</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="first">{FromCont()}</Tabs.Panel>
      <Tabs.Panel value="second">{ToCont()}</Tabs.Panel>
      <Tabs.Panel value="third">{EditProfile()}</Tabs.Panel>
    </Tabs>
  );
}