import React from "react";

function NavForm() {

  return (
    <form
      className="btn--group"
      style={{ display: "inline-block", marginLeft: "3rem" }}
    >
      <input
        style={{
          width: "20rem",
          border: "1px solid #f0f1f2",
          height: "1.8rem"
        }}
        type="name"
        id="name"
        name="name"
        placeholder="....."
        className=""
      />
      <button
        className="navform--button"
        style={{
          backgroundColor: "#f4754e",
          color: "#fff",
          height: "1.8rem",
          padding: "0 1.2rem"
        }}
      >
        Search
      </button>
    </form>
  );
}

export default NavForm;
