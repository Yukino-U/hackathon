import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Member } from "./Pages/Member";
import { Post } from "./Pages/Post";
import { MyPage } from "./Pages/MyPage";

export const Router = () => {
  // console.log("Router")
  return (
      
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/member">
        <Member />
      </Route>
      <Route path="/currentuser">
        <MyPage/>
      </Route>
      <Route path="/postcont">
        <Post/>
      </Route>
      </Switch>
      </BrowserRouter>

    
    // </Switch>
  );
};
