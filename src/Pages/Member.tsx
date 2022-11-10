import {MemberTable } from "../Components/Member/MemberTable"; 
import Frame from "../Components/Shared/Frame";

export const Member = () => {
  return(
    <div>{Frame(MemberTable())}</div>)
  };