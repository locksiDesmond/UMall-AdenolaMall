import React from "react";
import Form from "react-bootstrap/Form";
import ImageUpload from "./ImageUpload";
import SelectForm from "./SelectForm";
import { firebase } from "./../../Firebase/Firebase";
class UpLoadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: { name: "", error: "" },
      condition: { name: "", error: "" },
      description: { name: "", error: "" },
      price: { name: "", error: "" },
      error: "",
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
    const { title, description, price, condition } = this.state;
    if (!title.name) {
      this.errors("title", "Enter a Title or Name of Product");
    }
    if (!description.name) {
      this.errors("description", "description must be there");
    }
    if (!price.name) {
      this.errors("price", "No price Found");
    }
    if (!condition.name) {
      this.errors("condition", "You must select a category");
    }
    if (!(!title.name || !description.name || !price.name || !condition.name)) {
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
    switch (this.state.condition.name) {
      case "Laptops":
        this.setState({
          objects: [
            {
              name: "laptops",
              id: 0
            },
            {
              name: "Mobile phones",
              id: 1
            },
            {
              name: "others",
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
              name: "female",
              id: 1
            }
          ]
        });
        break;
      default:
        this.setState({
          objects: []
        });
    }
  }
  upload(picture) {
    const { title, condition, description, price, subcategory } = this.state;
    const date = Date.now();
    const subCategory = subcategory.name;
    const data = {
      [subCategory]: {
        name: title.name,
        condition: condition.name,
        description: description.name,
        price: price.name,
        date: date
      }
    };
    const doc = firebase.firestore();
    doc
      .collection(condition.name)
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
          uploaded: true
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
              this.state.condition.error ? "input--error" : "input--control"
            }`}
            name="condition"
            onChange={e => {
              this.handleChange(e);
              setTimeout(() => {
                this.changeSubCategory();
              }, 200);
            }}
            value={this.state.condition.name}
          >
            <option>New</option>
            <option>Clothings</option>
            <option>Footwears</option>
            <option>Laptops</option>
          </select>
          {this.state.condition.error && <p>{this.state.condition.error}</p>}
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

        <Form.Group>
          <Form.Label className="signin-form-name">Price (in Naira)</Form.Label>
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
      </Form>
    );
  }
}

export default UpLoadForm;
