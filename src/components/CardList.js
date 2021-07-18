import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
  const roboComponent = robots.map((robot, i) => {
    // return <Card key={i} id={robots[i].id} name={robots[i].name} email={robots[i].email} />
    return <Card key={robot.id} id={robot.id} name={robot.name} email={robot.email}/>
  });

  return (
    <div>
      {roboComponent}
    </div>
  );
}

export default CardList;