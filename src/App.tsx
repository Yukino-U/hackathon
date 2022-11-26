import { BrowserRouter } from "react-router-dom";
import {Router} from "./Router"
import { UserProvider } from "./Components/Shared/Context";
import { ActiveProvider } from "./Components/Shared/ActiveProvider";
// import Loading from "./Components/Shared/Loading"
// document.querySelectorAll('*').forEach(el => el.clientWidth > document.body.clientWidth ? console.log(el) : null);
const App = ()=> {
  // console.log("App")
return (
  <UserProvider>
    <ActiveProvider>
  <div className="App">
    <header className="App-header">
      <> 

      {/* <BrowserRouter> */}
      <div className="App">

      <Router />
      </div>
    {/* </BrowserRouter> */}
      </>
     
    </header>
  </div> 
  </ActiveProvider>
  </UserProvider>
); }
export default App;
