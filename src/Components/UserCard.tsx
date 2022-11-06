import { memo, FC } from "react";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MenuItem } from "@mui/material";

import { UserIcon } from "./UserIcon";

type Member={
    name : string;
    id : string;
    photo : string;
  };

type Props = {
  user: Member;
};

export const UserCard: FC<Props> = memo((props) => {
  const { user } = props; // ユーザー情報受け取り

  return (
    <>
      <MenuItem>
        <ListItemIcon>
          <UserIcon user={user} /> 
        </ListItemIcon>
        <ListItemText
          primary={user.name} // 名前
          primaryTypographyProps={{ fontSize: { xs: 20, md: 40 } }}
        />
      </MenuItem>
    </>
  );
});