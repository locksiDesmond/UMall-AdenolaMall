import React from "react";

function NavForm() {
  return (
    <form className="btn--group">
      <input
        style={{
          width: "20rem",
          border: "1px solid #f0f1f2",
          height: "1.8rem",
          borderRadius: ".2rem 0 0 .2rem",
          fontSize: ".8rem"
        }}
        type="name"
        id="name"
        name="name"
        placeholder=""
        className="search--input"
      />
      <button
        style={{
          backgroundColor: "#f4754e",
          color: "#fff",
          height: "1.9rem",
          padding: "0 1.2rem"
        }}
      >
        Search
      </button>
    </form>
  );
}

export default NavForm;
