import React, { useState } from "react";
import { Redirect } from "react-router-dom";
function NavForm(props) {
  const [search, setSearch] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (search) {
      setRedirect(true);
    }
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="btn--group">
      {redirect && (
        <Redirect to={{ pathname: "/home/Search", state: search }} />
      )}
      <input
        style={{
          width: "15rem",
          border: "1px solid #f0f1f2",
          height: "1.5rem",
          borderRadius: ".2rem 0 0 .2rem",
          fontSize: ".8rem"
        }}
        type="name"
        id="name"
        onChange={e => setSearch(e.currentTarget.value)}
        name={search}
        placeholder=""
        className="search--input"
      />
      <button
        style={{
          backgroundColor: "#f4754e",
          color: "#fff",
          height: "1.56rem",
          padding: "0 1.2rem",
          fontSize: ".8rem"
        }}
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
}

export default NavForm;
