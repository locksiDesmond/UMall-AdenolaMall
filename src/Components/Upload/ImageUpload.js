import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../images/svgs/Drag to upload.svg";
import "./ReactCrop.css";
import PictureUpload from "./PictureUpload";
function ImageUpload(props) {
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
        const dataUrl = Reader.result;
        setSrc(dataUrl);
      };
      Reader.readAsDataURL(file);
    });
  }, []);
  useEffect(() => {
    if (props.loaded) {
      setSrc("");
    }
  }, [props.loaded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="">
      {imgSrc ? (
        <PictureUpload
          handleDownload={props.handleSubmit}
          props={crop}
          error={props.error}
          src={imgSrc}
          loading={props.loading}
        />
      ) : (
        <div
          className="image"
          style={{ cursor: "pointer" }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Drag and upload files here</p>
          <img className="" src={Upload} alt="drag n drop" />
        </div>
      )}
    </section>
  );
}
export default ImageUpload;
