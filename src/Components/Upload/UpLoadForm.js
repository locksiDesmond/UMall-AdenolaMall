import React from "react";
import {Form, Alert} from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import SelectForm from "./SelectForm";
import { firebase } from "./../../Firebase/Firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Redirect } from "react-router-dom"
class UpLoadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: { name: "", error: "" },
      condition: { name: "", error: "" },
      description: { name: "", error: "" },
      price: { name: "", error: "" },
      error: "",
      category: { name: "", error: "" },
      subcategory: { name: "", error: "" },
      objects: [],
      loading: false,
      uploaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
    this.errors = this.errors.bind(this);
    this.upload = this.upload.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  errors(name, error) {
    const value = name;
    this.setState(() => ({
      [value]: { ...this.state[value], error: error },
      error: "Error"
    }));
  }
  handleSubmit(picture) {
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
    if (
      !(
        !title.name ||
        !description.name ||
        !price.name ||
        !condition.name ||
        !category.name
      )
    ) {
      this.upload(picture);
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleChange(e) {
    let value = e.target.name;

    this.setState({
      [value]: { name: e.target.value }
    });
  }
  changeSubCategory() {
    switch (this.state.category.name) {
      case "Devices":
        this.setState({
          objects: [
            {
              name: "Laptops and Tablets",
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
          ]
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
          ]
        });
        break;
        case "Cosmetics":
          this.setState({
            objects:[
              {
                name: "Creams",
                id:0
              },{
              name:"Perfumes",
              id:1
            }
          ]
          });
          break;
        case "Household items":
          this.setState({
            objects:[{
              name:"Used",
              id:0,
            },
          {
            name:"New",
            id:1,
          }]
          });
          break;
      default:
        this.setState({
          objects: []
        });
    }
  }
  upload(picture) {
    const { title, description, subcategory, category } = this.state;
    const store = firebase.storage();
    const pictureUploading = store
      .ref()
      .child(
        `${category.name}/${subcategory.name}/${title.name}/${description.name}`
      )
      .put(picture);
    pictureUploading.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          progress: progress
        });
      },
      error => {
        this.setState({ error: error.message });
      },
      () => {
        pictureUploading.snapshot.ref.getDownloadURL().then(downloadUrl => {
          this.setState({ pictureUrl: downloadUrl, progress: 0 });
          console.log(downloadUrl);
          this.fileUpload(downloadUrl);
        });
      }
    );
  }
  fileUpload(downloadUrl) {
    const {
      title,
      condition,
      description,
      price,
      subcategory,
      category
    } = this.state;
    const date = Date.now();
    const data = {
      name: title.name,
      subCategory: subcategory.name,
      condition: condition.name,
      category: category.name,
      description: description.name,
      price: price.name,
      date: date,
      pictureUrl: downloadUrl
    };
    const db = firebase.firestore();
    db.collection(category.name)
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
          category: { name: "", error: "" },
          subcategory: { name: "Male", error: "" },
          objects: [],
          loading: false,
          uploaded: true,
          pictureUrl: ""
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ loading: false, error: error.message });
      });
  }
  render() {
    return (
      <Form className="upload" onSubmit={this.handleSubmit}>
        {this.state.uploaded && <Redirect to={{pathname:"/Home"}}/>}
        {this.state.progress && <ProgressBar now={this.state.progress} />}
        <Form.Group>
          <Form.Label className="signin-form-name">Name</Form.Label>
          <Form.Control
            className={`form-control upload-length ${
              this.state.title.error ? "input--error" : "input--control"
            }
            `}
            placeholder="Title of product"
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
                this.changeSubCategory();
              }, 200);
            }}
            value={this.state.category.name}
          >
            <option>Devices</option>
            <option>Clothings</option>
            <option>Footwears</option>
            <option>Cosmetics</option>
            <option>Household items</option>

          </select>
          {this.state.category.error && <p>{this.state.category.error}</p>}
        </Form.Group>
        <Form.Group>
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
            <Form.Label style={{}} className="signin-form-name">
              Price (in Naira)
            </Form.Label>
            <input
              className={`form-control ${
                this.state.price.error ? "input--error" : "input--control"
              }`}
              name="price"
              value={this.state.price.name}
              placeholder="$10"
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
              <option>Used</option>
              <option>New</option>
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

        <ImageUpload
          loading={this.state.loading}
          error={this.state.error}
          loaded={this.state.loaded}
          handleSubmit={this.handleSubmit}
        />
        {this.state.error && <Alert>{this.state.error}</Alert>}
      </Form>
    );
  }
}

export default UpLoadForm;
