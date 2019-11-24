import React from "react";
import { Form, Alert } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import SelectForm from "./SelectForm";
import { firebase } from "./../../Firebase/Firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
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
      subcategory: { name: "", error: "" },
      objects: [],
      loading: false,
      uploaded: false,
      picture: [],
      url: [],
      loaded: Array(3).fill(false)
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
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
      error: "Error"
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
    if (
      !(
        !title.name ||
        !description.name ||
        !price.name ||
        !condition.name ||
        !category.name
      )
    ) {
      for (let i = 0; i <= this.state.picture.length; i++) {
        this.upload(this.state.picture[i], i);
      }
    } else {
      this.setState({
        loading: false
      });
    }
    this.setState({
      loading: false
    });
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
  upload(picture, i) {
    const { title, description, subcategory, category } = this.state;
    return new Promise((resolve, reject) => {
      const store = firebase.storage();
      const pictureUploading = store
        .ref()
        .child(
          `${category.name}/${subcategory.name}/${title.name}/${description.name}${i}`
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
          console.log(progress);
        },
        error => {
          console.log("error");
          this.setState({ error: error.message, loading: false });
        },
        () => {
          pictureUploading.snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log(downloadUrl);
            this.setState({
              progress: "",
              url: [...this.state.url, downloadUrl],
              loading: false
            });
          });
        }
      );
    });
  }
  componentDidUpdate() {
    if (
      this.state.picture.length > 0 &&
      this.state.picture.length === this.state.url.length
    ) {
      this.fileUpload();
    }
  }
  fileUpload() {
    const {
      title,
      condition,
      description,
      price,
      subcategory,
      category,
      url
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
      pictureUrl: url
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
        {this.state.uploaded && <Redirect to={{ pathname: "/Home" }} />}
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
            <option value="Devices">Devices</option>
            <option value="Clothings">Clothings</option>
            <option value="Footwears">Footwears</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Household items">Household items</option>
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
            <Form.Label className="signin-form-name">
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

        {this.RenderImage(0)}
        {this.RenderImage(1)}
        <Button type="submit" onClick={this.handleSubmit}>
          submit
        </Button>
        {this.state.error && <Alert>{this.state.error}</Alert>}
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
