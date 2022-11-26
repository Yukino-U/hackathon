import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';

type Member={
    name : string;
    id : string;
    photo : string;
    point : number;
  };

type Props = {
  user: Member;
};

export const UserCard=(props: Props) => {
  const { user } = props; // ユーザー情報受け取り

  return (
    <>
    <UnstyledButton>
      <Group>
        <Avatar size={40} src={user.photo}></Avatar>
        <div>
          <Text>{user.name}</Text>
        </div>
      </Group>
    </UnstyledButton>
    </>
  );
};

