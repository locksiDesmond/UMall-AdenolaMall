import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import { firebase } from "./../../Firebase/Firebase";
import {
  extractImageFileExtensionFromBase64,
  base64StringtoFile
} from "./../../FileConversion/index";

class PictureUpload extends PureComponent {
  state = {
    data: "",
    src: this.props.src,
    error: this.props.error,
    crop: {
      unit: "%",
      width: 30,
      aspect: 16 / 9
    },
    context: ""
  };

  // onSelectFile = e => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () =>
  //       this.setState({ src: reader.result })
  //     );
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    this.setState({
      data: canvas.toDataURL("file.jpg")
    });
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }
  handleDownload = e => {
    e.preventDefault();

    const { src, error } = this.state;
    if (error) {
      return null;
    }
    console.log("clicked");
    const fileExtension = extractImageFileExtensionFromBase64(src);
    const fileName = "file." + fileExtension;
    const croppedFile = base64StringtoFile(src, fileName);
    this.setState(
      {
        context: croppedFile
      },
      this.props.handleDownload(croppedFile)
    );
    // const ref = firebase.storage().ref("images");
    //break;
    // const upload = ref.child(croppedFile.name).put(croppedFile);
    // upload.on(
    //   "state_changed",
    //   snapshot => {
    //     console.log("runnin");
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     console.log("done");
    //   }
    // );
    //continue
    // ref.put(croppedFile).then(() => {
    //   console.log("succesful");
    // });

    // downloadBase64File(datas, fileName);
  };
  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div style={{ display: "flex" }}>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            className="image"
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <div style={{ display: "flex", marginTop: "1.3rem" }}>
            <div style={{ width: "18rem", height: "auto", marginLeft: "1rem" }}>
              <img
                alt="Crop"
                style={{ maxWidth: "100%", border: "1px solid #000" }}
                src={croppedImageUrl}
              />
            </div>
            <Button
              disabled={this.props.loading ? true : false}
              type="submit"
              style={{
                marginLeft: "1rem",
                height: "2.2rem",
                marginTop: "3rem"
              }}
              onClick={e => {
                this.handleDownload(e);
              }}
            >
              {this.props.loading && (
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
        )}
      </div>
    );
  }
}
export default PictureUpload;
