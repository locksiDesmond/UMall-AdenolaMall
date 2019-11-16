import React from "react";
import Form from "react-bootstrap/Form";
import ImageUpload from "./ImageUpload";
import SelectForm from "./SelectForm";
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
      post: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeSubCategory = this.changeSubCategory.bind(this);
    this.errors = this.errors.bind(this);
  }
  errors(name, error) {
    const value = name;
    this.setState(() => ({
      [value]: { ...this.state[value], error: error },
      error: "Error"
    }));
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title, description, price } = this.state;
    if (!title.name) {
      this.errors("title", "Enter a Title or Name of Product");
    }
    if (!description.name) {
      this.errors("description", "description must be there");
    }
    if (!price.name) {
      this.errors("price", "No price Found");
    }
    return;
  }
  componentWillUnmount() {
    if (!this.state.error) {
      console.log("done");
    }
  }

  handleChange(e) {
    e.preventDefault();
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

  render() {
    const { error } = this.state;

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
        </Form.Group>
        <Form.Group>
          <SelectForm
            error={error}
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
        </Form.Group>
        <label className="signin-form-name">Description</label>
        <textarea
          className={`form-control ${
            this.state.description.error ? "input--error" : "input--control"
          }`}
          name="description"
          value={this.state.description.name}
          onChange={this.handleChange}
        ></textarea>
        <ImageUpload
          error={this.state.error}
          handleSubmit={this.handleSubmit}
        />
      </Form>
    );
  }
}

export default UpLoadForm;
