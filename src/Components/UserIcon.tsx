import {memo, FC} from "react";
import {Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar"


type Member={
    name : string;
    id : string;
    photo : string;
  }

  type Props = {
    user : Member;
    size?:number;
  }
  

export const UserIcon: FC<Props> = memo((props) => {
    const {user,size = 50} =props;

    return (
        <>
        <Paper
        sx ={{
            padding : "6px",
            margin : 1,
            borderRadius : "100%",
            bgcolor : "#757575",
        }}
        >
        <Avatar
            alt={user.name}
            src={user.photo}
            sx={{width: size, height : size, border:1}}
            />
        </Paper>
        </>
    )
      })
    