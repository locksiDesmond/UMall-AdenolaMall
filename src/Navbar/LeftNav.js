import React, { useState } from "react";
import Btn from "../SmallComponent/Btn";
function LeftNav() {
  const [signedIn, setSignedin] = useState(true);
 const apiData =`https://sheet.zoho.com/api/private/csv/download/[bookid]/sheet-name:[name]/[range]?apikey=[APIKey]&authtoken=[AuthToken]&scope=DataAPI`;


  return (
    <div className="left--nav">
      <Btn value="Sign in" color="#39B54A" />
      <Btn display={signedIn} value="Post ad" color="#f4754e" />
      <Btn display={signedIn} value="message" color="05aff2" />
    </div>
  );
}

export default LeftNav;
