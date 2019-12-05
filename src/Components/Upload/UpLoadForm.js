import React from "react";
import { Form, Alert } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import SelectForm from "./SelectForm";
import { firebase } from "./../../Firebase/Firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Redirect } from "react-router-dom";
import ButtonLg from "../../SmallComponent/ButtonLg";
class UpLoadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: { name: "", error: "" },
      condition: { name: "New", error: "" },
      description: { name: "", error: "" },
      price: { name: "", error: "" },
      error: "",
      category: { name: "Devices", error: "" },
      subcategory: { name: "Laptops", error: "" },
      objects: [
        {
          name: "Laptops",
          id: 0
        },
        {
          name: "Mobile Phones",
          id: 1
        },
        {
          name: "Others accessories",
          id: 2
        }
      ],
      loading: false,
      uploaded: false,
      picture: [],
      pictureName:[],
      url: [],
      loaded: Array(3).fill(false)
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changesubcategory = this.changesubcategory.bind(this);
    this.errors = this.errors.bind(this);
    this.upload = this.upload.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.downloadPicture = this.downloadPicture.bind(this);
    this.RenderImage = this.RenderImage.bind(this);
  }
  errors(name, error) {
    const value = name;
    this.setState(() => ({
      [value]: { ...this.state[value], error: error },
      error: "Error",
      loading:false
    }));
  }
  downloadPicture(picture, i) {
    const loaded = this.state.loaded.slice();
    loaded[i] = true;
    this.setState({
      picture: [...this.state.picture, picture],
      loaded: loaded
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { title, description, price, condition, category } = this.state;
    if (!title.name) {
      this.errors("title", "Enter a Title or Name of Product");
    }
    if (!description.name) {
      this.errors("description", "description must be there");
    }
    if (!price.name) {
      this.errors("price", "No price Found");
    }
    if (!category.name) {
      this.errors("category", "You must select a category");
    }
    if (!condition.name) {
      this.errors("condition", "state a condition!");
    }
    if (!this.props.data) {
      this.errors("error", "set your phone Number");
    }
    if (!this.state.picture) {
      this.errors("error", "input at least one picture");
    }
    if (
      !(
        !title.name ||
        !description.name ||
        !price.name ||
        !condition.name ||
        !category.name ||
        !this.props.data ||
        !this.state.picture
      )
    ) {
      for (let i = 0; i <= (this.state.picture.length - 1); i++) {
        this.upload(this.state.picture[i], i);
      }
    }
    // this.setState({
    //   loading: false
    // });
  }

  handleChange(e) {
    let value = e.target.name;

    this.setState({
      [value]: { name: e.target.value }
    });
  }

  changesubcategory() {
    switch (this.state.category.name) {
      case "Devices":
        this.setState({
          objects: [
            {
              name: "Laptops",
              id: 0
            },
            {
              name: "Mobile Phones",
              id: 1
            },
            {
              name: "Others accessories",
              id: 2
            }
          ],
          subcategory: { name: "Laptops" }
        });
        break;
      case "Clothings":
      case "Footwears":
        this.setState({
          objects: [
            {
              name: "Male",
              id: 0
            },
            {
              name: "Female",
              id: 1
            }
          ],
          subcategory: { name: "Male" }
        });
        break;
      case "Cosmetics":
        this.setState({
          objects: [
            {
              name: "Creams",
              id: 0
            },
            {
              name: "Perfumes",
              id: 1
            },
            {
              name: "Makeups",
              id:2
            },{
              name:"Jewelries",
              id:3,
            },{
              name:"Others",
              id:4
            }
          ],
          subcategory: { name: "Creams" }
        });
        break;
      case "Household items":
        this.setState({
          objects: [
            {
              name: "Used",
              id: 0
            },
            {
              name: "New",
              id: 1
            }
          ],
          subcategory: { name: "Used" }
        });
        break;

      default:
        this.setState({
          objects: [],
          subcategory: { name: "" }
        });
    }
  }
  // .child(
  //   
  // )
  upload(picture, i) {
    // this.setState({
    //   loading: true
    // });
    return new Promise((resolve, reject) => {
      const store = firebase.storage();
      const pictureUploading = store
        .ref(`images/${picture.name}`)    
        .put(picture);
      pictureUploading.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            progress: progress
          });
          console.log(progress);
        },
        error => {
          this.setState({ error: error.message, loading: false });
          console.log("error");
        },
        () => {
          pictureUploading.snapshot.ref.getDownloadURL().then(downloadUrl => {
            this.setState({
              progress: "",
              pictureName: [...this.state.pictureName, picture.name],
loading: false,
              url: [...this.state.url, downloadUrl],
            });              
            this.fileUpload();
          });
        }
      );
    });
  }

  fileUpload() {
 this.setState({loading:true})
    if (
      this.state.picture.length > 0 &&
      this.state.picture.length === this.state.url.length
    ) {
      const {
        title,
        condition,
        description,
        price,
        subcategory,
        category,
        url,
        pictureName
      } = this.state;
      const date = Date.now();
      const data = {
        name: title.name.toLowerCase(),
        subcategory: subcategory.name,
        condition: condition.name,
        category: category.name,
        description: description.name,
        price: price.name,
        date: date,
        pictureUrl: url,
        uid: this.props.user.uid,
        likes: [],
        picturename:pictureName,
      };
      const db = firebase.firestore();
      db.collection(this.state.category.name)
        .doc()
        .set(data)
        .then(() => {
          console.log("succesfull");
          this.setState({
            title: { name: "", error: "" },
            condition: { name: "New", error: "" },
            description: { name: "", error: "" },
            price: { name: "", error: "" },
            error: "",
            subcategory: { name: "Male", error: "" },
            objects: [],
            loading: false,
            uploaded: true,
            picture: "",
            url: ""
          });
          db.collection("Users")
            .doc(this.props.user.uid)
            .set({
              materialPosted:  firebase.firestore.FieldValue.increment(1)
            },{merge:true});
        })
        .catch(error => {
          this.setState({ loading: false, error: error.message });
        });
     
    }
  }
  render() {
    return (
      <Form className="upload" onSubmit={this.handleSubmit}>
        {this.state.uploaded && <Redirect to={{ pathname: "/profile" }} />}
        <Form.Group>
          <Form.Label className="signin-form-name">Name</Form.Label>
          <Form.Control
            className={`form-control upload-length ${
              this.state.title.error ? "input--error" : "input--control"
            }
            `}
            placeholder="Name of product"
            name="title"
            value={this.state.title.name}
            onChange={this.handleChange}
          />
          {this.state.title.error && <p>{this.state.title.error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="signin-form-name">Category</Form.Label>
          <select
            className={`form-control ${
              this.state.category.error ? "input--error" : "input--control"
            }`}
            name="category"
            onChange={e => {
              this.handleChange(e);
              setTimeout(() => {
                this.changesubcategory();
              }, 200);
            }}
            value={this.state.category.name}
          >
            <option value="Devices">Devices and accessories</option>
            <option value="Clothings">Clothings</option>
            <option value="Footwears">Footwears</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Household items">Household items</option>
          </select>
          {this.state.category.error && <p>{this.state.category.error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="signin-form-name">Subcategory</Form.Label>
          <SelectForm
            error={this.state.subcategory.error}
            name="subcategory"
            object={this.state.objects}
            value={this.state.subcategory.name}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="input-condition-price">
          <div>
            <Form.Label className="signin-form-name">&#8358; Price  </Form.Label>
            <input
              className={`form-control ${
                this.state.price.error ? "input--error" : "input--control"
              }`}
              name="price"
              value={this.state.price.name}
              onChange={this.handleChange}
              type="number"
            />
            {this.state.price.error && <p>{this.state.price.error}</p>}
          </div>
          <div className=" input--condition">
            <Form.Label className="signin-form-name">
              Select Condition
            </Form.Label>
            <select
              className={`form-control ${
                this.state.condition.error ? "input--error" : "input--control"
              }`}
              name="condition"
              value={this.state.condition.name}
              placeholder="$10"
              onChange={this.handleChange}
            >
              <option value="used">Used</option>
              <option value="New">New</option>
            </select>
            {this.state.condition.error && <p>{this.state.condition.error}</p>}
          </div>
        </Form.Group>
        <label className="signin-form-name">Description</label>
        <textarea
          className={`form-control ${
            this.state.description.error ? "input--error" : "input--control"
          }`}
          name="description"
          value={this.state.description.name}
          onChange={this.handleChange}
          rows="5"
        />
        {this.state.description.error && <p>{this.state.description.error}</p>}
        <Form.Label
          style={{ marginTop: "1.3rem" }}
          className="signin-form-name"
        >
          Upload at least one picture
        </Form.Label>
        <div className="upload--body">
          {this.RenderImage(0)}
          {this.RenderImage(1)}
          {this.RenderImage(2)}
        </div>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        {this.state.progress && <ProgressBar now={this.state.progress} />}

        <div className="upload--button">
          <ButtonLg
            loading={this.state.loading ? "true" : ""}
            title="Submit"
            small="true"
            onClick={this.handleSubmit}
          />
        </div>

      </Form>
    );
  }
  RenderImage(i) {
    return (
      <ImageUpload
        loading={this.state.loading[i]}
        error={this.state.error}
        loaded={this.state.loaded[i]}
        value={i}
        handleSubmit={this.downloadPicture}
      />
    );
  }
}

export default UpLoadForm;
