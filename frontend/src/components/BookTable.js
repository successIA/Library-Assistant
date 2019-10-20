import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getBooks, deleteBook } from "../actions/books";

export class BookTable extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.props.getBooks();
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  };

  handleDelete = id => {
    this.props.deleteBook(id);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    let { books } = this.props;
    if (this.state.search)
      books = books.filter(book =>
        book.title.toLowerCase().includes(this.state.search.toLowerCase())
      );
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="mb-4">Books</h2>
          <div className="row ml-0 mb-0 above-table">
            <Link
              to={"/admin/books/add"}
              className="btn btn-primary text-right mb-4 mr-2"
            >
              Create New Book
            </Link>
            <form autoComplete="off" className="form-inline my-2 my-lg-0 pb-4">
              <div className="form-group row">
                <div className="col-md-12">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="All books"
                    aria-label="Search"
                    id="search"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <table className="table table-striped table-responsive mt-0 book-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
                <th scope="col">Description</th>
                <th scope="col">Length</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {books ? (
                books.map(book => {
                  return (
                    <tr key={book.id}>
                      <th scope="row">{book.id}</th>
                      <td>
                        <img
                          src={
                            book.image
                              ? book.image
                              : "https://via.placeholder.com/75x100"
                          }
                          className="mr-3"
                          alt={book.title + "book image"}
                          width="75"
                          height="100"
                        />
                      </td>
                      <td>
                        <Link to={"/books/" + book.id}>{book.title}</Link>
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.author}
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.publisher}
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.description.length > 100
                          ? book.description.substring(0, 100) + "..."
                          : book.description}
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.num_of_pages}
                      </td>
                      <td>
                        <Link
                          className="btn btn-sm btn-secondary"
                          to={"/admin/books/" + book.id + "/edit"}
                        >
                          Update
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={this.handleDelete.bind(this, book.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
          {this.props.books.length && !books.length ? (
            <p>No Search Results</p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(
  mapStateToProps,
  { getBooks, deleteBook }
)(BookTable);
