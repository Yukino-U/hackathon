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

export const MemberCard=(props: Props) => {
  const { user } = props; // ユーザー情報受け取り

  return (
    <>

    <UnstyledButton>
      <Group>
        <Avatar size={50} src={user.photo}></Avatar>
        <div>
          <Text size="xl">{user.name}</Text>
        </div>
      </Group>
    </UnstyledButton>
    </>
  );
};