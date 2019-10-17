import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getBook } from "../actions/books";

export class Book extends Component {
  componentDidMount() {
    this.props.getBook(this.props.match.params.book_id);
  }

  static propTypes = {
    getBook: PropTypes.func.isRequired
  };

  render() {
    const { book } = this.props;
    return (
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          {book ? (
            <div className="media">
              <img
                src="https://via.placeholder.com/150x200"
                className="mr-3"
                alt="..."
              />
              <div className="media-body">
                <h5 className="mt-0">
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </h5>
                <table>
                  <tbody>
                    <tr>
                      <th>Author</th>
                      <td>{book.author}</td>
                    </tr>
                    <tr>
                      <th>Publisher</th>
                      <td>{book.publisher}</td>
                    </tr>

                    <tr>
                      <th>Length</th>
                      <td>{book.num_of_pages}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-weight-lighter">{book.description}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
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
  { getBook }
)(Book);
