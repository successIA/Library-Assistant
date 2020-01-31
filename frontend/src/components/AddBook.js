import React, { Component } from "react";
import { connect } from "react-redux";
import { addBook, getAdminBook, updateBook } from "../actions/books";
import { checkValidity } from "../utilities/checkValidity";
import "./AddBook.css";
import { FormGroup } from "./shared/FormGroup";
import { store } from "../index";

export class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      author: "",
      publisher: "",
      description: "",
      num_of_pages: 0,
      image: "",
      newImgSrc: "",
      isSubmitBtnClicked: false,
      errors: []
    };

    this.originalImageBtnRef = React.createRef();
    this.fields = [];
  }

  componentDidMount() {
    if (this.props.match.params.book_id) {
      this.props.getAdminBook(this.props.match.params.book_id);
      window.scrollTo(0, 0);
    }
  }

  handleChange = e => {
    if (e.target.id === "image") {
      this.handleImageChooserChange(e);
    } else {
      this.setState(
        {
          [e.target.id]: e.target.value
        },
        () => {
          if (this.state.isSubmitBtnClicked) {
            this.getFormErrors();
          }
        }
      );
    }
  };

  handleImageChooserChange = e => {
    this.setState({
      image: e.target.files[0]
    });

    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        newImgSrc: e.target.result
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  getFormErrors = () => {
    const { title, author, publisher, description, num_of_pages } = this.state;
    const book = {
      title,
      author,
      publisher,
      description,
      num_of_pages
    };
    const errors = checkValidity([...this.fields], [], book);
    this.setState({
      errors
    });
    return errors;
  };

  handleSave = e => {
    e.preventDefault();

    this.setState({
      isSubmitBtnClicked: true
    });
    if (this.getFormErrors().length) {
      return;
    }
    const { title, author, publisher, description, num_of_pages } = this.state;
    const book = {
      title,
      author,
      publisher,
      description,
      num_of_pages
    };
    book.image = this.state.image;
    // this.props.book
    //   ? this.props.updateBook(Object.assign(book, { id: this.props.book.id }))
    //   : this.props.addBook(book);

    // let page_num = Math.ceil((this.props.user.book_count + 1) / 3);
    // this.props.book
    //   ? this.props.history.push(`/admin/books?page=${this.props.book.page_num}`)
    //   : this.props.history.push(`/admin/books?page=${page_num}`);

    if (this.props.book) {
      this.props.updateBook(Object.assign(book, { id: this.props.book.id }));
      this.props.history.push(`/admin/books?page=${this.props.book.page_num}`);
    } else {
      this.props.addBook(book);
      this.props.history.push("/admin/books");
    }
  };

  handleFakeImageBtnClick = e => {
    e.preventDefault();
    this.originalImageBtnRef.current.click();
  };

  componentDidUpdate(prevProps) {
    console.log(store.getState());
    if (!this.props.isAuthenticated) {
      return this.props.history.push("/");
    }

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
    this.fields = [];
    this.similarFormEntries = [
      ["title", "input", "text"],
      ["author", "input", "text"],
      ["publisher", "input", "text"],
      ["description", "textarea", "text"],
      ["num_of_pages", "input", "number", "Length"]
    ];

    this.similarFormEntries.forEach(([id, control, type, label]) => {
      let error = this.state.errors.filter(error => {
        return Object.keys(error)[0] === id;
      });
      let field = {
        control,
        attr: {
          id,
          type,
          "aria-describedby": `${id}Help`,
          placeholder: `Enter ${id}`,
          className: !this.state.isSubmitBtnClicked
            ? "form-control"
            : error[0]
            ? "form-control is-invalid"
            : "form-control is-valid"
        },
        label: label ? label : id.charAt(0).toLocaleUpperCase() + id.slice(1),
        value: this.state[id],
        onChange: this.handleChange
      };

      if (id === "description") Object.assign(field.attr, { rows: 6 });

      this.fields.push(field);
    });

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
                {this.fields.map((field, index) => (
                  <FormGroup key={index} {...field} />
                ))}
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
    book: state.bookReducer.book,
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { addBook, getAdminBook, updateBook }
)(AddBook);
