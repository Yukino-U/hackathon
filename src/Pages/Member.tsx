import { MemberList } from "../Components/Member/MemberList"; 
import Frame from "../Components/Shared/Frame";

export const Member = () => {
  return(
    <div>{Frame(MemberList())}</div>)
  };