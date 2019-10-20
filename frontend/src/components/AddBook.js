import React, { Component } from "react";
import { connect } from "react-redux";

import { addBook, getBook, updateBook } from "../actions/books";
import "./AddBook.css";

export class AddBook extends Component {
  state = {
    id: "",
    title: "",
    author: "",
    publisher: "",
    description: "",
    num_of_pages: 0,
    image: "",
    newImgSrc: "",
    isSubmitBtnClicked: false,
    errors: {
      title: "",
      author: "",
      publisher: "",
      description: "",
      num_of_pages: ""
    }
  };

  originalImageBtnRef = React.createRef();

  componentDidMount() {
    if (this.props.match.params.book_id)
      this.props.getBook(this.props.match.params.book_id);
  }

  handleChange = e => {
    const field = e.target.id;
    const value = e.target.value;
    field === "image"
      ? this.setState({
          image: e.target.files[0]
        })
      : this.setState(
          {
            [field]: value
          },
          function() {
            if (field !== "image" && this.state.isSubmitBtnClicked) {
              this.checkValidity();
            }
          }
        );

    if (field === "image") {
      console.log(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        this.setState({
          newImgSrc: e.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  checkValidity = () => {
    let isValid = true;
    const errors = { ...this.state.errors };
    for (let entry of Object.entries(this.state.errors)) {
      const field = entry[0];
      switch (field) {
        case "num_of_pages":
          if (
            parseInt(this.state[field]) <= 0 ||
            !Number.isInteger(parseInt(this.state[field]))
          ) {
            isValid = false;
            errors[field] =
              "The length of the book must be an integer greater than zero";
          } else {
            errors[field] = "";
          }
          break;

        default:
          if (!this.state[field].trim().length) {
            isValid = false;
            errors[field] = `The ${field} of the book cannot be blank`;
          } else {
            errors[field] = "";
          }
      }
    }

    console.log(errors);
    this.setState(() => {
      return {
        errors: errors
      };
    });

    return isValid;
  };

  handleSave = e => {
    e.preventDefault();

    this.setState({
      isSubmitBtnClicked: true
    });

    if (!this.checkValidity()) {
      return;
    }

    const {
      title,
      author,
      publisher,
      description,
      num_of_pages,
      image
    } = this.state;

    const book = { title, author, publisher, description, num_of_pages, image };
    this.props.book
      ? this.props.updateBook(Object.assign(book, { id: this.props.book.id }))
      : this.props.addBook(book);
    this.props.history.push("/admin/books");
  };

  handleFakeImageBtnClick = e => {
    e.preventDefault();
    this.originalImageBtnRef.current.click();
  };

  componentDidUpdate(prevProps) {
    if (this.props.book && prevProps.book !== this.props.book) {
      this.setState({ ...this.props.book });
      // Server does not accept null as value for an image field
      // Even though it produces null as the image field value.
      if (this.props.book.image === null) {
        this.setState({ image: "" });
      }
    }
  }

  render() {
    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-10 offset-md-1">
          <h2 className="mb-4">
            {this.props.book ? "Update Book" : "Add Book"}
          </h2>
          <form encType="multipart/form-data" onSubmit={this.handleSave}>
            <div className="row">
              <div className="col-md-2 mt-2">
                <img
                  src={
                    this.state.newImgSrc
                      ? this.state.newImgSrc
                      : this.state.image
                      ? this.state.image
                      : "https://via.placeholder.com/150x200"
                  }
                  className="mr-3"
                  alt="..."
                  width="150"
                  height="200"
                />
                <div className="form-group">
                  <label style={{ display: "none" }} htmlFor="image">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    style={{ display: "none" }}
                    onChange={this.handleChange}
                    accept="image/*"
                    datatype="image"
                    ref={this.originalImageBtnRef}
                  />
                  <button
                    className="fake-img-btn btn-secondary bg-dark btn btn-sm"
                    onClick={this.handleFakeImageBtnClick}
                  >
                    <i className="fas fa-image"></i>
                    {this.state.image ? "Change Image" : "Choose Image"}
                  </button>
                </div>
              </div>
              <div className="col-md-10 pl-4">
                <div
                  className={
                    !this.state.errors.title ? "form-group" : "form-group mb-2"
                  }
                >
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className={
                      !this.state.isSubmitBtnClicked
                        ? "form-control"
                        : this.state.errors.title
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                    id="title"
                    aria-describedby="titleHelp"
                    placeholder="Enter title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.title ? (
                    <small
                      className="font-weight-bold"
                      style={{ color: "#dc3545" }}
                    >
                      {this.state.errors.title}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    !this.state.errors.author ? "form-group" : "form-group mb-2"
                  }
                >
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    className={
                      !this.state.isSubmitBtnClicked
                        ? "form-control"
                        : this.state.errors.author
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                    id="author"
                    aria-describedby="authorHelp"
                    placeholder="Enter author"
                    value={this.state.author}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.author ? (
                    <small
                      className="font-weight-bold"
                      style={{ color: "#dc3545" }}
                    >
                      {this.state.errors.author}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    !this.state.errors.publisher
                      ? "form-group"
                      : "form-group mb-2"
                  }
                >
                  <label htmlFor="publisher">Publisher</label>
                  <input
                    type="text"
                    className={
                      !this.state.isSubmitBtnClicked
                        ? "form-control"
                        : this.state.errors.publisher
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                    id="publisher"
                    aria-describedby="authorHelp"
                    placeholder="Enter publisher"
                    value={this.state.publisher}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.publisher ? (
                    <small
                      className="font-weight-bold"
                      style={{ color: "#dc3545" }}
                    >
                      {this.state.errors.publisher}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    !this.state.errors.description
                      ? "form-group"
                      : "form-group mb-2"
                  }
                >
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    className={
                      !this.state.isSubmitBtnClicked
                        ? "form-control"
                        : this.state.errors.description
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                    id="description"
                    aria-describedby="descriptionHelp"
                    placeholder="Enter description"
                    rows="6"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.description ? (
                    <small
                      className="font-weight-bold"
                      style={{ color: "#dc3545" }}
                    >
                      {this.state.errors.description}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    !this.state.errors.num_of_pages
                      ? "form-group"
                      : "form-group mb-4"
                  }
                >
                  <label htmlFor="num_of_pages">Length</label>
                  <input
                    type="number"
                    className={
                      !this.state.isSubmitBtnClicked
                        ? "form-control"
                        : this.state.errors.num_of_pages
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                    id="num_of_pages"
                    aria-describedby="lengthHelp"
                    placeholder="Enter page length"
                    value={this.state.num_of_pages}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.num_of_pages ? (
                    <small
                      className="font-weight-bold"
                      style={{ color: "#dc3545" }}
                    >
                      {this.state.errors.num_of_pages}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  {this.props.book ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

export default connect(
  mapStateToProps,
  { addBook, getBook, updateBook }
)(AddBook);
