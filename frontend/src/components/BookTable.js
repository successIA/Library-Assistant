import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getBooks, deleteBook } from "../actions/books";

export class BookTable extends Component {
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

  render() {
    const { books } = this.props;
    return (
      <div>
        <h2>Book List</h2>
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
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
                      <Link to={"/books/" + book.id}>{book.title}</Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>
                      {book.description.length > 100
                        ? book.description.substring(0, 100) + "..."
                        : book.description}
                    </td>
                    <td>{book.num_of_pages}</td>
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
        <Link to={"/admin/books/add"} className="btn btn-primary float-right">
          Add Book
        </Link>
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
