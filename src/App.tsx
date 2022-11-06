import { BrowserRouter, Link } from "react-router-dom";
import logo from "./logo.svg";
//import "./App.css";
import { Home } from "./Pages/Home";
import {MemberList} from "./Components/Member/MemberList"
import {Router} from "./Router"
// import { LoginForm } from "./Components/LoginForm";
import { onAuthStateChanged } from "firebase/auth";
// import { fireAuth } from "./firebase";
import {useState} from "react";
import { UserProvider } from "./Components/Shared/Context";
function App() {
  // const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  
  // // ログイン状態を監視して、stateをリアルタイムで更新する
  // onAuthStateChanged(fireAuth, user => {
  //   setLoginUser(user);
  // });
return (
  <UserProvider>
  <div className="App">
    <header className="App-header">
      <> 

      <BrowserRouter>
      <div className="App">

      <Router />
      </div>
    </BrowserRouter>
      </>
     
    </header>
  </div>
  </UserProvider>
); }
export default App;
