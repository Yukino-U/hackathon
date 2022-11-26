import { Table, Flex } from '@mantine/core';
import { useState, useEffect } from 'react';
import { MemberCard } from './MemberCard';
import ReactLoading from "react-loading";

type MemberRank={
    name : string;
    id : string;
    photo : string;
    point : number;
    rank :number;
  };

export const MemberTable =()=>{
  const [data, setData] = useState<MemberRank[]>([]);
  const [isLoading ,setLoading]= useState<boolean>(true);
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
  setData(nowData);
  console.log(nowData);
  setLoading(false);
};
useEffect(() => {get()},[]);

  const rows = data.map((user : MemberRank) => (
    <tr key={user.id}>
      <td>{user.rank}</td>
      <td>
    <MemberCard user={user}></MemberCard>
        </td>
      <td>{user.point} Pt</td>

    </tr>
  ));

  if (isLoading) {
    return (
      <Flex justify="center" align="center"> 
      <section className="flex justify-center items-center h-screen">
        <div>
          <p></p>
          <ReactLoading
            type="spin"
            color='#8ED1F4'
            height="100px"
            width="100px"
            className="mx-auto"
          />
          <p className="text-center mt-3">loading</p>
        </div>
      </section>
      </Flex>
    );
  } else {
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
}