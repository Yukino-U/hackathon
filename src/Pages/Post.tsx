import Frame from "../Components/Shared/Frame";
import PostCont from "../Components/Post/PostCont";

export const Post = () => {
    return(
    <>
      <div>{Frame(PostCont())}</div>
      </>
      )

    };