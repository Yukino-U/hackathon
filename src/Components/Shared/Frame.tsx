import { useState , useContext} from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import {
  AppShell,
  Avatar,
  Center,
  Flex,
  Navbar,
  Header,
  Footer,
  Aside,
  Divider,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import {UserContext} from "./Context";
import UserList from './UserList';
import "./Frame.css"
import { useHistory } from 'react-router-dom';

export default function Frame(props :JSX.Element) {
  const history = useHistory();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Navbar.Section onClick={()=>history.push("/currentuser")}>
          <Flex justify="center" align="center" gap="xl"> 
           <Avatar src={useContext(UserContext).photo} radius="xl" size="xl" />
           <Text fz="xl">{useContext(UserContext).name}</Text> 
          </Flex>
          <p></p>
          <Flex justify="center" align="center" gap="xs">
            <Text>Get Point：</Text>
            <Text  fz="lg" c="cyan">{useContext(UserContext).point} </Text>
            <Text> point</Text>
          </Flex>
            
            </Navbar.Section>
            <Divider my="sm" />
        <Navbar.Section grow mt="md">
          
            <Link to="/member">Show member</Link>
            <br />
            <Link to="currentuser"> CurrentUser</Link>
            <br />
            <Link to="postcont"> Post Contribution</Link>
            <br />
        </Navbar.Section>
        </Navbar>
      }
    //   aside={
    //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
    //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
    //         <Text>Application sidebar</Text>
    //       </Aside>
    //     </MediaQuery>
    //   }
    //   footer={
    //     <Footer height={60} p="md">
    //       Application footer
    //     </Footer>
    //   }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Flex gap="md">
          
          <Link to="/">Top</Link>
          
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
          </Flex>
          <div>{UserList()}</div>
        </Header>
      }
    >
      <div>{props}</div>
    </AppShell>
  );
}