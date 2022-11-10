import Frame from "../Components/Shared/Frame";
import PostCont from "../Components/Post/PostCont";
import { UserList } from "../Components/Post/UserList";

export const Post = () => {
    return(
    <>
      <div>{Frame(PostCont())}</div>

      </>
      )

    };