import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../images/svgs/boy.svg";
import "./ReactCrop.css";
import PictureUpload from "./PictureUpload";
function ImageUpload() {
  const [imgSrc, setSrc] = useState(null);
  const [crop] = useState({ aspect: 1 / 1 });
  const onDrop = useCallback(acceptedfiles => {
    acceptedfiles.forEach(file => {
      const Reader = new FileReader();
      Reader.onabort = () => {
        console.log("aborted file");
      };
      Reader.onerror = () => {
        console.log("Error");
      };
      Reader.onload = () => {
        const byr = Reader.result;
        setSrc(byr);
      };
      Reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="image">
      {imgSrc ? (
        <PictureUpload props={crop} src={imgSrc} />
      ) : (
        <div className="image" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and upload files here</p>
          <img className="imageupload" src={Upload} alt="drag n drop" />
        </div>
      )}
    </section>
  );
}
export default ImageUpload;
