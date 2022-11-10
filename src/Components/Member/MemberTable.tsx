import { Avatar, Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import { MemberCard } from './MemberCard';

type Member={
    name : string;
    id : string;
    photo : string;
    point : number;
  };

export const MemberTable =()=>{
  const [data, setData] = useState([])
const get = async () => {
    const response = await fetch("http://localhost:8080/user",
    //"https://hackathon-ncnl2mzkfa-uc.a.run.app/user?name=taro",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const nowData = await response.json();
  setData(nowData)
  console.log(nowData)
}
  useEffect(() => {
    get()
  },[]

  )



  const rows = data.map((user : Member) => (
    <tr key={user.id}>
      <td>
    <MemberCard user={user}></MemberCard>
        </td>
      <td>{user.point} Pt</td>

    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Get point</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}