import React, { useState } from "react";

const Recent = props => {
  const [data] = useState([...props.data]);
  return (
    <ul>
      {data.map(item => (
        <li>
          {item.female && item.female.name}
          {item.female && item.female.pictureUrl && (
            <img alt="profile" src={item.female.pictureUrl} />
          )}
        </li>
      ))}
    </ul>
  );
};
export default Recent;
