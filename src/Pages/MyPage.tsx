import {Frame} from "../Components/Shared/Frame";
import { Tab } from "../Components/MyPage/Tab";

export const MyPage = () => {
  // console.log("MyPage")
    return(
      <>
       <div>{Frame(Tab())}</div>
      </>
     )

    };