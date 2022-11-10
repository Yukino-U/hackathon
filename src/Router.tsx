import { Route, Switch } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Member } from "./Pages/Member";
import  UserList  from "./Components/UserList";
import { CurrentUser } from "./Components/Shared/CurrentUser";
import { Post } from "./Pages/Post";
import { MyPage } from "./Pages/MyPage";

export const Router = () => {
  return (
    <Switch>
      {/* exactをつけると完全一致になります。Homeはexactをつけてあげます */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/member">
        <Member />
      </Route>
      <Route path="/new">
        <UserList />
      </Route>
      <Route path="/currentuser">
        <MyPage/>
      </Route>
      <Route path="/postcont">
        <Post/>
      </Route>

    
    </Switch>
  );
};
