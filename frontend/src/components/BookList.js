/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getBooks } from "../actions/books";
import { getCurrentPageNumber } from "../utilities/getCurrentPageNumber";
import Pagination from "./shared/Pagination";
import Loader from "./shared/Loader";

export class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired
  };

  componentDidMount() {
    let number = getCurrentPageNumber(this.props.location.search);
    number ? this.props.getBooks(number) : this.props.getBooks();
  }

  componentDidUpdate(prevProps) {
    if (
      getCurrentPageNumber(this.props.location.search) !==
      getCurrentPageNumber(prevProps.location.search)
    ) {
      window.scrollTo(0, 0);
      let number = getCurrentPageNumber(this.props.location.search);
      number ? this.props.getBooks(number) : this.props.getBooks();
    }
  }

  render() {
    const { books } = this.props;
    const { page } = this.props;
    if (page.next) {
      page.next = page.next.replace("http://127.0.0.1:8000", "");
    }
    if (page.previous) {
      page.previous = page.previous.replace("http://127.0.0.1:8000", "");
    }
    let url = "/?page=";
    const currentPageNum = getCurrentPageNumber(this.props.location.search);
    return (
      <div className="row mt-4 mb-5">
        <div className="col-md-8 offset-md-2 mt-4">
          <ul className="list-unstyled">
            {books.length > 0 ? (
              books.map(book => {
                return (
                  <li key={book.id} className="media mb-4">
                    <img
                      src={
                        book.image
                          ? book.image
                          : "https://via.placeholder.com/150x200"
                      }
                      className="mr-3"
                      alt="..."
                      width="150"
                      height="200"
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
              <li>
                <Loader />
              </li>
            )}
          </ul>
          <Pagination page={page} currentPageNum={currentPageNum} url={url} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.bookReducer.books,
    page: state.bookReducer.page
  };
};

export default connect(
  mapStateToProps,
  { getBooks }
)(BookList);
