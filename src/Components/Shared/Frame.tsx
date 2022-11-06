import { useState , useContext} from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import {UserContext} from "./Context";
import UserList from './UserList';
import "./Frame.css"


export default function Frame(props :JSX.Element) {
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
        <Navbar.Section>
            <img src={useContext(UserContext).photo}></img>{useContext(UserContext).name}
            </Navbar.Section>
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
          <div>
          <Link to="/">Top</Link>
          </div>
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
          <div>{UserList()}</div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
      <div>{props}</div>
    </AppShell>
  );
}