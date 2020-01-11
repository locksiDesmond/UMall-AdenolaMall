import React, { useCallback, useState, useEffect } from "react";
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
  const [files, setFile] = useState("");
  const [error, setError] = useState("");
  const onDrop = useCallback(acceptedfiles => {
    acceptedfiles.forEach(file => {
      setFile(file);
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
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*"
  });
  const handleDownload = e => {
    e.preventDefault();

    const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
    const fileName = "file." + fileExtension;
    const croppedFile = base64StringtoFile(imgSrc, fileName);
    if (!(croppedFile.size >= 2005000)) {
      if (!(files >= 2005000)) {
        props.handleSubmit(files, props.value);
      }
    } else {
      setError("File too Large, image must be less than 2mb");
    }
  };
  useEffect(() => {
    if (props.src) {
      setSrc(props.src);
    }
  }, [props.src]);
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
              Select
            </Button>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <p
              style={{
                position: "absolute",
                top: "45%",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              <span className="d-none d-sm-block">
                Drag and drop here to upload pictures
              </span>
              <span className="d-block d-sm-none">select picture</span>
            </p>

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
