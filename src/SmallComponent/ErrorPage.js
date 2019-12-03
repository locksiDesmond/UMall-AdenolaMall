import React from "react";
// import { Link } from "react-router-dom";
function ErrorPage(props) {
  return (
    <div {...props} className={`errorpage  ${props.className}`}>
      <h1>Error 404</h1>
      <p>Where's your mom ? seems like you got lost in the mall</p>
        <button onClick={()=> props.history.goBack()} className="error--btn">Go back</button>
    </div>
  );
}
export default ErrorPage;
