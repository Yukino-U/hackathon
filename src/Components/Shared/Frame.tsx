import { useState , useContext,createContext, FC,ReactNode} from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import {
  AppShell,
  Avatar,
  Box,
  Center,
  Flex,
  Navbar,
  NavLink,
  Header,
  Footer,
  Aside,
  Divider,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Image,
} from '@mantine/core';
import {UserContext} from "./Context";
import UserList from './UserList';
import "./Frame.css";
import { useHistory } from 'react-router-dom';
import { IconAward , IconSend, IconChevronRight, IconStar} from '@tabler/icons';
import { ActiveContext } from './ActiveProvider';
import pic from "./Logo.jpg";




export default function Frame(props :JSX.Element) {
  const {set} =useContext(ActiveContext);
  const active =useContext(ActiveContext).active
  const history = useHistory();
  const theme = useMantineTheme();
  //const [active, setActive] = useState(10);
  const [opened, setOpened] = useState(false);
  const rinkMember =()=>{
    set(1) ;
    history.push("/member");
  }
  const rinkPost =()=>{
    set(2) ;
    history.push("/postcont");
  }
  const rinkMyPage =()=>{
    set(0) ;
    history.push("/currentuser");
  }
  const rinkTop =()=>{
    set(-1) ;
    history.push("/");
  }
  const data = [
    {icon: IconStar, label: 'My Page', rightSection: <IconChevronRight size={14} stroke={1.5} />, rink :rinkMyPage,
    },
    { icon: IconAward, label: 'Ranking', rightSection: <IconChevronRight size={14} stroke={1.5} />, rink :  rinkMember},
    {
      icon: IconSend,
      label: 'Post Contribution',
      rightSection: <IconChevronRight size={14} stroke={1.5} />,
      rink :rinkPost,
    },
  ];
  const items = data.map((item, index) => (
      <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      rightSection={item.rightSection}
      icon={<item.icon size={16} stroke={1.5} />}
      onClick={item.rink}
      color='#8ED1F4'
      // variant="gradient" gradient={{ from: '#8ED1F4', to: '#EB94E2', deg: 35 }}
    />
    
  ));
  return (
    <AppShell
      // styles={{
      //   main: {
      //     background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      //   },
      // }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Navbar.Section>
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
        {/* <Navbar.Section grow mt="md">
          
            <Link to="/member">Show member</Link>
            <br />
            <Link to="currentuser"> CurrentUser</Link>
            <br />
            <Link to="postcont"> Post Contribution</Link>
            <br />
        </Navbar.Section> */}

          <Box >{items}</Box>

      
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
        <Header height={{ base: 70 }} p="md" style={{ display: 'flex', alignItems: 'center' ,justifyContent:'space-between'}} >
          <Flex gap="md" align="center">
          {/* <Link to="/">Top</Link> */}
          
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
          {/* <Button onClick={rinkTop}>Top</Button> */}
          <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }} onClick={rinkTop}><Image src={pic} ></Image></div>
          
          </Flex>
          <div>{UserList()}</div>
        </Header>
      }
    >
      <div className='props'>{props}</div>
    </AppShell>
  );
}