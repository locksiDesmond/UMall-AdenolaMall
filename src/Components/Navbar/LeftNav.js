import React, { useState } from "react";
function LeftNav() {
  const [signedIn] = useState(false);
  const style = !signedIn ? { display: "none" } : {};

  return (
    <div className="left--nav">
      <p style={style}>Sign in</p>
    </div>
  );
}

export default LeftNav;
