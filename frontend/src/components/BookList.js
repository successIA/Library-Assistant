import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getBooks } from "../actions/books";

export class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { books } = this.props;
    return (
      <div>
        <h2>Book List</h2>
        <ul className="list-unstyled">
          {books.length > 0 ? (
            books.map(book => {
              return (
                <li key={book.id} className="media mb-4">
                  <img
                    src="https://via.placeholder.com/150x200"
                    className="mr-3"
                    alt="..."
                  />
                  <div className="media-body">
                    <h5 className="mt-0">
                      <Link to={`/books/${book.id}`}>{book.title}</Link>
                    </h5>
                    <span className="font-weight-normal">{book.author}</span>
                    <p className="font-weight-lighter">{book.description}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <li>Loading...</li>
          )}
        </ul>
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
  { getBooks }
)(BookList);
