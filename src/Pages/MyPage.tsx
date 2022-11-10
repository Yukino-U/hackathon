import Frame from "../Components/Shared/Frame";
import { ToCont } from "../Components/MyPage/ToUserold";
import { FromCont } from "../Components/MyPage/FromUser";
import { Tab } from "../Components/MyPage/Tab";

export const MyPage = () => {
    return(
      <div>{Frame(Tab())}</div>)

    };