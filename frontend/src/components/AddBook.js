import React, { Component } from "react";
import { connect } from "react-redux";

import { addBook, getBook, updateBook } from "../actions/books";

export class AddBook extends Component {
  state = {
    id: "",
    title: "",
    author: "",
    publisher: "",
    description: "",
    num_of_pages: 0
  };

  componentDidMount() {
    if (this.props.match.params.book_id)
      this.props.getBook(this.props.match.params.book_id);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, author, publisher, description, num_of_pages } = this.state;
    const book = { title, author, publisher, description, num_of_pages };
    this.props.addBook(book);
    this.setState({
      title: "",
      author: "",
      publisher: "",
      description: "",
      num_of_pages: 0
    });
    this.props.history.push("/admin/books");
  };

  handleUpdate = e => {
    e.preventDefault();
    const {
      id,
      title,
      author,
      publisher,
      description,
      num_of_pages
    } = this.state;
    const book = { id, title, author, publisher, description, num_of_pages };
    this.props.updateBook(book);
    // return <Redirect to="/admin/books" />;
    // this.props.history.goBack();
    this.props.history.push("/admin/books");
  };

  componentDidUpdate(prevProps) {
    if (this.props.book && prevProps.book !== this.props.book) {
      this.setState({ ...this.props.book });
    }
  }

  render() {
    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-8 offset-md-2">
          <form
            onSubmit={this.props.book ? this.handleUpdate : this.handleSubmit}
          >
            <h2>{this.props.book ? "Update Book" : "Add Book"}</h2>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="titleHelp"
                placeholder="Enter title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                aria-describedby="authorHelp"
                placeholder="Enter author"
                value={this.state.author}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                aria-describedby="authorHelp"
                placeholder="Enter publisher"
                value={this.state.publisher}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                aria-describedby="descriptionHelp"
                placeholder="Enter description"
                rows="6"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="num_of_pages">Length</label>
              <input
                type="number"
                className="form-control"
                id="num_of_pages"
                aria-describedby="lengthHelp"
                placeholder="Enter page length"
                value={this.state.num_of_pages}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {this.props.book ? "Update" : "Save"}
            </button>
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
