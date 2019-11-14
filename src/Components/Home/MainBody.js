import React from "react";
import MainImage from "./MainImage";
// import ReactDropzone from "react-dropzone";

function Home() {
  return (
    <div className="main--content" id="home">
      <MainImage />
      <div className="drop">
        {/* <ReactDropzone> */}
        <h2>Drop your files here</h2>
        {/* </ReactDropzone> */}
      </div>
    </div>
  );
}

export default Home;
