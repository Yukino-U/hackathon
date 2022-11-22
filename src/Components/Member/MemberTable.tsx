import { Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import { MemberCard } from './MemberCard';

type MemberRank={
    name : string;
    id : string;
    photo : string;
    point : number;
    rank :number;
  };

export const MemberTable =()=>{
  const [data, setData] = useState<MemberRank[]>([])
const get = async () => {
    const response = await fetch("https://hackathon-ncnl2mzkfa-uc.a.run.app/ranking",
      // "http://localhost:8080/ranking",
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

  const rows = data.map((user : MemberRank) => (
    <tr key={user.id}>
      <td>{user.rank}</td>
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
        <th>Rank</th>
          <th>Name</th>
          <th>Get point</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}