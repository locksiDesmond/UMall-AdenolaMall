import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../images/svgs/upload.svg";
import "./ReactCrop.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {
  extractImageFileExtensionFromBase64,
  base64StringtoFile
} from "./../../FileConversion/index";

// import PictureUpload from "./PictureUpload";
function ImageUpload(props) {
  const [imgSrc, setSrc] = useState(null);
  const [error, setError] = useState("");
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
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleDownload = e => {
    e.preventDefault();

    const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
    const fileName = "file." + fileExtension;
    const croppedFile = base64StringtoFile(imgSrc, fileName);
    if (!(croppedFile.size >= 1024000)) {
      props.handleSubmit(croppedFile, props.value);
    } else {
      setError("File too Large");
    }
  };
  return (
    <section>
      <div
        className="imageupload"
        style={{ cursor: "pointer" }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {imgSrc ? (
          <div>
            <img className={`image `} src={imgSrc} alt="upload" />

            {error && <span>{error}</span>}
            <Button
              disabled={props.loading ? true : false}
              type="submit"
              className={`${props.loaded && "none"}`}
              style={{
                marginLeft: "1rem",
                height: "2.2rem",
                marginTop: "3rem"
              }}
              onClick={e => {
                e.stopPropagation();
                handleDownload(e);
              }}
            >
              {props.loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              post
            </Button>
          </div>
        ) : (
          <div>
            <p>Drag and upload files here</p>
            <img src={Upload} alt="drag n drop" />
          </div>
        )}
      </div>
    </section>
  );
}
export default ImageUpload;
//  {/* <PictureUpload
//           handleDownload={props.handleSubmit}
//           props={crop}
//           error={props.error}
//           src={imgSrc}
//           loading={props.loading}
//           loaded={props.loaded}
//           value={props.value}
//           ratio={props.ratio}
//         /> */}
