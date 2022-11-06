import Frame from "../Components/Shared/Frame";
import { ToCont } from "../Components/MyPage/ToUser";
import { FromCont } from "../Components/MyPage/FromUser";

export const MyPage = () => {
    return(
      <div>{Frame(FromCont())}</div>)

    };