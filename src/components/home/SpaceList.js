import React from "react";
import SpaceEntry from "./SpaceEntry";

const SpaceList = ({ spaces }) => {
  const spaceList = spaces ? (
    spaces.map(space => <SpaceEntry space={space} key={space.id} />)
  ) : (
    <tr>
      <td colspan="4">{"There is no WorkSpace"}</td>
    </tr>
  );

  return (
    <div>
      <table width="100%">
        {/* <caption>Work Spaces</caption> */}
        <colgroup>
          <col width="45%" />
          <col width="15%" />
          <col width="25%" />
          <col width="" />
        </colgroup>
        <tbody>{spaceList}</tbody>
      </table>
    </div>
  );
};

export default SpaceList;
